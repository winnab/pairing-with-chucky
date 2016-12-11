import psycopg2
import os

conn = psycopg2.connect(
	database="files", 
	user="fileuser", 
	password="", 
	host="127.0.0.1", 
	port="5432"
)

print "Opened database successfully"

def insert_files(cursor, parentid, rootdir):
	for child in os.listdir(rootdir):
		fullpath = os.path.join(rootdir, child)
		if os.path.isdir(fullpath): 
			myparentid = insert_file_meta(cursor, parentid, child, fullpath)
			insert_files(cursor, myparentid, fullpath)
		else:
			insert_file_meta(cursor, parentid, child, fullpath)

def insert_file_meta(cursor, parentid, name, fullpath):
	subdir_query =  "INSERT INTO files (parentid, name, fullpath) VALUES (%s, %s, %s) RETURNING id;"
	cursor.execute(subdir_query, (parentid, name, fullpath))
	id = cursor.fetchone()[0]
	
	filesize = os.path.getsize(fullpath)
	meta_query = "INSERT INTO metadata (fileid, filesize) VALUES (%s, %s);"
	cursor.execute(meta_query, (id, filesize))
	return id



cursor = conn.cursor()

cursor.execute("""
			TRUNCATE TABLE files cascade;
		""")

rootdir = "/Users/winna/"

rootid = insert_file_meta(cursor, None, os.path.basename(rootdir), rootdir)
insert_files(cursor, rootid, rootdir)
conn.commit()

# print "name", os.path.basename(subdir)
# print "fullpath", subdir
	
#cursor.execute(subdir_query, (parentid, os.path.basename(subdir), subdir))
	# for file in files:
	#     # print os.path.join(subdir, file)
	#     # filepath = subdir + os.sep + file


	# 	query =  "INSERT INTO files (path, name) VALUES (%s, %s);"
	# 	data = (subdir, file)

	# 	cursor.execute(query, data)
	# 	print query, data

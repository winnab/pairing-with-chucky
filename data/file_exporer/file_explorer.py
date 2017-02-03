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
	try:
		for child in os.listdir(rootdir):
			try:
				fullpath = os.path.join(rootdir, child)
				if os.path.isdir(fullpath): 
					myparentid = insert_file_meta(cursor, parentid, child, fullpath)
					insert_files(cursor, myparentid, fullpath)
				else:
					insert_file_meta(cursor, parentid, child, fullpath)	
			except Exception as e:
				 print 'inner loop caught this error: ' + repr(e)
	except Exception as e:
		 print 'outer loop caught this error: ' + repr(e) + ' in directory ' + repr(rootdir)

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
# rootdir = "/Users/winna/Google Drive/dev/drive-experiments/pairing-with-chucky/data/file_exporer"
print "root directory is ", rootdir

rootid = insert_file_meta(cursor, None, os.path.basename(rootdir), rootdir)
print "rootid is ", rootid

insert_files(cursor, rootid, rootdir)
print 'committing files...'

conn.commit()
print 'committed'

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

#!/usr/bin/python
# -*- coding: utf-8 -*-

import sqlite3 as lite
import sys
import csv
import random

con = None

try:
	con = lite.connect('test.db')
	
	cur = con.cursor()    
	cur.execute('SELECT SQLITE_VERSION()')
	
	data = cur.fetchone()
	
	print "SQLite version: %s" % data   

	with con:
		cur = con.cursor()
		cur.execute("""
			DROP TABLE IF EXISTS States;
		""")
		cur.execute("""
			DROP TABLE IF EXISTS StatesDirty;
		""")
		cur.execute("""
			CREATE TABLE IF NOT EXISTS States(
				Name TEXT, 
				Sex INTEGER,
				Origin INTEGER,
				Race INTEGER,
				Age INTEGER,
				Population INTEGER
			)
		""")
		cur.execute("""
			CREATE TABLE IF NOT EXISTS StatesDirty(
				Name TEXT, 
				Sex INTEGER,
				Origin INTEGER,
				Race INTEGER,
				Age INTEGER,
				Population INTEGER
			)
		""")
		with open('SC-EST2015-ALLDATA5.csv', 'rb') as csvfile:
			reader = csv.reader(csvfile, delimiter=',', quotechar='|')
			for i, row in enumerate(reader):
				if i == 0:
					continue
				if row[5] == "0":
					continue
				if row[6] == "0":
					continue
				cur.execute("INSERT INTO States VALUES(?,?,?,?,?,?)", 
					(row[4], int(row[5]), int(row[6]), int(row[7]), int(row[8]), int(row[9])) 
				)

				randInt = random.randint(0, 100)
				randPopulation = (int(row[9]) + randInt)
				if  randInt == 100:
					cur.execute("INSERT INTO StatesDirty VALUES(?,?,?,?,?,?)", 
						(row[4], int(row[5]), int(row[6]), int(row[7]), int(row[8]), None) 
					)
				else:
					cur.execute("INSERT INTO StatesDirty VALUES(?,?,?,?,?,?)", 
						(row[4], int(row[5]), int(row[6]), int(row[7]), int(row[8]), randPopulation)
					)

except lite.Error, e:
	
	print "Error %s:" % e.args[0]
	sys.exit(1)
	
finally:
	
	if con:
		con.close()


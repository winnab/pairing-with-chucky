graph: data.csv plot.plg
	gnuplot plot.plg


data.csv: index.js demo.js
	time node demo.js | tee data.csv ; test -s data.csv

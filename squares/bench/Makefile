graph: data.csv plot.plg
	gnuplot plot.plg


data.csv: index.js ../chucky/demo.js
	time node ../chucky/demo.js | tee data.csv ; test -s data.csv

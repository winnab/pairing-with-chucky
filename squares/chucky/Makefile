graph: data.csv ../nodeBench/plot.plg
	gnuplot ../nodeBench/plot.plg

data.csv: ../nodeBench/index.js chuckyNodeSquares.js demo.js
	time node demo.js | tee data.csv ; test -s data.csv

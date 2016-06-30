graph: data.csv ../bench/plot.plg
	gnuplot -p ../bench/plot.plg

data.csv: ../bench/index.js chuckyNodeSquares.js demo.js
	time node demo.js | tee data.csv ; test -s data.csv

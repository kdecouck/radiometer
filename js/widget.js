// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
	//--------------------------------------------------------
	var now = new Date();
	var nowyear = now.getFullYear();
	var nowmonth = now.getMonth()+1;
		if (nowmonth < 10){nowmonth = '0'+nowmonth}; //add prefix
	var nowday = now.getDate();
	var file = 'Day'+nowyear+''+nowmonth+''+nowday+'.csv';
	//----------------------------------------------------------
	
var path = "/radiometer/csv/"+file

   // grab the CSV
   $.get(path, function(csvString) {
   	// transform the CSV string into a 2-dimensional array (necessary for Google's visualization library)
		var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
		arrayData[0][2] = 'time'; //replace 'serialtime' tag with 'time'
		
		drawSums(arrayData);
    });
}

///////////////////////////
google.setOnLoadCallback(drawSums);
function drawSums(csv) {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Item');
    data.addColumn('number', 'Total');
    data.addColumn('number', 'Diffuse');
    data.addColumn('number', 'Direct');
    var ymax = [];
    var ymax6 = 0; //initialize max total of the day
    var ymax20 = 0; //initialize max direct of the day
    for (var i = 1; i < csv.length-1; i++) {
    	data.addRows([[i, csv[i][6], csv[i][13], csv[i][20]],]);
    	if (ymax6 < csv[i][6]){ymax6 = csv[i][6]};
    	if (ymax20 < csv[i][20]){ymax20 = csv[i][20]};
	};
	if (ymax20 < ymax6){ymax = ymax6} else {ymax = ymax20}; //y-axis max = max(total,direct)

    var view = new google.visualization.DataView(data);
    var seriesColors = ['black', 'blue', 'orange']; 
    var chart = new google.visualization.LineChart($('#chart_div')[0]);

//options on load
//----------------------------------
    chart.draw(view, {
    	title: csv[1][0],
    	//width: 900,
   		//height: 400,
   		lineWidth: 1,
        'chartArea': {'width': '80%', 'height': '65%'},
        strictFirstColumnType: true,
        vAxis: {title: "Irradiance (W/m^2)",viewWindowMode:'explicit',viewWindow:{max:ymax,min:0}},
         hAxis: {title: "Time (PST)", slantedText:false, ticks: [{v:1, f:"00:00"},{v:61, f:""},{v:121, f:""},{v:181, f:""},{v:241, f:""},{v:301, f:""},{v:361, f:"06:00"},{v:421, f:""},{v:481, f:"08:00"},{v:541, f:""},{v:601, f:""},{v:661, f:""},{v:721, f:"12:00"},{v:781, f:""},{v:841, f:""},{v:901, f:""},{v:961, f:""},{v:1021, f:""},{v:1081, f:"18:00"},{v:1141, f:""},{v:1201, f:""},{v:1261, f:""},{v:1321, f:""},{v:1381, f:""},{v:1440, f:"00:00"}]},
        colors: seriesColors,
        legend: 'none'
    });

    $('#sums').find(':checkbox').change(function () {
        var cols = [0];
        var colors = [];   
        $('#sums').find(':checkbox:checked').each(function () {
            console.log(this);
            var value = parseInt($(this).attr('value'));
            cols.push(value);
            colors.push(seriesColors[value - 1]);
            console.log(value, 'colors: ', colors);
        });
        view.setColumns(cols);

//options on refresh
//----------------------------------
        chart.draw(view, {
        	title: csv[1][0],
        	//width: 900,
   			//height: 400,
   			lineWidth: 1,
            'chartArea': {'width': '80%', 'height': '65%'},
            strictFirstColumnType: true,
        	vAxis: {title: "Irradiance (W/m^2)",viewWindowMode:'explicit',viewWindow:{max:ymax,min:0}},
        	hAxis: {title: "Time (PST)", slantedText:false, ticks: [{v:1, f:"00:00"},{v:61, f:""},{v:121, f:""},{v:181, f:""},{v:241, f:""},{v:301, f:""},{v:361, f:"06:00"},{v:421, f:""},{v:481, f:"08:00"},{v:541, f:""},{v:601, f:""},{v:661, f:""},{v:721, f:"12:00"},{v:781, f:""},{v:841, f:""},{v:901, f:""},{v:961, f:""},{v:1021, f:""},{v:1081, f:"18:00"},{v:1141, f:""},{v:1201, f:""},{v:1261, f:""},{v:1321, f:""},{v:1381, f:""},{v:1440, f:"00:00"}]},
            colors: colors,
            legend: 'none'
        });
    });
     
}

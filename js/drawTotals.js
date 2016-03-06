google.setOnLoadCallback(drawTotals);
function drawTotals(csv) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Item');
    data.addColumn('number', '414 nm');
    data.addColumn('number', '496 nm');
    data.addColumn('number', '613 nm');
    data.addColumn('number', '670 nm');
    data.addColumn('number', '869 nm');
    data.addColumn('number', '937 nm');;
    var ymax = [];
    for (var i = 1; i < csv.length-1; i++) {
    	data.addRows([[i, csv[i][7], csv[i][8], csv[i][9], csv[i][10], csv[i][11], csv[i][12]],]);
    	if (ymax < csv[i][8]){ymax = csv[i][8]};
        if (ymax < csv[i][9]){ymax = csv[i][9]};
        if (ymax < csv[i][10]){ymax = csv[i][10]};
        if (ymax < csv[i][11]){ymax = csv[i][11]};
        if (ymax < csv[i][12]){ymax = csv[i][12]};
	};

    var view = new google.visualization.DataView(data);
    var seriesColors = ['blue', 'green', 'orange', 'red', 'brown', 'grey']; 
    var chart = new google.visualization.LineChart($('#chart_totals')[0]);
    chart.draw(view, { //options on load
    	title: csv[1][0],
    	//width: 900,
   		//height: 400,
   		lineWidth: 1,
        'chartArea': {'width': '80%', 'height': '80%'},
        strictFirstColumnType: true,
        vAxis: {title: "Total irradiance (W/m^2)/nm",viewWindowMode:'explicit',viewWindow:{max:ymax,min:0}},
         hAxis: {title: "Time (PST)", slantedText:false, ticks: [{v:1, f:"00:00"},{v:61, f:""},{v:121, f:""},{v:181, f:""},{v:241, f:"04:00"},{v:301, f:""},{v:361, f:""},{v:421, f:""},{v:481, f:"08:00"},{v:541, f:""},{v:601, f:""},{v:661, f:""},{v:721, f:"12:00"},{v:781, f:""},{v:841, f:""},{v:901, f:""},{v:961, f:"16:00"},{v:1021, f:""},{v:1081, f:""},{v:1141, f:""},{v:1201, f:"20:00"},{v:1261, f:""},{v:1321, f:""},{v:1381, f:""},{v:1440, f:"00:00"}]},
        colors: seriesColors,
        legend: 'none'
    });

    $('#totals').find(':checkbox').change(function () {
        var cols = [0];
        var colors = [];   
        $('#totals').find(':checkbox:checked').each(function () {
            console.log(this);
            var value = parseInt($(this).attr('value'));
            cols.push(value);
            colors.push(seriesColors[value - 1]);
            console.log(value, 'colors: ', colors);
        });
        view.setColumns(cols);
        
        chart.draw(view, {//options on refresh
        	title: csv[1][0],
        	//width: 900,
   			//height: 400,
   			lineWidth: 1,
            'chartArea': {'width': '80%', 'height': '80%'},
            strictFirstColumnType: true,
        	vAxis: {title: "Total irradiance (W/m^2)/nm",viewWindowMode:'explicit',viewWindow:{max:ymax,min:0}},
        	hAxis: {title: "Time (PST)", slantedText:false, ticks: [{v:1, f:"00:00"},{v:61, f:""},{v:121, f:""},{v:181, f:""},{v:241, f:"04:00"},{v:301, f:""},{v:361, f:""},{v:421, f:""},{v:481, f:"08:00"},{v:541, f:""},{v:601, f:""},{v:661, f:""},{v:721, f:"12:00"},{v:781, f:""},{v:841, f:""},{v:901, f:""},{v:961, f:"16:00"},{v:1021, f:""},{v:1081, f:""},{v:1141, f:""},{v:1201, f:"20:00"},{v:1261, f:""},{v:1321, f:""},{v:1381, f:""},{v:1440, f:"00:00"}]},
            colors: colors,
            legend: 'none'
        });
    });
     
}
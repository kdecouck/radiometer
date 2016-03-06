// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart)

function drawChart() {
	var date = QueryString.date.substring(10, 14)+QueryString.date.substring(0, 2)+QueryString.date.substring(5, 7);
	if (parseInt(date) < 20140925){alert("Error: No data prior to September 25th, 2014.");return;};
	var now = new Date();
	var nowyear = now.getFullYear();
	var nowmonth = now.getMonth()+1;
		if (nowmonth < 10){nowmonth = '0'+nowmonth}; //add prefix
	var nowday = now.getDate();
		if (nowday < 10){nowday = '0'+nowday}; //add prefix
	if (date > parseInt(nowyear+''+nowmonth+''+nowday)){alert("Error: No data on future events.");return;};
	
	var file = 'Day'+date+'.csv';
	var path = "/radiometer/csv/"+file

	//Create download link, write to html page.
	//var path_html = '<a href="'+path+'">Download!</a>'
    //$("#download_url").html(htmlpath);

    //Create download button, insert in html page.
	var path_button = '<form method="get" action="'+path+'"><button type="submit">Download CSV</button></form>'
    $("#download_button").html(path_button);

   // grab the CSV
   $.get(path, function(csvString) {
   	// transform the CSV string into a 2-dimensional array (necessary for Google's visualization library)
		var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
		arrayData[0][2] = 'time'; //replace 'serialtime' tag with 'time'
		drawSums(arrayData);
		drawTotals(arrayData);
		drawDiffuse(arrayData);
		drawDirnorm(arrayData);

		//Generate the custom graph's axis variable selectors
		$('#range').empty();  //prevents dropdown option duplication
		$('#domain').empty(); //prevents dropdown option duplication
		for (var i = 2; i < arrayData[0].length; i++) { //"i = 2" eliminates 'date' and 'time', which don't work anyway.
	   		// this adds the dropdown options to both select elements
	   		$("select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
		}
	// set the default selector label values for domain and range
	if(typeof domain_i == 'undefined'){domain_i = 2}; //global var. x-axis. '2' = serialtime. Remembers last selected option.
	if(typeof range_i == 'undefined'){range_i = 6}; //global var.y-axis. '6' = total irradiance. Remembers last selected option.
	$("#domain option[value='2']").attr("selected","selected");
	$("#range option[value='6']").attr("selected","selected");

	// this new DataTable object holds all the data
		var data = new google.visualization.arrayToDataTable(arrayData);

	// this view selects a subset of the csv data to visualize
		var view = new google.visualization.DataView(data);
		var view_correlation = view;
		var view_total = view;
		var view_diffuse = view;
		var view_dirnorm = view;
	//Set chart options custom
	//---------------------------
	//Load these data columns
    view.setColumns([domain_i,range_i]);
	// OPTIONS AFTER UPDATE
    var options = {
        title: arrayData[1][0], //"06/10/2015"
        //width: 900,
        //height: 400,
        pointSize: 3,
        'chartArea': {'width': '80%', 'height': '80%'},
        hAxis: {title: data.getColumnLabel(domain_i), slantedText:false, ticks: [
	  			{v:data.getColumnRange(domain_i).min.toFixed(2), f:data.getColumnRange(domain_i).min.toFixed(2)},
	  			{v:(data.getColumnRange(domain_i).min+((data.getColumnRange(domain_i).max-data.getColumnRange(domain_i).min)*(1/4))).toFixed(2), f:((data.getColumnRange(domain_i).max-data.getColumnRange(domain_i).min)*(1/4)).toFixed(2)},
	  			{v:(data.getColumnRange(domain_i).min+((data.getColumnRange(domain_i).max-data.getColumnRange(domain_i).min)*(2/4))).toFixed(2), f:((data.getColumnRange(domain_i).max-data.getColumnRange(domain_i).min)*(2/4)).toFixed(2)},
	  			{v:(data.getColumnRange(domain_i).min+((data.getColumnRange(domain_i).max-data.getColumnRange(domain_i).min)*(3/4))).toFixed(2), f:((data.getColumnRange(domain_i).max-data.getColumnRange(domain_i).min)*(3/4)).toFixed(2)},
	  			{v:data.getColumnRange(domain_i).max.toFixed(2), f:data.getColumnRange(domain_i).max.toFixed(2)}]},
	  	vAxis: {title: data.getColumnLabel(range_i), ticks: [
	  			{v:data.getColumnRange(range_i).min.toFixed(2), f:data.getColumnRange(range_i).min.toFixed(2)},
	  			{v:(data.getColumnRange(range_i).min+((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(1/4))).toFixed(2), f:((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(1/4)).toFixed(2)},
	  			{v:(data.getColumnRange(range_i).min+((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(2/4))).toFixed(2), f:((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(2/4)).toFixed(2)},
	  			{v:(data.getColumnRange(range_i).min+((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(3/4))).toFixed(2), f:((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(3/4)).toFixed(2)},
	  			{v:data.getColumnRange(range_i).max.toFixed(2), f:data.getColumnRange(range_i).max.toFixed(2)}]},
        legend: 'none'
    };

    var options_onload = {
        title: arrayData[1][0],
        //title: domain_i,
        //width: 900, //900,
       	//height: 400, //400,
        pointSize: 3,
        'chartArea': {'width': '80%', 'height': '80%'},
        //hAxis: {title: data.getColumnLabel(2), minValue: data.getColumnRange(2).min, maxValue: data.getColumnRange(2).max},
        hAxis: {title: "Time (PST)", slantedText:false, ticks: [{v:arrayData[1][2], f:"00:00"},{v:arrayData[1][2]+(1*(1/24)), f:""},{v:arrayData[1][2]+(2*(1/24)), f:""},{v:arrayData[1][2]+(3*(1/24)), f:""},{v:arrayData[1][2]+(4*(1/24)), f:"04:00"},{v:arrayData[1][2]+(5*(1/24)), f:""},{v:arrayData[1][2]+(6*(1/24)), f:""},{v:arrayData[1][2]+(7*(1/24)), f:""},{v:arrayData[1][2]+(8*(1/24)), f:"08:00"},{v:arrayData[1][2]+(9*(1/24)), f:""},{v:arrayData[1][2]+(10*(1/24)), f:""},{v:arrayData[1][2]+(11*(1/24)), f:""},{v:arrayData[1][2]+(12*(1/24)), f:"12:00"},{v:arrayData[1][2]+(13*(1/24)), f:""},{v:arrayData[1][2]+(14*(1/24)), f:""},{v:arrayData[1][2]+(15*(1/24)), f:""},{v:arrayData[1][2]+(16*(1/24)), f:"16:00"},{v:arrayData[1][2]+(17*(1/24)), f:""},{v:arrayData[1][2]+(18*(1/24)), f:""},{v:arrayData[1][2]+(19*(1/24)), f:""},{v:arrayData[1][2]+(20*(1/24)), f:"20:00"},{v:arrayData[1][2]+(21*(1/24)), f:""},{v:arrayData[1][2]+(22*(1/24)), f:""},{v:arrayData[1][2]+(23*(1/24)), f:""},{v:arrayData[1][2]+(24*(1/24)), f:"00:00"}]},
        vAxis: {title: data.getColumnLabel(range_i), ticks: [
	  			{v:data.getColumnRange(range_i).min.toFixed(2), f:data.getColumnRange(range_i).min.toFixed(2)},
	  			{v:(data.getColumnRange(range_i).min+((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(1/4))).toFixed(2), f:((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(1/4)).toFixed(2)},
	  			{v:(data.getColumnRange(range_i).min+((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(2/4))).toFixed(2), f:((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(2/4)).toFixed(2)},
	  			{v:(data.getColumnRange(range_i).min+((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(3/4))).toFixed(2), f:((data.getColumnRange(range_i).max-data.getColumnRange(range_i).min)*(3/4)).toFixed(2)},
	  			{v:data.getColumnRange(range_i).max.toFixed(2), f:data.getColumnRange(range_i).max.toFixed(2)}]},
        legend: 'none'
    };

    //Assign views+options. Draw chart.  
    var chart = new google.visualization.ScatterChart(document.getElementById('chart'));
	if (domain_i != 2) 
		{chart.draw(view, options); //custom time axis
		$("#domain option[value='"+domain_i+"']").attr("selected","selected"); //glitch fix
		$("#range option[value='"+range_i+"']").attr("selected","selected");   //glitch fix
		}
	else //i.e. when 'time' is selected
		{chart.draw(view, options_onload); //ordinary axis
		$("#range option[value='"+range_i+"']").attr("selected","selected");   //glitch fix
		};
    

//  UPDATING THE CHART (BUTTON)
  //  set listener for the update button
    $("select").change(function(){
	  // determine selected domain and range
	    var domain = +$("#domain option:selected").val();
	    var range = +$("#range option:selected").val();
	    domain_i = +$("#domain option:selected").val();
	    range_i = +$("#range option:selected").val();
	  // update the view
	    view.setColumns([domain,range]);
	  // update the axis titles and axis ranges
	    options.hAxis.title = data.getColumnLabel(domain);
	    options.hAxis.minValue = data.getColumnRange(domain).min;
	    options.hAxis.maxValue = data.getColumnRange(domain).max;
	    options.vAxis.title = data.getColumnLabel(range);
	    options.vAxis.minValue = data.getColumnRange(range).min;
	    options.vAxis.maxValue = data.getColumnRange(range).max;
		
		//horizontal axis = serialtime?
	  	if (data.getColumnRange(domain).min > 30000) {
	  		options.hAxis.title = 'Time (PST)';
	  		options.hAxis.slantedText = false; 
	  		options.hAxis.ticks = [{v:arrayData[1][2], f:"00:00"},{v:arrayData[1][2]+(1*(1/24)), f:""},{v:arrayData[1][2]+(2*(1/24)), f:""},{v:arrayData[1][2]+(3*(1/24)), f:""},{v:arrayData[1][2]+(4*(1/24)), f:"04:00"},{v:arrayData[1][2]+(5*(1/24)), f:""},{v:arrayData[1][2]+(6*(1/24)), f:""},{v:arrayData[1][2]+(7*(1/24)), f:""},{v:arrayData[1][2]+(8*(1/24)), f:"08:00"},{v:arrayData[1][2]+(9*(1/24)), f:""},{v:arrayData[1][2]+(10*(1/24)), f:""},{v:arrayData[1][2]+(11*(1/24)), f:""},{v:arrayData[1][2]+(12*(1/24)), f:"12:00"},{v:arrayData[1][2]+(13*(1/24)), f:""},{v:arrayData[1][2]+(14*(1/24)), f:""},{v:arrayData[1][2]+(15*(1/24)), f:""},{v:arrayData[1][2]+(16*(1/24)), f:"16:00"},{v:arrayData[1][2]+(17*(1/24)), f:""},{v:arrayData[1][2]+(18*(1/24)), f:""},{v:arrayData[1][2]+(19*(1/24)), f:""},{v:arrayData[1][2]+(20*(1/24)), f:"20:00"},{v:arrayData[1][2]+(21*(1/24)), f:""},{v:arrayData[1][2]+(22*(1/24)), f:""},{v:arrayData[1][2]+(23*(1/24)), f:""},{v:arrayData[1][2]+(24*(1/24)), f:"00:00"}];
	  	} else {options.hAxis.ticks = [
	  			{v:data.getColumnRange(domain).min.toFixed(2), f:data.getColumnRange(domain).min.toFixed(2)},
	  			{v:(data.getColumnRange(domain).min+((data.getColumnRange(domain).max-data.getColumnRange(domain).min)*(1/4))).toFixed(2), f:((data.getColumnRange(domain).max-data.getColumnRange(domain).min)*(1/4)).toFixed(2)},
	  			{v:(data.getColumnRange(domain).min+((data.getColumnRange(domain).max-data.getColumnRange(domain).min)*(2/4))).toFixed(2), f:((data.getColumnRange(domain).max-data.getColumnRange(domain).min)*(2/4)).toFixed(2)},
	  			{v:(data.getColumnRange(domain).min+((data.getColumnRange(domain).max-data.getColumnRange(domain).min)*(3/4))).toFixed(2), f:((data.getColumnRange(domain).max-data.getColumnRange(domain).min)*(3/4)).toFixed(2)},
	  			{v:data.getColumnRange(domain).max.toFixed(2), f:data.getColumnRange(domain).max.toFixed(2)}]
	  		};
	  	//vertical axis = serialtime?
	  	if (data.getColumnRange(range).min > 30000) {
	  		options.vAxis.title = 'Time (PST)';
	  		options.vAxis.ticks = [{v:arrayData[1][2], f:"00:00"},{v:arrayData[1][2]+(1*(1/24)), f:""},{v:arrayData[1][2]+(2*(1/24)), f:""},{v:arrayData[1][2]+(3*(1/24)), f:""},{v:arrayData[1][2]+(4*(1/24)), f:"04:00"},{v:arrayData[1][2]+(5*(1/24)), f:""},{v:arrayData[1][2]+(6*(1/24)), f:""},{v:arrayData[1][2]+(7*(1/24)), f:""},{v:arrayData[1][2]+(8*(1/24)), f:"08:00"},{v:arrayData[1][2]+(9*(1/24)), f:""},{v:arrayData[1][2]+(10*(1/24)), f:""},{v:arrayData[1][2]+(11*(1/24)), f:""},{v:arrayData[1][2]+(12*(1/24)), f:"12:00"},{v:arrayData[1][2]+(13*(1/24)), f:""},{v:arrayData[1][2]+(14*(1/24)), f:""},{v:arrayData[1][2]+(15*(1/24)), f:""},{v:arrayData[1][2]+(16*(1/24)), f:"16:00"},{v:arrayData[1][2]+(17*(1/24)), f:""},{v:arrayData[1][2]+(18*(1/24)), f:""},{v:arrayData[1][2]+(19*(1/24)), f:""},{v:arrayData[1][2]+(20*(1/24)), f:"20:00"},{v:arrayData[1][2]+(21*(1/24)), f:""},{v:arrayData[1][2]+(22*(1/24)), f:""},{v:arrayData[1][2]+(23*(1/24)), f:""},{v:arrayData[1][2]+(24*(1/24)), f:"00:00"}];
	  	} else {options.vAxis.ticks = [
	  			{v:data.getColumnRange(range).min.toFixed(2), f:data.getColumnRange(range).min.toFixed(2)},
	  			{v:(data.getColumnRange(range).min+((data.getColumnRange(range).max-data.getColumnRange(range).min)*(1/4))).toFixed(2), f:(((data.getColumnRange(range).max-data.getColumnRange(range).min))*(1/4)).toFixed(2)},
	  			{v:(data.getColumnRange(range).min+((data.getColumnRange(range).max-data.getColumnRange(range).min)*(2/4))).toFixed(2), f:(((data.getColumnRange(range).max-data.getColumnRange(range).min))*(2/4)).toFixed(2)},
	  			{v:(data.getColumnRange(range).min+((data.getColumnRange(range).max-data.getColumnRange(range).min)*(3/4))).toFixed(2), f:(((data.getColumnRange(range).max-data.getColumnRange(range).min))*(3/4)).toFixed(2)},
	  			{v:data.getColumnRange(range).max.toFixed(2), f:data.getColumnRange(range).max.toFixed(2)}]
	  	};

	   // update the chart
	   chart.draw(view, options);
    });

    });
}
function getValue(){
      var formvalue = document.myForm.elements[0].value // 06/18/2015
      var x = formvalue.substr(6,4)+formvalue.substr(0,2)+formvalue.substr(3,2)
      var selected = "Day"+x+".csv" 

      if (x < 20140925){alert("Error: No data prior to September 25th, 2014.");return;};
      var now = new Date();
	  var nowyear = now.getFullYear();
	  var nowmonth = now.getMonth()+1;
		if (nowmonth < 10){nowmonth = '0'+nowmonth}; //add prefix
	  var nowday = now.getDate();

      if (x > parseInt(nowyear+''+nowmonth+''+nowday)){alert("Error: No data on future events.");return;};

      drawChart(selected);

}
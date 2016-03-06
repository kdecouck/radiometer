//firstDate is the name of the oldest dataset. 
//This date is defined as follows:
var year = 2014
var month = 9-1 //0-11
var day = 25

//Client-side javascript is not allowed to check directories directly. We have to generate a filename and hope that it's there...
var firstDate = new Date(year,month,day);
var now = new Date();
var nowyear = now.getFullYear();
var nowmonth = now.getMonth(); // 0-11
var nowday = now.getDate()

var today = new Date(nowyear,nowmonth,nowday);
var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var diffDays = Math.round(Math.abs((firstDate.getTime() - today.getTime())/(oneDay)));

//A function to add days
Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

//Run through all days from oldest dataset untill today
for (i = 0; i < diffDays+1; i++) {
	year = firstDate.getFullYear();
	month = firstDate.getMonth()+1; // 0-11
		if (month < 10){var monthstring = '0'+month} else {var monthstring = month}
	day = firstDate.getDate();
		if (day < 10){var daystring = '0'+day} else {var daystring = day}
	document.write('<li>'+ '<a href="'+ '/radiometer/csv/Day' + year+monthstring+daystring +'.csv' + '">'+ 'Day'+ year+monthstring+daystring + '.csv'+ '</a>' +'</li>');
	firstDate = firstDate.addDays(1)
}

//This generates a bunch of document.write statements, like this:
//document.write('<li>'+ '<a href="'+ '/csv/Day20140501.csv' + '">'+ 'Day20140501.csv' + '</a>' +'</li>');



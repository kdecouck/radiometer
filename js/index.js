var fs = require("fs");
var host = "128.95.254.61";
var port = 8889;
var express = require("express");
var d3 = require("d3");

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/", function(request, response) {  
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<!doctype html>\n<html lang="en">\n' 
+ '\n<meta charset="utf-8">\n<title>clean Energy Institute - Radiometer</title>\n' 
+ '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' 
+ '\n\n<h1>Data sets:</h1>\n' 
+ '<div id="content"><p><a href="/public/graph.html">Experimental graph</a></p>\n'
+ '<div id="content"><p>The following data sets are currently available for download:</p><ul>');

  var path = "C:\\Program Files\\YESINC\\YESDAS\\My YESDAS Network\\Power Plant Roof\\YESDAS1\\public\\csv\\"  //('\'is the escape character in javascript)
  var path20 = "/public/csv/";
  var fs = require('fs');
  fs.readdir(path, function (err, files) {
  	if (err) throw err;
  	for (var index in files) {
  	response.write('<li>'+ '<a href="'+ path20 + files[index] + '">'+ files[index] + '</a>' +'</li>');
  	}
  response.write('</ul></div>\n\n');
  response.end();
});
})
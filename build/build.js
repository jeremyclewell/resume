var sys = require('sys')
var exec = require('child_process').exec;
var fs = require("fs");
var md = require("node-markdown").Markdown;
var pdf = require("node-wkhtml").pdf();
var jsdom = require("jsdom");

function pull(error, stdout, stderr) { 
	sys.puts(stdout) 
	fs.readFile("../resume.md", "utf-8", function(err, data) {
		if (err) {
			console.log("Could not open file: %s", err);
			process.exit(1);
		}
		jsdom.env("https://raw.github.com/h5bp/html5-boilerplate/master/index.html", ['http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'], function(errors, window) {
	  		window.$("body").prepend(md(data));
	  		fs.writeFile("../resume.html", window.$("html"), function(err) {
				if (err) {		
					console.log("Could not write file %s", err);	
				} else {
					new pdf({url:"../resume.html"}).convertAs("../resume.pdf");
				}
			});
		});	
	});
}

exec("cd ..; git pull;", pull);

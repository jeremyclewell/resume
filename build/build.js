var exec = require('child_process').exec;
var md = require("node-markdown").Markdown;
var wkhtml = require("node-wkhtml");
var jsdom = require("jsdom");
var fs = require("fs");

function pull(error, stdout, stderr) { 
	console.log(stdout);
	fs.readFile("resume.md", "utf-8", function(err, data) {
		if (err) {
			console.log("Could not open file: %s", err);
			process.exit(1);
		}
		jsdom.env("https://raw.github.com/h5bp/html5-boilerplate/master/index.html", ['http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'], function(errors, window) {
	  		window.$("body").prepend(md(data));
	  		fs.writeFile("resume.html", window.$("html").clone().wrap('<div></div>').html(), function(err) {
				if (err) {		
					console.log("Could not write file %s", err);	
				} else {
					wkhtml.spawn('pdf', 'resume.html').stdout.pipe(fs.createWriteStream('resume.pdf'));
					console.log("Success!!!");
				}
			});
		});	
	});
}
console.log("Updating...");
exec("cd ..; git pull;", pull);

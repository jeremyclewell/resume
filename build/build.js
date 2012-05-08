var fs = require("fs");
var md = require("node-markdown").Markdown;
var pdf = require("node-wkhtml").pdf();

fs.readFile("../resume.md", "utf-8", function(err, data) {
	if (err) {
		console.log("Could not open file: %s", err);
		process.exit(1);
	}
	var html = "<!DOCTYPE html><html><head><meta charset='UTF-8' /><title>Jeremy Austin Clewell</title><link rel='stylesheet' href='css/style.css'></head>" + md(data) + "</html>";
	fs.writeFile("../resume.html", html, function(err) {
		if (err) {		
			console.log("Could not write file %s", err);	
		} else {
			new pdf({url:"../resume.html"}).convertAs("../resume.pdf");
		}
	}); 
});

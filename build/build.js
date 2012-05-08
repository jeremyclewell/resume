var fs = require("fs");
var md = require("node-markdown").Markdown;
var pdf = require("node-wkhtml").pdf();

fs.readFile("../resume.md", "ascii", function(err, data) {
	if (err) {
		console.log("Could not open file: %s", err);
		process.exit(1);
	}
	fs.writeFile("../resume.html", md(data), function(err) {
		if (err) {		
			console.log("Could not write file %s", err);	
		} else {
			new pdf({url:"../resume.html"}).convertAs("../resume.pdf");
		}
	}); 
});

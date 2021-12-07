const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 9000;

const DataTable = require("../src/DataTable.js");

app.use(express.static(path.join(__dirname + "/semantic/")));

app.get("/", (req, res) => {
	const data = JSON.parse(fs.readFileSync(__dirname + "/data.json").toString());
	const params = {
		draw: 10,
		start: 2,		/* Start point */
		length: 100,		/* Amount of data to be displayed per page */
		search: {
			"value": "ers",
		},
	};
	const dt = DataTable.from(req.query, data);
	dt.build().then(response => {
		res.json(response);
	});
});

app.get("/test", (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});

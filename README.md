# DataTable

This lib allows to process [DataTable](https://datatables.net/) data content from server-side using NodeJS

## Instalation

### Using npm
```bash
npm install node-datatable
```

## Generating server-side data

### From DataTable JS

Getting server-side response from client-side **[DataTable](https://datatables.net/)** request
```javascript

const express = require("express");
const DataTable = require("node-datatable");

const app = express();

const data = [
    {
        "id": "1",
        "name": "2 tone\r",
        "observation": ""
    },
    {
        "id": "2",
        "name": "2-step garage\r",
        "observation": ""
    },
    {
        "id": "3",
        "name": "4-beat\r",
        "observation": ""
    },
];

app.get("/server-side-datatable", (req, res) => {
	const dt = DataTable.from(req.query, data);
	dt.build().then(response => {
		res.json(response);
	});
});
```
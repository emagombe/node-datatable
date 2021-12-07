
const DataTable = {};

DataTable.from = function(params, data) {
	let response = {
		draw: 1,
		recordsTotal: 0,
		recordsFiltered: 0,
		data: [],
	};

	const order = (params, data) => {

		const order = params.order[0];

		if(!Boolean(params.columns[order.column].orderable)) {
			return data;
		}

		let order_column_list = data.map(element => {
			return Object.values(element)[order.column];
		});

		//console.log(data);

		// if(order.dir === "asc") {
		// 	order_column_list.sort();
		// } else {
		// 	order_column_list.sort().reverse();
		// }
		let temp;
		let temp_keys;

		let order_column_list_keys = Object.keys(order_column_list);
		for(let i = 0; i < order_column_list.length; i ++) {
			for(let j = 0; j < order_column_list.length; j ++) {

				if(order.dir === "asc") {
					if(order_column_list[i] < order_column_list[j]) {
						/* Ordering values */
						temp = order_column_list[i];
						order_column_list[i] = order_column_list[j];
						order_column_list[j] = temp;
						/* Ordering keys */
						temp_keys = order_column_list_keys[i];
						order_column_list_keys[i] = order_column_list_keys[j];
						order_column_list_keys[j] = temp_keys;
					}
				} else {
					if(order_column_list[i] > order_column_list[j]) {
						/* Ordering values */
						temp = order_column_list[i];
						order_column_list[i] = order_column_list[j];
						order_column_list[j] = temp;
						/* Ordering keys */
						temp_keys = order_column_list_keys[i];
						order_column_list_keys[i] = order_column_list_keys[j];
						order_column_list_keys[j] = temp_keys;
					}
				}
			}
		}

		let new_array = [];
		for(let i = 0; i < order_column_list.length; i ++) {
			new_array[i] = data[order_column_list_keys[i]];
		}

		console.log(new_array);

		return new_array;
	};
	this.build = () => new Promise((resolve, reject) => {
		try {
			if(typeof params.draw !== "undefined") {
				/* Setting draw */
				response.draw = params.draw;
			}

			/*Total rows */
			response.recordsTotal = data.length;
			/* Initial filtered rows */
			response.recordsFiltered = data.length;

			/* Searching */
			response.data = data.filter((element) =>
				Boolean(
					Object.keys(element).filter(key =>
						element[key].toString().toLowerCase().includes(params.search.value.toString().toLowerCase())
					).length
				)
			);

			/* ordering */
			response.data = order(params, response.data);

			/* Updating filtered rows */
			response.recordsFiltered = response.data.length;

			/* Cutting displaying data */
			response.data = response.data.slice(params.start, parseInt(params.start) + parseInt(params.length));

			/* Returning the values */
			resolve(response);
		} catch (ex) {
			reject(ex);
		}
	});

	return this;
};

module.exports = DataTable;
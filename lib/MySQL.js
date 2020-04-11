const MySQL = {
	Async: {},
	Sync: {}
};

MySQL.Ready = function (callback) {
	const isMySQLReady = setTick(async () => {
		while (GetResourceState('mysql-async') != 'started') {
			await Wait(0);
		}
		while (!exports['mysql-async'].is_ready()) {
			await Wait(0);
		}
		clearTick(isMySQLReady);
	});
	callback();
};

/* Async Functions */
MySQL.Async.Execute = function (query, params, func) {
	switch (true) {
		case typeof query != 'string':
			return console.log('The SQL Query must be a string');
		case typeof params != 'object':
			return console.log('The SQL Param must be a object');
	}
	exports['mysql-async'].mysql_execute(query, params, func);
};

MySQL.Async.FetchAll = function (query, params, func) {
	switch (true) {
		case typeof query != 'string':
			return console.log('The SQL Query must be a string');
		case typeof params != 'object':
			return console.log('The SQL Param must be a object');
	}
	exports['mysql-async'].mysql_fetch_all(query, params, func);
};

MySQL.Async.FetchScalar = function (query, params, func) {
	switch (true) {
		case typeof query != 'string':
			return console.log('The SQL Query must be a string');
		case typeof params != 'object':
			return console.log('The SQL Param must be a object');
	}
	exports['mysql-async'].mysql_fetch_scalar(query, params, func);
};

/* Sync Functions */
MySQL.Sync.Execute = async function (query, params) {
	switch (true) {
		case typeof query != 'string':
			return console.log('The SQL Query must be a string');
		case typeof params != 'object':
			return console.log('The SQL Param must be a object');
	}

	let rowsUpdated = 0;
	let finishedQuery = false;

	exports['mysql-async'].mysql_execute(query, params, (result) => {
		rowsUpdated = result;
		finishedQuery = true;
	});

	while (!finishedQuery) {
		await Wait(0);
	}

	return rowsUpdated;
};

MySQL.Sync.FetchAll = async function (query, params) {
	switch (true) {
		case typeof query != 'string':
			return console.log('The SQL Query must be a string');
		case typeof params != 'object':
			return console.log('The SQL Param must be a object');
	}

	let rowsUpdated = {};
	let finishedQuery = false;

	exports['mysql-async'].mysql_fetch_all(query, params, (result) => {
		rowsUpdated = result;
		finishedQuery = true;
	});

	while (!finishedQuery) {
		await Wait(0);
	}

	return rowsUpdated;
};

MySQL.Sync.FetchScalar = async function (query, params) {
	switch (true) {
		case typeof query != 'string':
			return console.log('The SQL Query must be a string');
		case typeof params != 'object':
			return console.log('The SQL Param must be a object');
	}

	let rowsUpdated = '';
	let finishedQuery = false;

	exports['mysql-async'].mysql_fetch_scalar(query, params, (result) => {
		rowsUpdated = result;
		finishedQuery = true;
	});

	while (!finishedQuery) {
		await Wait(0);
	}

	return rowsUpdated;
};
const MySQL = {
	Async: {},
	Sync: {}
};

MySQL.Ready = function (callback) {
	const isMySQLReady = setTick(async () => {
		while (!exports['mysql-async'].is_ready()) {
			await Wait(0);
		}
		clearTick(isMySQLReady);
	});
	callback();
};

/* Async Functions */
MySQL.Async.Execute = function (query, params, func) {
	if (typeof query != 'string') {
		return console.log('The SQL Query must be a string');
	}
	exports['mysql-async'].mysql_execute(query, params, func);
};

MySQL.Async.FetchAll = function (query, params, func) {
	if (typeof query != 'string') {
		return console.log('The SQL Query must be a string');
	}
	exports['mysql-async'].mysql_fetch_all(query, params, func);
};

MySQL.Async.FetchScalar = function (query, params, func) {
	if (typeof query != 'string') {
		return console.log('The SQL Query must be a string');
	}
	exports['mysql-async'].mysql_fetch_scalar(query, params, func);
};

/* Sync Functions */
MySQL.Sync.Execute = async function (query, params) {
	if (typeof query != 'string') {
		return console.log('The SQL Query must be a string');
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
	if (typeof query != 'string') {
		return console.log('The SQL Query must be a string');
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
	if (typeof query != 'string') {
		return console.log('The SQL Query must be a string');
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
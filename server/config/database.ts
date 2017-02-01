export let config = {
	local: true,
	type: 'sql',
	sql: {
		database: 'Quicksilver',
		host: 'localhost',
		port: 3306,
		user: 'quicksilver',
		password: 'Quick!Silver1',
		waitForConnections: true,
		connectionLimit: 50,
	},
};
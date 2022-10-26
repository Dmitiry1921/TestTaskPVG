const fetch = require('node-fetch');

async function fetchAPI(method, path = '', data = undefined) {
	const res = await fetch(`http://localhost:3000${path}`, {
		method,
		body: data ? JSON.stringify(data) : undefined,
		headers: {'Content-Type': 'application/json'}
	});

	return await res.json();
}


module.exports = fetchAPI;

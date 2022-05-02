const http = require('http');

const server = http.createServer((req, res) => {
	let data = '';

	req.on('data', chunk => { 
		data += chunk;
	})

	req.on('end', () => {
		res.write('HELLO WORLD MICAEL');
		res.end();
	})

} );

server.listen(5000);
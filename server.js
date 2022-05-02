const http = require('http');

const server = http.createServer((req, res) => {
	let data = '';

	// Route /
	if(req.url === "/"){

		// Route / avec la méthode GET
		if(req.method === 'GET'){
			req.on('data', chunk => { 
				data += chunk;
			})
		
			req.on('end', () => {
				res.writeHead(200, {'content-type' : 'text/html'});
				res.write('<h1>HELLO WORLD MICAEL !</h1>');
				res.end();
			})
		}

		// Route / avec les autres méthodes
		else {
			res.writeHead(405, {'content-type' : 'text/html'});
			res.write('<h1>405 Méthode non authorisée</h1');
			res.end();
		}
		
	}
	

} );

server.listen(5000);
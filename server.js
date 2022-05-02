const http = require('http');

const server = http.createServer((req, res) => {
	let data = '';

	try {
		// Route "/"
		if(req.url === "/"){

			// Route "/" avec la méthode GET
			if(req.method === 'GET'){
				res.writeHead(200, {'content-type' : 'text/html'});
				res.write('<h1>HELLO WORLD MICAEL !</h1>');
			}

			// Route "/" avec les autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'text/html'});
				res.write('<h1>405 Méthode non authorisée</h1');
			}
		}

		// Gestion des routes non définies
		else {
			res.writeHead(404, {'content-type' : 'text/html'});
			res.write('<h1>404 Page Introuvable</h1>');
		}

	}
	catch (err) {
		res.writeHead(500, {'content-type' : 'text/html'});
		res.write('<h1>500 Erreur Interne au Serveur </h1>');
	}

	res.end();

} );

server.listen(5000);
const http = require('http');
const fs = require('fs');
const path = require('path');

const memoryDb = new Map(); // est global
let id = 0; // doit être global
memoryDb.set(id++, {nom: "Alice"}) // voici comment set une nouvelle entrée.
memoryDb.set(id++, {nom: "Bob"})
memoryDb.set(id++, {nom: "Charlie"})

const server = http.createServer((req, res) => {
	let data = '';

	try {
		// Route "/"
		if(req.url === "/"){

			// Route "/" avec la méthode GET
			if(req.method === 'GET'){
				res.writeHead(200, {'content-type' : 'text/html'});
				const index = fs.readFileSync(path.join(__dirname, 'public', 'pages', 'index.html'), 'utf8');
				res.write(index);
			}

			// Route "/" avec les autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'text/html'});
				const file405 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '405.html'), 'utf8');
				res.write(file405);
			}
		}

		// Route de du dossier public
		else if(req.url.match("/public/*")){
			if(req.method === 'GET'){
				file = req.url.split('/')[2].split('.');

				contentType = '';
				if(file[1] === 'js') contentType = 'application/javascript'
				else if (file[1] === 'css') contentType = 'text/css'
				else if (file[1] === 'jpg') contentType = 'image/jpg'

				res.writeHead(200, {'content-type' : contentType});
				const image = fs.readFileSync(path.join(__dirname, 'public', file[1], file[0] + '.' + file[1]));
				res.write(image);
			}

			// Route avec autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'text/html'});
				const file405 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '405.html'), 'utf8');
				res.write(file405);
			}
		}

		// Route API
		else if(req.url.match("/api/names")){
			if(req.method === 'GET'){
				res.writeHead(200, {'content-type' : 'application/json'});
				jsonText = JSON.stringify(Array.from(memoryDb.entries()));
				res.write(jsonText);
			}

			// Route avec autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'text/html'});
				const file405 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '405.html'), 'utf8');
				res.write(file405);
			}
		}

		// Gestion des routes non définies
		else {
			res.writeHead(404, {'content-type' : 'text/html'});
			const file404 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '404.html'), 'utf8');
			res.write(file404);
		}

	}
	catch (err) {
		res.writeHead(500, {'content-type' : 'text/html'});
		const file500 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '500.html'), 'utf8');
		res.write(file500);
	}

	res.end();

} );

server.listen(5000);
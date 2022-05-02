const http = require('http');
const fs = require('fs');
const path = require('path');

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

		// Route de l'image
		else if(req.url === "/public/images/image.jpg"){
			if(req.method === 'GET'){
				res.writeHead(200, {'content-type' : 'image/jpg'});
				const image = fs.readFileSync(path.join(__dirname, 'public', 'images', 'image.jpg'));
				res.write(image);
			}

			// Route avec autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'text/html'});
				const file405 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '405.html'), 'utf8');
				res.write(file405);
			}
		}

		// Route du fichier css
		else if(req.url === "/public/css/style.css"){
			if(req.method === 'GET'){
				res.writeHead(200, {'content-type' : 'text/css'});
				const css = fs.readFileSync(path.join(__dirname, 'public', 'css', 'style.css'));
				res.write(css);
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
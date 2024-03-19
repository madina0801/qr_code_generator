const qr = require('qr-image');
const { createWriteStream, writeFile } = require('fs');
const express = require('express');
const path = require('path');

const APP = express();
const PORT = 3000;

APP.use(express.static('public'));
APP.use(express.json());

APP.listen(PORT, console.log("Listening on port " + PORT));

APP.get('/', (req, res) => {
	res.status(200).sendFile('index');
});

APP.post('/data', (req, res) => {
	const data = req.body;
	const { userUrl } = data;

	const qr_png = qr.imageSync(userUrl, { type: 'png' });
	const filePath = path.join(__dirname, 'qr_img.png');

	const writeStream = createWriteStream(filePath);
	writeStream.write(qr_png);
	writeStream.end(() => {
		res.json({ qrImagePath: 'qr_img.png' }); // Sending the file path back to the client
	});
});

APP.get('/qr_img.png', (req, res) => {
	res.sendFile(path.join(__dirname, 'qr_img.png'));
});
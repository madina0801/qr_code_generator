import qr from 'qr-image';
import { createWriteStream, writeFile } from 'fs';
import express from 'express';

const APP = express();
const PORT = 3000;

APP.use(express.static('public'));
APP.use(express.json());

APP.listen(PORT, console.log("Listening on port " + PORT));

APP.get('/', (req, res) => {
	res.status(200).render('index');
});

APP.post('/data', (req, res) => {
	const data = req.body;
	console.log(data);
	res.json({ message: "Data sent successfully" });

	const URL = data.userUrl;
	const qr_png = qr.imageSync(URL, { type: 'png' });

	writeFile("qr_img.png", qr_png, (err) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Error saving QR code image" });
		} else {
			console.log("The QR code image has been saved!");
		}
	});
});


import inquirer from 'inquirer';
import qr from 'qr-image';
import { createWriteStream, writeFile } from 'fs';

inquirer
	.prompt([
		{
			message: "Type in the URL",
			name: "url",
		}
	])
	.then((answers) => {
		const URL = answers.url;
		const qr_png = qr.image(URL, { type: 'png' });
		qr_png.pipe(createWriteStream('qr_img.png'));
		
		writeFile("url.txt", URL, (err) => {
			if (err) throw err;
			console.log("The URL has been saved!");
		})
	})
	.catch((error) => {
		console.log(error);
	});



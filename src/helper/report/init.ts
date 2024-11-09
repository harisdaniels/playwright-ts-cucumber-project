import * as fs from 'fs-extra';

try {
	fs.ensureDir("reports");
	fs.emptyDir("reports");
} catch (error) {
	console.log("File not created" + error);
}
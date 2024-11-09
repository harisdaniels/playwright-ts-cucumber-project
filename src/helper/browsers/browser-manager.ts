import { Browser, LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const options: LaunchOptions = {
	headless: true
}
export const invokeBrowser = (): Promise<Browser> => {

	const browserType: string = process.env.BROWSER;
	switch (browserType) {
		case "chrome":
			console.log("Browser chrome will launch");
			return chromium.launch(options);
		case "firefox":
			console.log("Browser firefox will launch");
			return firefox.launch(options);
		case "webkit":
			console.log("Browser webkit will launch");
			return webkit.launch(options);
		default:
			throw new Error("PLEASE, SET UP YOUR BROWSER!");
	}
};
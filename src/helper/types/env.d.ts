declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BROWSER: "chrome" | "firefox" | "webkit",
			ENV: "dev" | "staging" | "prod",
			BASEURL: string,
			HEAD: "true" | "false"
		}
	}
}

export { }
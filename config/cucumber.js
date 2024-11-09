module.exports= {
	default: {
		tags: process.env.npm_config_TAGS || process.env.npm_config_tags || "",
		formatOptions: {
			snippetInterface: "async-await"
		},
		paths: [
				"src/test/features/"
		],
		dryRun: false,
		require: [
			"src/hooks/hooks.ts",
			"src/test/step-definitions/*.ts"
		],
		requireModule: [
				"ts-node/register"
		],
		format: [
			"progress-bar",
			"html:reports/cucumber-report.html",
			"json:reports/cucumber-report.json",
			"rerun:reports/@rerun.txt" 
		]
	},

	rerun: {
		formatOptions: {
			snippetInterface: "async-await"
		},
		dryRun: false,
		require: [
			"src/hooks/hooks.ts",
			"src/test/step-definitions/*.ts"
		],
		requireModule: [
				"ts-node/register"
		],
		format: [
			"progress-bar",
			"html:reports/cucumber-report.html",
			"json:reports/cucumber-report.json",
			"rerun:reports/@rerun.txt" 
		],
		retry: 3,
		parallel: 2
	}
}

// npx playwright codegen https://bookcart.azurewebsites.net/login --save-storage=auth/admin.json
// npm run test --tags "@auth or @login"
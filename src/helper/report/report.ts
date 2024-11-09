const report:any = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports/",
  reportPath: "reports/",
	reportName: "Playwright Automation Report",
	pageTitle: "Book Cart Test Report",
	displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "129",
    },
    device: "Local test machine",
    platform: {
      name: "Mac OS",
      version: "12.2.1",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Book Cart Application" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" }
    ],
  },
});
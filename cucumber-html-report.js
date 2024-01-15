const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: 'cypress/cucumberReports',
	reportPath: 'cypress/cucumberReports/cucumber-HTMLreport.html',
	metadata:{
        browser: {
            name: 'chrome',
            version: '100'
        },
        device: 'Local Test Machine',
        platform: {
            name: 'ChromeBook',
            version: '15'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'VafaAbadi_CypressTestAutomation'},
            {label: 'Release', value: ''},
            {label: 'Cycle', value: ''},
            {label: 'Execution Start Time', value: ''},
            {label: 'Execution End Time', value: ''}
        ]
    }
});
// An example configuration file.
exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: [
        'app/spec/e2e/**/*.js'
    ],

    multiCapabilities: [
        {
            'browserName': 'chrome'
        }
    ],
    rootElement: '#app-root'
};
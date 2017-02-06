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
    rootElement: '#app-root',

   /* plugins: [{
        chromeA11YDevTools: {
            treatWarningsAsFailures: true
        },
        path: 'node_modules/protractor/plugins/accessiblity/index.js',
        failOnWarning: true,
        failOnError: true
    }],*/
    plugins: [{
        chromeA11YDevTools: {
            treatWarningsAsFailures: true,
            auditConfiguration: {
                auditRulesToRun: [
                    'pageWithoutTitle',
                    'controlsWithoutLabel',
                    'requiredAriaAttributeMissing',
                    'unfocusableElementsWithOnClick',
                    'mainRoleOnInappropriateElement',
                    'badAriaRole'
                    /*'lowContrastElements'*/
                    /*  'badAriaAttributeValue', outer hmyml error*/
                    /* 'nonExistentAriaLabelledbyElement' test causes collectIDRefs Errors*/
                  /*  'focusableElementNotVisibleAndNotAriaHidden' get outerHtml error*/
                ],
                auditRulesToSkip: []
            }
        },
        axe: true,
        package: 'protractor-accessibility-plugin'
    }],


    jasmineDefaultOpts: {
        defaultTimeoutInterval: 120000
    }





//addressData:require('./app/spec/e2e/test-data/address.json')

};
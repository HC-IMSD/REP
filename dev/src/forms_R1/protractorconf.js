// An example configuration file.
exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: [
       'app/spec/e2e/tests/dossier/*.js',
      /*  'app/spec/e2e/tests/activity/!*.js'*/
    ],

    multiCapabilities: [
        {
            'browserName': 'chrome'
        }
    ],
    rootElement: '#app-root',

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
// An example configuration file.
var q = require('q');
var q = require("q");
var FirefoxProfile = require("firefox-profile");

var makeFirefoxProfile = function(preferenceMap, specs) {
    var deferred = q.defer();
    var firefoxProfile = new FirefoxProfile();

    for (var key in preferenceMap) {
        firefoxProfile.setPreference(key, preferenceMap[key]);
    }

    firefoxProfile.encoded(function (encodedProfile) {
        var capabilities = {
            browserName: "firefox",
            firefox_profile: encodedProfile,
            specs: specs
        };

        deferred.resolve(capabilities);
    });
    return deferred.promise;
};



exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    //baseUrl: "http://localhost:2121/dev/",
    /* specs: [

     'app/spec/e2e/tests/transaction/!*.js',
     'app/spec/e2e/tests/dossier/!*.js',
     'app/spec/e2e/tests/company/!*.js',
     'app/spec/e2e/tests/activity/!*.js'

     ],*/
 /*   getMultiCapabilities: function() {
        return q.all([
            makeFirefoxProfile(
                {
                    "browser.download.folderList": 2,
                    "browser.download.dir": "C:/Users/hcuser/Downloads",
                    "browser.helperApps.neverAsk.saveToDisk": "text/xml",
                    "browser.helperApps.neverAsk.openFile": "text/xml",
                    "browser.download.panel.shown":"false"
                }
            )
        ]);
    },*/
    multiCapabilities: [
        {
            'browserName': 'chrome',
            'platform': 'ANY',
            'version': 'ANY',
            'chromeOptions': {
                // Get rid of --ignore-certificate yellow warning
                args: ['safebrowsing-disable-download-protection',
                    'safebrowsing-disable-extension-blacklist','disable-extensions',
                    'no-sandbox', 'test-type=browser','disable-infobars',
                'disable-extensions-file-access-check'],
                // Set download path and avoid prompting for download even though
                // this is already the default on Chrome but for completeness
                prefs: {
                    'safebrowsing.enabled': true,
                    'download': {
                        'prompt_for_download': false,
                        'directory_upgrade': true,
                        'default_directory': 'C:/Users/hcuser/Downloads',
                        'default_content_settings':{
                            "popups": 0
                        }


                     }
                }
            }
        },
      /*  {
         'browserName': 'internet explorer',
         'platform': 'ANY',
         version: '11'
         },*/
         {
            'browserName': 'firefox'

        }
    ],
    rootElement: '#app-root',

    plugins: [
       /* {

            chromeA11YDevTools: {
                treatWarningsAsFailures: true,
                auditConfiguration: {
                    auditRulesToRun: [
                        'pageWithoutTitle',
                        'controlsWithoutLabel' */
                        /*  'requiredAriaAttributeMissing',*/
                        /* 'unfocusableElementsWithOnClick',*/
                        /*  'mainRoleOnInappropriateElement'*/
                        /* 'badAriaRole'*/
                        /*'lowContrastElements'*/
                        /*  'badAriaAttributeValue', outer hmyml error*/
                        /* 'nonExistentAriaLabelledbyElement' test causes collectIDRefs Errors*/
                        /*  'focusableElementNotVisibleAndNotAriaHidden' get outerHtml error*/
             /*       ],
                    auditRulesToSkip: []
                }
            },
            axe: false,
            package: 'protractor-accessibility-plugin'
        },
        {
            package: 'protractor-screenshoter-plugin',
            screenshotPath: './app/spec/REPORTS/e2e',
            screenshotOnExpect: 'failure+success',
            screenshotOnSpec: 'none',
            withLogs: 'true',
            writeReportFreq: 'asap',
            imageToAscii: 'failure',
            clearFoldersBeforeTest: true
        }
        */
    ],

    suites: {
        csp: 'app/spec/e2e/tests/csp/*.js'
    },
    jasmineDefaultOpts: {
        defaultTimeoutInterval: 120000
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000
    },

    onPrepare: function() {
        return q.fcall(function() {
            browser.driver.getCapabilities().then(function(caps){
                browser.browserName = caps.get('browserName');
            }).then(function(){
                //wait for the test reporter setup
                return global.browser.getProcessedConfig().then(function(){
                });

            })
        }).delay(1000);
    }



//addressData:require('./app/spec/e2e/test-data/address.json')

};
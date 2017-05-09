/**
 * Created by dkilty on 2017-05-03.
 */


var csp_url, lang, formType;

var UiUtil = require('../../util/util-ui.js');
var cspData = require('../../../e2e/test-data/csp.json');
var contactData = require('../../../e2e/test-data/contact.json');
var addressData = require('../../../e2e/test-data/address.json');
var remote = remote = require('selenium-webdriver/remote');
var path = require('path');
var fs = require('fs');

var CspMain = require('../../component-definitions/csp/def-cmp-csp-main');
var CspCertification = require('../../component-definitions/csp/def-cmp-csp-certification');
var CspContact = require('../../component-definitions/csp/def-cmp-csp-contact');
var CspMainAppl = require('../../component-definitions/csp/def-cmp-csp-main-appl'); //unfortunate name
var CspPatent = require('../../component-definitions/csp/def-cmp-csp-patent');
var CspPayment = require('../../component-definitions/csp/def-cmp-csp-payment');
var CspTimelySub = require('../../component-definitions/csp/def-cmp-csp-timely-sub');

var testRecords = require('../../test-data/csp/testRecords');

var mainObj, certObj, contactObj, mainContentObj, patentObj, paymentObj, timelySubObj, uiUtil;
var external = 'EXT';
var internal = 'INT';
describe('Certificate of Supplementary Protection Main Test', function () {
    beforeAll(function () {
        mainObj = new CspMain();
        lang = browser.params.lang;
        formType = browser.params.formType;
        if (formType === external && lang === 'en') {
            csp_url = "csp/cspEXT-en.html"
        } else if (formType === internal && lang === 'en') {
            csp_url = "csp/cspINT-en.html"
        }
        else if (formType === internal && lang === 'fr') {
            csp_url = "csp/cspINT-fr.html"
        }
        else if (formType === external && lang === 'fr') {
            csp_url = "csp/cspEXT-fr.html"
        } else {
            //error condition
            csp_url = "csp/cspEXT-en.html";
            //csp_url = "";
        }

        mainObj.get(csp_url);
        certObj = new CspCertification();
        contactObj = new CspContact();
        mainContentObj = new CspMainAppl();
        patentObj = new CspPatent();
        paymentObj = new CspPayment();
        timelySubObj = new CspTimelySub();
        uiUtil = new UiUtil();
        uiUtil.init();
    });


    describe('Admin Steps for report', function () {
        it('csp-load-files.js TEST START: The browser is: '+browser.browserName, function () {
            //NOP
        });

    });

    describe('Load a valid file', function () {
        it('Load the file', function () {

            var root = mainObj.getRoot();
            var fileData = JSON.stringify(testRecords.test1);
            root.element(by.model("main.test")).evaluate("main.test='" + fileData + "';");
            root.element(by.model("main.test")).sendKeys(protractor.Key.TAB);
            browser.driver.sleep(200);
        });
        it('Test the file was sucessfully loaded, Check Salutation', function () {

            var root = mainObj.getRoot();
            var contact = contactObj.getApplicantContact(root)
            expect(contactObj.getSalutation(root)).toEqual("string:" + "SALUT_DR");

        });

        it('Test that the version increments correctly', function () {

            var root = mainObj.getRoot();
            mainObj.getVersionValue().then(function (value) {
                var currVersion = -1;
                console.log("The value is " + value);
                mainObj.saveDraft();
                if (formType === internal) {

                    currVersion = (parseInt(value) + 1);
                } else {
                    currVersion = Number(value) + Number(0.1);
                }
                //convert to string
                expect(mainObj.getVersionValue()).toEqual('' + currVersion);
            });

        });
        var filename='C:/Users/hcuser/Downloads/hccsp-0-2.hcsc'
        it('Test that the file was downloaded', function () {

            browser.driver.wait(function () {
                // Wait until the file has been downloaded.
                // We need to wait thus as otherwise protractor has a nasty habit of
                // trying to do any following tests while the file is still being
                // downloaded and hasn't been moved to its final location.

                return fs.existsSync(filename);
            }, 30000).then(function () {
                // Do whatever checks you need here.  This is a simple comparison;
                // for a larger file you might want to do calculate the file's MD5
                // hash and see if it matches what you expect.
                expect(fs.readFileSync(filename, {encoding: 'utf8'})).toBeDefined();
            });
        });


    });


});


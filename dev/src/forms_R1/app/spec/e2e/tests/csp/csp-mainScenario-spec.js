/**
 * Created by dkilty on 27/04/2017.
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
var ErrorSummary = require('../../component-definitions/common/def-cmp-error-summary');


var testRecords = require('../../test-data/csp/testRecords');

var mainObj, certObj, contactObj, mainContentObj, patentObj, paymentObj, timelySubObj, uiUtil, errorSummaryObj;

describe('Certificate of Supplementary Protection Main Test', function () {
    beforeAll(function () {
        mainObj = new CspMain();
        lang = browser.params.lang;
        formType = browser.params.formType;
        if (formType === 'EXT' && lang === 'en') {
            csp_url = "csp/cspEXT-en.html"
        } else if (formType === 'INT' && lang === 'en') {
            csp_url = "csp/cspINT-en.html"
        }
        else if (formType === 'INT' && lang === 'fr') {
            csp_url = "csp/cspINT-fr.html"
        }
        else if (formType === 'EXT' && lang === 'fr') {
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
        //uiUtil.init();
        errorSummaryObj = new ErrorSummary();
    });
    describe('Admin Steps for report', function () {
        it('csp-MainScenario.js TEST START: The browser is: '+browser.browserName, function () {
            //NOP
        });

    });




    describe('Check the Error Summary Object', function () {

        it('Check that the error Summary displays expected errors on empty form', function () {
            var root = mainObj.getRoot();
            mainObj.saveXml();
            uiUtil.getAttributeValue(mainObj.getMainForm(), "name").then(function (value) {
                var errorSummary = errorSummaryObj.getErrorSummaryElementByPartialId(root, value);
                expect(errorSummary.isPresent()).toBeTruthy();

                errorSummaryObj.getIndividualErrors(root).count().then(function(value){
                    console.log("number of errors "+value);
                    expect(errorSummaryObj.getErrorsObj(errorSummary).count()).toEqual(value);
                });
            });
           // expect(errorSummaryObj.getIndividualErrors(root).count()).toEqual(29);
        });
    });


    describe('Fill in CSP form information', function () {
        it('Complete Applicant Record Information', function () {
            var root = mainObj.getRoot();
            var contact = contactObj.getApplicantContact(root)

            contactObj.setApplicantNameValue(contact,contactData.contactName.typical);
            contactObj.setSalutationByText(contact, contactData.salutation.MRS[lang]);
            contactObj.setFirstName(contact, contactData.firstNames.typical);
            contactObj.setLastName(contact, contactData.lastNames.typical);
            contactObj.setInitials(contact, contactData.initials.typical);
            contactObj.setJobTitle(contact, contactData.jobTitle.typical);
            contactObj.setPhone(contact, contactData.phone.typical);
            contactObj.setPhoneExt(contact, contactData.phoneExt.typical);
            contactObj.setLanguage(contact,contactData.language.ENGLISH.en);
            contactObj.setFax(contact, contactData.fax.typical);
            contactObj.setEmail(contact, contactData.email.typical);
            contactObj.setStreetValue(contact, addressData.streetAddress.typical[lang]);
            contactObj.setCityValue(contact, addressData.city.typical);
            contactObj.setCountryListValue(contact, addressData.country.CAN[lang]);
            contactObj.setPostalCodeTextValue(contact, contactData.postal.ca_valid_input);
            contactObj.setStateListValue(contact, addressData.province.ON.en);
           // root.sendKeys(protractor.Key.TAB); //tab away from field so updates
            expect(contactObj.getApplicantNameValue(contact)).toEqual(contactData.contactName.typical);
            expect(contactObj.getSalutation(root)).toEqual(contactData.salutation.MRS.expect);
            expect(contactObj.getFirstName(contact)).toEqual(contactData.firstNames.typical);
            expect(contactObj.getLastName(contact)).toEqual(contactData.lastNames.typical);
            expect(contactObj.getInitials(contact)).toEqual(contactData.initials.typical);
            expect(contactObj.getJobTitle(contact)).toEqual(contactData.jobTitle.typical);
            expect(contactObj.getPhone(contact)).toEqual(contactData.phone.typical);
            expect(contactObj.getPhoneExt(contact)).toEqual(contactData.phoneExt.typical);

            expect(contactObj.getLanguage(contact)).toEqual(contactData.language.ENGLISH.expect);
            expect(contactObj.getFax(contact)).toEqual(contactData.fax.typical);
            expect(contactObj.getEmail(contact)).toEqual(contactData.email.typical);

            //address information checking
            expect(contactObj.getStreetValue(contact)).toEqual(addressData.streetAddress.typical[lang]);
            expect(contactObj.getCountryListValue(contact)).toEqual( addressData.country.CAN[lang]);
            expect(contactObj.getStateListValue(contact)).toEqual(addressData.province.ON.expect);
            expect(contactObj.getCityValue(contact)).toEqual(addressData.city.typical);
            expect(contactObj.getPostalCodeTextValue(contact)).toEqual(contactData.postal.ca_valid_expect);
        });


        it('Fill in Patent information', function () {
            var root = mainObj.getRoot();
            //TODO DATE hack relies on OS using YYYY-MM-DD
            var expectedGrantDate = "2007-05-15"; //format saved
            var expectedExpiryDate = "2022-12-05"; //format saved
            var expectedFilingDate = "2006-12-14"; //format saved
            patentObj.setPatentNumValue(root, cspData.patentNum.typical);


            patentObj.setGrantDateValue(root, expectedGrantDate);
            patentObj.setFilingDateValue(root,expectedFilingDate);
            patentObj.setExpiryDateValue(root, expectedExpiryDate);

            expect(patentObj.getGrantDateValue(root)).toEqual(expectedGrantDate);
            expect(patentObj.getExpiryDateValue(root)).toEqual(expectedExpiryDate);
            expect(patentObj.getFilingDateValue(root)).toEqual(expectedFilingDate);
            expect(patentObj.getPatentNumValue(root)).toEqual(cspData.patentNum.typical);

        });
        it('Fill in Questions 4-7. Only completing Applicaiton Statement',function(){
            var root = mainObj.getRoot();

            mainContentObj.setControlNumValue(root,cspData.controlNum.typical);
            mainContentObj.setDrugUseValue(root,cspData.drugUse.VET[lang]);
            mainContentObj.setMedIngredientValue(root,cspData.ingredient.typical);
            // Set as GRANT
           mainContentObj.setTimeApplicationAsGrant(root);
           mainContentObj.setStatementAsApplicantAsOwner(root);
            //test the values
            expect(mainContentObj.getControlNumValue(root)).toEqual(cspData.controlNum.typical);
            expect(mainContentObj.getDrugUseValue(root)).toEqual(cspData.drugUse.VET.save);
            expect(mainContentObj.getMedIngredientValue(root)).toEqual(cspData.ingredient.typical);
            expect(mainContentObj.getApplicationStatementValue(root)).toEqual(cspData.GRANT);
            expect(mainContentObj.getStatementsAsToApplicantValue(root)).toEqual(cspData.OWNER);
        });

        it('Fill in Question 7 Timely statements as Application Made, Other EU country',function() {
            var root = mainObj.getRoot();
            timelySubObj.setTimelyApplicationMade(root);
            //set the country to other EU

            timelySubObj.setCountryValue(root,cspData.timely_country.other.en);
            timelySubObj.setOtherCountryValue(root,cspData.other_country.typical[lang]);
            var approvalDate="2006-11-22";
            timelySubObj.setApprovalDateValue(root,approvalDate);
           expect(timelySubObj.getSubStatementValue(root)).toEqual(cspData.application_statement.APPLICATION);
            expect(timelySubObj.getCountryValue(root)).toEqual(cspData.timely_country.other.expected);
            expect(timelySubObj.getOtherCountryValue(root)).toEqual(cspData.other_country.typical[lang]);
            expect(timelySubObj.getApprovalDateValue(root)).toEqual(approvalDate);
        });

        it('Fill in the Fee Payment information, Question 8',function(){
            var root = mainObj.getRoot();
            paymentObj.setPaymentAckValue(root);
            paymentObj.setFeeNumValue(root,cspData.fee.typical);
            paymentObj.setFeeTypeValue(root,cspData.fee_type.wire[lang]);
            expect(paymentObj.getPaymentAckValue(root)).toBeTruthy();
            expect(paymentObj.getFeeNumValue(root)).toEqual(cspData.fee.typical);
            expect(paymentObj.getFeeTypeValue(root)).toEqual(cspData.fee_type.wire.expected);
        });

        it('Fill in certification information, Question 9. Typical scenario', function () {
            var root = mainObj.getRoot();
            //TODO handling dates across browsers is hard!
            var expectedCertDate = "2007-05-15"; //format saved
            certObj.setDateSignedValue(root,expectedCertDate);
            certObj.setSurnameValue(root, cspData.lastNames.typical);
            certObj.setGivenNameValue(root, cspData.firstNames.typical);
            certObj.setTitleValue(root, cspData.jobTitle.typical);
            certObj.setInitialsValue(root, cspData.initials.typical);

            expect(certObj.getSurnameValue(root)).toEqual(cspData.lastNames.typical);
            expect(certObj.getGivenNameValue(root)).toEqual(cspData.firstNames.typical);
            expect(certObj.getTitleValue(root)).toEqual(cspData.jobTitle.typical);
            expect(certObj.getDateSignedValue(root)).toEqual(expectedCertDate);
            expect(certObj.getInitialsValue(root)).toEqual(cspData.initials.typical);

        });



    });

    describe("Check the Error Summary Object Shouldn't  be visible", function () {

        it('Check that the error Summary displays expected errors on empty form', function () {
            var root = mainObj.getRoot();

            uiUtil.getAttributeValue(mainObj.getMainForm(), "name").then(function (value) {
                var errorSummary = errorSummaryObj.getErrorSummaryElementByPartialId(root, value);
                expect(errorSummary.isPresent()).toBeFalsy();
            });
            mainObj.saveXml();
            browser.sleep(15000);
            var filename='C:/Users/hcuser/Downloads/hccsp-0-1.hcsc'
            browser.driver.wait(function () {
                // Wait until the file has been downloaded.
                // We need to wait thus as otherwise protractor has a nasty habit of
                // trying to do any following tests while the file is still being
                // downloaded and hasn't been moved to its final location.

                return fs.existsSync(filename);
            }, 5000).then(function () {
                // Do whatever checks you need here.  This is a simple comparison;
                // for a larger file you might want to do calculate the file's MD5
                // hash and see if it matches what you expect.
                expect(fs.readFileSync(filename, {encoding: 'utf8'})).toBeDefined();
            });

        });

    });
});


xdescribe('pause', function () {
    it(' Pause Test', function () {
        browser.pause();

    });

});


/**
 * Created by dkilty on 27/04/2017.
 */

/**
 * Created by dkilty on 02/03/2017.
 */


/**
 * Created by dkilty on 13/02/2017.
 */

var csp_url, lang, formType;

var UiUtil = require('../../util/util-ui.js');
var cspData=require('../../../e2e/test-data/csp.json');
var contactData=require('../../../e2e/test-data/contact.json');
var addressData=require('../../../e2e/test-data/address.json');


var CspMain = require('../../component-definitions/csp/def-cmp-csp-main');
var CspCertification = require('../../component-definitions/csp/def-cmp-csp-certification');
var CspContact = require('../../component-definitions/csp/def-cmp-csp-contact');
var CspMainAppl = require('../../component-definitions/csp/def-cmp-csp-main-appl'); //unfortunate name
var CspPatent = require('../../component-definitions/csp/def-cmp-csp-patent');
var CspPayment = require('../../component-definitions/csp/def-cmp-csp-payment');
var CspTimelySub = require('../../component-definitions/csp/def-cmp-csp-timely-sub');


var mainObj, certObj, contactObj, mainContentObj, patentObj, paymentObj, timelySubObj, uiUtil;

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
            csp_url = "";
        }

        mainObj.get(csp_url);
        certObj = new CspCertification();
        contactObj = new CspContact();
        mainContentObj = new CspMainAppl();
        patentObj = new CspPatent();
        paymentObj = new CspPayment();
        timelySubObj = new CspTimelySub();
        uiUtil=new UiUtil();
    });

    describe('Fill in CSP form information', function () {

        it('Complete Applicant Record Information',function(){
            var root=mainObj.getRoot();
            contactObj.getApplicantContact(root).then(function(contact) {
                contactObj.setSalutation(contact,contactData.salutation.MRS[lang]);
                contactObj.setFirstName(contact,contactData.firstNames.typical);
                contactObj.setLastName(contact,contactData.lastNames.typical);
                contactObj.setInitials(contact,contactData.initials.typical);
                contactObj.setJobTitle(contact,contactData.jobTitle.typical);
                contactObj.setPhone(contact,contactData.phone.typical);
                contactObj.setPhoneExt(contact,contactData.phoneExt.typical);
                contactObj.setFax(contact,contactData.fax.typical);
                contactObj.setEmail(contact,contactData.email.typical);
                contactObj.setStreetValue(contact,addressData.streetAddress.typical[lang]);
                contactObj.setCountryListValue(contact,addressData.country.CAN[lang]);
                contactObj.setStateListValue(contact,addressData.province.ON);
                contactObj.setCityValue(contact,addressData.city.typical);
                contactObj.setPostalCodeTextValue(contact,"k1a3n1");

                expect(contactObj.getSalutation(contact)).toEqual(contactData.salutation.MRS.expect);
                expect(contactObj.getFirstName(contact)).toEqual(contactData.firstNames.typical);
                expect(contactObj.getLastName(contact)).toEqual(contactData.lastNames.typical);
                expect(contactObj.getInitials(contact)).toEqual(contactData.initials.typical);
                expect(contactObj.getJobTitle(contact)).toEqual(contactData.jobTitle.typical);
                expect(contactObj.getPhone(contact)).toEqual(contactData.phone.typical);
                expect(contactObj.getPhone(contact)).toEqual(contactData.phone.typical);
            })

        });



        it('Fill in Patent information', function () {
           var root=mainObj.getRoot();
            //DATE hack relies on OS using YYYY-MM-DD
            var expectedGrantDate="2007-05-15"; //format saved
            var expectedExpiryDate="2022-12-05"; //format saved
            var expectedFilingDate="2006-12-14"; //format saved
            patentObj.setPatentNumValue(root,cspData.patentNum.typical);
            patentObj.setGrantDateValue(root,"002007-5-15");
            patentObj.setFilingDateValue(root,"002006-12-14");
            patentObj.setExpiryDateValue(root,"002022-12-05");

            expect(patentObj.getGrantDateValue(root)).toEqual(expectedGrantDate);
            expect(patentObj.getExpiryDateValue(root)).toEqual(expectedExpiryDate);
            expect(patentObj.getFilingDateValue(root)).toEqual(expectedFilingDate);
            expect(patentObj.getPatentNumValue(root)).toEqual(cspData.patentNum.typical);

        });


        it('Fill in certification info', function () {
            var root=mainObj.getRoot();
            //TODO handling dates across browsers is hard!
            var expectedCertDate="2007-05-15"; //format saved

            certObj.setDateSignedValue(root,"002007","05","15");
            certObj.setSurnameValue(root,cspData.lastNames.typical);
            certObj.setGivenNameValue(root,cspData.firstNames.typical);
            certObj.setTitleValue(root,cspData.jobTitle.typical);
            certObj.setInitialsValue(root,cspData.initials.typical);

            expect(certObj.getSurnameValue(root)).toEqual(cspData.lastNames.typical);
            expect(certObj.getGivenNameValue(root)).toEqual(cspData.firstNames.typical);
            expect(certObj.getTitleValue(root)).toEqual(cspData.jobTitle.typical);
            expect(certObj.getDateSignedValue(root)).toEqual(expectedCertDate);
            expect(certObj.getInitialsValue(root)).toEqual(cspData.initials.typical);

        });

    });

});


describe('pause', function () {
    it(' Pause Test', function () {
        browser.pause();

    });

});


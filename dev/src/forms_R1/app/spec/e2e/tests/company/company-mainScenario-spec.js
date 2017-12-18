/**
 * Created by dkilty on 02/03/2017.
 */


/**
 * Created by dkilty on 13/02/2017.
 */

var company_url,lang,formType;


//var RepContact = require('../../component-definitions/def-cmp-rep-contact')
var Address = require('../../component-definitions/company/def-cmp-address-record');
var CompanyMain = require('../../component-definitions/company/def-cmp-company-main');
var Contact= require('../../component-definitions/company/def-cmp-contact-record');
var addressObj, companyMain, contactObj;

var repContactObj;

describe('Company External Main Test', function () {

    beforeAll(function () {
        console.log("run beforeAll");
        companyMain = new CompanyMain();
        lang=browser.params.lang;
        formType=browser.params.formType;
        if(formType==='EXT' && lang==='en'){
            company_url="company/companyEnrolEXT-en.html"
        } else  if(formType==='INT' && lang==='en'){
            company_url="company/companyEnrolINT-en.html"
        } else{
            //error condition
            company_url="";
        }

        companyMain.get(company_url);
        addressObj = new Address();
        contactObj=new Contact();
    });


    describe('Address tests', function () {
        it('Add an Address', function () {
            var formRoot = companyMain.getRoot();
            addressObj.addAddressRecord();
            var rec = addressObj.getRecord(formRoot, 0);
            addressObj.setCompanyNameValue(rec, "Company name 1");
            addressObj.setStreetValue(rec, "1234 Main St");
            addressObj.setCityValue(rec, "Ottawa");
            addressObj.setCountryListValue(rec,"Canada");
            addressObj.setStateListValue(rec,"Ontario");
            addressObj.setPostalCodeTextValue(rec,"k2m2r1");
           // addressObj.setMailingRole(rec);
            addressObj.setImporterRole(rec);
            addressObj.setProductsImporterListValue(rec,'Some Products');
            addressObj.setDossierId(rec,0,'A123456');
            addressObj.addDossierIdRecord(rec);
            addressObj.setDossierId(rec,1,'B123456');

            addressObj.saveAddressRecord(rec);
            /*   expect(repContactObj.getSalutationValue(record)).toEqual('string:' + contactData.salutation.MRS.expect);
             expect(repContactObj.getFirstNameValue(record)).toEqual('John');
             expect(repContactObj.getInitialsValue(record)).toEqual('I');
             expect(repContactObj.getLastNameValue(record)).toEqual(contactData.lastNames.typical);
             expect(repContactObj.getJobTitleValue(record)).toEqual('Job Title');
             expect(repContactObj.getPhoneValue(record)).toEqual('435-123-8765');
             expect(repContactObj.getLanguageValue(record)).toEqual('string:en');*/

        });
        it('Add a contact',function(){
            var formRoot = companyMain.getRoot();
            contactObj.addContactRecord();
            var rec = contactObj.getRecord(formRoot, 0);
            contactObj.setFirstName(rec,'John');
            contactObj.setLastName(rec,'Smith');
            contactObj.setJobTitle(rec,"Manager");
            contactObj.setLanguage(rec,'English');
            contactObj.setPhone(rec,'123-345-4444');
            contactObj.setEmail(rec,'foo@aol.com');
            contactObj.setMailingRole(rec);
            contactObj.saveContactRecord(rec);
        });

    });

});


xdescribe('pause', function () {
    it(' Pause Test', function () {
        browser.pause();

    });

});


/**
 * Created by dkilty on 02/03/2017.
 */



/**
 * Created by dkilty on 13/02/2017.
 */

var dev_dossier_root_ext_url = "http://localhost:2121/dev/company/companyEnrolEXT-en.html";
//var dev_dossier_root_ext_url="https://lam-dev.hres.ca/rep_test/companyEXT-en.html";

//var RepContact = require('../../component-definitions/def-cmp-rep-contact')
var Address=require('../../component-definitions/company/def-cmp-address-record');
var CompanyMain=require('../../component-definitions/company/def-cmp-company-main');

var addressObj, companyMain;

var repContactObj;

describe('Company External Main Test', function () {

    beforeAll(function () {
        console.log("run beforeAll");
        addressObj=new Address();
        companyMain=new CompanyMain();
        companyMain.get(dev_dossier_root_ext_url);
    });



    describe('Address tests', function () {
        it('Add an Address', function () {
            var formRoot=companyMain.getRoot();
            addressObj.addAddressRecord();
           var rec=addressObj.getRecord(formRoot,0);
           addressObj.setCompanyNameValue(rec,"Company name 1");
            /*   expect(repContactObj.getSalutationValue(record)).toEqual('string:' + contactData.salutation.MRS.expect);
               expect(repContactObj.getFirstNameValue(record)).toEqual('John');
               expect(repContactObj.getInitialsValue(record)).toEqual('I');
               expect(repContactObj.getLastNameValue(record)).toEqual(contactData.lastNames.typical);
               expect(repContactObj.getJobTitleValue(record)).toEqual('Job Title');
               expect(repContactObj.getPhoneValue(record)).toEqual('435-123-8765');
               expect(repContactObj.getLanguageValue(record)).toEqual('string:en');*/

        });

    });

});



describe('pause', function () {
    it('Dossier Pause Test', function () {
        browser.pause();

    });

});


/**
 * Created by dkilty on 02/03/2017.
 */



/**
 * Created by dkilty on 13/02/2017.
 */

//var dev_dossier_root_ext_url = "http://localhost:2121/dev/dossier/dossierEnrolEXT-en.html";
//var dev_dossier_root_ext_url="https://lam-dev.hres.ca/rep_test/dossierEXT-en.html";

//var RepContact = require('../../component-definitions/def-cmp-rep-contact');


var contactData = require('../../../e2e/test-data/contact.json');

var repContactObj;

describe('Dossier External Form Type Components Test', function () {

    beforeAll(function () {
        console.log("run beforeAll");
        //rootDossierObj = new DossierMain();
        //ootDossierObj.get(dev_dossier_root_ext_url);
       // repContactObj = new RepContact();

    });



    describe('Rep Contact Tests', function () {
        it('Add Rep Contact', function () {

            repContactObj.addRepContact();
            var record = repContactObj.getRecord(0);
            expect(repContactObj.getFirstNameValue(record)).toEqual('');
            expect(repContactObj.getSalutationValue(record)).toEqual('?');
            expect(repContactObj.getInitialsValue(record)).toEqual('');
            expect(repContactObj.getLastNameValue(record)).toEqual('');
            expect(repContactObj.getJobTitleValue(record)).toEqual('');
            expect(repContactObj.getPhoneValue(record)).toEqual('');
            expect(repContactObj.getPhoneExtValue(record)).toEqual('');
            expect(repContactObj.getLanguageValue(record)).toEqual('?');
            repContactObj.setSalutationByText(record, contactData.salutation.MRS.en);
            repContactObj.setFirstNameValue(record, "John");
            repContactObj.setInitialsValue(record, "I");
            repContactObj.setLastNameValue(record, "Smith");
            repContactObj.setJobTitleValue(record, "Job Title");
            repContactObj.setPhoneValue(record, "435-123-8765");
            repContactObj.setEmailValue(record, "foo@google.ca");
            repContactObj.setLanguageValue(record, "English");

            expect(repContactObj.getSalutationValue(record)).toEqual('string:' + contactData.salutation.MRS.expect);
            expect(repContactObj.getFirstNameValue(record)).toEqual('John');
            expect(repContactObj.getInitialsValue(record)).toEqual('I');
            expect(repContactObj.getLastNameValue(record)).toEqual(contactData.lastNames.typical);
            expect(repContactObj.getJobTitleValue(record)).toEqual('Job Title');
            expect(repContactObj.getPhoneValue(record)).toEqual('435-123-8765');
            expect(repContactObj.getLanguageValue(record)).toEqual('string:en');

            repContactObj.saveRepContact();

        });
        it('Open First Rep Contact Record Check Value are the same', function () {

            //get the first REP record
            // var repPrimary = element(by.repeater("record in expandTblCtrl.listItems").row(0));
            var record = repContactObj.getRecord(0);
            repContactObj.clickRow(0); //expand the first row
            expect(repContactObj.isRecordVisible(0)).toBeTruthy();
            //check that the values have not changed from before the save
            expect(repContactObj.getFirstNameValue(record)).toEqual('John');
            expect(repContactObj.getInitialsValue(record)).toEqual('I');
            expect(repContactObj.getLastNameValue(record)).toEqual('Smith');
            expect(repContactObj.getJobTitleValue(record)).toEqual('Job Title');
            expect(repContactObj.getPhoneValue(record)).toEqual('435-123-8765');
            expect(repContactObj.getLanguageValue(record)).toEqual('string:en');
            expect(repContactObj.getPhoneExtValue(record)).toEqual('');
        });
    });

});



xdescribe('pause', function () {
    it('Dossier Pause Test', function () {
        browser.pause();

    });

});


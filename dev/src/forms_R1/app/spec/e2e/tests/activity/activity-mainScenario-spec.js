/**
 * Created by dkilty on 9/3/2016.
 */

var activity_root_ext_url = "activity/activityEXT-en.html";


var RepContact = require('../../component-definitions/def-cmp-rep-contact');
var ActivityMain = require('../../component-definitions/def-cmp-activity-main');


var contactData=require('../../../e2e/test-data/contact.json');

describe('Activity External Form Type Test', function () {

    beforeAll(function(){
       console.log("run beforeAll for activity..")
    });

    it('Activity Root Information Test', function () {

        var rootActivityObj = new ActivityMain();

        //fill in the activity part
        var rootRef=rootActivityObj.getRoot();
        rootActivityObj.get(activity_root_ext_url);
        rootActivityObj.setCompanyId('123456');
        rootActivityObj.setDossierId('1D23456');
        rootActivityObj.setRegActivityValue('PSUR-PV (Periodic Safety Update Report - Pharmacovigilance)',rootRef);
        rootActivityObj.setActivityLeadValue("Drug Master File",rootRef);
        rootActivityObj.setFeeClassByText("New active substance",rootRef);
        rootActivityObj.setReasonFiling("This is the reason for filing. \n\n This is a new line.");
        rootActivityObj.setThirdPartyByText("No",rootRef);
        rootActivityObj.setAdminSubmissionByText("Yes",rootRef);

        rootActivityObj.setRelatedActCompanyName("Related Company Name");
        rootActivityObj.setRelatedActDateCleared("2007-11-21");
        rootActivityObj.setRelatedActAdminLicenseByText("No",rootRef);
        rootActivityObj.setRelatedActRegActivityValue("NC (Notifiable Change)",rootRef);
        rootActivityObj.setRelatedActControlNumber("1234556");

        rootActivityObj.setRelatedIsDinTransfer();
        rootActivityObj.setRelatedIsNotLasa();

        expect(rootActivityObj.getRegActivityModelValue()).toEqual('B02-20160301-079');
        expect(rootActivityObj.getRegActivitySavedDisplay()).toEqual('PSUR-PV (Periodic Safety Update Report - Pharmacovigilance)');
        expect(rootActivityObj.getCompanyId()).toEqual('123456');
        expect(rootActivityObj.getDossierId()).toEqual('1D23456');

        expect(rootActivityObj.getThirdPartyValue()).toEqual("string:N");
        expect(rootActivityObj.getIsAdmendSubmissionValue()).toEqual("string:Y");


    });

    it('Related Activity Information Test', function(){



    });


    var repContactObj= new RepContact();
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
    it('Activity Test', function () {
        browser.pause();

    });

});


/**
 * Created by dkilty on 9/3/2016.
 */



var devUrl = {
    activityExternalEn: "http://localhost:2121/dev/activity/activityEnrolEXT-en.html"

};
var prodUrl = {
    activityExternalEn: "http://localhost:2121/prod/activityEnrolEXT-en.html"

};

var dev_activity_root_ext_url = "http://localhost:8080/dev/activity/activityEnrolEXT-en.html";


var RepContact = require('./component-definitions/def-cmp-rep-contact');
var ActivityMain = require('./component-definitions/def-cmp-activity-main');


var contactData=require('../e2e/test-data/contact.json');
var activityTypeList=require('../../data/raType.json');

describe('Activity External Form Type Test', function () {

    beforeAll(function(){
       console.log("run beforeAll")
    });

    it('Activity Root Information Test', function () {

        var rootActivityObj = new ActivityMain();

        //fill in the activity part
        rootActivityObj.get(dev_activity_root_ext_url);
        rootActivityObj.setCompanyId('123456');
        rootActivityObj.setDossierId('1D23456');
        rootActivityObj.setRegActivityValue('PSUR-PV (Periodic Safety Update Report - Pharmacovigilance)');
        rootActivityObj.setActivityLeadValue("Drug Master File");
        rootActivityObj.setFeeClassByText("New active substance");
        rootActivityObj.setReasonFiling("This is the reason for filing. \n\n This is a new line.");
        rootActivityObj.setThirdPartyByText("No");
        rootActivityObj.setAdminSubmissionByText("Yes");

        rootActivityObj.setRelatedActCompanyName("Related Company Name");
        rootActivityObj.setRelatedActDateCleared("2007-11-21");
        rootActivityObj.setRelatedActAdminLicenseByText("No");
        rootActivityObj.setRelatedActRegActivityValue("NC (Notifiable Change)");
        rootActivityObj.setRelatedActControlNumber("1234556");

        rootActivityObj.setRelatedIsDinTransfer(protractor.Key.ENTER);
        rootActivityObj.setRelatedIsNotLasa(protractor.Key.ENTER);

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
    it('Add Rep Contact', function () {
        repContactObj.addRepContact();
        expect(repContactObj.getSalutationValue()).toEqual('?');
        expect(repContactObj.getFirstNameValue()).toEqual('');
        expect(repContactObj.getInitialsValue()).toEqual('');
        expect(repContactObj.getLastNameValue()).toEqual('');
        expect(repContactObj.getJobTitleValue()).toEqual('');
        expect(repContactObj.getPhoneValue()).toEqual('');
        expect(repContactObj.getPhoneExtValue()).toEqual('');
        expect(repContactObj.getLanguageValue()).toEqual('?');

        repContactObj.setSalutationByText(contactData.salutation.MRS.en);
        repContactObj.setFirstNameValue("John");
        repContactObj.setInitialsValue("I");
        repContactObj.setLastNameValue("Smith");
        repContactObj.setJobTitleValue("Job Title");
        repContactObj.setPhoneValue("435-123-8765");
        repContactObj.setEmailValue("foo@google.ca");
        repContactObj.setLanguageValue("English");

        expect(repContactObj.getSalutationValue()).toEqual('string:'+contactData.salutation.MRS.expect);
        expect(repContactObj.getFirstNameValue()).toEqual('John');
        expect(repContactObj.getInitialsValue()).toEqual('I');
        expect(repContactObj.getLastNameValue()).toEqual(contactData.lastNames.typical);
        expect(repContactObj.getJobTitleValue()).toEqual('Job Title');
        expect(repContactObj.getPhoneValue()).toEqual('435-123-8765');
        expect(repContactObj.getLanguageValue()).toEqual('string:en');

        repContactObj.saveRepContact();

    },3000);
    it('Open First Rep Contact Record Check Value are the same', function () {

        //get the first REP record
        var repPrimary=element(by.repeater("record in expandTblCtrl.listItems").row(0));
        repPrimary.sendKeys(protractor.Key.ENTER);
        //check that the values have not changed from before the save
        expect(repContactObj.getFirstNameValue()).toEqual('John');
        expect(repContactObj.getInitialsValue()).toEqual('I');
        expect(repContactObj.getLastNameValue()).toEqual('Smith');
        expect(repContactObj.getJobTitleValue()).toEqual('Job Title');
        expect(repContactObj.getPhoneValue()).toEqual('435-123-8765');
        expect(repContactObj.getLanguageValue()).toEqual('string:en');
        expect(repContactObj.getPhoneExtValue()).toEqual('');
    });



});


describe('pause', function () {
    it('Activity Test', function () {
         browser.pause();

    });

});


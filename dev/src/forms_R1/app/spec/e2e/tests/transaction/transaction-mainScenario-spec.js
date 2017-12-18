/**
 * Created by dkilty on 08/03/2017.
 */


var transactionData = require('../../../e2e/test-data/transaction.json');
var lang = "";
var formType="";
var transaction_url="";

var Address = require('../../component-definitions/common/def-cmp-address-details');
var TransactionMain = require('../../component-definitions/transaction/def-cmp-transaction-main');
var Contact= require('../../component-definitions/common/def-cmp-contact-details');
var LifecycleRecord=require('../../component-definitions/transaction/def-cmp-lifecycle-record');
var addressObj, transactionMain, contactObj, lifecycleRecord;

var contactData=require('../../../e2e/test-data/contact.json');

describe('Transaction External Main Test', function () {

    beforeAll(function () {
        console.log("run beforeAll for Transaction.....");
        transactionMain = new TransactionMain();
        addressObj = new Address();
        contactObj=new Contact();
        lifecycleRecord=new LifecycleRecord();
        lang=browser.params.lang;
        formType=browser.params.formType;
        if(formType==='EXT' && lang==='en'){
            transaction_url="transaction/transactionEnrol-en.html"
        } else{
            //error condition
            transaction_url="";
        }
        transactionMain.get(transaction_url);

    });


    describe('Transaction test- fill in the form', function () {


        it('Set Address information', function () {
            var formRoot = transactionMain.getRoot();

            addressObj.setCityTextValue(formRoot, transactionData.city.typical[lang]);
            addressObj.setCountryListValue(formRoot, transactionData.country.canada[lang]);
            addressObj.setStateListValue(formRoot, transactionData.state.typical[lang]);
            addressObj.setPostalCodeTextValue(formRoot, transactionData.postal.canada_lower.input);
            addressObj.setStreetValue(formRoot, transactionData.street.typical[lang]);
            expect(addressObj.getPostalCodeTextValue(formRoot)).toEqual(transactionData.postal.canada_lower.expect);
            expect(addressObj.getStreetValue(formRoot)).toEqual(transactionData.street.typical[lang]);
            expect(addressObj.getCountryListValue(formRoot)).toEqual(transactionData.country.canada[lang]);

        });
        it('Set contact information',function(){
            var formRoot = transactionMain.getRoot();
            contactObj.setSalutationByText(formRoot,'Dr.')
            contactObj.setFirstNameValue(formRoot,'John');
            contactObj.setLastNameValue(formRoot,'Smith');
            contactObj.setJobTitleValue(formRoot,"Manager");
            contactObj.setLanguageValue(formRoot,'English');
            contactObj.setPhoneValue(formRoot,'123-345-4444');
            contactObj.setEmailValue(formRoot,'foo@aol.com');
           /* expect(contactObj.getSalutationValue(record)).toEqual('SALUT_DR');
            expect(contactObj.getFirstNameValue(record)).toEqual('John');
            expect(contactObj.getLastNameValue(record)).toEqual('Smith');
            expect(contactObj.getJobTitleValue(record)).toEqual('Manager');*/
        });

        it("Fill in the main Transaction Information",function(){
            var formRoot = transactionMain.getRoot();
            transactionMain.setCompanyNameValue(formRoot,"Acme Chemical Company")
            transactionMain.setCompanyIdValue(formRoot,"123456");
            transactionMain.setDossierIdValue(formRoot,"D123456");
            transactionMain.setDossierNameValue(formRoot,"This is the dossier value text");
            transactionMain.setIsEctdSelectValue(formRoot,"Yes");
            transactionMain.setIsSolicitedSelectValue(formRoot,"No");
            transactionMain.setProjectManager1Value(formRoot,"This is the project manager 1");
            transactionMain.setActivityValidValue(formRoot);

        });

        it('Add a lifecycle record and fill it in',function(){
            var formRoot = transactionMain.getRoot();
            lifecycleRecord.addTransactionRecord(formRoot);
            var record=lifecycleRecord.getRecord(formRoot,0);
            lifecycleRecord.setControlNumberValue(record,'123456');
            lifecycleRecord.setActivityTypeSelectValue(record, 'YBPR (Yearly Biologic Product Report)');
            lifecycleRecord.setDescriptionSelectValue(record,'Cancellation Letter');
            lifecycleRecord.setDateFiledValue(record,'2007-05-22');
            lifecycleRecord.saveTransactionRecord(record);

        });


    });

    describe('Validate the form values that were completed', function () {
        it('Check if lifecycle record 1 is valid',function(){
            var formRoot = transactionMain.getRoot();
           var record=lifecycleRecord.getRecord(formRoot,0);
            expect(lifecycleRecord.getControlNumberValue(record)).toEqual('123456');
            expect(lifecycleRecord.getActivityTypeSelectValue(record)).toEqual('B02-20160301-089');
            expect(lifecycleRecord.getDescriptionSelectValue(record)).toEqual('string:CANCEL_LETTER');
            expect(lifecycleRecord.getDateFiledValue(record)).toEqual('2007-05-22');
        });

    });





});


xdescribe('pause', function () {
    it(' Pause Test', function () {
        browser.pause();

    });

});


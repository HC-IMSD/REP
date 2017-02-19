/**
 * Created by dkilty on 13/02/2017.
 */

var dev_dossier_root_ext_url = "http://localhost:2121/dev/dossier/dossierEnrolEXT-en.html";

var DossierMain = require('../../component-definitions/dossier/def-cmp-dossier-main');
var RepContact = require('../../component-definitions/def-cmp-rep-contact');
var ReferenceProduct = require('../../component-definitions/dossier/def-cmp-reference-product');
var TheraProducts = require('../../component-definitions/dossier/def-cmp-thera-class');
var Formulations = require('../../component-definitions/dossier/def-cmp-formulation');
var DrugProduct = require('../../component-definitions/dossier/def-cmp-drug-product');
var contactData = require('../../../e2e/test-data/contact.json');

var repContactObj;
var rootDossierObj;
var referenceProduct;
var theraProduct;
var drugProduct;
var formulations;
describe('Dossier External Form Type Components Test', function () {

    beforeAll(function () {
        console.log("run beforeAll");
        rootDossierObj = new DossierMain();
        rootDossierObj.get(dev_dossier_root_ext_url);
        repContactObj = new RepContact();
        referenceProduct = new ReferenceProduct();
        theraProduct = new TheraProducts();
        drugProduct=new DrugProduct();
        formulations=new Formulations();
    });

    describe("Add a formulation",function(){
        it("Create a formulation and  fill in formulation fields",function(){
            formulations.addFormulationRecord();
        });
        it("Select dosage form",function(){
            formulations.setDosageFormSelect(0,"BEAD");
        });


    });


    describe('Add 2 therapeutic products', function () {

        it('Add Thera Products', function () {
            theraProduct.addTherapeuticClassification();
            theraProduct.setTheraTextValue("Thera Product 1", 0);
            theraProduct.addTherapeuticClassification();
            theraProduct.setTheraTextValue("Thera Product 2", 1);

        });

        it('Second thera product value, Collapse 2nd row and test', function () {
            expect(theraProduct.getTheraTextValue(1)).toEqual("Thera Product 2");
            theraProduct.clickRow(1);
            expect(theraProduct.isRecordVisible(1)).toBeFalsy();
        });
    });

    describe('Dossier Reference Product Tests', function () {

        it('Yes there are reference products', function () {
            rootDossierObj.setIsRefProductByText('Yes');
            //TODO check states
        });

        it(' Add a reference product', function () {
            referenceProduct.addReferenceProduct();
            referenceProduct.setActiveNameLookup("eth", "(ETHYLENEDINITRILO)TETRAACETIC ACID");
            referenceProduct.setBrandNameValue("brand name 1");
            referenceProduct.setStrengthValue(2.444);
            referenceProduct.setPerValue('Per value');
            referenceProduct.setUnitsTextValue("AMP");
            referenceProduct.setCompanyNameValue('Company Name 1');
            referenceProduct.setDosageFormTextValue("CAPSULE");
            referenceProduct.saveReferenceProduct();
            //TODO check the values that were set
            referenceProduct.clickRow(0);
            expect(referenceProduct.isRecordVisible(0)).toBeTruthy();
        });


    });

    describe('Rep Contact Tests', function () {
        it('Add Rep Contact', function () {

            repContactObj.addRepContact();
            var record=repContactObj.getRecord(0);
            expect(repContactObj.getFirstNameValue(record)).toEqual('');
            expect(repContactObj.getSalutationValue(record)).toEqual('?');
            expect(repContactObj.getInitialsValue(record)).toEqual('');
            expect(repContactObj.getLastNameValue(record)).toEqual('');
            expect(repContactObj.getJobTitleValue(record)).toEqual('');
            expect(repContactObj.getPhoneValue(record)).toEqual('');
            expect(repContactObj.getPhoneExtValue(record)).toEqual('');
            expect(repContactObj.getLanguageValue(record)).toEqual('?');
            repContactObj.setSalutationByText(record,contactData.salutation.MRS.en);
            repContactObj.setFirstNameValue(record,"John");
            repContactObj.setInitialsValue(record,"I");
            repContactObj.setLastNameValue(record,"Smith");
            repContactObj.setJobTitleValue(record,"Job Title");
            repContactObj.setPhoneValue(record,"435-123-8765");
            repContactObj.setEmailValue(record,"foo@google.ca");
            repContactObj.setLanguageValue(record,"English");

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
            var record=repContactObj.getRecord(0);
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
describe('pause', function () {
    it('Dossier Pause Test', function () {
        //browser.pause();

    });

});


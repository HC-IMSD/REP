/**
 * Created by dkilty on 13/02/2017.
 */

var dev_dossier_root_ext_url = "http://localhost:2121/dev/dossier/dossierEnrolEXT-en.html";
//var dev_dossier_root_ext_url="https://lam-dev.hres.ca/rep_test/dossierEXT-en.html";
var DossierMain = require('../../component-definitions/dossier/def-cmp-dossier-main');
var RepContact = require('../../component-definitions/def-cmp-rep-contact');
var ReferenceProduct = require('../../component-definitions/dossier/def-cmp-reference-product');
var TheraProducts = require('../../component-definitions/dossier/def-cmp-thera-class');
var Formulations = require('../../component-definitions/dossier/def-cmp-formulation');
var DrugProduct = require('../../component-definitions/dossier/def-cmp-drug-product');
var MedIngredient = require('../../component-definitions/dossier/def-cmp-medicinal-ingredient');
var NonMedIngredient = require('../../component-definitions/dossier/def-cmp-nonmedicinal-ingredient');
var MaterialIngredient = require('../../component-definitions/dossier/def-cmp-material');
var ContainerType = require('../../component-definitions/dossier/def-cmp-container');
var ROARecord = require('../../component-definitions/dossier/def-cmp-route-admin');
var CountryRecord = require('../../component-definitions/dossier/def-cmp-country-list');
var DossierTabs = require('../../component-definitions/dossier/def-cmp-tabs');
var SrcIngedient = require('../../component-definitions/dossier/def-cmp-srced-ingred');
var TissuesFluids = require('../../component-definitions/dossier/def-cmp-tissues-fluids-list');
var AnimalSrced = require('../../component-definitions/dossier/def-cmp-animal-sourced');


var contactData = require('../../../e2e/test-data/contact.json');

var repContactObj;
var rootDossierObj;
var referenceProduct;
var theraProduct;
var drugProduct;
var tabsCmp;
var formulations, medIngredient, nonMedIngredient, materialIngredient, containerType, roaRecord, manufactCountry;
var sourcedIngred, tissuesFluids, animalSrc;

describe('Dossier External Form Type Components Test', function () {

    beforeAll(function () {
        console.log("run beforeAll");
        rootDossierObj = new DossierMain();
        rootDossierObj.get(dev_dossier_root_ext_url);
        repContactObj = new RepContact();
        referenceProduct = new ReferenceProduct();
        theraProduct = new TheraProducts();
        drugProduct = new DrugProduct();
        formulations = new Formulations();
        medIngredient = new MedIngredient();
        nonMedIngredient = new NonMedIngredient();
        materialIngredient = new MaterialIngredient();
        containerType = new ContainerType();
        roaRecord = new ROARecord();
        manufactCountry = new CountryRecord();
        tabsCmp = new DossierTabs();
        sourcedIngred = new SrcIngedient();
        tissuesFluids = new TissuesFluids();
        animalSrc = new AnimalSrced();
    });


    xdescribe("Add a formulation", function () {
        var formulationRecord = "";
        it("Create a formulation and  fill in formulation fields", function () {
            formulations.addFormulationRecord();
            formulationRecord = formulations.getRecord(0);
        });
        it("Select dosage form", function () {
            formulationRecord = formulations.getRecord(0);
            formulations.setDosageFormSelect(formulationRecord, "BEAD");
        });
        it("Add an active ingredient", function () {
            var formulationRecord = formulations.getRecord(0);
            medIngredient.addMedIngredent(formulationRecord);
            var newIngredient = medIngredient.getNewRecord(formulationRecord);
            medIngredient.setCasValue(newIngredient, "111-11-1");
            medIngredient.setActiveNameLookup(newIngredient, "aa", "BANISTERIA CAAPI");
            medIngredient.setStrengthValue(newIngredient, 2.2345)
            medIngredient.setUnitsTextValue(newIngredient, "UNIT");
            medIngredient.setNanoTextValue(newIngredient, "NANOPARTICLE");
            medIngredient.setBaseTextValue(newIngredient, "Yes");
            medIngredient.setAnimalSrcTextValue(newIngredient, 'No');
            medIngredient.saveMedicinalIngredient(newIngredient);
        });

        it("Add a second active ingredient", function () {
            var formulationRecord = formulations.getRecord(0);
            medIngredient.addMedIngredent(formulationRecord);
            var newIngredient = medIngredient.getNewRecord(formulationRecord);
            medIngredient.setCasValue(newIngredient, "111-11-1");
            medIngredient.setActiveNameLookup(newIngredient, "aa", "BANISTERIA CAAPI");
            medIngredient.setStrengthValue(newIngredient, 2.2345)
            medIngredient.setUnitsTextValue(newIngredient, "UNIT");
            medIngredient.setNanoTextValue(newIngredient, "NANOPARTICLE");
            medIngredient.setBaseTextValue(newIngredient, "Yes");
            medIngredient.setAnimalSrcTextValue(newIngredient, 'No');
            medIngredient.saveMedicinalIngredient(newIngredient);
        });

        it("Add a non medicinal ingredient", function () {
            var formulationRecord = formulations.getRecord(0);
            nonMedIngredient.addnonMedIngredent(formulationRecord);
            var newIngredient = nonMedIngredient.getNewRecord(formulationRecord);
            nonMedIngredient.setCasValue(newIngredient, "111-11-1");
            nonMedIngredient.setIngredientNameValue(newIngredient, "test 1");
            nonMedIngredient.setStrengthValue(newIngredient, 2.2345)
            nonMedIngredient.setUnitsTextValue(newIngredient, "UNIT");
            nonMedIngredient.setNanoTextValue(newIngredient, "NANOPARTICLE");
            nonMedIngredient.setBaseTextValue(newIngredient, "Yes");
            nonMedIngredient.setAnimalSrcTextValue(newIngredient, 'No');
            nonMedIngredient.saveNonMedicinalIngredient(newIngredient);
        });
        it("Add a Material ingredient", function () {
            var formulationRecord = formulations.getRecord(0);
            materialIngredient.addMaterialIngredient(formulationRecord);
            var newIngredient = materialIngredient.getNewRecord(formulationRecord);
            materialIngredient.setCasValue(newIngredient, "111-11-1");
            materialIngredient.setIngredientNameValue(newIngredient, "test 1");
            materialIngredient.setPresentInFinalTextValue(newIngredient, 'No');
            materialIngredient.saveMaterialIngredient(newIngredient);
        });

        it("Add a Container Type", function () {
            var formulationRecord = formulations.getRecord(0);
            containerType.addContainerType(formulationRecord);
            var newIngredient = containerType.getNewRecord(formulationRecord);
            containerType.setContainerTypeValue(newIngredient, "Container Type 1");
            containerType.setPackageTypeValue(newIngredient, "Package Type 1");
            containerType.setShelfLifeYearValue(newIngredient, 3);
            containerType.setShelfLifeMonthValue(newIngredient, 12);
            containerType.setTempMinValue(newIngredient, -4.4);
            containerType.setTempMaxValue(newIngredient, 20);
            containerType.saveContainerTypeRecord(newIngredient);
        });


        it("Add two ROA records", function () {
            var formulationRecord = formulations.getRecord(0);
            roaRecord.addROARecord(formulationRecord);
            roaRecord.setRoaListValue(formulationRecord, 0, "TRANSDERMAL");
            roaRecord.addROARecord(formulationRecord);
            roaRecord.setRoaListValue(formulationRecord, 1, "INTRADISCAL");

        });

        it("Add two Country Records", function () {
            var formulationRecord = formulations.getRecord(0);

            manufactCountry.addCountryRecord(formulationRecord);
            manufactCountry.setCountryListValue(formulationRecord, 0, "Kuwait");
            manufactCountry.addCountryRecord(formulationRecord);
            manufactCountry.setCountryListValue(formulationRecord, 1, "Canada");
        });

    });


    xdescribe('Add 2 therapeutic products', function () {

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
            var rootRefInstance = referenceProduct.getRootRefProduct();
            var newRefRecord = referenceProduct.getNewRecord(rootRefInstance);
            referenceProduct.setActiveNameLookup(newRefRecord, "(ETH", "(ETHYLENEDINITRILO)TETRAACETIC ACID");
            referenceProduct.setBrandNameValue(newRefRecord, "brand name 1");
            referenceProduct.setStrengthValue(newRefRecord, 2.444);
            referenceProduct.setPerValue(newRefRecord, 'Per value');
            referenceProduct.setUnitsTextValue(newRefRecord, "AMP");
            referenceProduct.setCompanyNameValue(newRefRecord, 'Company Name 1');
            referenceProduct.setDosageFormTextValue(newRefRecord, "CAPSULE");
           // referenceProduct.setActiveNameText(newRefRecord, "active name");
            referenceProduct.saveReferenceProduct(newRefRecord);
            //TODO check the values that were set
            referenceProduct.clickRow(rootRefInstance,0);
            expect(referenceProduct.isRecordVisible(rootRefInstance,0)).toBeTruthy();
        });


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
xdescribe("Animal or Human Sourced Tab", function () {

    it('Select the Animal tab', function () {
        tabsCmp.selectSourcedTab();
    });
    it("Add an Animal Sourced Ingredient", function () {
        var lang = "en";
        sourcedIngred.addSrcIngred();
        var srcedRecord = sourcedIngred.getRecord(null, 0);
        sourcedIngred.setAnimalCheckValue(srcedRecord);
        tissuesFluids.addTissuesFluids(srcedRecord);
        var tissuesFluidsRecord = tissuesFluids.getRecord(srcedRecord, 0);
        tissuesFluids.setSystemSelectValue(tissuesFluidsRecord, tissuesFluids.systemTypes.IMMUNE, lang);
        tissuesFluids.setSystemDetails(tissuesFluidsRecord, tissuesFluids.tissueTypes.LYMPH_NODES);
        tissuesFluids.setSystemDetails(tissuesFluidsRecord, tissuesFluids.tissueTypes.OTHER_DETAILS);
        tissuesFluids.setSystemDetails(tissuesFluidsRecord, tissuesFluids.tissueTypes.SPLEEN);
        tissuesFluids.setSystemDetails(tissuesFluidsRecord, tissuesFluids.tissueTypes.THYMUS);
        tissuesFluids.setSystemDetails(tissuesFluidsRecord, tissuesFluids.tissueTypes.TONSILS);
        tissuesFluids.setOtherDetailsValue(tissuesFluidsRecord, "This the other details");
        animalSrc.addAnimalSrcRecord(srcedRecord);
        var srcRec = animalSrc.getRecord(0);
        animalSrc.setAnimalTypeListValue(srcRec, "Canine type");
        animalSrc.setAnimalDescriptionValue(srcRec, "This is canine type description");
        animalSrc.setIsControlledPopulation(srcRec, "No");
        animalSrc.setIsCellLine(srcRec, "Yes");
        animalSrc.setIsBiotechDerived(srcRec, "Yes");
        animalSrc.setAgeAnimals(srcRec, 14);


        expect(animalSrc.getAnimalTypeListValue(srcRec)).toEqual("string:CANINE_TYPE");
        expect(animalSrc.getAnimalDescriptionValue(srcRec)).toBe("This is canine type description");
        expect(animalSrc.getIsBiotechDerived(srcRec)).toBe("string:Y");

        expect(animalSrc.getAgeAnimals(srcRec)).toBe("14");
        expect(animalSrc.getIsControlledPopulation(srcRec)).toBe("string:N");

    });

});


xdescribe('pause', function () {
    it('Dossier Pause Test', function () {
        browser.pause();

    });

});


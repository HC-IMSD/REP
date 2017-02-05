/**
 * Created by dkilty on 2/2/2017.
 */
var selectDropdownbyNum = function (element, optionNum) {
    if (optionNum) {
        var options = element.findElements(by.tagName('option'))
            .then(function (options) {
                options[optionNum].click();
            });
    }
};

//used for select boxes. Select the value by display text, complete
function selectOption(selector, item) {
    var selectList, desiredOption;

    selectList = this.findElement(selector);
    selectList.click();
    selectList.findElements(protractor.By.tagName('option'))
        .then(function findMatchingOption(options) {
            options.some(function (option) {

                option.getText().then(function doesOptionMatch(text) {
                    if (item === text) {
                        desiredOption = option;
                        return true;
                    }
                });
            });
        })
        .then(function clickOption() {
            if (desiredOption) {
                desiredOption.click();
            }
        });
}
//pick a text option for the UI select box, not using search
function pickUISelectOption(selector, item) {
    var selectList, desiredOption;

    selectList = this.findElement(selector);
    selectList.click();

    selectList.findElements(protractor.By.xpath('//li/div/span')) //needs review better way?
        .then(function findMatchingOption(options) {
            options.some(function (option) {
                option.getText().then(function doesOptionMatch(text) {
                    if (item === text) {
                        desiredOption = option;
                        return true;
                    }
                });
            });
        })
        .then(function clickOption() {
            if (desiredOption) {
                desiredOption.click();
            }
        });
}


function getUISelectModelValue(modelElement, modelString){
    var deferred= protractor.promise.defer();
    modelElement.evaluate(modelString).then(function (modelVal) {
        var  value="";
        if(modelVal){
            value=modelVal.id; //assumes id and object
        }
        return   deferred.fulfill(value);
    });
    return deferred.promise;
};



var dev_activity_root_ext_url = "http://localhost:8080/dev/activity/activityEnrolEXT-en.html";


var MainActivity = function () {
    var companyIdElement = element(by.model("main.activityRoot.companyId"));
    var dossierIdElement = element(by.model("main.activityRoot.dossierId"));
    var _activityLeadModel="main.activityRoot.regActivityLead";
    var _activityLeadSelect=element(by.model(_activityLeadModel));
   //regulatory Activity Type
    var _regActivityModelString="main.activityRoot.regActivityType";
    var _regActivityModelElement=element(By.model(_regActivityModelString));
    var  _regActivityUiSelected=_regActivityModelElement.element(By.css("span[aria-hidden=false]"));
    var _feeClassSelect=element(by.model("main.activityRoot.feeClass"));
    var _reasonFiling=element(by.model("main.activityRoot.reasonFiling"));
    var _thirdPartySelect=element(by.model("main.activityRoot.isThirdParty"));
    var _adminSubSelect=element(by.model("main.activityRoot.isAdminSub"));
    var _relatedAct_companyNameElement=element(by.model("adminCtrl.model.sponsorName"));
    var  _relatedAct_dateClearedElement=element(by.model("adminCtrl.model.dateCleared"));
    var _relatedAct_regActivityModelString="";
    var _relatedAct_regActivityModelElement="";
    var _relatedAct_regActivityUiSelected="";
    var _relatedAct_controlNumberElement=element(by.model("adminCtrl.model.controlNumber"));
    var _relatedAct_adminLicenseSubmissionSelect=element(by.model("adminCtrl.model.licenseAgree"));
    var _relatedAct_dinTransferCheck=element(by.model("adminCtrl.model.dinTransfer"));
    var _relatedAct_notLasaCheck=element(by.model("adminCtrl.model.notLasa"));
    /**
     * Sets up the browser and launches the form
     * @param value
     */
    this.get = function (value) {
        browser.get(value);
        browser.selectOption = selectOption.bind(browser);
        browser.getUISelectOption=pickUISelectOption.bind(browser);
        browser.getUISelectModelValue=getUISelectModelValue.bind(browser);
    };
    //model value of UI select
    this.getRegActivityModelValue=function(){
        return browser.getUISelectModelValue(_regActivityModelElement,_regActivityModelString);
    };

    this.setCompanyId = function (value) {
        companyIdElement.sendKeys(value);
    };
    this.setDossierId = function (value) {
        dossierIdElement.sendKeys(value);
    };
    this.setActivityLeadValue=function(value){
        //assumes selectOPtion prebound
         browser.selectOption(by.model(_activityLeadModel), value);
    };
    this.setRegActivityValue=function(value){
        //assumes selectOPtion prebound
        browser.getUISelectOption(by.model(_regActivityModelString), value);
    };





    //=====================GETTERS==================================================
    this.getCompanyId = function () {
        return companyIdElement.getAttribute('value')
    };
    this.getDossierId = function () {
        return dossierIdElement.getAttribute('value')
    };

    this.getActivityLeadValue = function () {
        return _activityLeadSelect.getAttribute('value');
    };

    this.getRegActivitySavedDisplay = function () {
        var deferred= protractor.promise.defer();
        _regActivityUiSelected.getText().then(function getText (text) {
            deferred.fulfill(text);

        });
        return deferred.promise;
    };


};
module.exports = MainActivity;
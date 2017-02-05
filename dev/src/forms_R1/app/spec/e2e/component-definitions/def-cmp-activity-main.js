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
    var _feeClassModelString="main.activityRoot.feeClass";
    var _feeClassSelect=element(by.model("main.activityRoot.feeClass"));
    var _reasonFiling=element(by.model("main.activityRoot.reasonFiling"));
    var _thirdPartyModelString="main.activityRoot.isThirdParty";
    var _thirdPartySelect=element(by.model(_thirdPartyModelString));
    var _adminSubModelString="main.activityRoot.isAdminSub";
    var _adminSubSelect=element(by.model(_adminSubModelString));
    var _relatedAct_companyNameElement=element(by.model("adminCtrl.model.sponsorName"));
    var  _relatedAct_dateClearedElement=element(by.model("adminCtrl.model.dateCleared"));
    var _relatedAct_regActivityModelString="adminCtrl.model.regActivityType";
    var _relatedAct_regActivityModelElement=element(By.model(_relatedAct_regActivityModelString));
    var _relatedAct_regActivityUiSelected=_relatedAct_regActivityModelElement.element(By.css("span[aria-hidden=false]"));
    var _relatedAct_controlNumberElement=element(by.model("adminCtrl.model.controlNumber"));
    var _relatedAct_adminLicenseSubmissionModelString="adminCtrl.model.licenseAgree";
    var _relatedAct_adminLicenseSubmissionSelect=element(by.model(_relatedAct_adminLicenseSubmissionModelString));
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
    this.setFeeClassByText = function (value) {
        browser.selectOption(by.model(_feeClassModelString), value);
    };
    this.setReasonFiling = function (value) {
        _reasonFiling.sendKeys(value);
    };
    this.setThirdPartyByText = function (value) {
        browser.selectOption(by.model(_thirdPartyModelString), value);
    };
    this.setAdminSubmissionByText = function (value) {
        browser.selectOption(by.model(_adminSubModelString), value);
    };
    this.setRelatedActCompanyName = function (value) {
        _relatedAct_companyNameElement.sendKeys(value);
    };
    //TODO use the date popup
    this.setRelatedActDateCleared = function (value) {
        _relatedAct_dateClearedElement.sendKeys(value);
    };
    this.setRelatedActRegActivityValue=function(value){
        //assumes selectOPtion prebound
        browser.getUISelectOption(by.model( _relatedAct_regActivityModelString), value);
    };
    this.setRelatedActControlNumber = function (value) {
        _relatedAct_controlNumberElement.sendKeys(value);
    };
    this.setRelatedActAdminLicenseByText = function (value) {
        browser.selectOption(by.model(_relatedAct_adminLicenseSubmissionModelString), value);
    };
    this.setRelatedIsDinTransfer= function (value) {
        _relatedAct_dinTransferCheck.sendKeys(value);
    };

    this.setRelatedIsNotLasa= function (value) {
        _relatedAct_dinTransferCheck.sendKeys(value);
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
    this.getFeeClassValue=function(){
        return _feeClassSelect.getAttribute('value');
    };

    this.getReasonFilingValue=function(){
        return _reasonFiling.getAttribute('value');
    };

    this.getThirdPartyValue=function(){
        return _thirdPartySelect.getAttribute('value');
    };

    this.getIsAdmendSubmissionValue=function(){
        return _adminSubSelect.getAttribute('value');
    };
    this.getRelatedAct_CompanyName=function(){
        return _relatedAct_companyNameElement.getAttribute('value');
    };

    this.getRelatedAct_DateCleared=function(){
        return _relatedAct_dateClearedElement.getAttribute('value');
    };
    this.getRelatedAct_DateCleared=function(){
        return _relatedAct_dateClearedElement.getAttribute('value');
    };



    //============= related reg activity
    this.getRelatedAct_RegActivitySavedDisplay = function () {
        var deferred= protractor.promise.defer();
        _relatedAct_regActivityUiSelected.getText().then(function getText (text) {
            deferred.fulfill(text);

        });
        return deferred.promise;
    };
    this.getRelatedAct_RegActivityModelValue=function(){
        return browser.getUISelectModelValue(_relatedAct_regActivityModelElement,_relatedAct_regActivityModelString);
    };

    this.getRelatedAct_ControlNumber=function(){
        return _relatedAct_controlNumberElement.getAttribute('value');
    };

    this.getRelatedAct_isAdminLicenseSubmission=function(){
        return _relatedAct_adminLicenseSubmissionSelect.getAttribute('value');
    };

    this.getRelatedAct_isDinTransfer=function(){
        return _relatedAct_dinTransferCheck.getAttribute('value');
    };

    this.getRelatedAct_isDinTransfer=function(){
        return _relatedAct_notLasaCheck.getAttribute('value');
    };


};
module.exports = MainActivity;
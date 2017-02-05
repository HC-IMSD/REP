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

function getUISelectOption(selector, item) {
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


var dev_activity_root_ext_url = "http://localhost:8080/dev/activity/activityEnrolEXT-en.html";


var MainActivity = function () {
    var companyIdElement = element(by.model("main.activityRoot.companyId"));
    var dossierIdElement = element(by.model("main.activityRoot.dossierId"));
    var _activityLeadModel="main.activityRoot.regActivityLead";
    var _activityLeadSelect=element(by.model(_activityLeadModel));
    var _regActivityModelString="main.activityRoot.regActivityType";

    var _regActivityModelElement=element(By.model(_regActivityModelString));

    var  _regActivityUiSelect=_regActivityModelElement.element(By.css("span[aria-hidden=false]"));

    this.get = function (value) {
        browser.get(value);
        browser.selectOption = selectOption.bind(browser);
        browser.getUISelectOption=getUISelectOption.bind(browser);
    };
    //model value of UI select
    this.getRegActivityModelValue=function(){
        var deferred= protractor.promise.defer();
            _regActivityModelElement.evaluate(_regActivityModelString).then(function (modelVal) {
                var  value="";
                if(modelVal){
                    value=modelVal.id;
                }
                return   deferred.fulfill(value);
            });
        return deferred.promise;
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
        _regActivityUiSelect.getText().then(function getText (text) {
            deferred.fulfill(text);

        });
        return deferred.promise;
    };


};
module.exports = MainActivity;
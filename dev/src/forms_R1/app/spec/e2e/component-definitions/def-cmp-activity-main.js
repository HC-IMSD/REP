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


var dev_activity_root_ext_url = "http://localhost:8080/dev/activity/activityEnrolEXT-en.html";


var MainActivity = function () {
    var companyIdElement = element(by.model("main.activityRoot.companyId"));
    var dossierIdElement = element(by.model("main.activityRoot.dossierId"));

    this.get = function (value) {
        browser.get(value);
        browser.selectOption = selectOption.bind(browser);
    };

    this.setCompanyId = function (value) {
        companyIdElement.sendKeys(value);
    };
    this.getCompanyId = function () {
        return companyIdElement.getAttribute('value')
    };
    this.setDossierId = function (value) {
        dossierIdElement.sendKeys(value);
    };
    this.getDossierId = function () {
        return dossierIdElement.getAttribute('value')
    };

};
module.exports = MainActivity;
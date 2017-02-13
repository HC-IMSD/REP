/**
 * Created by dkilty on 13/02/2017.
 */


var UiUtil = function () {

    this.init=function(){
        //browswer is  a global
        browser.selectOption = this.selectOption.bind(browser);
        browser.getUISelectOption=this.pickUISelectOption.bind(browser);
        browser.getUISelectModelValue=this.getUISelectModelValue.bind(browser);
    }



    this.selectDropdownbyNum = function (element, optionNum) {
        if (optionNum) {
            var options = element.findElements(by.tagName('option'))
                .then(function (options) {
                    options[optionNum].click();
                });
        }
    };

    /**
     * Used for selecting a value from a HTML5 droplist control
     * @param selector
     * @param item
     */
    this.selectOption=function(selector, item) {
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
    this.pickUISelectOption=function(selector, item) {
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


    this.getUISelectModelValue=function(modelElement, modelString){
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



};

//make available externally
module.exports = UiUtil;
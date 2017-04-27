/**
 * Created by dkilty on 27/04/2017.
 */

var UiUtil = require("../../util/util-ui.js");


var CspMain=function(){

    var uiUtil=new UiUtil();



    /**
     * Sets up the browser and launches the form in maximized
     * Imports and binds all required functions. Since this is the top level
     * Element, should handle any dependency function calls
     * @param value
     */
    this.get = function (value) {
        browser.get(value);
        //cannot bind until you have and instance of the browser set
        browser.selectOption=uiUtil.selectOption.bind(browser);
        browser.getUISelectOption=uiUtil.pickUISelectOption.bind(browser);
        browser.UISelectSearch=uiUtil.UISelectSearch.bind(browser);
        browser.getUISelectModelValue=uiUtil.getUISelectModelValue.bind(browser);
        browser.selectTypeAheadPopupValue=uiUtil.selectTypeAheadPopupValue.bind(browser);
        browser.driver.manage().window().maximize();
    };

    this.getRoot = function () {
        //this is in the root template before compilation
        return element(by.id('app-root'));

    };


};

module.exports = CspMain;
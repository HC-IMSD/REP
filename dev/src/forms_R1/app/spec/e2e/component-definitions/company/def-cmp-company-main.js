/**
 * Created by dkilty on 03/03/2017.
 */


var UiUtil = require('../../util/util-ui.js');


var CompanyMain = function () {


    var uiUtil=new UiUtil();

    /**
     *
     * @constructor
     */
    this.CompanyMain=function(){

    };
    /**
     * Sets up the browser and launches the form
     * @param value
     */
    this.get = function (value) {
        browser.get(value);
        //cannot bind until you have and instance of the browser set
        browser.selectOption=uiUtil.selectOption.bind(browser);
        browser.getUISelectOption=uiUtil.pickUISelectOption.bind(browser);
        browser.getUISelectModelValue=uiUtil.getUISelectModelValue.bind(browser);
        browser.UISelectSearch=uiUtil.UISelectSearch.bind(browser);
        browser.driver.manage().window().maximize();
    };

    this.getRoot=function(){
        return element(by.id('app-root'));

    }

};
module.exports = CompanyMain;
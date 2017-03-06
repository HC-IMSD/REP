/**
 * Created by dkilty on 03/03/2017.
 */



/*


*/


var AddressDetails = function () {

    var street_modelString="adr.addressModel.street";
    var country_modelString="adr.addressModel.country";
    var stateText_modelString="adr.addressModel.stateText";
    var stateList_modelString="adr.addressModel.stateList";
    var postalCode_modelString="adr.addressModel.postalCode";
    var city_modelString="adr.addressModel.city";

    /**
     * Rep contact contructor. Binds the required functions for this object
     * @constructor
     */
    this.AddressDetails = function () {
        // browser.selectOption=uiUtil.selectOption.bind(browser);

    };

    this.setStreetValue = function (parent,value) {
        parent.element(by.model(street_modelString)).sendKeys(value);
    };
    this.getStreetValue = function (parent) {
        return parent.element(by.model(street_modelString)).getAttribute('value');
    };

    this.setStateTextValue = function (parent,value) {
        parent.element(by.model(stateText_modelString)).sendKeys(value);
    };
    this.getStateTextValue = function (parent) {
        return parent.element(by.model(stateText_modelString)).getAttribute('value');
    };

    this.setPostalCodeTextValue = function (parent,value) {
        parent.element(by.model(postalCode_modelString)).sendKeys(value);
    };
    this.getPostalCodeTextValue = function (parent) {
        return parent.element(by.model(postalCode_modelString)).getAttribute('value');
    };


    this.setCountryListValue=function(parent,value){
        var selectList=parent.element(by.model(country_modelString));
        browser.UISelectSearch(selectList,value);
    };

    this.getCountryListValue=function(parent){
        return parent.element(by.model(country_modelString)).getAttribute('value');
    };


    this.setStateListValue=function(parent,value){
        browser.selectOption(By.model(stateList_modelString),value,parent);
    };

    this.getStateListValue=function(parent){
        return parent.element(by.model(stateList_modelString)).getAttribute('value');
    };


    this.setCityTextValue = function (parent,value) {
        parent.element(by.model(city_modelString)).sendKeys(value);
    };

    this.getCityTextValue = function (parent) {
        return parent.element(by.model(city_modelString)).getAttribute('value');
    };


};
module.exports = AddressDetails;



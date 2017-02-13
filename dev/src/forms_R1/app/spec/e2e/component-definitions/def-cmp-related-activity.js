/**
 * Created by dkilty on 13/02/2017.
 */


var RelatedActivity=function(){

    var UiUtil = require('../util/util-ui.js');

    var uiUtil=new UiUtil();

    var _addRelatedActivityButton=element(by.id("addRelatedActivityBtn"));
    var _brandNameText=element(by.model("$ctrl.productModel.brandName"));
    var _ingredName="" //typeahead need to figure out
        //$ctrl.productModel.ingLabel - this is the model of the input
        //popup is a ul with class custom-popup-wrapper uib-typeahead-popup
        //li is uib-typeahead-match ng-scope active child of 'a' that has the titile attribute of the text, text or strong text

    this.addRelatedActivity=function(){
        _addRelatedActivityButton.sendKeys(protractor.Key.ENTER);
    };

 /*   var _applStatus = element(by.model("infoCtrl.record.applicationType"));
    var _versionNumber=element(by.model("infoCtrl.infoModel.enrolmentVersion"));
    var _dateSaved=element(by.model("infoCtrl.infoModel.dateSaved"));
    var _dossierId=element(by.model("infoCtrl.record[infoCtrl.tagName]"));
    var _amendButton = element(by.id("amendSub"));*/


    /*this.getApplStatus = function () {
        return _applStatus.getAttribute('value');
    };

    this.getVersionNumber = function () {
        return _versionNumber.getAttribute('value');
    };
    this.getDateSaved = function () {
        return _dateSaved.getAttribute('value');
    };
    this.getDossierId = function () {
        return _dossierId.getAttribute('value');
    };

    this.clickAmend=function(){
        _amendButton.sendKeys(protractor.Key.ENTER);
    };*/

};

module.exports = RelatedActivity;

/**
 * Created by hcuser on 13/02/2017.
 */

/**
 * Creates an application info test object for the corresponding component
 * @constructor
 */
var ApplInfo=function(){

    var UiUtil = require('../util/util-ui.js');

    var uiUtil=new UiUtil();
    var _applStatus = element(by.model("infoCtrl.record.applicationType"));
    var _versionNumber=element(by.model("infoCtrl.infoModel.enrolmentVersion"));
    var _dateSaved=element(by.model("infoCtrl.infoModel.dateSaved"));
    var _dossierId=element(by.model("infoCtrl.record[infoCtrl.tagName]"));
    var _amendButton = element(by.id("amendSub"));


    this.getApplStatus = function () {
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
    };

};

module.exports = ApplInfo;
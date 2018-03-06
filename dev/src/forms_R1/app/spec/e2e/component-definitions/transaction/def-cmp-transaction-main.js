/**
 * Created by dkilty on 3/7/2017.
 */


var UiUtil = require('../../util/util-ui.js');


var TransactionMain = function () {


    var uiUtil = new UiUtil();
    var _companyId_modelString = "transInfoCtrl.transactionModel.ectd.companyId";
    var _dossierId_modelString = "transInfoCtrl.transactionModel.ectd.dossierId";
    var _dossierName_modelString = "transInfoCtrl.transactionModel.ectd.dossierName";
    var _isEctd_modelString = "transInfoCtrl.transactionModel.isEctd";
    var _isSolicited_modelString = "transInfoCtrl.transactionModel.isSolicited";
    var _solicitedRequester_modelString = "transInfoCtrl.transactionModel.solicitedRequester";
    var _projectManager1_modelString = "transInfoCtrl.transactionModel.projectManager1";
    var _projectManager2_modelString = "transInfoCtrl.transactionModel.projectManager2";
    var _activityValid_modelString = "transInfoCtrl.transactionModel.confirmContactValid";
    var _companyName_modelString = "transInfoCtrl.transactionModel.companyName";


    /**
     *
     * @constructor
     */
    this.TransactionMain = function () {

    };
    /**
     * Sets up the browser and launches the form
     * @param value
     */
    this.get = function (value) {
        browser.get(value);
        //cannot bind until you have and instance of the browser set
        browser.selectOption = uiUtil.selectOption.bind(browser);
        browser.getUISelectOption = uiUtil.pickUISelectOption.bind(browser);
        browser.getUISelectModelValue = uiUtil.getUISelectModelValue.bind(browser);
        browser.UISelectSearch = uiUtil.UISelectSearch.bind(browser);
        browser.driver.manage().window().maximize();
    };

    this.getRoot = function () {
        return element(by.id('app-root'));

    };

    this.setCompanyNameValue = function (parent, value) {
        parent.element(by.model(_companyName_modelString)).sendKeys(value);

    };
    this.getCompanyNameValue = function (parent) {
        return parent.element(by.model(_companyName_modelString)).getAttribute('value');

    };

    this.setCompanyIdValue = function (parent, value) {
        parent.element(by.model(_companyId_modelString)).sendKeys(value);

    };
    this.getCompanyIdValue = function (parent) {
        return parent.element(by.model(_companyId_modelString)).getAttribute('value');

    };

    this.setDossierIdValue = function (parent, value) {
        parent.element(by.model(_dossierId_modelString)).sendKeys(value);

    };
    this.getDossierIdValue = function (parent) {
        return parent.element(by.model(_dossierId_modelString)).getAttribute('value');

    };

    this.setDossierNameValue = function (parent, value) {
        parent.element(by.model(_dossierName_modelString)).sendKeys(value);

    };
    this.getDossierNameValue = function (parent) {
        return parent.element(by.model(_dossierName_modelString)).getAttribute('value');

    };

    this.setIsEctdSelectValue = function (parent, value) {
        browser.selectOption(by.model(_isEctd_modelString),value,parent);

    };
    this.getIsEctdValue = function (parent) {
        return parent.element(by.model(_isEctd_modelString)).getAttribute('value');

    };

    this.setIsSolicitedSelectValue = function (parent, value) {
        browser.selectOption(by.model(_isSolicited_modelString),value,parent);

    };
    this.getIsSolicitedValue = function (parent) {
        return parent.element(by.model(_isSolicited_modelString)).getAttribute('value');

    };

    this.setProjectManager1Value = function (parent, value) {
        parent.element(by.model(_projectManager1_modelString)).sendKeys(value);

    };
    this.getProjectManager1Value = function (parent) {
        return parent.element(by.model(_projectManager1_modelString)).getAttribute('value');

    };
    this.setProjectManager2Value = function (parent, value) {
        parent.element(by.model(_projectManager2_modelString)).sendKeys(value);

    };
    this.getProjectManager2Value = function (parent) {
        return parent.element(by.model(_projectManager2_modelString)).getAttribute('value');

    };

    this.setSolicitedRqSelectValue = function (parent, value) {
        var selectList=parent.element(by.model(_solicitedRequester_modelString));
        browser.UISelectSearch(selectList,value,parent);

    };
    this.getSolicitedRqValue = function (parent) {

        return parent.element(by.model(_solicitedRequester_modelString)).getAttribute('value');

    };


    this.setActivityValidValue = function (parent) {
        parent.element(by.model(_activityValid_modelString)).click();

    };
    this.getActivityValidValue = function (parent) {
        return parent.element(by.model(_activityValid_modelString)).getAttribute('value');

    };



};

module.exports = TransactionMain;
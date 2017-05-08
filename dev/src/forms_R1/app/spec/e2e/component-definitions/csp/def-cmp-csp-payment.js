/**
 * Created by dkilty on 27/04/2017.
 */


var CspPayment = function () {

    var _payAck_modelString="cspFeePayCtrl.model.ackPaymentSubmit";
    var _fee_modelString="cspFeePayCtrl.model.advancedPaymentFee";
    var _payType_modelString="cspFeePayCtrl.model.advancedPaymentType";

    /**
     *
     * @constructor
     */
    this.CspPayment = function () {

    };

    this.setPaymentAckValue = function (parent) {
        parent.element(by.model(_payAck_modelString)).click();
    };
    this.getPaymentAckValue = function (parent) {
        return parent.element(by.model(_payAck_modelString)).getAttribute('value');
    };

    this.setFeeNumValue = function (parent, value) {
        parent.element(by.model(_fee_modelString)).sendKeys(value);
    };

    this.getFeeNumValue = function (parent) {
        return parent.element(by.model(_fee_modelString)).getAttribute('value');
    };

    this.setFeeTypeValue = function (parent, value) {
        browser.selectOption(by.model(_payType_modelString), value,parent);
    };

    this.getFeeTypeValue = function (parent) {
        return parent.element(by.model(_payType_modelString)).getAttribute('value');
    };

};

module.exports = CspPayment;
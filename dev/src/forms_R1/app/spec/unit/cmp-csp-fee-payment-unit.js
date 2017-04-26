/**
 * Created by dkilty on 26/04/2017.
 */
describe("cmp-csp-fee-payment: Unit Test", function () {


    beforeEach(module('cspPatent'));
    var $componentController;

    beforeEach(inject(function(_$componentController_) {
        $componentController = _$componentController_;
    }));

    it('Controller Default lang should be english', function() {
        var bindings={};
        var ctrl = $componentController('cmpCspFeePayment', null, bindings);
        expect(ctrl.lang).toBeDefined();
        expect(ctrl.lang).toBe('en');

    });


    it('Controller initializes the id Names after calling $onInit', function() {
        var bindings={};
        var ctrl = $componentController('cmpCspFeePayment', null, bindings);
        ctrl.$onInit();
        expect(ctrl.feeId).toEqual(jasmine.any(String));
        expect(ctrl.feeTypeId).toEqual(jasmine.any(String));
        expect(ctrl.ackFeeSubmitId).toEqual(jasmine.any(String));

    });
    it("Call the updateErrorSummary '&' binding", function() {
        var onUpdateSpy = jasmine.createSpy('updateErrorSummary');
        var bindings = {record: {}, updateErrorSummary: onUpdateSpy};
        var ctrl = $componentController('cmpCspFeePayment', null, bindings);
        ctrl.updateErrorSummary();
        expect(onUpdateSpy).toHaveBeenCalled();
    });
    it("Call the showErrors '&' binding", function() {
        var errorsSpy = jasmine.createSpy('showErrors');
        var bindings = { showErrors: errorsSpy};
        var ctrl = $componentController('cmpCspFeePayment', null, bindings);
        ctrl.showErrors();
        expect(errorsSpy).toHaveBeenCalled();
    });
});

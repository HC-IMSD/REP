/**
 * Created by dkilty on 27/04/2017.
 */

describe("cmp-csp-certification: Unit Test", function () {


    beforeEach(module('cspCertification'));
    var $componentController;

    beforeEach(inject(function(_$componentController_) {
        $componentController = _$componentController_;
    }));


    it('Controller initializes the id Names after calling $onInit', function() {
        var bindings={};
        var ctrl = $componentController('cmpCspCertification', null, bindings);
        ctrl.$onInit();
        expect(ctrl.firstNameId).toEqual(jasmine.any(String));
        expect(ctrl.lastNameId).toEqual(jasmine.any(String));
        expect(ctrl.salutationId).toEqual(jasmine.any(String));
        expect(ctrl.dateSignedId).toEqual(jasmine.any(String));

    });
    it("Call the updateErrorSummary '&' binding", function() {
        var onUpdateSpy = jasmine.createSpy('updateErrorSummary');
        var bindings = {record: {}, updateErrorSummary: onUpdateSpy};
        var ctrl = $componentController('cmpCspCertification', null, bindings);
        ctrl.updateErrorSummary();
        expect(onUpdateSpy).toHaveBeenCalled();
    });
    it("Call the showErrors '&' binding", function() {
        var errorsSpy = jasmine.createSpy('showErrors');
        var bindings = { showErrors: errorsSpy};
        var ctrl = $componentController('cmpCspCertification', null, bindings);
        ctrl.showErrors();
        expect(errorsSpy).toHaveBeenCalled();
    });
});

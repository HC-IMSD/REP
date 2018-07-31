
/**
 * Created by dkilty on 27/04/2017.
 */

describe("cmp-csp-applicant: Unit Test", function () {


    beforeEach(module('cspApplicant'));
    var $componentController;
    var recordBind;
    var onUpdateErrorSpy;
    beforeEach(inject(function(_$componentController_) {
        $componentController = _$componentController_;
    }));

    beforeEach(function(){
        recordBind={};
        recordBind.record={};
        recordBind.record.currentValue={};
        recordBind.record.currentValue.isBillingDifferent=true;
        recordBind.record.currentValue.role={};
        recordBind.record.currentValue.role.applicant=false;
        onUpdateErrorSpy = jasmine.createSpy('updateErrorSummary');
    });

    it('Controller initializes the id Names after calling $onInit', function() {
        var bindings={};
        var ctrl = $componentController('cmpCspApplicant', null, bindings);
        ctrl.$onInit();
        expect(ctrl.applicantId).toEqual(jasmine.any(String));

    });

    it('Create blank record, Set isBillingDifferent to true, call set billing', function() {

        var addSpy = jasmine.createSpy('addApplicant');
        var bindings={addApplicant: addSpy,updateErrorSummary: onUpdateErrorSpy};
        var ctrl = $componentController('cmpCspApplicant', null, bindings);
        ctrl.$onChanges(recordBind);
        expect(ctrl.model.isBillingDifferent).toEqual(true);
        ctrl.setBilling();
        expect(addSpy).toHaveBeenCalled();
    });
    it('Check the applicant name label is updated', function() {

        recordBind.record.currentValue.role.applicant=false;
        var bindings={};
        var ctrl = $componentController('cmpCspApplicant', null, bindings);
        ctrl.$onChanges(recordBind);
        ctrl.$onInit();
        //expect(ctrl.applicantTextAlias).toEqual("COMPANY_NOABBREV");
        expect(ctrl.applicantTextAlias).toEqual("ORGANIZATION_NOABBREV");
        expect(ctrl.type).toEqual("_bill");
        recordBind.record.currentValue.role.applicant=true;
        bindings={record:recordBind};
        ctrl = $componentController('cmpCspApplicant', null, bindings);
        ctrl.$onInit();
        expect(ctrl.applicantTextAlias).toEqual("APPLICANTNAME");
        expect(ctrl.type).toEqual("_appl");
    });

    it("Call the updateErrorSummary '&' binding", function() {

        var bindings = {record: {}, updateErrorSummary: onUpdateErrorSpy};
        var ctrl = $componentController('cmpCspApplicant', null, bindings);
        ctrl.updateErrorSummary();
        expect(onUpdateErrorSpy).toHaveBeenCalled();
    });
    it("Call the showErrors '&' binding", function() {
        var errorsSpy = jasmine.createSpy('showErrors');
        var bindings = { showErrors: errorsSpy};
        var ctrl = $componentController('cmpCspApplicant', null, bindings);
        ctrl.showErrors();
        expect(errorsSpy).toHaveBeenCalled();
    });
});

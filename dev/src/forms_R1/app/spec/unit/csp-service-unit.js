/**
 * Created by dkilty on 27/04/2017.
 */


describe("csp-service: Unit Test", function () {

    var cspService;
    var cspServiceObj;


    beforeEach(function () {
        module('cspService');
    });

    beforeEach(inject(function (_CspService_) {
            cspService = _CspService_;
        cspServiceObj = new cspService();
        }
    ));

    afterEach(function () {
        cspService = null;
        cspServiceObj = null;
    });


    it('Verify that the csp model is empty', function () {
        var emptyModel=cspServiceObj.getEmptyInternalModel();
        expect(cspServiceObj.getModelInfo()).toEqual(emptyModel);
    });

    it('Verify the root Tag is CERTIFICATE_SUPPLEMENTARY_PROTECTION', function () {
        expect(cspServiceObj.getRootTag()).toEqual("CERTIFICATE_SUPPLEMENTARY_PROTECTION");
    });

    it('Verify that the default internal model writes to external model- spot check', function () {
        var emptyModel=cspServiceObj.getEmptyInternalModel();
        var rootTag=cspServiceObj.getRootTag();

        var transformModel=cspServiceObj.transformToFileObj(emptyModel);
        var rootTransform=transformModel[rootTag];
        var numberApplicantRecords = transformModel[rootTag].applicant.length;

        /** check HC section **/
        expect(rootTransform.health_canada_only.company_id).toBe('');
        expect(rootTransform.health_canada_only.application_id).toBe('');
        expect(rootTransform.health_canada_only.date_received).toBe('');
        expect(rootTransform.health_canada_only.hc_notes).toBe('');

        expect(transformModel[rootTag].template_type).toEqual('PHARMA');
        expect(numberApplicantRecords).toEqual(1);

        /**

         defaultCSPData.application_info = {};
         defaultCSPData.application_info.patent_info = {};
         var patent = defaultCSPData.application_info.patent_info;
         patent.patent_number = "";
         patent.filing_date = "";
         patent.granted_date = "";
         patent.expiry_date = "";
         var info = defaultCSPData.application_info;
         info.control_number = "";
         info.drug_use = "";
         info.time_application = "";
         info.medicinal_ingredient = "";
         info.applicant_statement = "";
         defaultCSPData.timely_submission_info = {};
         var timely = defaultCSPData.timely_submission_info;
         timely.timely_submission_statement = "";
         timely.marketing_approval_date = "";
         timely.marketing_country = "";
         timely.marketing_country_eu = "";
         defaultCSPData.advanced_payment = {};
         var payment = defaultCSPData.advanced_payment;
         payment.advanced_payment_type = null;
         payment.advanced_payment_fee = "";
         payment.advanced_payment_ack=NO;

         defaultCSPData.certification = {};
         var cert = defaultCSPData.certification;
         cert.given_name = "";
         cert.initials = "";
         cert.surname = "";
         cert.job_title = "";
         cert.date_signed = "";
         return (defaultCSPData);

         */


    });



});

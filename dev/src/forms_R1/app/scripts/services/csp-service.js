/**
 * Created by dkilty on 04/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspService', []);
})();

(function () {
    'use strict';
    angular
        .module('cspService')
        .factory('CspService', CspService);

    CspService.$inject = ['$filter'];
    function CspService($filter) {

        function CspService() {
            //constructorlogic
            var defaultCSPData = {
                dataChecksum: "",
                enrolmentVersion: "0.0",
                dateSaved: "",
                softwareVersion: "1.0.0"
            }; //TODO appl Info
            defaultCSPData.applicant=this.createApplicantRecord(); //don't think I can do this
            defaultCSPData.healthCanadaOnly={};
            defaultCSPData.healthCanadaOnly.companyId="";
            defaultCSPData.healthCanadaOnly.dateReceived="";
            defaultCSPData.healthCanadaOnly.hcNotes="";
            defaultCSPData.applicationInfo={};

            defaultCSPData.patent={};
            defaultCSPData.patent.patentNumber="";
            defaultCSPData.patent.filingDate="";
            defaultCSPData.patent.grantedDate="";
            defaultCSPData.patent.expiryDate="";
            defaultCSPData.applicationInfo.controlNumber="";
            defaultCSPData.applicationInfo.drugUse="";
            defaultCSPData.applicationInfo.timeApplication="";
            defaultCSPData.applicationInfo.medicinalIngredient="";
            defaultCSPData.applicationInfo.applicantStatement="";
            defaultCSPData.timelySubmission={};
            defaultCSPData.timelySubmission.submissionStatement="";
            defaultCSPData.timelySubmission.approvalDate="";
            defaultCSPData.timelySubmission.country="";
            defaultCSPData.timelySubmission.otherCountry="";
            defaultCSPData.certification={};
            defaultCSPData.certification.givenName="";
            defaultCSPData.certification.surName="";
            defaultCSPData.certification.jobTitle="";
            defaultCSPData.certification.dateSigned="";
            this.rootTag = "CERTIFICATE_SUPPLEMENTARY_PROTECTION";
            this.billingType="BILLING";
            this.applicantType="APPLICANT";
            angular.extend(this._default, defaultCSPData);
        }

        CspService.prototype._default = {};
        CspService.prototype.getRootTag = function () {
            return (this.rootTag);
        };
        CspService.prototype.getModelInfo = function () {
            return this._default;
        };
        CspService.prototype.transformToFileObj = function () {
            return null;
        };
        CspService.prototype.transformFromFileObj = function () {
            return null;
        };
        CspService.prototype.createApplicantRecord = function () {
            var record=this.createContactRecord();
            record.applicantName="appl";
            record.type= this.applicantType;
            return record
        };
        CspService.prototype.createBillingRecord = function () {
            var record=this.createContactRecord();
            record.applicantName="ddd";
            record.type= this.billingType;
            return record;
        };
        CspService.prototype.createContactRecord = function () {
            var applicant = {};
            applicant.contact = {
                salutation: "",
                givenName: "",
                surname: "",
                initials: "",
                title: "",
                phone: "",
                phoneExt: "",
                fax: ""
            };
            applicant.address = {
                street: "",
                city: "",
                stateList: "",
                stateText: "",
                country: "",
                postalCode: ""

            };
            return applicant
        };



        return CspService;
    }




})();

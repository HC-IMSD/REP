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
            defaultCSPData.applicant = [this.createApplicantRecord(true)];
            //defaultCSPData.billingDifferent=false; //use the the length of the array to determine
            defaultCSPData.healthCanadaOnly = {};
            defaultCSPData.healthCanadaOnly.companyId = "";
            defaultCSPData.healthCanadaOnly.dateReceived = "";
            defaultCSPData.healthCanadaOnly.applicationId = "";
            defaultCSPData.healthCanadaOnly.hcNotes = "";
            defaultCSPData.patent = {};
            defaultCSPData.patent.patentNumber = "";
            defaultCSPData.patent.filingDate = "";
            defaultCSPData.patent.grantedDate = "";
            defaultCSPData.patent.expiryDate = "";
            defaultCSPData.applicationInfo = {};
            defaultCSPData.applicationInfo.controlNumber = "";
            defaultCSPData.applicationInfo.drugUse = "";
            defaultCSPData.applicationInfo.timeApplication = "";
            defaultCSPData.applicationInfo.medicinalIngredient = "";
            defaultCSPData.applicationInfo.applicantStatement = "";
            defaultCSPData.timelySubmission = {};
            defaultCSPData.timelySubmission.submissionStatement = "";
            defaultCSPData.timelySubmission.approvalDate = "";
            defaultCSPData.timelySubmission.country = "";
            defaultCSPData.timelySubmission.otherCountry = "";
            defaultCSPData.payment = {};
            defaultCSPData.payment.advancedPaymentFee = null;
            defaultCSPData.payment.advancedPaymentType = "";
            defaultCSPData.certification = {};
            defaultCSPData.certification.givenName = "";
            defaultCSPData.certification.surName = "";
            defaultCSPData.certification.jobTitle = "";
            defaultCSPData.certification.dateSigned = "";
            this.rootTag = "CERTIFICATE_SUPPLEMENTARY_PROTECTION";
            this.billingType = "BILLING";
            this.applicantType = "APPLICANT";
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
        /* CspService.prototype.createApplicantRecord = function () {
         var record=this.createContactRecord();
         record.applicantName="";
         return record
         };*/

        CspService.prototype.createApplicantRecord = function (isApplicant) {
            var record = this.createContactRecord();
            record.applicantName = "";
            if (!isApplicant) {
                record.role.applicant = false;
                record.role.billing = true;
            } else {
                record.role.applicant = true;
                record.role.billing = true;
            }
            return record;
        };
        CspService.prototype.createContactRecord = function () {
            var applicant = {};
            applicant.role = {
                applicant: true,
                billing: true
            };
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
        /**
         * Adds an applicant to the model. Determines if it should be a billing applicant
         * and updates the roles as appropiate
         */
        CspService.prototype.addApplicantToModel = function () {
            if (!this._default.applicant) {
                this._default.applicant = [];
            }
            var numberRecords = this._default.applicant.length;
            if (numberRecords === 0) {
                //this should never happen.....
                this._default.applicant.push(this.createApplicantRecord(true));
            } else if (numberRecords == 1) {
                this._default.applicant[0].role.applicant = true;
                this._default.applicant[0].role.billing = false;
                this._default.applicant.push(this.createApplicantRecord(false));
            } else {
                console.warn("Tried to add an applicant when there were 2 records")
            }
            // defaultCSPData.applicant=[this.createApplicantRecord()];
        };
        /**
         * Deletes the billing address only. Checks each record for billing role to be true
         */
        CspService.prototype.deleteApplicant = function () {
            if (!this._default.applicant) {
                this._default.applicant = [];
            }
            var numberRecords = this._default.applicant.length;
            if (numberRecords === 0 || numberRecords === 1) {
                //console.warn("Tried to delete applicant when there was only 1 or zero")
                //this case can happen as a record could be doing this blind
                return;
            } else {

                for (var i = 0; i < numberRecords; i++) {
                    var record = this._default.applicant[i];
                    if (record.role.billing === true) {
                        this._default.applicant.splice(i, 1);
                    }
                }
                //update the remaining record to have both the billing and applicant roles
                this._default.applicant[0].role.applicant = true;
                this._default.applicant[0].role.billing = true;
            }
        };
        CspService.prototype.getMarketingCountries = function () {
            return ([
                'USA',
                'CHE',
                'AUS',
                'EU',
                'JPN',
                'EU_OTHER'
            ]);
        };
        CspService.prototype.getAdvancedPaymentTypes = function () {
            return ([
                'FINANCIAL',
                'CHEQUE',
                'CREDIT_CARD',
                'CREDIT',
                'WIRE'
            ]);
        };
        CspService.prototype.getDrugUses = function () {
            return ([
                "HUMAN",
                "VETERINARY"
            ]);
        };

        return CspService;
    }

})();

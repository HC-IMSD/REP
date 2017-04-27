/**
 * Created by dkilty on 27/04/2017.
 */

/**
 * Created by dkilty on 02/03/2017.
 */


/**
 * Created by dkilty on 13/02/2017.
 */

var csp_url,lang,formType;


//var RepContact = require('../../component-definitions/def-cmp-rep-contact')
var CspMain = require('../../component-definitions/csp/def-cmp-csp-main');
var CspCertification = require('../../component-definitions/csp/def-cmp-csp-certification');
var CspContact = require('../../component-definitions/csp/def-cmp-csp-contact');
var CspMainAppl = require('../../component-definitions/csp/def-cmp-csp-main-appl'); //unfortunate name
var CspPatent = require('../../component-definitions/csp/def-cmp-csp-patent');
var CspPayment = require('../../component-definitions/csp/def-cmp-csp-payment');
var CspTimelySub = require('../../component-definitions/csp/def-cmp-csp-timely-sub');




var mainObj, certObj, contactObj,mainContentObj, patentObj, paymentObj,timelySubObj;



describe('Certificate of Supplementary Protection Main Test', function () {

    before(function () {
        mainObj = new CspMain();
        lang=browser.params.lang;
        formType=browser.params.formType;
        if(formType==='EXT' && lang==='en'){
            csp_url="csp/cspEXT-en.html"
        }else  if(formType==='INT' && lang==='en'){
            csp_url="csp/cspINT-en.html"
        }
        else  if(formType==='INT' && lang==='fr'){
            csp_url="csp/cspINT-fr.html"
        }
        else  if(formType==='EXT' && lang==='fr'){
            csp_url="csp/cspEXT-fr.html"
        }else{
            //error condition
            csp_url="";
        }

        mainObj.get(csp_url);
        certObj= new CspCertification();
        contactObj=new CspContact();
        mainContentObj=new CspMainAppl()
        patentObj= new CspPatent();
        paymentObj=new CspPayment();
        timelySubObj= new CspTimelySub() ;
    });


    describe('Fill in applicant Info', function () {
        it('Fill in applicant info', function () {

        });


    });

});


xdescribe('pause', function () {
    it(' Pause Test', function () {
        browser.pause();

    });

});


/**
 * Created by dkilty on 2017-05-04.
 */


/**
 * Test object for the error summary component
 * @constructor
 */
var ErrorSummary = function () {

    var partialId_string="errors-summary-";
    var errorSectionId_string="error-section";

    /**
     * Gets an error summary element under the parent
     * If there is more than one under the parent, will return the first one
     * @param parent
     */
    this.getErrorSummaryElement = function (parent) {
        return parent.element((by.css("cmp-error-summary[id^="+partialId_string+"]")));
    };

    this.getErrorSummaryElementById = function (parent,id) {
        return parent.element((by.id(id)));

    };
    this.getErrorSummaryElementByPartialId = function (parent,id) {
        var idString="errors-summary-"+id;
        return this.getErrorSummaryElementById(parent,idString);
    };

  /*  this.isErrorSummaryState=function(errorSummary){

        return errorSummary.getAttribute()
    }*/

    this.getErrorObjects=function(parent){
        return this.getErrorsObj(this.getErrorSummaryElement(parent));
    };


    this.getErrorsObj=function(errorSummaryElement){

        return errorSummaryElement.all(by.repeater('errorRec in errSummaryCtrl.errorArray'));
    }

    this.getIndividualErrors=function(parent){
     return parent.all((by.css('[ng-message]')));
    }
};
module.exports = ErrorSummary;


/**
 * Created by dkilty on 28/02/2017.
 */


var UiUtil = require('../../util/util-ui.js');

var DossierTabs=function(){
    var uiUtil = new UiUtil();
    var tabsTagNameString="cmp-tabs";
    var formulationTabPartialString="Form"; //dangerous fails if name changes
    var sourcedTabPartialString="Anim"; //dangerous fails if nname changes

        this.selectInactiveTab=function(){
           var tabComponent = element(by.tagName(tabsTagNameString));
            tabComponent.all(by.css('li:not(.active)')).first().click();
    };
    this.selectFormulationTab=function(){
        var tabComponent = element(by.tagName(tabsTagNameString));
        tabComponent.element(by.partialLinkText(formulationTabPartialString)).click();
    };
    this.selectSourcedTab=function(){
        var tabComponent = element(by.tagName(tabsTagNameString));
        tabComponent.element(by.partialLinkText(sourcedTabPartialString)).click();
    };

};

module.exports = DossierTabs;

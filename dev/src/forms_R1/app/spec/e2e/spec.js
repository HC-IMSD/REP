/**
 * Created by dkilty on 9/3/2016.
 */



var devUrl={
            activityExternalEn: "http://localhost:8080/dev/activity/activityEnrolEXT-en.html"

};
var prodUrl={
    activityExternalEn: "http://localhost:8080/prod/activityEnrolEXT-en.html"

};

var selectDropdownbyNum = function ( element, optionNum ) {
    if (optionNum){
        var options = element.findElements(by.tagName('option'))
            .then(function(options){
                options[optionNum].click();
            });
    }
};



function selectOption(selector, item) {
    var selectList, desiredOption;

    selectList = this.findElement(selector);
    selectList.click();

    selectList.findElements(protractor.By.tagName('option'))
        .then(function findMatchingOption(options) {
            options.some(function (option) {
                option.getText().then(function doesOptionMatch(text) {
                    if (item === text) {
                        desiredOption = option;
                        return true;
                    }
                });
            });
        })
        .then(function clickOption() {
            if (desiredOption) {
                desiredOption.click();
            }
        });
}


var dev_activity_root_ext_url="http://localhost:8080/dev/activity/activityEnrolEXT-en.html";

    describe('Activity External Test', function() {
        it('Activity Test', function() {
            // Load the AngularJS homepage.
            browser.get("http://localhost:8080/dev/activity/activityEnrolEXT-en.html");

            var companyIdElement= element(by.model("main.activityRoot.companyId"));
            companyIdElement.sendKeys('123456');

            var dossierIdElement=  element(by.model("main.activityRoot.dossierId"));
                dossierIdElement.sendKeys('1D23456');

            expect(companyIdElement.getAttribute('value')).toEqual('123456');

            expect(dossierIdElement.getAttribute('value')).toEqual('1D23456');

            var addRepContact= element(by.buttonText("Add REP Contact"));
            addRepContact.sendKeys(protractor.Key.ENTER);
            var salutation=element(by.model("contCtrl.contactModel.salutation"));
            expect(salutation.getAttribute('value')).toEqual('?');
           salutation.sendKeys('D');
           expect(salutation.getAttribute('value')).toEqual('string:SALUT_DR');
            browser.selectOption = selectOption.bind(browser);
            browser.selectOption(by.model('contCtrl.contactModel.salutation'), 'Mrs.');
            expect(salutation.getAttribute('value')).toEqual('string:SALUT_MRS');

        });

    });


describe('pause', function() {
    it('Activity Test', function() {
    // browser.pause();

    });

});


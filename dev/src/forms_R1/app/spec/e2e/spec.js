/**
 * Created by dkilty on 9/3/2016.
 */



var devUrl = {
    activityExternalEn: "http://localhost:2121/dev/activity/activityEnrolEXT-en.html"

};
var prodUrl = {
    activityExternalEn: "http://localhost:2121/prod/activityEnrolEXT-en.html"

};

var selectDropdownbyNum = function (element, optionNum) {
    if (optionNum) {
        var options = element.findElements(by.tagName('option'))
            .then(function (options) {
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


var dev_activity_root_ext_url = "http://localhost:8080/dev/activity/activityEnrolEXT-en.html";


var RootActivityPageObj = function () {
    var companyIdElement = element(by.model("main.activityRoot.companyId"));
    var dossierIdElement = element(by.model("main.activityRoot.dossierId"));

    this.get = function (value) {
        browser.get(value);
        browser.selectOption = selectOption.bind(browser);
    };

    this.setCompanyId = function (value) {
        companyIdElement.sendKeys(value);
    };
    this.getCompanyId = function () {
        return companyIdElement.getAttribute('value')
    };
    this.setDossierId = function (value) {
        dossierIdElement.sendKeys(value);
    };
    this.getDossierId = function () {
        return dossierIdElement.getAttribute('value')
    };

};
var RepContactObj = function () {
    var _addRepContactButton = element(by.buttonText("Add REP Contact"));
    var _salutationModel="contCtrl.contactModel.salutation";
    var _salutationSelect = element(by.model(salutationModel));
    var _amendChk=element(by.model("contactRec.contactModel.amend"));
    var _firstNameText=element(by.model("contCtrl.contactModel.givenName"));
    var _intitialsText=element(by.model("contCtrl.contactModel.initials"));
    var _lastNameText=element(by.model("contCtrl.contactModel.surname"));
    var _languageSelect=element(by.model("contCtrl.contactModel.language"));
    var _jobTitleText=element(by.model("contCtrl.contactModel.title"));
    var _faxText=element(by.model("contCtrl.contactModel.fax"));
    var _phoneText=element(by.model("contCtrl.contactModel.phone"));
    var _phoneExtText=element(by.model("contCtrl.contactModel.phoneExt"));
    var _emailText=element(by.model("contCtrl.contactModel.email"));

    this.addRepContact = function () {
        _addRepContactButton.sendKeys(protractor.Key.ENTER);
    };
    this.setSalutationValue = function (value) {
        _salutationSelect.sendKeys(value);
    };
    this.setSalutationByText = function (value) {
        browser.selectOption(by.model(_salutationModel), value);
    };

    this.getSalutationValue = function () {
        return _salutationSelect.getAttribute('value');
    };
    this.getSalutationCtrl = function () {
        return (_salutationSelect);
    };
    this.setFirstNameValue = function (value) {
         _firstNameText.sendKeys(value);
    };
    this.setLastNameValue = function (value) {
        _lastNameText.sendKeys(value);
    };
    this.setInitialsValue = function (value) {
         _intitialsText.sendKeys(value);
    };
    this.setLanguageValue = function (value) {
        browser.selectOption(by.model(_languageSelect), value);
    };
    this.setJobTitleValue = function (value) {
        _jobTitleText.sendKeys(value);
    };
    this.setFaxValue = function (value) {
        _faxText.sendKeys(value);
    };
    this.setPhoneValue = function (value) {
        _phoneText.sendKeys(value);
    };
    this.setPhoneExtValue = function (value) {
        _phoneExtText.sendKeys(value);
    };
    this.setEmailValue = function (value) {
        _emailText.sendKeys(value);
    };


    this.getFirstNameValue = function () {
       return  _firstNameText.getAttribute('value');
    };
    this.getLastNameValue = function () {
        return  _lastNameText.getAttribute('value');
    };

    this.getInitialsValue = function () {
        return  _intitialsText.getAttribute('value');

    };
    this.getLanguageValue = function () {
        return _languageSelect.getAttribute('value');
    }

    this.getJobTitleValue = function () {
        return _jobTitleText.getAttribute('value');
    };
    this.getFaxValue = function () {
       return _faxText.getAttribute('value');
    };
    this.getPhoneValue = function () {
        return _phoneText.getAttribute('value');
    };
    this.getPhoneExtValue = function () {
        return _phoneExtText.getAttribute('value');
    };
    this.getEmailValue = function () {
        _emailText.getAttribute('value');;
    };




};


describe('Activity External Test', function () {
    it('Activity Test', function () {

        var rootActivityObj = new RootActivityPageObj();

        rootActivityObj.get(dev_activity_root_ext_url);
        rootActivityObj.setCompanyId('123456');
        rootActivityObj.setDossierId('1D23456');

        expect(rootActivityObj.getCompanyId()).toEqual('123456');

        expect(rootActivityObj.getDossierId()).toEqual('1D23456');

    });
    it('Add Rep Contact', function () {

        var repContactObj= new RepContactObj();
        repContactObj.addRepContact();
        expect(repContactObj.getSalutationValue()).toEqual('?');
        repContactObj.setSalutationValue('D');
        expect(repContactObj.getSalutationValue()).toEqual('string:SALUT_DR');
        repContactObj.setSalutationByText( 'Mrs.');
        expect(repContactObj.getSalutationValue()).toEqual('string:SALUT_MRS');

    });


});


describe('pause', function () {
    it('Activity Test', function () {
        // browser.pause();

    });

});


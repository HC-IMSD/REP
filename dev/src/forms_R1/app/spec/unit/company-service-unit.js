/**
 * Created by dkilty on 9/3/2016.
 */

describe("CompanyService Test", function () {

    var companyServiceObj;
    var _instantCompanyService;
    /*  beforeEach(function($provide){
     //creating a mock for dependencies
     $provide.service('$window',function(){
     this.alert=jasmin.createSpy('alert');
     })
     });*/
    beforeEach(module('ngAnimateMock'))
    beforeEach(function () {
        module('companyService');
    });

    beforeEach(inject(function (_CompanyService_) {
            companyServiceObj = _CompanyService_;
            _instantCompanyService = new companyServiceObj();
        }
    ));

    afterEach(function () {
        companyServiceObj = null;
        _instantCompanyService = null;
    });


    it('Creates a company service object- check addressID', function () {
        //var serviceObj=companyServiceTest =new CompanyService();
        var _companyService = new companyServiceObj();
        expect(_companyService.addressID).toEqual(0);
        //var temp=new companyServiceObj.CompanyService()
    });
    it('Checks Amend Type', function () {
        expect(_instantCompanyService.getAmendType()).toBe('AMEND')
    });
    it('Checks Approved Type', function () {
        expect(_instantCompanyService.getApprovedType()).toBe('APPROVED')
    });
    it('Checks Address Role default values', function () {
        var roles = _instantCompanyService.createAddressRole();
        expect(roles.manufacturer).toBe(false);
        expect(roles.mailing).toBe(false);
        expect(roles.billing).toBe(false);
        expect(roles.importer).toBe(false);
    });
    it('Checks Contact Role default values', function () {
        var roles = _instantCompanyService.createContactRole();
        expect(roles.manufacturer).toBe(false);
        expect(roles.mailing).toBe(false);
        expect(roles.billing).toBe(false);
        expect(roles.repPrimary).toBe(false);
        expect(roles.repSecondary).toBe(false);
    });
    it('Check Address Record Id generation', function () {
        var address = _instantCompanyService.createAddressRecord();
        expect(address.addressID).toEqual(1);
        address = _instantCompanyService.createAddressRecord();
        expect(address.addressID).toEqual(2);
        address = _instantCompanyService.createAddressRecord();
        expect(address.addressID).toEqual(3);
    });
    it('Check Default values for address record (excludes roles)', function () {
        var address = _instantCompanyService.createAddressRecord();
        expect(address.companyName).toBe(''); //not undefined
        expect(address.amendRecord).not.toBeTruthy();
        expect(address.street).toBe(''); //not undefined
        expect(address.city).toBe(''); //not undefined
        expect(address.stateList).toBe(''); //not undefined
        expect(address.stateText).toBe(''); //not undefined
        expect(address.country).toBe(''); //not undefined
        expect(address.postalCode).toBe(''); //not undefined
    });
    it('Check contact Record Id generation', function () {
        var contact = _instantCompanyService.createContactRecord();
        expect(contact.contactId).toEqual(1);
        contact = _instantCompanyService.createContactRecord();
        expect(contact.contactId).toEqual(2);
        contact = _instantCompanyService.createContactRecord();
        expect(contact.contactId).toEqual(3);
    });

    it('Check Default values for contact record (excludes roles)', function () {
        var contact = _instantCompanyService.createContactRecord();
        expect(contact.salutation).toBe(''); //not undefined
        expect(contact.givenName).toBe(''); //not undefined
        expect(contact.surname).toBe(''); //not undefined
        expect(contact.initials).toBe(''); //not undefined
        expect(contact.title).toBe(''); //not undefined
        expect(contact.phone).toBe(''); //not undefined
        expect(contact.phoneExt).toBe(''); //not undefined
        expect(contact.fax).toBe(''); //not undefined
    });
    /*
     fs = require('fs')
     myCode = fs.readFileSync('./color.js','utf-8') // depends on the file encoding
     eval(myCode)
     */

});

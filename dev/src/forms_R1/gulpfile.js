var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');
var Q = require('q');
var angularTranslate = require('gulp-angular-translate');
var inject = require('gulp-inject');
var htmlreplace = require('gulp-html-replace');
var rename = require("gulp-rename");
var angularFilesort = require('gulp-angular-filesort');
var replace = require('gulp-replace-task');
var stringReplace = require('gulp-string-replace');
var dateFormat = require('dateformat');
var gulpMerge = require('gulp-merge-json');
var htmlmin = require('gulp-htmlmin');

var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
var protractor = require("gulp-protractor").protractor;

// == PATH STRINGS ========
var baseScript = './app/scripts';
var wetBase = './wet_4_0_22_base';
var buildDev = './build/dev';
var buildProd = './build/prod/';
var templateFileEn = 'content-en.html';
var templateFileFr = 'content-fr.html';
//GLOBAL variable save
var _DATESTAMP = "";



//paths and relativePaths of interest for dev and prod
var paths = {
    styles: 'app/styles/',
    translations: 'app/resources/',
    helpTemplates: 'app/help/',
    buildProd: buildProd,
    buildDev: buildDev,
    buildDevDiff: buildDev + '/repDiff/',
    buildDevActivity: buildDev + '/activity/',
    buildDevCompany: buildDev + '/company/',
    buildDevTransaction: buildDev + '/transaction/',
    buildDevDossier: buildDev + '/dossier/',
    buildDevCSP: buildDev + '/csp/',
    buildProdActivity: buildProd + '/activity/',
    buildProdCompany: buildProd + '/company/',
    buildProdTransaction: buildProd + '/transaction/',
    buildProdDossier: buildProd + '/dossier/',
    buildProdCsp: buildProd + '/csp/',
    englishTemplate: wetBase + '/' + templateFileEn, //this is the wet template before path injection
    frenchTemplate: wetBase + '/' + templateFileFr, //this is the wet template before path injection
    devEnglishTemplate: buildDev + '/templates/' + templateFileEn,
    devFrenchTemplate: buildDev + '/templates/' + templateFileFr,
    prodEnglishTemplate: buildProd + '/templates/' + templateFileEn,
    prodFrenchTemplate: buildProd + '/templates/' + templateFileFr,
    lib: './app/lib/',
    relLib: 'app/lib/',
    data: './app/data/',
    scripts: baseScript,
    templates:'app/scripts/templates/',
    relScript: '/app/scripts/',
    components: baseScript + '/components/',
    directives: baseScript + '/directives/',
    services: baseScript + '/services/',
    templates: baseScript + '/templates/',
    wetBase: wetBase
};

var homePath = {
    dev_en: '<a href="https://lam-dev.hres.ca/rep-dev/index.html">Home</a>',
    dev_fr: '<a href="https://lam-dev.hres.ca/rep-dev/index-fr.html">Accueil</a>',
    test_en: '<a href="https://lam-dev.hres.ca/rep_test/index.html">Home</a>',
    test_fr: '<a href="https://lam-dev.hres.ca/rep_test/index-fr.html">Accueil</a>',
    prod_en: '<a href="https://lam-dev.hres.ca/REP-Form/index.html">Home</a>',
    prod_fr: '<a href="https://lam-dev.hres.ca/REP-Form/index-fr.html">Accueil</a>',
    prodInt_en: '<a href="https://lam-dev.hres.ca/REP-Form-Internal/index.html">Home</a>',
    prodInt_fr: '<a href="https://lam-dev.hres.ca/REP-Form-Internal/index-fr.html">Accueil</a>'

};
var deployType = {
    dev: "DEV",
    test: "TEST",
    prod: "PROD",
    prodInt: "PROD_INT"
}


//custom placeholders used to inject content
var placeholders = {
    mainContent: '<!-- inject:mainContent-->',
    dateStamp: 'dateToday'
};

//================================ Titles and main headings for the web page START========================

var diffFormRootTitles_en = {
    mainHeading: "Beta 1:REP File Compare Utility",
    title: 'REP File Compare Utility'
};
var activityRootTitles_en = {
    mainHeading: "Regulatory Activity Template: Regulatory Enrolment Process (REP)",
    title: 'Health Canada Activity REP Template'

};
var activityRootTitles_fr = {
    mainHeading: "fr_Regulatory Activity Template: Regulatory Enrolment Process (REP)",
    title: 'fr_Health Canada Activity REP Template'

};

var companyRootTitles_en = {
    mainHeading: "Company Template: Regulatory Enrolment Process (REP)",
    title: 'Health Canada Company Template'

};
var companyRootTitles_fr = {
    mainHeading: "fr_Company Template: Regulatory Enrolment Process (REP)",
    title: 'fr_Health Canada Company Template'

};

var transactionRootTitles_en = {
    mainHeading: "Regulatory Transaction Template: Regulatory Enrolment Process (REP)",
    title: 'Health Canada Transaction template'

};
var transactionRootTitles_fr = {
    mainHeading: "fr_Regulatory Transaction Template: Regulatory Enrolment Process (REP)",
    title: 'fr_Health Canada Transaction Template'

};

var dossierRootTitles_en = {
        mainHeading: "Dossier Template: Regulatory Enrolment Process (REP)",
        title: 'Health Canada Dossier Template'

    };

var dossierRootTitles_fr = {
        mainHeading: "fr_Dossier Template: Regulatory Enrolment Process (REP)",
        title: 'fr_Health Canada Dossier Template'

    };

var cspRootTitles_en = {
        mainHeading: "Certificate of Supplementary Protection (CSP) Application Form",
        title: 'Health Canada CSP Form'

    };

var cspRootTitles_fr = {
        mainHeading: "fr_Certificate of Supplementary Protection (CSP) Application Form",
        title: 'fr_Health Canada CSP Form'

    };

//======================== Titles and main headings for the web page END================================


//================================NAMES AND PATHS FOR MISC ITEMS START ================================


//Paths in source control to the root html content that gets injected into a template
var jsRootContent = {
    partialActivityRoot: 'rootContent/activityRoot.html',
    partialCompanyRoot: 'rootContent/companyRoot.html',
    partialTransactionRoot: 'rootContent/transactionRoot.html',
    partialDossierRoot: 'rootContent/dossierRoot.html',
    partialDiffFormRoot: 'rootContent/diffForm.html',
    partialCSPFormRoot: 'rootContent/cspForm.html'
};


// Root javascript filenames for a form. Leave off the .js
var rootFileNames = {
    activityRoot: "activityApp",
    companyRoot: "companyApp",
    transactionRoot: "transactionApp",
    dossierRoot: "dossierApp",
    repDiff: "diffApp",
    cspRoot:"cspApp"
};


var styleFilesNames = {
    rep: 'rep.css',
    select: 'select.min.css',
    select2Style: 'select2.min.css',
    select2Image: 'select2.png',
    select2X2: 'select2X2.png',
    selectizeStyle: 'selectize.default.css',
    repDiff: 'rep-diff.css',
    uiTree: 'angular-ui-tree.min.css'

};

var libFileNames = {
    angularMin: "angular.min.js",
    ariaMin: "angular-aria.min.js",
    resourceMin: "angular-messages.min.js",
    messagesMin: "angular-resource.min.js",
    sanitizeMin: "angular-sanitize.min.js",
    translateMin: "angular-translate.min.js",
    fileSaverMin: "FileSaver.min.js",
    selectMin: "select.min.js",
    sha256: "sha256.js",
    uiBootStrapMin: "ui-bootstrap-tpls-2.1.4.min.js",
    xml2Json: "xml2json.js",
    deepDiffMin: "deep-diff-0.3.4.min.js",
    uiTreeMin: "angular-ui-tree.min.js",
    uibTemplates: "uib-templates/*.*",
    ngIf:"focusIf.min.js"
}



var changedFile = ""; // GLOBAL USED for Watcher storing changed file


//======================== NAMES AND PATHS FOR MISC ITEMS END =======================================


//======================== Component Definitions START ========================================

/**
 * All the component folders used for all forms
 **/
var componentFolders = {
    activityChange: 'activityChangeType/',
    activityMain: 'activityMain/',
    activityRationale: 'activityRationale/',
    addressDetails: 'addressDetails/',
    addressList: 'addressList/',
    addressRecord: 'addressRecord/',
    addressRole: 'addressRole/',
    applicationInfo: 'applicationInfo/',
    importerProducts: 'companyImporterProducts/',
    companyMain: 'companyMain/',
    contactDetails: 'contactDetails/',
    contactList: 'contactList/',
    contactRecord: 'contactRecord/',
    dinDetails: 'dinDetails/',
    dossierIdDetails: 'dossierIdDetails/',
    expandingTable: 'expandingTable/',
    fileIOComponentAndDep: 'fileIO/',
    lifecycleDetails: 'lifecycleDetails/',
    lifecycleList: 'lifecycleList/',
    relatedActivity: 'relatedActivity/',
    relatedActivityList: 'relatedActivityList/',
    repContactList: 'repContactList/',
    repContactRecord: 'rep-contact-record/',
    transactionMain: 'transactionMain/',
    transactionAddressRecord: 'transactionCompanyRecord/',
    transactionInfo: 'transactionInfo/',
    countrySelect: 'countrySelect/',
    adminSubmissionPath: 'adminSubmission/',
    appendix4: 'appendix-four/',
    canRefProducts: 'can-ref-products/',
    checkboxList: 'checkbox-list/',
    contact: 'contact/',
    countryList: 'country-list/',
    dossier: 'dossier/',
    drugUse: 'drug-use/',
    routeAdmin: 'route-admin/',
    fileIO: 'fileIO/',
    scheduleA: 'schedule-a/',
    tabs: 'tabs/',
    theraClass: 'therapeutic-classification/',
    formulations: 'formulations/',
    diffFileIO: 'fileIODiff/',
    nodesRender: 'nodes-renderer/',
    diffMain: 'diff-main/',
    errorSummary: 'error-summary/',
    cspMain:'cspMain/',
    cspContact:'cspContactRecord/',
    cspHCOnly:'cspHealthCanadaOnly/',
    cspMainAppl:'cspMainAppl/',
    cspPatent: 'cspPatent/',
    cspTimelySub: 'cspTimelySubmission/',
    cspFeePayment: 'cspFeePayment/',
    cspCert: 'cspCertification/',
    errorMsg: 'error-message/',
    cspApplicantList:'cspContactList/'
};

//exclude custom styles only lib
var stylesProd = [
    paths.styles + styleFilesNames.rep,
    paths.styles + styleFilesNames.select,
    paths.styles + styleFilesNames.select2Style,
    paths.styles + styleFilesNames.select2Image,
    paths.styles + styleFilesNames.select2X2

];

var libProd = [
    paths.lib + libFileNames.angularMin,
    paths.lib + libFileNames.resourceMin,
    paths.lib + libFileNames.sanitizeMin,
    paths.lib + libFileNames.translateMin,
    paths.lib + libFileNames.fileSaverMin,
    paths.lib + libFileNames.selectMin,
    paths.lib + libFileNames.sha256,
    paths.lib + libFileNames.uiBootStrapMin,
    paths.lib + libFileNames.xml2Json,
    paths.lib + libFileNames.messagesMin,
    paths.lib + libFileNames.ariaMin,
    paths.lib + libFileNames.uibTemplates,
    paths.lib + libFileNames.ngIf
];

var libCsp=[
    paths.lib + libFileNames.angularMin,
    paths.lib + libFileNames.resourceMin,
    paths.lib + libFileNames.sanitizeMin,
    paths.lib + libFileNames.translateMin,
    paths.lib + libFileNames.fileSaverMin,
    paths.lib + libFileNames.selectMin,
   /* paths.lib + libFileNames.sha256,*/
   /* paths.lib + libFileNames.uiBootStrapMin,*/
    paths.lib + libFileNames.xml2Json,
    paths.lib + libFileNames.messagesMin,
    paths.lib + libFileNames.ariaMin,
    paths.lib + libFileNames.uibTemplates,
    paths.lib + libFileNames.ngIf

];



//Activity Form Components
var activityComponentFolders = [
    componentFolders.activityChange,
    componentFolders.activityMain,
    componentFolders.activityRationale,
    componentFolders.applicationInfo,
    componentFolders.contactDetails,
    componentFolders.expandingTable,
    componentFolders.fileIOComponentAndDep,
    componentFolders.repContactList,
    componentFolders.repContactRecord,
    componentFolders.adminSubmissionPath,
    componentFolders.errorMsg
];

//Company Form Components
var companyComponentFolders =
    [
        componentFolders.companyMain,
        componentFolders.applicationInfo,
        componentFolders.contactDetails,
        componentFolders.addressRole,
        componentFolders.expandingTable,
        componentFolders.fileIOComponentAndDep,
        componentFolders.addressList,
        componentFolders.contactList,
        componentFolders.addressDetails,
        componentFolders.addressRecord,
        componentFolders.contactRecord,
        componentFolders.importerProducts,
        componentFolders.dossierIdDetails,
         componentFolders.errorSummary,
        componentFolders.errorMsg
    ];

//Dossier Form Components
var dossierComponentFolders =
    [
        componentFolders.appendix4,
        componentFolders.canRefProducts,
        componentFolders.checkboxList,
        componentFolders.countryList,
        componentFolders.dossier,
        componentFolders.drugUse,
        componentFolders.routeAdmin,
        componentFolders.scheduleA,
        componentFolders.tabs,
        componentFolders.theraClass,
        componentFolders.formulations,
        componentFolders.fileIOComponentAndDep,
        componentFolders.repContactList,
        componentFolders.repContactRecord,
        componentFolders.contactDetails,
        componentFolders.applicationInfo,
        componentFolders.expandingTable,
        componentFolders.errorMsg
    ];

//transaction Form Components
var transactionComponentFolders = [

    componentFolders.transactionMain,
    componentFolders.transactionInfo,
    componentFolders.contactDetails,
    componentFolders.expandingTable,
    componentFolders.fileIOComponentAndDep,
    componentFolders.lifecycleList,
    componentFolders.lifecycleDetails,
    componentFolders.addressDetails,
    componentFolders.errorMsg
];
//certificate of Supplementary Protection File

var cspComponentFolders = [

    componentFolders.cspMain,
    componentFolders.fileIO,
    componentFolders.cspContact,
    componentFolders.contactDetails,
    componentFolders.addressDetails,
    componentFolders.cspHCOnly,
    componentFolders.cspMainAppl,
    componentFolders.cspPatent,
    componentFolders.cspTimelySub,
    componentFolders.cspFeePayment,
    componentFolders.cspCert,
    componentFolders.errorSummary,
    componentFolders.errorMsg,
    componentFolders.cspApplicantList
];



//======================== Component Definitions END ========================================

//======================== SERVICE Definitions START ========================================

//service file names for ALL forms . Leave off the .js
var serviceFileNames = {
    activityService: 'activity-service',
    activityLoadService: 'activity-load-service',
    activityLists: 'activity-lists',
    applicationInfoService: 'application-info-service',
    companyService: 'company-service',
    companyLoadService: 'company-load-service',
    dataListsActivity: 'data-lists.activity',
    dataLists: 'data-lists',
    filterLists: 'filter-lists',
    hpfbConstants: 'hpfb-constants',
    transactionService: 'transactionService',
    transactionLoadService: 'transaction-load-service',
    repContactService: 'rep-contact-service',
    commonLists: 'common-lists',
    dossierService: "dossier-service",
    dossierDataList: "dossier-data-list",
    dossierLoadService: "dossier-load-service",
    cspService:"csp-service",
    cspConstants:'csp-constants',
    cspLoadService: 'csp-load-service',
    diffService: 'diff-service'
};

//Activity Form Service File names
var activityServiceFileNames = [
    serviceFileNames.activityService,
    serviceFileNames.activityLists,
    serviceFileNames.applicationInfoService,
    serviceFileNames.hpfbConstants,
    serviceFileNames.repContactService,
    serviceFileNames.filterLists,
    serviceFileNames.dataLists,
    serviceFileNames.commonLists
];

//Company Form Service Files
var companyServiceFileNames =
    [
        serviceFileNames.companyService,
        serviceFileNames.companyLoadService,
        serviceFileNames.applicationInfoService,
        serviceFileNames.filterLists,
        serviceFileNames.hpfbConstants,
        serviceFileNames.dataLists
    ];

//Dossier Form Service Files
var dossierServiceFileNames =
    [
        serviceFileNames.dossierDataList,
        serviceFileNames.dossierLoadService,
        serviceFileNames.dossierService,
        serviceFileNames.applicationInfoService,
        serviceFileNames.dataLists,
        serviceFileNames.filterLists,
        serviceFileNames.repContactService,
        serviceFileNames.hpfbConstants

    ];

//Transaction Service files
var transactionServiceFileNames = [

    serviceFileNames.transactionService,
    serviceFileNames.transactionLoadService,
    serviceFileNames.dataLists,
    serviceFileNames.dataListsActivity,
    serviceFileNames.filterLists,
    serviceFileNames.hpfbConstants

];
// Template folders
var activityTemplates=["activity/"];
var transactionTemplates=["transaction/"];
var companyTemplates = ["company/"];
var dossierTemplates = ["dossier/"];



// Complementary Supplementary Protection Application Form
var cspServiceFileNames =
    [
        serviceFileNames.hpfbConstants,
        serviceFileNames.dataLists,
        serviceFileNames.filterLists,
        serviceFileNames.applicationInfoService,
        serviceFileNames.cspService,
        serviceFileNames.cspConstants,
        serviceFileNames.cspLoadService
    ];



//================================ SERVICE Definitions END ========================================/

//================================ DIRECTIVE Definitions START ================================


var directiveFolders = {
    country: 'country/',
    numberOnly: 'numberOnly/'
};


//Activity Form Directives
var activityDirectiveFolders = [
    directiveFolders.numberOnly
];

//Company Form Directives
var companyDirectiveFolders =
    [
        directiveFolders.numberOnly
    ];

//Dossier Form Directives
var dossierDirectiveFolders =
    [
        directiveFolders.numberOnly
    ];




//Transaction Form directives
var transactionDirectiveFolders =
    [
        directiveFolders.numberOnly
    ];

//Complementary
var cspDirectiveFolders =
    [
       directiveFolders.numberOnly
    ];


//================DIRECTIVE Definitions END ================================================


//============== TRANSLATION file definiitions START =============================================

//file paths and base names for ALL translation files. Leave .json/ -lang off name
var translationBaseFiles = {

    activityInfo: paths.translations + 'activityInfo',
    activityList: paths.translations + 'activityList',
    address: paths.translations + 'address',
    applicationInfo: paths.translations + 'applicationInfo',
    contact: paths.translations + 'contact',
    fileIO: paths.translations + 'fileIO',
    general: paths.translations + 'general',
    messages: paths.translations + 'messages',
    stateProvinces: paths.translations + 'stateProvinces',
    transaction: paths.translations + 'transaction',
    companyInfo: paths.translations + 'companyInfo',
    dosageForm: paths.translations + 'dossierDosageform',
    dossier: paths.translations + 'dossier',
    dossierGeneral: paths.translations + 'dossierGeneral',
    appendix4: paths.translations + 'appendix4',
    dossierMsg: paths.translations + 'dossierMsg',
    scheduleA: paths.translations + 'scheduleA',
    formulation: paths.translations + 'formulation',
    dossierXml: paths.translations + 'dossierXml',
    activityXml: paths.translations + 'activityXml',
    transactionXml: paths.translations + 'transactionXml',
    companyXml: paths.translations + 'companyXml',
    addressXml: paths.translations + 'addressXml',
    contactXml: paths.translations + 'contactXml',
    defaultXml: paths.translations + 'defaultXml',
    temp:paths.translations +'companyError',
    errorSummary:paths.translations +'errorSummary',
    cspGeneral: paths.translations + 'csp',
    cspError: paths.translations + 'cspError'
};


var diffFormTranslationBaseList = [
    translationBaseFiles.fileIO,
    translationBaseFiles.dossierXml,
    translationBaseFiles.addressXml,
    translationBaseFiles.contactXml,
    translationBaseFiles.defaultXml,
    translationBaseFiles.transactionXml,
    translationBaseFiles.activityXml
];


//Activity Form Translations
var activityTranslationFilesBaseList = [
    translationBaseFiles.activityInfo,
    translationBaseFiles.activityList,
    translationBaseFiles.contact,
    translationBaseFiles.applicationInfo,
    translationBaseFiles.fileIO,
    translationBaseFiles.general,
    translationBaseFiles.messages
];

//COMPANY form translations
var companyTranslationFilesBaseList =
    [
        translationBaseFiles.address,
        translationBaseFiles.stateProvinces,
        translationBaseFiles.contact,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.fileIO,
        translationBaseFiles.general,
        translationBaseFiles.messages,
        translationBaseFiles.companyInfo,
        translationBaseFiles.temp,
        translationBaseFiles.errorSummary
    ];

/*** Dossier Form translations***/
var dossierTranslationFilesBaseList =
    [
        translationBaseFiles.dosageForm,
        translationBaseFiles.dossier,
        translationBaseFiles.dossierGeneral,
        translationBaseFiles.dossierMsg,
        translationBaseFiles.appendix4,
        translationBaseFiles.scheduleA,
        translationBaseFiles.formulation,
        translationBaseFiles.general,
        translationBaseFiles.fileIO,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.messages,
        translationBaseFiles.contact
    ];


///transaction form translations
var transactionTranslationFilesBaseList = [
    translationBaseFiles.address,
    translationBaseFiles.stateProvinces,
    translationBaseFiles.contact,
    translationBaseFiles.applicationInfo,
    translationBaseFiles.fileIO,
    translationBaseFiles.general,
    translationBaseFiles.messages,
    translationBaseFiles.transaction
];
//complementary supplementary Forms
var cspTranslationFilesBaseList=[
    translationBaseFiles.address,
    translationBaseFiles.stateProvinces,
    translationBaseFiles.contact,
    translationBaseFiles.applicationInfo,
    translationBaseFiles.fileIO,
    translationBaseFiles.general,
    translationBaseFiles.messages,
    translationBaseFiles.cspGeneral,
    translationBaseFiles.cspError,
    translationBaseFiles.errorSummary

];

//===================== TRANSLATION file definiitions END ======================


// ========= PIPE SEGMENTS ===============================

var pipes = {};

pipes.orderedAppScripts = function () {
    return plugins.angularFilesort();
};

pipes.minifiedFileName = function () {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};


pipes.validatedScripts = function (scriptPath) {
    return gulp.src(scriptPath)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};


pipes.builtAppCmpScriptsProd = function (filePaths, outName, destPath) {
    var validatedAppScripts = pipes.validatedScripts(filePaths, outName, destPath);

    return es.merge(validatedAppScripts)
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat(outName))
        .pipe(plugins.uglify({mangle: false}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(destPath));
};


pipes.validatedPartials = function () {
    return gulp.src(paths.partials)
        .pipe(plugins.htmlhint({'doctype-first': false}))
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtPartialsDev = function () {
    return pipes.validatedPartials()
        .pipe(gulp.dest(paths.distDev));
};

pipes.scriptedPartials = function () {
    return pipes.validatedPartials()
        .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(plugins.ngHtml2js({
            moduleName: "healthyGulpAngularApp"
        }));
};

/**
 *  Creates the full translations json list (assumes en and fr)
 * */
pipes.fullTranslateList = function (translateList) {
    var completeList = [];
    for (var i = 0; i < translateList.length; i++) {
        completeList.push(translateList[i] + '-en.json');
        completeList.push(translateList[i] + '-fr.json')
    }
    return completeList;
};

/**
 * Creates a concatenated list of translations as a javascript file!
 * */
pipes.translateDev = function (translateList, destPath, baseIgnore) {
    if (!baseIgnore) baseIgnore = ".";
    var completeList = pipes.fullTranslateList(translateList);
    var copySources = gulp.src(completeList,
        {read: true, base: baseIgnore});
    return (copySources.pipe(gulp.dest(destPath)));

};

/**
 *  Inserts a date stamp in the passed in templaste
 *
 * */
pipes.insertDateStamp = function (template, valsObj, lang, type) {
    var now = new Date();
    var utc = dateFormat(now, "isoDate");
    var anchor = pipes.getHomeAnchor(type, lang)

    return (gulp.src(template)
            .pipe(htmlreplace({
                dateToday: utc,
                mainHeading: valsObj.mainHeading,
                formTitle: valsObj.title,
                homeAnchor: anchor
            }))
    );
};
/***
 * Sets the home anchor tag for the form. Changes based on environment
 * @param type
 * @param lang
 * @returns {*}
 */
pipes.getHomeAnchor = function (type, lang) {
    var homeEn = homePath.dev_en;
    var homeFr = homePath.dev_fr;

    if (type === deployType.prod) {
        var homeEn = homePath.prod_en;
        var homeFr = homePath.prod_fr;
    }
    if (type === deployType.prodInt) {
        var homeEn = homePath.prodInt_en;
        var homeFr = homePath.prodInt_fr;
    }
    else if (type === deployType.test) {
        var homeEn = homePath.test_en;
        var homeFr = homePath.test_fr;
    }

    if (lang == 'fr') {
        return homeFr;
    }
    return homeEn;
}

pipes.copyHtml = function (copySourcesHtml, dateToday, destDirectory, isHtmlMin) {
    if (isHtmlMin === true) {
        return (
            copySourcesHtml.pipe(rename({
                suffix: dateToday
            }))
                .pipe(plugins.htmlhint.failReporter())
                .pipe(htmlmin({collapseWhitespace: true, removeComments: true, html5: true, caseSensitive: true}))
                .pipe(gulp.dest(destDirectory))
        )
    } else {
        copySourcesHtml.pipe(rename({
            suffix: dateToday
        }))
            .pipe(gulp.dest(destDirectory))
    }
};

pipes.copyWet = function (destDirectory) {
    var copySources = gulp.src([paths.wetBase + '/**/*', '!' + paths.englishTemplate, '!' + paths.frenchTemplate],
        {read: true, base: paths.wetBase});
    return (copySources.pipe(gulp.dest(destDirectory)))
};


pipes.generateRootJsFile = function (lang, type, rootFile, destPath, skipDate) {

    console.log("generating the root file");
    var ignorePath = ".";
    if (!skipDate) skipDate = false;
    var rootName = rootFile.split("/");
    rootName = rootName[rootName.length - 1];
    rootName = rootName.substring(0, rootName.length - 3);
    var dateToday = createSuffixDate();
    if (skipDate) dateToday = "";
    var copySources = gulp.src([rootFile],
        {read: true, base: ignorePath});
    return (
        copySources
            .pipe(replace({
                patterns: [
                    {
                        match: 'prefLang',
                        replacement: lang
                    },
                    {
                        match: 'SET_FORM',
                        replacement: type
                    }
                ]
            }))
            //  .pipe(stringReplace("\\./resources/", "app/resources/"))
            .pipe(rename(rootName + type + "-" + lang + dateToday + '.js'))
            .pipe(gulp.dest(destPath))
    )

};

pipes.mergeJsonFiles = function (srcFolder, destFolder, destName, lang) {

    return (
        gulp.src(srcFolder + '**/*-' + lang + '.json')
            .pipe(gulpMerge(destName))
            .pipe(gulp.dest(destFolder))
    );
};

/**
 *  Creates the root Html file  for the forms.
 *  @param templatePath - the path to the WET template to inject data into
 *  @param valsObj - the metadata elements to insert into the web page. Currently Title and  formname
 *  @param templateName - the destination name of the html template
 *  @param injectRootJs - the name of rootJS file (i.e. app.js). Assumed to be under app/scripts
 *  @param partialRoot - the html fragment to be injected into the template. This is the root content
 *  @param buildDir - the destination build directory
 *  @param ignorePath - the folder parh to ignore from the source files
 *  @param lang - the language to generate. For angular translate
 *  @param formType - the type of form to generate, either external (EXT) or internal (INT)
 * */
pipes.createRootHtml = function (templatePath, valsObj, templateName, injectRootJs, partialRoot, buildDir, ignorePath, lang, formType, stylesList) {

    var stylesArray = [
        paths.styles + styleFilesNames.rep,
        paths.styles + styleFilesNames.select,
        paths.styles + styleFilesNames.select2Style,
        paths.styles + styleFilesNames.select2Image
    ];

    if (stylesList) stylesArray = stylesList;

    //inserts date stamp into base content page
    return (
        pipes.insertDateStamp(templatePath, valsObj, lang, formType)
            .pipe(inject(gulp.src([partialRoot]), {
                starttag: placeholders.mainContent,
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8')
                }
            }))
            //get all the third party libraries
            .pipe(inject(gulp.src([
                    buildDir + 'app/lib/**/*.js',
                    '!' + buildDir + '/app/lib/**/angular*.js'
                ]),
                {
                    name: 'thirdParty',
                    ignorePath: ignorePath,
                    addRootSlash: false
                }))
            .pipe(inject(gulp.src(stylesArray),
                {
                    ignorePath: ignorePath,
                    addRootSlash: false
                }
            ))
            .pipe(inject(gulp.src([
                    buildDir + 'app/scripts/components/**/*.js',
                    buildDir + 'app/scripts/directives/**/*.js',
                    buildDir + 'app/scripts/services/**/*.js',
                    buildDir + 'app/scripts/' + injectRootJs,
                    buildDir + 'app/scripts/' + 'translations' + createSuffixDate() + '.js',
                    buildDir + 'app/lib/**/angular*.js'
                ])
                    .pipe(angularFilesort())
                , {
                    ignorePath: ignorePath,
                    addRootSlash: false,
                    read: false
                }))
            // .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'})

            .pipe(rename(templateName))
            .pipe(gulp.dest(buildDir))
    )

};


pipes.cleanBuild = function (baseDir) {

    return (del([baseDir]));
};


//deprecated
pipes.createHelpFile = function (templatePath, valsObj, partialRoot, destDir, destName) {

    pipes.insertDateStamp(templatePath, valsObj)
        .pipe(inject(gulp.src([partialRoot]), {
            starttag: placeholders.mainContent,
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(rename(destName))
        .pipe(gulp.dest(destDir));
};


/**
 * Copy the source files based on the arrays for the different components
 *
 * */
pipes.copySrcs = function (noDate, destDir, componentFolders, serviceFileNames, directiveFolders,templateFolders, isHtmlMin) {
    var htmlArray = [];
    var jsArray = [];

    for (var i = 0; i < componentFolders.length; i++) {
        var folderPath = paths.components + componentFolders[i] + '**/*';
        htmlArray.push(folderPath + '.html');
        jsArray.push(folderPath + '.js');
    }
    //get all the activity services
    for (var i = 0; i < serviceFileNames.length; i++) {
        jsArray.push(paths.services + serviceFileNames[i] + "*.js")
    }
    //get all the activity directive folders
    for (var i = 0; i < directiveFolders.length; i++) {
        jsArray.push(paths.directives + directiveFolders[i] + "**/*.js");
        htmlArray.push(paths.directives + directiveFolders[i] + "**/*.html")
    }
    var templatesArray=[];
    for (var i = 0; i < templateFolders.length; i++) {
        folderPath = paths.templates + templateFolders[i] + '**/*';
        templatesArray.push(folderPath + '.html');
    }
    //never add a date for templates
    pipes.copyHtml(gulp.src(templatesArray, {read: true, base: './'}), "", destDir, isHtmlMin);

    var copySourcesJs = gulp.src(jsArray, {read: true, base: './'});
    var copySourcesHtml = gulp.src(htmlArray, {read: true, base: './'});

    var dateToday = createSuffixDate();
    if (noDate === true) dateToday = "";

    pipes.copyHtml(copySourcesHtml, dateToday, destDir, isHtmlMin);
    return (
        copySourcesJs.pipe(rename({
            suffix: dateToday
        }))
            .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
            .pipe(gulp.dest(destDir))
    )
};
pipes.deleteSrcs = function (srcDir, componentFolders, serviceFileNames, directiveFolders) {
    var fileArray = [];

    for (var i = 0; i < componentFolders.length; i++) {
        var folderPath = srcDir + '/components/' + componentFolders[i] + '**/*.*';
        console.log(folderPath)
        fileArray.push(folderPath);
    }
    //get all the activity services
    for (var i = 0; i < serviceFileNames.length; i++) {
        fileArray.push(srcDir + '/services/' + serviceFileNames[i] + "*.js")
    }
    //get all the activity directive folders
    for (var i = 0; i < directiveFolders.length; i++) {
        fileArray.push(srcDir + '/directives/' + directiveFolders[i] + "**/*.*");

    }
    return (
        del(fileArray)
    )
};

pipes.deleteResourcesNonMinFiles=function(basePath) {

    var deletePaths = [
        basePath + 'app/scripts/**/*.js',
        '!' + basePath + 'app/scripts/*.min.js',
        basePath + 'app/resources/'
    ];
    return (del(deletePaths));

};





pipes.createRootFileSet = function (rootPath, destDir, skipDate, generateInternal) {

    if (generateInternal) {
        return (
            pipes.generateRootJsFile('en', 'INT', rootPath, destDir, skipDate) &&
            pipes.generateRootJsFile('fr', 'INT', rootPath, destDir, skipDate) &&
            pipes.generateRootJsFile('fr', 'EXT', rootPath, destDir, skipDate) &&
            pipes.generateRootJsFile('en', 'EXT', rootPath, destDir, skipDate)
        );
    } else {
        return (
            pipes.generateRootJsFile('fr', 'EXT', rootPath, destDir, skipDate) &&
            pipes.generateRootJsFile('en', 'EXT', rootPath, destDir, skipDate)
        )
    }

};

pipes.compileTranslateFile = function (srcPath, destPath, outFileName, translateFileBaseList) {

    var translationSources = [];
    //going to explicitly name files
    for (var i = 0; i < translateFileBaseList.length; i++) {
        translationSources.push(srcPath + translateFileBaseList[i] + "-en.json");
        translationSources.push(srcPath + translateFileBaseList[i] + "-fr.json");
    }
    return (
        gulp.src(translationSources)
            .pipe(angularTranslate(outFileName + '.js'))
            .pipe(gulp.dest(destPath))
    )
};


pipes.compileSourceJsMinified = function (srcPath, destPath, rootJsBaseName, componentFoldersArray, serviceFileNamesArray, directiveFoldersArray, baseTranslationFileName, hasInternal) {

    var filesToConcat = [];
    //get all the  component folders
    for (var i = 0; i < componentFoldersArray.length; i++) {
        filesToConcat.push(srcPath + "components/" + componentFoldersArray[i] + "**/*.js")
    }
    //get all the  services
    for (var i = 0; i < serviceFileNamesArray.length; i++) {
        filesToConcat.push(srcPath + "services/" + serviceFileNamesArray[i] + "*.js")
    }
    //get all the  directives
    for (var i = 0; i < directiveFoldersArray.length; i++) {
        filesToConcat.push(srcPath + "directives/" + directiveFoldersArray[i] + "**/*.js")
    }
    //add translation file
    filesToConcat.push(srcPath + baseTranslationFileName + "*.js");

    var dateToday = createSuffixDate();

    if (hasInternal) {

        filesToConcat.push(srcPath + rootJsBaseName + "INT-en" + "*.js");
        pipes.builtAppCmpScriptsProd(filesToConcat, rootJsBaseName + "INT-en" + dateToday + '.min.js', destPath);
        filesToConcat.pop();
        filesToConcat.push(srcPath + rootJsBaseName + "INT-fr" + "*.js");
        pipes.builtAppCmpScriptsProd(filesToConcat, rootJsBaseName + "INT-fr" + dateToday + '.min.js', destPath);
        filesToConcat.pop();
    }
    filesToConcat.push(srcPath + rootJsBaseName + "EXT-en" + "*.js");
    pipes.builtAppCmpScriptsProd(filesToConcat, rootJsBaseName + "EXT-en" + dateToday + '.min.js', destPath);
    filesToConcat.pop();
    filesToConcat.push(srcPath + rootJsBaseName + "EXT-fr" + "*.js");
    return (
        (pipes.builtAppCmpScriptsProd(filesToConcat, rootJsBaseName + "EXT-fr" + dateToday + '.min.js', destPath))
    )
};

pipes.createBaseTemplates = function (destDir) {
    var copySources = gulp.src([paths.englishTemplate, paths.frenchTemplate], {read: true, base: wetBase});
    var replacement = '..';

    return (
        copySources
            .pipe(replace({
                patterns: [
                    {
                        match: 'formpath',
                        replacement: replacement
                    }

                ]
            }))
            .pipe(gulp.dest(destDir))
    );
    //paths.buildDev + /temp/
};

pipes.copyAndMinStyles = function (stylesArray, isTimeStamped, destPath) {

    var copySources = gulp.src(stylesArray,
        {read: true, base: ''});
    var dateToday = createSuffixDate();
    if (!isTimeStamped) dateToday = "";

    var copySources = gulp.src(stylesArray, {read: true, base: ''});
    return (
        copySources.pipe(cleanCSS())
            .pipe(rename("rep" + dateToday + ".min.css"))
            .pipe(gulp.dest(destPath))
    );


};

pipes.createProdRootHtml2 = function (srcPath, templatePath, metaObj, htmlPartial, src, ignorePath, outName, destDir, lang, formType) {


    pipes.insertDateStamp(templatePath, metaObj, lang, formType)
        .pipe(inject(gulp.src([htmlPartial]), {
            starttag: placeholders.mainContent,
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src([
                srcPath + 'app/lib/**/*.js',
                '!' + srcPath + 'app/lib/**/angular*.js'
            ]),
            {
                name: 'thirdParty',
                ignorePath: ignorePath,
                addRootSlash: false
            }))
        .pipe(inject(gulp.src([
                srcPath + paths.styles + "rep*.css",
                srcPath + paths.styles + styleFilesNames.select,
                srcPath + paths.styles + styleFilesNames.select2Style
            ]),
            {
                ignorePath: ignorePath,
                addRootSlash: false
            }
        ))
        .pipe(inject(gulp.src(src)
                .pipe(angularFilesort())
            , {
                ignorePath: ignorePath,
                addRootSlash: false,
                read: false
            }))
        .pipe(rename(outName))
        .pipe(gulp.dest(destDir))

};


//============================ Pipe Segmeents END =============================================

//============================Helper Function START===========================================

function createSuffixDate() {
    dateFormat.masks.suffixDate = '_yyyymmdd_HHMM';
    var now = new Date();
    var dateToday = dateFormat(now, "suffixDate");
    if (!_DATESTAMP) {
        _DATESTAMP = dateToday;
    }
    return _DATESTAMP;
}

//=================================Helper Function END ===========================================


//=============================== Tasks START ====================================================
gulp.task('dev-activity-copySrc', function () {
    /*  return (pipes.copyActivitySrc(false, paths.buildDevActivity))*/
    return (
        pipes.copySrcs(true, paths.buildDevActivity, activityComponentFolders, activityServiceFileNames, activityDirectiveFolders, activityTemplates, false)
    );

});


gulp.task('dev-global-watch', function () {
    var watcher = gulp.watch(['app/scripts/**/*.js', 'app/scripts/**/*.html'], ['dev-copy-changedFiles']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running watch tasks...');
        changedFile = event.path;
    });
});
gulp.task('dev-copy-changedFiles', function () {
    var destFolder = "";
    var filename = "";
    var folders = changedFile.split("\\");
    var compFolder = "";
    var matchingForms = [
        {
            matches: false,
            formName: "Activity",
            buildPath: paths.buildDevActivity,
            compFolders: activityComponentFolders,
            serviceFiles: activityServiceFileNames,
            directiveFiles: activityDirectiveFolders
        },
        {
            matches: false,
            formName: "Company",
            buildPath: paths.buildDevCompany,
            compFolders: companyComponentFolders,
            serviceFiles: companyServiceFileNames,
            directiveFiles: companyDirectiveFolders
        },
        {
            matches: false,
            formName: "Dossier",
            buildPath: paths.buildDevDossier,
            compFolders: dossierComponentFolders,
            serviceFiles: dossierServiceFileNames,
            directiveFiles: dossierDirectiveFolders
        },
        {
            matches: false,
            formName: "Transaction",
            buildPath: paths.buildDevTransaction,
            compFolders: transactionComponentFolders,
            serviceFiles: transactionServiceFileNames,
            directiveFiles: transactionDirectiveFolders
        },
        {
            matches: false,
            formName: "CSP",
            buildPath: paths.buildDevCSP,
            compFolders: cspComponentFolders,
            serviceFiles: cspServiceFileNames,
            directiveFiles: cspDirectiveFolders
        }
    ];

    if (folders.length > 0) {
        filename = folders[folders.length - 1];
        compFolder = folders[folders.length - 2];

    }
    for (var k = 0; k < matchingForms.length; k++) {
        var def = matchingForms[k];
        for (var i = 0; i < def.compFolders.length; i++) {
            if (def.compFolders[i].includes(compFolder)) {
                def.matches = true;
                console.info("copying file to components for " + def.formName + ".... " + changedFile);
                gulp.src(changedFile, {read: true, base: './'})
                    .pipe(gulp.dest(def.buildPath));
                break;
            }
        }
        if (!def.matches && filename) {
            for (var i = 0; i < def.serviceFiles.length; i++) {
                if (filename.includes(def.serviceFiles[i])) {
                    def.matches = true;
                    console.info("copying file to services for " + def.formName + ".... " + changedFile);
                    gulp.src(changedFile, {read: true, base: './'})
                        .pipe(gulp.dest(def.buildPath));
                    break;
                }
            }
            if (!def.matches && filename) {
                for (var i = 0; i < def.directiveFiles.length; i++) {
                    if (filename.includes(def.directiveFiles[i])) {
                        def.matches = true;
                        console.info("copying file to directives for " + def.formName + ".... " + changedFile);
                        gulp.src(changedFile, {read: true, base: './'})
                            .pipe(gulp.dest(def.buildPath));
                        break;
                    }
                }
            }

        }
    }

    return true
});

gulp.task('dev-activity-copyTranslate', function () {

    var translationList = activityTranslationFilesBaseList;

    return (pipes.translateDev(translationList, paths.buildDevActivity));
});

gulp.task('dev-activity-createResources', ['dev-activity-copyTranslate'], function () {
    var srcPath = paths.buildDevActivity;
    var destPath = paths.buildDevActivity + paths.relScript;
    var filename = 'translations' + createSuffixDate();
    return (pipes.compileTranslateFile(srcPath, destPath, filename, activityTranslationFilesBaseList));

});
gulp.task('dev-transaction-createResources', ['dev-transaction-copyTranslate'], function () {
    var devPath = paths.buildDevTransaction;
    return (
        gulp.src(devPath + paths.translations + '*.json')
            .pipe(angularTranslate('translations' + createSuffixDate() + '.js'))
            .pipe(gulp.dest(devPath + paths.relScript))
    )
});
gulp.task('dev-company-createResources', ['dev-company-copyTranslate'], function () {

    var srcPath = paths.buildDevCompany;
    var destPath = paths.buildDevCompany + paths.relScript;
    var filename = 'translations' + createSuffixDate();
    return (pipes.compileTranslateFile(srcPath, destPath, filename, companyTranslationFilesBaseList));
});

gulp.task('dev-dossier-createResources', ['dev-dossier-copyTranslate'], function () {

    var srcPath = paths.buildDevDossier;
    var destPath = paths.buildDevDossier + paths.relScript;
    var filename = 'translations' + createSuffixDate();
    return (pipes.compileTranslateFile(srcPath, destPath, filename, dossierTranslationFilesBaseList));
});


gulp.task('dev-activity-copyLib', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*', '!' + paths.lib + libFileNames.deepDiffMin],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevActivity))

});

gulp.task('dev-global-copyWetDep', function () {
    return (pipes.copyWet(paths.buildDev))
});

gulp.task('dev-cleanEnvironment', function () {
    return (pipes.cleanBuild(paths.buildDev));
});

gulp.task('dev-activity-createRootJS', function () {
    var lang = 'en';
    var dest = paths.buildDevActivity + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.activityRoot + '.js';
    var skipDate = true;
    var generateInternalForms = true;
    return (
        pipes.createRootFileSet(rootFile, dest, skipDate, generateInternalForms)
    );

});


gulp.task('dev-activity-htmlBuild', ['dev-global-create-src-template', 'dev-activity-copyData', 'dev-activity-copySrc', 'dev-activity-copyLib', 'dev-activity-createRootJS', 'dev-activity-createResources'], function () {
    var today = createSuffixDate();
    today = "";
    var deploy = deployType.dev;
    pipes.createRootHtml(paths.devFrenchTemplate, activityRootTitles_fr, 'activityINT-fr.html', 'activityAppINT-fr' + today + '.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'fr', deploy);
    pipes.createRootHtml(paths.devFrenchTemplate, activityRootTitles_fr, 'activityEXT-fr.html', 'activityAppEXT-fr' + today + '.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'fr', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, activityRootTitles_en, 'activityEXT-en.html', 'activityAppEXT-en' + today + '.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'en', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, activityRootTitles_en, 'activityINT-en.html', 'activityAppINT-en' + today + '.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'en', deploy);

    return (
        pipes.cleanBuild(paths.buildDevActivity + paths.translations)
    );


});
gulp.task('dev-activity-clean', function () {
    return (pipes.cleanBuild(paths.buildDevActivity + 'app/'));

});
gulp.task('dev-company-clean', function () {
    return (pipes.cleanBuild(paths.buildDevCompany + 'app/'));

});
gulp.task('dev-transaction-clean', function () {
    return (pipes.cleanBuild(paths.buildDevTransaction + 'app/'));

});
gulp.task('dev-dossier-clean', function () {
    return (pipes.cleanBuild(paths.buildDevDossier + 'app/'));

});
gulp.task('dev-csp-clean', function () {
    return (pipes.cleanBuild(paths.buildDevCSP + 'app/'));

});



/******* Company Taska ****/

//copy all the needed files for company
gulp.task('dev-company-copySrc', function () {
    return (
        pipes.copySrcs(true, paths.buildDevCompany, companyComponentFolders, companyServiceFileNames, companyDirectiveFolders,companyTemplates, false)
    )
});


gulp.task('dev-company-createRootJS', function () {
    var dest = paths.buildDevCompany + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.companyRoot + '.js';
    var skipDate = true;
    var generateInternalForms = true;
    return (
        pipes.createRootFileSet(rootFile, dest, skipDate, generateInternalForms)
    );
});

gulp.task('dev-company-copyTranslate', function () {
    return (pipes.translateDev(companyTranslationFilesBaseList, paths.buildDevCompany))
});

gulp.task('dev-company-htmlBuild', ['dev-global-create-src-template', 'dev-company-copyData', 'dev-company-copySrc', 'dev-company-copyLib', 'dev-company-createRootJS', 'dev-company-createResources'], function () {
    var ignoreDir = '/build/dev/company';
    var buildDir = paths.buildDevCompany;
    var htmlPartial = jsRootContent.partialCompanyRoot;
    var today = createSuffixDate();
    today = "";
    var deploy = deployType.dev;
    pipes.createRootHtml(paths.devFrenchTemplate, companyRootTitles_fr, 'companyEnrolINT-fr.html', 'companyAppINT-fr' + today + '.js', htmlPartial, buildDir, ignoreDir, 'fr', deploy);
    pipes.createRootHtml(paths.devFrenchTemplate, companyRootTitles_fr, 'companyEnrolEXT-fr.html', 'companyAppEXT-fr' + today + '.js', htmlPartial, buildDir, ignoreDir, 'fr', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, companyRootTitles_en, 'companyEnrolEXT-en.html', 'companyAppEXT-en' + today + '.js', htmlPartial, buildDir, ignoreDir, 'en', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, companyRootTitles_en, 'companyEnrolINT-en.html', 'companyAppINT-en' + today + '.js', htmlPartial, buildDir, ignoreDir, 'en', deploy);
    return (
        pipes.cleanBuild(buildDir + paths.translations)

    );


});

gulp.task('dev-company-copyLib', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevCompany))

});


gulp.task('dev-company-copyWet', function () {
    return (pipes.copyWet(paths.buildDevCompany))
});



/**********************Start Transaction Gulp scripts******/
//copy all the needed files for company
gulp.task('dev-transaction-copySrc', function () {

    return (
        pipes.copySrcs(true, paths.buildDevTransaction, transactionComponentFolders, transactionServiceFileNames, transactionDirectiveFolders,transactionTemplates, false)
    );


});


gulp.task('dev-transaction-createRootJs', function () {
    var dest = paths.buildDevTransaction + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.transactionRoot + '.js';
    var skipDate = true;
    var generateInternalForms = false;
    return (
        pipes.createRootFileSet(rootFile, dest, skipDate, generateInternalForms)
    );

});
gulp.task('dev-transaction-copyTranslate', function () {
    return (pipes.translateDev(transactionTranslationFilesBaseList, paths.buildDevTransaction))
});

gulp.task('dev-transaction-copyLib', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevTransaction))

});
/*gulp.task('dev-transaction-copyWetDep', function () {
 return (pipes.copyWet(paths.buildDevTransaction))
 });*/


gulp.task('dev-transaction-htmlBuild', ['dev-global-create-src-template', 'dev-transaction-copyData', 'dev-transaction-copySrc', 'dev-transaction-copyLib', 'dev-transaction-createRootJs', 'dev-transaction-createResources'], function () {
    var ignoreDir = '/build/dev/transaction';
    var buildDir = paths.buildDevTransaction;
    var htmlPartial = jsRootContent.partialTransactionRoot;
    var today = createSuffixDate();
    today = "";
    var deploy = deployType.dev;
    pipes.createRootHtml(paths.devFrenchTemplate, transactionRootTitles_fr, 'transactionEnrol-fr.html', 'transactionAppEXT-fr' + today + '.js', htmlPartial, buildDir, ignoreDir, 'fr', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, transactionRootTitles_en, 'transactionEnrol-en.html', 'transactionAppEXT-en' + today + '.js', htmlPartial, buildDir, ignoreDir, 'en', deploy);

    return (
        pipes.cleanBuild(buildDir + paths.translations)
    );

});

/******** Dossier Related  tasks  *****************/

gulp.task('dev-dossier-copyWet', function () {
    return (pipes.copyWet(paths.buildDevDossier))
});
gulp.task('dev-dossier-copyLib', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return (copySources.pipe(gulp.dest(paths.buildDevDossier)));
});
gulp.task('dev-dossier-copyData', function () {
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDev)));
});
gulp.task('dev-company-copyData', function () {
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDev)));
});
gulp.task('dev-activity-copyData', function () {

    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDev)));
});

gulp.task('dev-transaction-copyData', function () {
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDev)));
});

gulp.task('dev-csp-copyData', function () {
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDev)));
});


gulp.task('dev-dossier-copyTranslate', [], function () {

    return (pipes.translateDev(dossierTranslationFilesBaseList, paths.buildDevDossier));
});


gulp.task('dev-dossier-copySrc', [], function () {
    return (
        pipes.copySrcs(true, paths.buildDevDossier, dossierComponentFolders, dossierServiceFileNames, dossierDirectiveFolders,dossierTemplates, false)
    )
});

gulp.task('dev-dossier-createRootJS', function () {

    var dest = paths.buildDevDossier + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.dossierRoot + '.js';
    var skipDate = true;
    var generateInternalForms = true;
    return (
        pipes.createRootFileSet(rootFile, dest, skipDate, generateInternalForms)
    );


});


/**
 * Generates the base Dossier HTML file.
 * First copies the source files (copyDossierSrcDev),
 * library files (copyLibDevDossier),
 * Then creates 4 versions of main app file (dossierApp).
 * Creates 4 html files- internal english, internal french, external english, external french
 */
//' dev-dossier-insertTranslateLoader '
gulp.task('dev-dossier-htmlBuild', ['dev-global-create-src-template', 'dev-dossier-copyData', 'dev-dossier-copySrc', 'dev-dossier-copyLib', 'dev-dossier-createRootJS', 'dev-dossier-createResources'], function () {

    var ignoreDir = '/build/dev/dossier';
    var buildDir = paths.buildDevDossier;
    var htmlPartial = jsRootContent.partialDossierRoot;
    var today = createSuffixDate();
    today = "";
    var deploy = deployType.dev;
    pipes.createRootHtml(paths.devFrenchTemplate, dossierRootTitles_fr, 'dossierEnrolINT-fr.html', 'dossierAppINT-fr' + today + '.js', htmlPartial, buildDir, ignoreDir, 'fr', deploy);
    pipes.createRootHtml(paths.devFrenchTemplate, dossierRootTitles_fr, 'dossierEnrolEXT-fr.html', 'dossierAppEXT-fr' + today + '.js', htmlPartial, buildDir, ignoreDir, 'fr', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, dossierRootTitles_en, 'dossierEnrolEXT-en.html', 'dossierAppEXT-en' + today + '.js', htmlPartial, buildDir, ignoreDir, 'en', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, dossierRootTitles_en, 'dossierEnrolINT-en.html', 'dossierAppINT-en' + today + '.js', htmlPartial, buildDir, ignoreDir, 'en', deploy);
    return (
        pipes.cleanBuild(buildDir + paths.translations)
    );
});


/*******************PRODUCTIION SCRIPTS START HERE **********************/

gulp.task('prod-global-cleanEnvironment', function () {
    pipes.cleanBuild(paths.buildProd)

});




/**
 * Blind copies all the data files from the data source directory to the prod directory
 * */
gulp.task('prod-global-copyDataFolder', function () {
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildProd)));
});


gulp.task('prod-global-copyWetDependencies', function () {
    return (pipes.copyWet(paths.buildProd))
});


/********* PRODUCTION ACTIVITY**********/


gulp.task('prod-activity-copyTranslateFiles', function () {

    var destPath = paths.buildProdActivity;

    var translationList = activityTranslationFilesBaseList;

    return (pipes.translateDev(translationList, destPath));
});



//copy source files
gulp.task('prod-activity-copySourceFiles', function () {
    return (
        pipes.copySrcs(false, paths.buildProdActivity, activityComponentFolders, activityServiceFileNames, activityDirectiveFolders,activityTemplates, true)
    );
});

gulp.task('prod-activity-deleteSourceFiles', function () {
    return (
        pipes.deleteSrcs(paths.buildProdActivity + 'app/scripts', activityComponentFolders, activityServiceFileNames, activityDirectiveFolders)
    );
});

/*********** COMPANY PRODCTION SCRIPTS ****************/


gulp.task('prod-company-copySourceFiles', function () {
    return (
        pipes.copySrcs(false, paths.buildProdCompany, companyComponentFolders, companyServiceFileNames, companyDirectiveFolders,companyTemplates, true)
    );
});

gulp.task('prod-company-allFormsCreate', ['prod-company-compileHtml'], function () {

    return pipes.deleteResourcesNonMinFiles(paths.buildProdCompany);

});


gulp.task('prod-company-compileHtml', ['prod-global-create-src-template', 'prod-global-copyDataFolder', 'prod-company-compileSrcJs', 'prod-company-copyLib'], function () {

    var ignorePath = '/build/prod/company';
    var basePath = paths.buildProdCompany;
    var destPath = paths.buildProdCompany;
    var htmlPartial = jsRootContent.partialCompanyRoot;

    var srcJsExtEn = [
        basePath + 'app/scripts/' + 'companyAppEXT-en' + '*.min.js',
        paths.buildProdCompany + 'app/lib/**/angular*.js'
    ];
    var srcJsExtFr = [
        basePath + 'app/scripts/' + 'companyAppEXT-fr' + '*.min.js',
        paths.buildProdCompany + 'app/lib/**/angular*.js'
    ];
    var srcJsIntFr = [
        basePath + 'app/scripts/' + 'companyAppINT-fr' + '*.min.js',
        paths.buildProdCompany + 'app/lib/**/angular*.js'
    ];
    var srcJsIntEn = [
        basePath + 'app/scripts/' + 'companyAppINT-en' + '*.min.js',
        paths.buildProdCompany + 'app/lib/**/angular*.js'
    ];
    var srcPath = paths.buildProdCompany;

    pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, companyRootTitles_en, htmlPartial, srcJsExtEn, ignorePath, 'companyEXT-en.html', destPath, 'en', deployType.prod);
    pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, companyRootTitles_fr, htmlPartial, srcJsExtFr, ignorePath, 'companyEXT-fr.html', destPath, 'fr', deployType.prod);
    pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, companyRootTitles_fr, htmlPartial, srcJsIntFr, ignorePath, 'companyINT-fr.html', destPath, 'fr', deployType.prodInt);
    return pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, companyRootTitles_en, htmlPartial, srcJsIntEn, ignorePath, 'companyINT-en.html', destPath, 'en', deployType.prodInt);

});
gulp.task('prod-company-compileSrcJs', ['prod-company-compileTranslateFile', 'prod-company-createRootJsFiles', 'prod-company-copySourceFiles'], function () {

    var srcPath = paths.buildProdCompany + 'app/scripts/';
    var dest = paths.buildProdCompany + 'app/scripts/';
    var rootJsBaseName = "companyApp";
    var translateName = "companyTranslations";
    return (
        pipes.compileSourceJsMinified(srcPath, dest, rootJsBaseName, companyComponentFolders, companyServiceFileNames, companyDirectiveFolders, translateName, true)
    )
});
gulp.task('prod-company-compileTranslateFile', ['prod-company-copyTranslateFiles'], function () {

    var destPath = paths.buildProdCompany+ paths.relScript;
    var srcPath = paths.buildProdCompany;
    return (pipes.compileTranslateFile(srcPath, destPath, "companyTranslations", companyTranslationFilesBaseList));

});

gulp.task('prod-company-copyTranslateFiles', function () {

    var destPath = paths.buildProdCompany;

    var translationList = companyTranslationFilesBaseList;

    return (pipes.translateDev(translationList, destPath));

});

gulp.task('prod-company-createRootJsFiles', [], function () {
    var dest = paths.buildProdCompany + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.companyRoot + ".js";
    return (
        pipes.createRootFileSet(rootFile, dest, true, true)
    );
});

gulp.task('prod-company-copyLib', function () {
    var srcArray = stylesProd;

    for (var i = 0; i < libProd.length; i++) {
        srcArray.push(libProd[i])
    }
    var copySources = gulp.src(srcArray, {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildProdCompany))
});


/****** END COMPANY PROD SCRIPTS******/

/***START DOSSIER PROD SCRIPTS****/


gulp.task('prod-dossier-clean', function () {
    return (pipes.cleanBuild(paths.buildProdDossier));

});


gulp.task('prod-dossier-allFormsCreate', ['prod-dossier-compileHtml'], function () {

    return pipes.deleteResourcesNonMinFiles(paths.buildProdDossier);

});



gulp.task('prod-dossier-compileHtml', ['prod-global-create-src-template', 'prod-global-copyDataFolder', 'prod-dossier-compileSrcJs', 'prod-dossier-copyLib'], function () {

    var ignorePath = '/build/prod/dossier';
    var basePath = paths.buildProdDossier;
    var destPath = paths.buildProdDossier;
    var htmlPartial = jsRootContent.partialDossierRoot;

    var srcJsExtEn = [
        basePath + 'app/scripts/' + 'dossierAppEXT-en' + '*.min.js',
        paths.buildProdDossier + 'app/lib/**/angular*.js'
    ];
    var srcJsExtFr = [
        basePath + 'app/scripts/' + 'dossierAppEXT-fr' + '*.min.js',
        paths.buildProdDossier + 'app/lib/**/angular*.js'
    ];
    var srcJsIntFr = [
        basePath + 'app/scripts/' + 'dossierAppINT-fr' + '*.min.js',
        paths.buildProdDossier + 'app/lib/**/angular*.js'
    ];
    var srcJsIntEn = [
        basePath + 'app/scripts/' + 'dossierAppINT-en' + '*.min.js',
        paths.buildProdDossier + 'app/lib/**/angular*.js'
    ];

    var srcPath = paths.buildProdDossier;

    pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, dossierRootTitles_en, htmlPartial, srcJsExtEn, ignorePath, 'dossierEXT-en.html', destPath, 'en', deployType.prod);
    pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, dossierRootTitles_fr, htmlPartial, srcJsExtFr, ignorePath, 'dossierEXT-fr.html', destPath, 'fr', deployType.prod);
    pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, dossierRootTitles_fr, htmlPartial, srcJsIntFr, ignorePath, 'dossierINT-fr.html', destPath, 'fr', deployType.prodInt);

    return pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, dossierRootTitles_en, htmlPartial, srcJsIntEn, ignorePath, 'dossierINT-en.html', destPath, 'en', deployType.prodInt);

});


gulp.task('prod-dossier-compileSrcJs', ['prod-dossier-compileTranslateFile', 'prod-dossier-createRootJsFiles', 'prod-dossier-copySourceFiles'], function () {

    var srcPath = paths.buildProdDossier + 'app/scripts/';
    var dest = paths.buildProdDossier + 'app/scripts/';
    var rootJsBaseName = "dossierApp";
    var translateName = "dossierTranslations";
    return (
        pipes.compileSourceJsMinified(srcPath, dest, rootJsBaseName, dossierComponentFolders, dossierServiceFileNames, dossierDirectiveFolders, translateName, true)
    )
});

gulp.task('prod-dossier-compileTranslateFile', ['prod-dossier-copyTranslateFiles'], function () {

    var destPath = paths.buildProdDossier+ paths.relScript;
    var srcPath = paths.buildProdDossier;
    return (pipes.compileTranslateFile(srcPath, destPath, "dossierTranslations", dossierTranslationFilesBaseList));

});

gulp.task('prod-dossier-copyTranslateFiles', function () {

    var destPath = paths.buildProdDossier;

    var translationList = dossierTranslationFilesBaseList;

    return (pipes.translateDev(translationList, destPath));

});
gulp.task('prod-dossier-createRootJsFiles', [], function () {
    var dest = paths.buildProdDossier + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.dossierRoot + ".js";
    return (
        pipes.createRootFileSet(rootFile, dest, true, true)
    );
});

gulp.task('prod-dossier-copySourceFiles', function () {
    return (
        pipes.copySrcs(false, paths.buildProdDossier, dossierComponentFolders, dossierServiceFileNames, dossierDirectiveFolders,dossierTemplates, true)
    );
});

gulp.task('prod-dossier-copyLib', function () {
    var srcArray = stylesProd;

    for (var i = 0; i < libProd.length; i++) {
        srcArray.push(libProd[i])
    }

    var copySources = gulp.src(srcArray, {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildProdDossier))

});


/*******************END DOSSIER PROD SCRIPTS*************************************************/


/******START TRANSACTION PROD SCRIPTS******/

gulp.task('prod-transaction-copyTranslateFiles', function () {

    var destPath = paths.buildProdTransaction
    var translationList = transactionTranslationFilesBaseList;

    return (pipes.translateDev(translationList, destPath));

});
gulp.task('prod-transaction-compileTranslateFile', ['prod-transaction-copyTranslateFiles'], function () {

    var destPath = paths.buildProdTransaction + paths.relScript;
    return (pipes.compileTranslateFile(paths.buildProdTransaction, destPath, "transactionTranslations", transactionTranslationFilesBaseList));

});

/**
 * Creates the root JS files for internal/external and french/English forms
 * */
gulp.task('prod-transaction-createRootJsFiles', function () {
    var dest = paths.buildProdTransaction + 'app/scripts/';
    var rootPath = paths.scripts + "/" + rootFileNames.transactionRoot + ".js";
    //skip the date and and generate internal files
    return (
        pipes.createRootFileSet(rootPath, dest, true, false)
    );

});


gulp.task('prod-transaction-compileSrcJs', ['prod-transaction-compileTranslateFile', 'prod-transaction-createRootJsFiles', 'prod-transaction-copySourceFiles'], function () {

    var srcPath = paths.buildProdTransaction + 'app/scripts/';
    var dest = paths.buildProdTransaction + 'app/scripts/';
    var rootJsBaseName = "transactionApp";
    var translateName = "transactionTranslations";
    var hasInternal = false;
    return (
        pipes.compileSourceJsMinified(srcPath, dest, rootJsBaseName, transactionComponentFolders, transactionServiceFileNames, transactionDirectiveFolders, translateName, hasInternal)
    )
});


gulp.task('prod-transaction-copySourceFiles', function () {
    return (
        pipes.copySrcs(false, paths.buildProdTransaction, transactionComponentFolders, transactionServiceFileNames, transactionDirectiveFolders,transactionTemplates, true)
    );
});


/******END TRANSACTION PROD SCRIPTS******/
////////////////////////// Start CSP PROD scripts



gulp.task('prod-csp-copySourceFiles', function () {
    return (
        pipes.copySrcs(false, paths.buildProdCsp, cspComponentFolders, cspServiceFileNames, cspDirectiveFolders,[], true)
    );
});

gulp.task('prod-csp-allFormsCreate', ['prod-csp-compileHtml'], function () {

    return pipes.deleteResourcesNonMinFiles(paths.buildProdCsp);

});


gulp.task('prod-csp-compileHtml', ['prod-global-create-src-template', 'prod-global-copyDataFolder', 'prod-csp-compileSrcJs', 'prod-csp-copyLib'], function () {

    var ignorePath = '/build/prod/csp';
    var basePath = paths.buildProdCsp;
    var destPath = paths.buildProdCsp;
    var htmlPartial = jsRootContent.partialCSPFormRoot;

    var srcJsExtEn = [
        basePath + 'app/scripts/' + 'cspAppEXT-en' + '*.min.js',
        paths.buildProdCsp + 'app/lib/**/angular*.js'
    ];
    var srcJsExtFr = [
        basePath + 'app/scripts/' + 'cspAppEXT-fr' + '*.min.js',
        paths.buildProdCsp + 'app/lib/**/angular*.js'
    ];
    var srcJsIntFr = [
        basePath + 'app/scripts/' + 'cspAppINT-fr' + '*.min.js',
        paths.buildProdCsp + 'app/lib/**/angular*.js'
    ];
    var srcJsIntEn = [
        basePath + 'app/scripts/' + 'cspAppINT-en' + '*.min.js',
        paths.buildProdCsp + 'app/lib/**/angular*.js'
    ];
    var srcPath = paths.buildProdCsp;

    pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, cspRootTitles_en, htmlPartial, srcJsExtEn, ignorePath, 'cspEXT-en.html', destPath, 'en', deployType.prod);
    pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, cspRootTitles_fr, htmlPartial, srcJsExtFr, ignorePath, 'cspEXT-fr.html', destPath, 'fr', deployType.prod);
    pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, cspRootTitles_fr, htmlPartial, srcJsIntFr, ignorePath, 'cspINT-fr.html', destPath, 'fr', deployType.prodInt);
    return pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, cspRootTitles_en, htmlPartial, srcJsIntEn, ignorePath, 'cspINT-en.html', destPath, 'en', deployType.prodInt);

});
gulp.task('prod-csp-compileSrcJs', ['prod-csp-compileTranslateFile', 'prod-csp-createRootJsFiles', 'prod-csp-copySourceFiles'], function () {

    var srcPath = paths.buildProdCsp + 'app/scripts/';
    var dest = paths.buildProdCsp + 'app/scripts/';
    var rootJsBaseName = rootFileNames.cspRoot;
    var translateName = "cspTranslations";
    return (
        pipes.compileSourceJsMinified(srcPath, dest, rootJsBaseName, cspComponentFolders, cspServiceFileNames, cspDirectiveFolders, translateName, true)
    )
});


gulp.task('prod-csp-compileTranslateFile', ['prod-csp-copyTranslateFiles'], function () {

    var destPath = paths.buildProdCsp+ paths.relScript;
    var srcPath = paths.buildProdCsp;
    return (pipes.compileTranslateFile(srcPath, destPath, "cspTranslations", cspTranslationFilesBaseList));

});

gulp.task('prod-csp-copyTranslateFiles', function () {

    var destPath = paths.buildProdCsp;

    var translationList = cspTranslationFilesBaseList;

    return (pipes.translateDev(translationList, destPath));

});

gulp.task('prod-csp-createRootJsFiles', [], function () {
    var dest = paths.buildProdCsp + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.cspRoot + ".js";
    return (
        pipes.createRootFileSet(rootFile, dest, true, true)
    );
});

gulp.task('prod-csp-copyLib', function () {
    var srcArray = stylesProd;

    for (var i = 0; i < libCsp.length; i++) {
        srcArray.push(libCsp[i])
    }
    var copySources = gulp.src(srcArray, {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildProdCsp))
});











/////////////// End CSP Prod scripts

gulp.task('connect-server-start', function () {
    connect.server({
        root: "build",
        // host:"127.0.0.1",
        port: 2121,
        livereload: true
    });
});



gulp.task('dev-diffForm-clean', function () {
    return (pipes.cleanBuild(paths.buildDevDiff + 'app/'));

});

/*gulp.task('dev-diffForm-copyWetDep', function () {
 return (pipes.copyWet(paths.buildDevDiff))
 });*/

gulp.task('dev-diffForm-copyData', function () {
    var def = Q.defer();
    var dataList = [paths.data + "xmlDiffExclusions.json"];

    var copySources = gulp.src(dataList,
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDevDiff)));
});


gulp.task('dev-diffForm-copyLib', function () {
    var copySources = gulp.src([
            paths.lib + libFileNames.angularMin,
            paths.lib + libFileNames.ariaMin,
            paths.lib + libFileNames.resourceMin,
            paths.lib + libFileNames.sanitizeMin,
            paths.lib + libFileNames.translateMin,
            paths.lib + libFileNames.xml2Json,
            paths.lib + libFileNames.deepDiffMin,
            paths.lib + libFileNames.uiTreeMin,
            paths.styles + '**/' + styleFilesNames.repDiff,
            paths.styles + '**/' + styleFilesNames.uiTree
        ],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevDiff))
});

gulp.task('dev-diffForm-copySrc', function () {
    var servFiles = [serviceFileNames.diffService];
    var compFolder = [componentFolders.nodesRender, componentFolders.diffFileIO, componentFolders.diffMain];
    var rootFile = paths.scripts + "/" + rootFileNames.dossierRoot + '.js';
    //var copySourcesJs = gulp.src([paths.scripts + "/"+rootFileNames.repDiff+".js"], {read: true, base: './'});
    // copySourcesJs.pipe(gulp.dest(paths.buildDevDiff));
    return (
        pipes.copySrcs(true, paths.buildDevDiff, compFolder, servFiles, [], false)
    );

});

gulp.task('dev-diffForm-copyTranslate', function () {

    var translationList = diffFormTranslationBaseList;

    return (pipes.translateDev(translationList, paths.buildDevDiff));


});

gulp.task('dev-diffForm-createRootJS', function () {
    var dest = paths.buildDevDiff + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.repDiff + '.js';
    var skipDate = true;
    var generateInternalForms = false;
    return (
        pipes.createRootFileSet(rootFile, dest, skipDate, generateInternalForms)
    );

});


gulp.task('dev-diffForm-createResources', ['dev-diffForm-copyTranslate'], function () {

    var srcPath = paths.buildDevDiff;
    var destPath = paths.buildDevDiff + paths.relScript;
    var filename = 'translations' + createSuffixDate();
    return (pipes.compileTranslateFile(srcPath, destPath, filename, diffFormTranslationBaseList));
});


gulp.task('dev-diffForm-htmlBuild', ['dev-diffForm-copyData', 'dev-diffForm-copySrc', 'dev-diffForm-copyLib', 'dev-diffForm-createRootJS', 'dev-diffForm-createResources'], function () {

    var deploy = deployType.dev;
    var ignoreDir = '/build/dev/repDiff';
    var stylesList = [
        paths.styles + styleFilesNames.repDiff,
        paths.styles + styleFilesNames.uiTree
    ];
    return (

        pipes.createRootHtml(paths.englishTemplate, diffFormRootTitles_en, 'diffForm-en.html', 'diffAppEXT-en.js', jsRootContent.partialDiffFormRoot, paths.buildDevDiff, ignoreDir, 'en', deploy, stylesList)
    );

});

//=========================================
// Certificate of Supplementary Protection

gulp.task('dev-csp-copyWet', function () {
    return (pipes.copyWet(paths.buildDevCSP))
});

gulp.task('dev-csp-copySrc', function () {
    return (
        pipes.copySrcs(true, paths.buildDevCSP, cspComponentFolders, cspServiceFileNames, cspDirectiveFolders,[], false)
    )
});

gulp.task('dev-csp-createRootJS', function () {
    var dest = paths.buildDevCSP + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.cspRoot + '.js';
    var skipDate = true;
    var generateInternalForms = true;
    return (
        pipes.createRootFileSet(rootFile, dest, skipDate, generateInternalForms)
    );
});

gulp.task('dev-csp-copyTranslate', function () {
    return (pipes.translateDev(cspTranslationFilesBaseList, paths.buildDevCSP))
});

gulp.task('dev-csp-copyLib', function () {

    var srcs=libCsp;
    srcs.push(paths.styles + '**/*')
    var copySources = gulp.src(srcs,
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevCSP))

});
gulp.task('dev-csp-createResources', ['dev-csp-copyTranslate'], function () {

    var srcPath = paths.buildDevCSP;
    var destPath = paths.buildDevCSP + paths.relScript;
    var filename = 'translations' + createSuffixDate();
    return (pipes.compileTranslateFile(srcPath, destPath, filename, cspTranslationFilesBaseList));
});


gulp.task('dev-csp-htmlBuild', ['dev-global-create-src-template', 'dev-csp-copyData', 'dev-csp-copySrc', 'dev-csp-copyLib', 'dev-csp-createRootJS', 'dev-csp-createResources'], function () {
    var ignoreDir = '/build/dev/csp';
    var buildDir = paths.buildDevCSP;
    var htmlPartial = jsRootContent.partialCSPFormRoot;
    var today = createSuffixDate();
    today = ""; //remove if you want the timestamp!
    var deploy = deployType.dev;
    pipes.createRootHtml(paths.devFrenchTemplate, cspRootTitles_fr, 'cspINT-fr.html', 'cspAppINT-fr' + today + '.js', htmlPartial, buildDir, ignoreDir, 'fr', deploy);
    pipes.createRootHtml(paths.devFrenchTemplate, cspRootTitles_fr, 'cspEXT-fr.html', 'cspAppEXT-fr' + today + '.js', htmlPartial, buildDir, ignoreDir, 'fr', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, cspRootTitles_en, 'cspEXT-en.html', 'cspAppEXT-en' + today + '.js', htmlPartial, buildDir, ignoreDir, 'en', deploy);
    pipes.createRootHtml(paths.devEnglishTemplate, cspRootTitles_en, 'cspINT-en.html', 'cspAppINT-en' + today + '.js', htmlPartial, buildDir, ignoreDir, 'en', deploy);
    return (
        pipes.cleanBuild(buildDir + paths.translations)

    );
});

gulp.task('dev-csp-injectTest', [], function () {
    var ignoreDir = '/build/dev/csp';
    var templateDir = paths.buildDevCSP+'app/scripts/components/'+componentFolders.cspMain;

    var template= templateDir+"tpl-csp-main.html";
    console.log(template)
    var cspTest='<input id="testInput" type="text"  ng-model="main.test" ng-blur="main.testMe()" />';
    return (gulp.src(template)
            .pipe(htmlreplace({
                test: cspTest
            })).pipe(gulp.dest(templateDir))
    );


});


//==================================================================

//=========================================
gulp.task('protractor-testEnv', function () {
    gulp.src([
         'app/spec/e2e/tests/transaction/*.js',
         'app/spec/e2e/tests/dossier/*.js',
         'app/spec/e2e/tests/company/*.js',
        'app/spec/e2e/tests/activity/*.js'
    ])
        .pipe(protractor({
            configFile: "./protractorconf.js",
            args: [
                '--baseUrl', 'https://lam-dev.hres.ca/rep_test/',
                '--params.lang' ,'en',
                '--params.formType','EXT'
            ]
        }))

        .on('error', function (e) {
            console.error(e);
            //throw e;
        })
});

gulp.task('protractor-localDevEnv', function () {
    gulp.src([

        'app/spec/e2e/tests/csp/csp-main*.js'
      /*  'app/spec/e2e/tests/activity/!*.js'*/
    ])
        .pipe(protractor({
            configFile: "./protractorconf.js",

            args: [
                '--baseUrl', 'http://localhost:2121/dev/',
                '--params.lang' ,'en',
                '--params.formType','EXT'
            ]
        }))

        .on('error', function (e) {
            console.error(e);
            //throw e;
        })
});



/**
 *  Runs the selenium standalone we
 */
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
gulp.task('web-driver', webdriver_standalone);

var webdriver_update = require('gulp-protractor').webdriver_update;
gulp.task('webdriver_update', webdriver_update);


gulp.task('dev-global-create-src-template', function () {

    return (pipes.createBaseTemplates(paths.buildDev + '/templates/'));

});

gulp.task('prod-global-create-src-template', function () {

    return (pipes.createBaseTemplates(paths.buildProd + '/templates/'));

});

gulp.task('prod-activity-allFormsCreate', ['prod-activity-compileHtml'], function () {


    var basePath = paths.buildProdActivity;
    return pipes.deleteResourcesNonMinFiles(paths.buildProdActivity);

});

gulp.task('prod-activity-compileHtml', ['prod-global-create-src-template', 'prod-global-copyDataFolder', 'prod-activity-compileSrcJs', 'prod-activity-copyLib'], function () {

    var ignorePath = '/build/prod/activity';
    var baseActivityPath = paths.buildProdActivity;
    var destPath = paths.buildProdActivity;
    var htmlPartial = jsRootContent.partialActivityRoot;

    var srcJsExtEn = [
        baseActivityPath + 'app/scripts/' + 'activityAppEXT-en' + '*.min.js',
        paths.buildProdActivity + 'app/lib/**/angular*.js'
    ];
    var srcJsExtFr = [
        baseActivityPath + 'app/scripts/' + 'activityAppEXT-fr' + '*.min.js',
        paths.buildProdActivity + 'app/lib/**/angular*.js'
    ];
    var srcJsIntFr = [
        baseActivityPath + 'app/scripts/' + 'activityAppINT-fr' + '*.min.js',
        paths.buildProdActivity + 'app/lib/**/angular*.js'
    ];
    var srcJsIntEn = [
        baseActivityPath + 'app/scripts/' + 'activityAppINT-en' + '*.min.js',
        paths.buildProdActivity + 'app/lib/**/angular*.js'
    ];

    var srcPath = paths.buildProdActivity;

    pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, activityRootTitles_en, htmlPartial, srcJsExtEn, ignorePath, 'activityEXT-en.html', destPath, 'en', deployType.prod);
    pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, activityRootTitles_fr, htmlPartial, srcJsExtFr, ignorePath, 'activityEXT-fr.html', destPath, 'fr', deployType.prod);
    pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, activityRootTitles_fr, htmlPartial, srcJsIntFr, ignorePath, 'activityINT-fr.html', destPath, 'fr', deployType.prodInt);

    return pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, activityRootTitles_en, htmlPartial, srcJsIntEn, ignorePath, 'activityINT-en.html', destPath, 'en', deployType.prodInt);

});

gulp.task('prod-activity-copyLib', function () {
    var srcArray = stylesProd;

    for (var i = 0; i < libProd.length; i++) {
        srcArray.push(libProd[i])
    }

    var copySources = gulp.src(srcArray, {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildProdActivity))

});

gulp.task('prod-transaction-copyLib', function () {
    var srcArray = stylesProd;

    for (var i = 0; i < libProd.length; i++) {
        srcArray.push(libProd[i])
    }

    var copySources = gulp.src(srcArray, {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildProdTransaction))

});


gulp.task('prod-activity-clean', function () {
    return (pipes.cleanBuild(paths.buildProdActivity));

});
gulp.task('prod-transaction-clean', function () {
    return (pipes.cleanBuild(paths.buildProdTransaction));

});
gulp.task('prod-company-clean', function () {
    return (pipes.cleanBuild(paths.buildProdCompany));

});

gulp.task('prod-csp-clean', function () {
    return (pipes.cleanBuild(paths.buildProdCsp));

});




gulp.task('prod-activity-compileSrcJs', ['prod-activity-compileTranslateFile', 'prod-activity-createRootJsFiles', 'prod-activity-copySourceFiles'], function () {

    var srcPath = paths.buildProdActivity + 'app/scripts/';
    var dest = paths.buildProdActivity + 'app/scripts/';
    var rootJsBaseName = "activityApp";
    var translateName = "activityTranslations";
    return (
        pipes.compileSourceJsMinified(srcPath, dest, rootJsBaseName, activityComponentFolders, activityServiceFileNames, activityDirectiveFolders, translateName, true)
    )
});

gulp.task('prod-activity-createRootJsFiles', [], function () {
    var dest = paths.buildProdActivity + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.activityRoot + ".js";
    return (
        pipes.createRootFileSet(rootFile, dest, true, true)
    );
});

gulp.task('prod-activity-compileTranslateFile', ['prod-activity-copyTranslateFiles'], function () {

    var destPath = paths.buildProdActivity+ paths.relScript;
    var srcPath = paths.buildProdActivity;
    return (pipes.compileTranslateFile(srcPath, destPath, "activityTranslations", activityTranslationFilesBaseList));

});


gulp.task('prod-transaction-allFormsCreate', ['prod-transaction-compileHtml'], function () {


    return pipes.deleteResourcesNonMinFiles(paths.buildProdTransaction);

});


gulp.task('prod-transaction-compileHtml', ['prod-global-create-src-template', 'prod-global-copyDataFolder', 'prod-transaction-compileSrcJs', 'prod-transaction-copyLib'], function () {

    var ignorePath = '/build/prod/transaction';
    var destPath = paths.buildProdTransaction;
    var htmlPartial = jsRootContent.partialTransactionRoot;
    var libFiles = paths.buildProdTransaction + paths.relLib + '**/angular*.js';
    var srcJsExtEn = [
        paths.buildProdTransaction + 'app/scripts/' + 'transactionAppEXT-en' + '*.min.js',
        libFiles
    ];


    var srcJsExtFr = [
        paths.buildProdTransaction + 'app/scripts/' + 'transactionAppEXT-fr' + '*.min.js',
        libFiles
    ];

    var srcPath = paths.buildProdTransaction;
    var deploy = deployType.prod;
    pipes.createProdRootHtml2(srcPath, paths.prodEnglishTemplate, transactionRootTitles_en, htmlPartial, srcJsExtEn, ignorePath, 'transactionEXT-en.html', destPath, 'en', deploy)
    return (
        pipes.createProdRootHtml2(srcPath, paths.prodFrenchTemplate, transactionRootTitles_en, htmlPartial, srcJsExtFr, ignorePath, 'transactionEXT-fr.html', destPath, 'fr', deploy)
    )
});

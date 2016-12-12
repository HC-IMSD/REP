var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var print = require('gulp-print');
var Q = require('q');
var angularTranslate = require('gulp-angular-translate');
var inject = require('gulp-inject');
var htmlreplace = require('gulp-html-replace');
var rename = require("gulp-rename");
var angularFilesort = require('gulp-angular-filesort');
var replace = require('gulp-replace-task');
var stringReplace = require('gulp-string-replace');
//var gutil = require('gulp-util');
var dateFormat = require('dateformat');
//var runSequence = require('run-sequence');
var gulpMerge = require('gulp-merge-json');
var fs = require('fs');


/*
 Basic functionality
 */
/*gulp.src('jsonFiles/!**!/!*.json')
 .pipe(merge('combined.json'))
 .pipe(gulp.dest('./dist'));*/

// == PATH STRINGS ========
var baseScript = './app/scripts';
var wetBase = './wet_4_0_22_base';
var buildDev = './build/dev';

//GLOBAL variable save
var _DATESTAMP = "";

var paths = {
    styles: 'app/styles/',
    translations: 'app/resources/',
    helpTemplates: 'app/help/',
    buildProd: './build/prod/',
    buildDev: buildDev,
    buildDevActivity: buildDev + '/activity/',
    buildDevCompany: buildDev + '/company/',
    buildDevTransaction: buildDev + '/transaction/',
    englishTemplate: wetBase + '/content-en.html',
    frenchTemplate: wetBase + '/content-fr.html',
    lib: './app/lib/',
    data: './app/data/',
    scripts: baseScript,
    relScript: '/app/scripts/',
    components: baseScript + '/components/',
    directives: baseScript + '/directives/',
    services: baseScript + '/services/',
    rootActivity: './app/activityApp.js',
    wetBase: wetBase
};

/*** dossier paths because right now it is special**/
var baseDossier = '../dossierEnrol';
var dossierPaths = {
    lib: './app/lib/', //going to use the same as transaction paths
    translations: baseDossier + '/app/resources/',
    buildDevDossier: buildDev + '/dossier/',
    services: baseDossier + '/app/services/',
    components: baseDossier + '/app/components/',
    dossierApp: baseDossier + '/app/dossierApp.js'
};


var placeholders = {
    mainContent: '<!-- inject:mainContent-->',
    dateStamp: 'dateToday'
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

var
    dossierRootTitles_en = {
        mainHeading: "Dossier Template: Regulatory Enrolment Process (REP)",
        title: 'Health Canada Dossier Template'

    };

var
    dossierRootTitles_fr = {
        mainHeading: "fr_Dossier Template: Regulatory Enrolment Process (REP)",
        title: 'fr_Health Canada Dossier Template'

    };


var jsComponentFiles = {
    activityChangeCmp: paths.components + 'activityChangeType/cmp-activity-change.js',
    activityMainCmp: paths.components + 'activityMain/cmp-activity-main.js',
    activityRationaleCmp: paths.components + 'activityRationale/cmp-activity-rationale.js',
    addressDetailsCmp: paths.components + 'addressDetails/cmp-address-details.js',
    addressListCmp: paths.components + 'addressList/cmp-company-address-list.js',
    addressRecordCmp: paths.components + 'addressRecord/cmp-address-record.js',
    addressRoleCmp: paths.components + 'addressRole/cmp-address-role.js',
    applicationInfoCmp: paths.components + 'applicationInfo/cmp-application-info.js',
    companyMainCmp: paths.components + 'companyMain/companyMainPath',
    contactDetailsCmp: paths.components + 'contactDetails/cmp-contact-details.js',
    contactListCmp: paths.components + 'contactList/cmp-company-contact-list.js',
    contactRecordCmp: paths.components + 'contactRecord/cmp-contact-record.js',
    dinDetailsCmp: paths.components + 'dinDetails/cmp-din-details.js',
    expandingTableCmp: paths.components + 'expandingTable/cmp-expanding-table.js',
    fileIOComponentAndDep: paths.components + 'fileIO/*.js',
    lifecycleDetailsCmp: paths.components + 'lifecycleDetails/cmp-lifecycle-details.js',
    lifecycleListCmp: paths.components + 'lifecycleList/cmp-lifecycle-list.js',
    relatedActivityCmp: paths.components + 'relatedActivity/cmp-related-activity.js',
    relatedActivityListCmp: paths.components + 'relatedActivityList/cmp-related-activity-list.js',
    repContactListCmp: paths.components + 'repContactList/cmp-rep-contact-list.js',
    repContactRecordCmp: paths.components + 'rep-contact-record/cmp-rep-contact-record.js',
    transactionMainCmp: paths.components + 'transactionMain/cmp-transaction-main.js',
    transactionAddressRecordCmp: paths.components + 'transactionCompanyRecord/cmp-transaction-address-record.js',
    transactionInfoCmp: paths.components + 'transactionInfo/cmp-transaction-info.js',
    countrySelectCmp: paths.components + 'cmp-country-select.js'
};
var jsComponentPaths = {
    activityChangePath: paths.components + 'activityChangeType/',
    activityMainPath: paths.components + 'activityMain/',
    activityRationalePath: paths.components + 'activityRationale/',
    addressDetailsPath: paths.components + 'addressDetails/',
    addressListPath: paths.components + 'addressList/',
    addressRecordPath: paths.components + 'addressRecord/',
    addressRolePath: paths.components + 'addressRole/',
    applicationInfoPath: paths.components + 'applicationInfo/',
    companyMainPath: paths.components + 'companyMain/',
    contactDetailsPath: paths.components + 'contactDetails/',
    contactListPath: paths.components + 'contactList/',
    contactRecordPath: paths.components + 'contactRecord/',
    dinDetailsPath: paths.components + 'dinDetails/',
    expandingTablePath: paths.components + 'expandingTable/',
    fileIOComponentAndDepPath: paths.components + 'fileIO/',
    lifecycleDetailsPath: paths.components + 'lifecycleDetails/',
    lifecycleListPath: paths.components + 'lifecycleList/',
    relatedActivityPath: paths.components + 'relatedActivity/',
    relatedActivityListPath: paths.components + 'relatedActivityList/',
    repContactListPath: paths.components + 'repContactList/',
    repContactRecordPath: paths.components + 'rep-contact-record/',
    transactionMainPath: paths.components + 'transactionMain/',
    transactionAddressRecordPath: paths.components + 'transactionCompanyRecord/',
    transactionInfoPath: paths.components + 'transactionInfo/',
    countrySelectPath: paths.components + 'countrySelect/'
};

var componentFolders = {
    activityChange: 'activityChangeType/',
    activityMain: 'activityMain/',
    activityRationale: 'activityRationale/',
    addressDetails: 'addressDetails/',
    addressList: 'addressList/',
    addressRecord: 'addressRecord/',
    addressRole: 'addressRole/',
    applicationInfo: 'applicationInfo/',
    companyMain: 'companyMain/',
    contactDetails: 'contactDetails/',
    contactList: 'contactList/',
    contactRecord: 'contactRecord/',
    dinDetails: 'dinDetails/',
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
    countrySelect: 'countrySelect/'
};


var jsServiceFiles = {
    activityService: paths.services + 'activity-service.js',
    applicationInfoService: paths.services + 'application-info-service.js',
    companyService: paths.services + 'company-service.js',
    dataListsActivity: paths.services + 'data-lists.activity.js',
    dataLists: paths.services + 'data-lists.js',
    filterLists: paths.services + 'filter-lists.js',
    hpfbConstants: paths.services + 'hpfb-constants.js',
    transactionService: paths.services + 'transactionService.js',
    repContactService: paths.services + 'rep-contact-service.js'
};
//TODO refactor
var jsDirectiveFiles = {
    country: paths.directives + 'country/country-select.js',
    numberOnly: paths.directives + 'numberOnly/only-digits.js'
};

var jsAppFiles = {
    companyApp: 'app/app.js',
    activityApp: 'app/activityApp.js',
    transactionApp: 'app/transactionApp.js'
};

var jsRootContent = {
    partialActivityRoot: 'rootContent/activityRoot.html',
    partialCompanyRoot: 'rootContent/companyRoot.html',
    partialTransactionRoot: 'rootContent/transactionRoot.html',
    partialDossierRoot: 'rootContent/dossierRoot.html'
};


var translationBaseFiles = {

    activityInfo: paths.translations + 'activityInfo',
    activityList: paths.translations + 'activityList',
    address: paths.translations + 'address',
    applicationInfo: paths.translations + 'applicationInfo',
    contact: paths.translations + 'contact',
    countries: paths.translations + 'countries',
    fileIO: paths.translations + 'fileIO',
    general: paths.translations + 'general',
    messages: paths.translations + 'messages',
    stateProvinces: paths.translations + 'stateProvinces',
    transaction: paths.translations + 'transaction',
    companyInfo: paths.translations + 'companyInfo'
};
var styleFiles = {
    rep: paths.styles + 'rep.css',
    select: paths.styles + 'select.min.css',
    select2Style: paths.styles + 'select2.min.css',
    select2Image: paths.styles + 'select2.png',
    selectizeStyle: paths.styles + 'selectize.default.css'
}


/** Dossier stuff */
var dossierTranslationBaseFiles = {

    dosageForm: dossierPaths.translations + 'dossierDosageform',
    dossier: dossierPaths.translations + 'dossier',
    dossierGeneral: dossierPaths.translations + 'dossierGeneral',
    appendix4: dossierPaths.translations + 'appendix4',
    msg: dossierPaths.translations + 'dossierMsg',
    scheduleA: dossierPaths.translations + 'scheduleA',
    formulation: dossierPaths.translations + 'formulation'
    // roa: dossierPaths.translations + 'roa'
};

var jsDossierComponentPaths = {
    appendix4: dossierPaths.components + 'appendix-four/',
    canRefProducts: dossierPaths.components + 'can-ref-products/',
    checkboxList: dossierPaths.components + 'checkbox-list/',
    contact: dossierPaths.components + 'contact/',
    countryList: dossierPaths.components + 'country-list/',
    dossier: dossierPaths.components + 'dossier/',
    drugUse: dossierPaths.components + 'drug-use/',
    routeAdmin: dossierPaths.components + 'route-admin/',
    expandingTable: dossierPaths.components + 'expanding-table/',
    fileIO: dossierPaths.components + 'fileIO/',
    scheduleA: dossierPaths.components + 'schedule-a/',
    tabs: dossierPaths.components + 'tabs/',
    theraClass: dossierPaths.components + 'therapeutic-classification/',
    repContactList: dossierPaths.components + 'repContactList/',
    repContactRecord: dossierPaths.components + 'rep-contact-record/',
    applicationInfo: dossierPaths.components + 'applicationInfo/',
    formulations: dossierPaths.components + 'formulations/'

};

var jsDossierServicePaths = {
    dossierService: dossierPaths.services + "dossier-service.js",
    dossierDataList: dossierPaths.services + "dossier-data-list.js",
    dossierLoadService: dossierPaths.services + "dossier-load-service.js"
};


// == PIPE SEGMENTS ========

var pipes = {};


pipes.orderedAppScripts = function () {
    return plugins.angularFilesort();
};

pipes.minifiedFileName = function () {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

pipes.builtAppScriptsDev = function () {
    return pipes.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
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
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(destPath));
};


pipes.builtVendorScriptsProd = function () {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
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

pipes.builtStylesDev = function () {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtStylesProd = function () {
    return gulp.src(paths.styles)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(pipes.minifiedFileName())
        .pipe(gulp.dest(paths.distProd));
};

pipes.processedImagesDev = function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distDev + '/images/'));
};

pipes.processedImagesProd = function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distProd + '/images/'));
};

pipes.validatedIndex = function () {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtIndexDev = function () {

    var orderedVendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    var orderedAppScripts = pipes.builtAppScriptsDev()
        .pipe(pipes.orderedAppScripts());

    var appStyles = pipes.builtStylesDev();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtIndexProd = function () {

    var vendorScripts = pipes.builtVendorScriptsProd();
    var appScripts = pipes.builtAppScriptsProd();
    var appStyles = pipes.builtStylesProd();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};

pipes.builtAppDev = function () {
    return es.merge(pipes.builtIndexDev(), pipes.builtPartialsDev(), pipes.processedImagesDev());
};

pipes.builtAppProd = function () {
    return es.merge(pipes.builtIndexProd(), pipes.processedImagesProd());
};

pipes.fullTranslateList = function (translateList) {
    var completeList = [];
    for (var i = 0; i < translateList.length; i++) {
        completeList.push(translateList[i] + '-en.json');
        completeList.push(translateList[i] + '-fr.json')
    }
    return completeList;
};
pipes.translateDev = function (translateList, destPath, baseIgnore) {

    // var def = Q.defer();
    if (!baseIgnore) baseIgnore = ".";
    var completeList = pipes.fullTranslateList(translateList);
    var copySources = gulp.src(completeList,
        {read: true, base: baseIgnore});
    return (copySources.pipe(gulp.dest(destPath)));
    /*.on('end', function () {
     def.resolve();
     })
     .on('error', def.reject);*/
    //return def.promise;
};
pipes.insertDateStamp = function (template, valsObj) {
    var now = new Date();
    var utc = dateFormat(now, "isoDate");
    return (gulp.src(template)
            .pipe(htmlreplace({
                dateToday: utc,
                mainHeading: valsObj.mainHeading,
                formTitle: valsObj.title
            }))
    );
};
pipes.insertTitleInfo = function (template) {

    var utc = new Date().toJSON().slice(0, 10);
    return gulp.src(template)
        .pipe(htmlreplace({
            mainHeading: utc
        }));
};

pipes.copyHtml = function (copySourcesHtml, dateToday, destDirectory) {

    return (
        copySourcesHtml.pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(destDirectory))
    )
};

pipes.copySrcProd = function (srcPath, basePath, destPath) {
    var copySources = gulp.src(srcPath,
        {read: true, base: basePath});

    var def = Q.defer();
    copySources.pipe(gulp.dest(destPath))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;

};


pipes.copyWet = function (destDirectory) {
    var copySources = gulp.src([paths.wetBase + '/**/*', '!' + paths.englishTemplate, '!' + paths.frenchTemplate],
        {read: true, base: paths.wetBase});
    return (copySources.pipe(gulp.dest(destDirectory)))
};

//creates ALL the root files js TODO rename
pipes.generateRootJsFile = function (lang, type, rootFile, destPath, ignorePath) {
    if (!ignorePath) ignorePath = ".";
    var rootName = rootFile.split("/");
    rootName = rootName[rootName.length - 1];
    rootName = rootName.substring(0, rootName.length - 3);
    var dateToday = createSuffixDate();

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
pipes.insertTranslations = function (rootFile, destPath, ignorePath, translationsPathEn, translationsPathFr) {
    if (!ignorePath) ignorePath = ".";

    // var rootFile=jsDossierServicePaths.dossierLoadService;
    //var destPath=  dossierPaths.buildDevDossier+'app/services/'
    var rootName = rootFile.split("/");
    rootName = rootName[rootName.length - 1];
    rootName = rootName.substring(0, rootName.length - 3); //jsfiles
    var dateToday = createSuffixDate();

    var translationsEn = JSON.parse(
        fs.readFileSync(translationsPathEn));
    var translationsFr = JSON.parse(
        fs.readFileSync(translationsPathFr));
    translationsEn = JSON.stringify(translationsEn);
    translationsFr = JSON.stringify(translationsFr);
    var copySources = gulp.src([rootFile],
        {read: true, base: ignorePath});
    return (
        copySources

        /*.pipe(replace({

         patterns: [
         {
         match: 'TRANSLATIONS',
         replacement:translations
         }

         ]
         }))*/
            .pipe(stringReplace(/"@@TRANSLATIONS_EN"/, translationsEn))
            .pipe(stringReplace(/"@@TRANSLATIONS_FR"/, translationsFr))
            .pipe(rename(rootName + dateToday + '.js'))
            .pipe(gulp.dest(destPath))
    )

};


pipes.mergeJsonFiles = function (srcFolder, destFolder, destName, lang) {

    return (
        gulp.src(srcFolder + '**/*-' + lang + '.json')
            .pipe(gulpMerge(destName))
            .pipe(gulp.dest(destFolder))
    );
}

/**
 *  Creates the root Html file  for the forms.
 *  @param templatePath- the path to the WET template to inject data into
 *  @param valsObj- the metadata elements to insert into the web page. Currently Title and  formname
 *  @param templateName- the destination name of the html template
 *  @param injectRootJs - the name of rootJS file (i.e. app.js). Assumed to be under app/scripts
 *  @param partialRoot- the html fragment to be injected into the template. This is the root content
 *  @param buildDir- the destination build directory
 *  @param ingorePath- the folder parh to ignore from the source files
 *  @param lang- the language to generate. For angular translate
 *  @param formType- the type of form to generate, either external (EXT) or internal (INT)
 * */
pipes.createRootHtml = function (templatePath, valsObj, templateName, injectRootJs, partialRoot, buildDir, ignorePath, lang, formType) {

    //inserts date stamp into base content page
    return (
        pipes.insertDateStamp(templatePath, valsObj)
            .pipe(inject(gulp.src([partialRoot]), {
                starttag: placeholders.mainContent,
                transform: function (filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8')
                }
            }))
            //get all the third party libraries
            .pipe(inject(gulp.src([
                    'app/lib/**/*.js',
                    '!app/lib/**/angular*.js'
                ]),
                {
                    name: 'thirdParty',
                    ignorePath: ignorePath,
                    addRootSlash: false
                }))
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


//dosssier is special
pipes.createDossierDev = function (templatePath, valsObj, templateName, injectRootJs, partialRoot, buildDir, ignorePath) {


    pipes.insertDateStamp(templatePath, valsObj)
        .pipe(inject(gulp.src([partialRoot]), {
            starttag: placeholders.mainContent,
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src([
                'app/lib/**/*.js',
                '!app/lib/**/angular*.js'
            ]),
            {
                name: 'thirdParty',
                ignorePath: ignorePath,
                addRootSlash: false
            }))

        .pipe(inject(gulp.src([
                styleFiles.rep,
                styleFiles.select,
                styleFiles.select2Style
            ]),
            {
                ignorePath: ignorePath,
                addRootSlash: false
            }
        ))

        .pipe(inject(gulp.src([
                buildDir + 'app/components/**/*.js',
                buildDir + 'app/directives/**/*.js',
                buildDir + 'app/services/**/*.js',
                buildDir + 'app/' + injectRootJs,
                /*    "!"+buildDir + 'app/services/!**!/'+ignoreLoadService,*/
                buildDir + 'app/' + 'dossierTranslations' + createSuffixDate() + '.js',
                buildDir + 'app/lib/**/angular*.js'
            ])
            .pipe(angularFilesort())
            , {
                ignorePath: ignorePath,
                addRootSlash: false
            }))

        .pipe(rename(templateName))
        .pipe(gulp.dest(buildDir))

};


pipes.cleanBuild = function (baseDir) {
    /* var deferred = Q.defer();
     del(baseDir, function () {
     deferred.resolve();
     });
     return deferred.promise;*/
    return (del([baseDir]));
};
pipes.copyAllSrc = function () {
    var dest = './build/demo/';
    var copySources = gulp.src(['./app/**/*', '!./app/views/**/*', '!./app/spec/**/*',
            '!./app/scripts/*'],
        {read: true, base: '.'});
    return (copySources.pipe(gulp.dest(dest)))
};
pipes.copyDemoActivity = function () {
    var dest = './build/demo/';
    var copySources = gulp.src([
        paths.buildDevActivity + '/*.html',
        paths.buildDevActivity + '/app/scripts/*.js'
    ], {read: true, base: paths.buildDevActivity});
    return (copySources.pipe(gulp.dest(dest)))
};
pipes.copyDemoTransaction = function () {
    var dest = './build/demo/';
    var copySources = gulp.src([
        paths.buildDevTransaction + '/*.html',
        paths.buildDevTransaction + '/app/scripts/*.js'
    ], {read: true, base: paths.buildDevTransaction});
    return (copySources.pipe(gulp.dest(dest)))
};
pipes.copyDemoCompany = function () {
    var dest = './build/demo/';
    var copySources = gulp.src([
        paths.buildDevCompany + '/*.html',
        paths.buildDevCompany + '/app/scripts/*.js'
    ], {read: true, base: paths.buildDevCompany});
    return (copySources.pipe(gulp.dest(dest)))
};
pipes.copyDemoDossier = function () {
    var dest = './build/demo/';
    var copySources = gulp.src([
        paths.buildDevCompany + '/*.html',
        paths.buildDevCompany + '/app/scripts/*.js'
    ], {read: true, base: paths.buildDevCompany});
    return (copySources.pipe(gulp.dest(dest)))
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
    // }

};

/*pipes.insertJson = function (template, valsObj) {

 return (
 copySourcesJs.pipe(rename({
 suffix: dateToday
 }))
 .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
 .pipe(gulp.dest(paths.buildDevActivity))
 )

 };*/



gulp.task('dev-activity-copySrc', function () {

    var deferred = Q.defer();

    var activitySrcPaths = [ //componenents, anything with html
        jsComponentPaths.activityChangePath + '**/*',
        jsComponentPaths.activityMainPath + '**/*',
        jsComponentPaths.activityRationalePath + '**/*',
        jsComponentPaths.applicationInfoPath + '**/*',
        jsComponentPaths.contactDetailsPath + '**/*',
        jsComponentPaths.dinDetailsPath + '**/*',
        jsComponentPaths.expandingTablePath + '**/*',
        jsComponentPaths.fileIOComponentAndDepPath + '**/*',
        jsComponentPaths.relatedActivityListPath + '**/*',
        jsComponentPaths.relatedActivityPath + '**/*',
        jsComponentPaths.repContactListPath + '**/*',
        jsComponentPaths.repContactRecordPath + '**/*'
    ]

    var activityHtml = [];
    var activityJs = [];
    for (var i = 0; i < activitySrcPaths.length; i++) {
        activityHtml.push(activitySrcPaths[i] + '.html');
        activityJs.push(activitySrcPaths[i] + '.js');
    }
    //add services and directives
    activityJs.push(jsServiceFiles.activityService);
    activityJs.push(jsServiceFiles.applicationInfoService);
    activityJs.push(jsServiceFiles.hpfbConstants);
    activityJs.push(jsServiceFiles.repContactService);
    activityJs.push(jsServiceFiles.filterLists);
    activityJs.push(jsServiceFiles.dataLists);
    activityJs.push(jsServiceFiles.dataListsActivity);
    activityJs.push(jsDirectiveFiles.numberOnly);


    var copySourcesJs = gulp.src(activityJs, {read: true, base: './'});
    var copySourcesHtml = gulp.src(activityHtml, {read: true, base: './'});

    var dateToday = createSuffixDate()
    copyActivityHtml(copySourcesHtml, dateToday);
    return (
        copySourcesJs.pipe(rename({
                suffix: dateToday
            }))
            .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
            .pipe(gulp.dest(paths.buildDevActivity))
    )
});

function copyActivityHtml(copySourcesHtml, dateToday) {

    return (
        copySourcesHtml.pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(paths.buildDevActivity))
    )
}


function createSuffixDate() {
    dateFormat.masks.suffixDate = '_yyyymmdd_HHMM';
    var now = new Date();
    var dateToday = dateFormat(now, "suffixDate");
    if (!_DATESTAMP) {
        _DATESTAMP = dateToday;
    }
    return _DATESTAMP;
}

gulp.task('dev-activity-copyTranslate', function () {
    var translationList = [
        translationBaseFiles.activityInfo,
        translationBaseFiles.activityList,
        translationBaseFiles.contact,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.fileIO,
        translationBaseFiles.general,
        translationBaseFiles.messages
    ];

    return (pipes.translateDev(translationList, paths.buildDevActivity));
});

gulp.task('dev-activity-createResources', ['dev-activity-copyTranslate'], function () {
    var devPath = paths.buildDevActivity;
    return (
        gulp.src(devPath + paths.translations + '*.json')
            .pipe(angularTranslate('translations' + createSuffixDate() + '.js'))
            .pipe(gulp.dest(devPath + paths.relScript))
    )
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
    var devPath = paths.buildDevCompany;
    return (
        gulp.src(devPath + paths.translations + '*.json')
            .pipe(angularTranslate('translations' + createSuffixDate() + '.js'))
            .pipe(gulp.dest(devPath + paths.relScript))
    )

});

gulp.task('dev-dossier-createResources', ['dev-dossier-copyTranslate'], function () {
    var devPath = dossierPaths.buildDevDossier;
    /*    return(
     pipes.mergeJsonFiles(devPath + 'app/resources/',devPath , 'dossierTranslate-en.json','en')&&
     pipes.mergeJsonFiles(devPath + 'app/resources/',devPath , 'dossierTranslate-fr.json','fr')
     )*/

    return (gulp.src(devPath + 'app/resources/' + '*.json')
        .pipe(angularTranslate('dossierTranslations' + createSuffixDate() + '.js'))
        .pipe(gulp.dest(devPath + 'app/')))


});


gulp.task('dev-activity-copyLib', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevActivity))

});

gulp.task('dev-activity-copyWetDep', function () {
    return (pipes.copyWet(paths.buildDevActivity))
});

gulp.task('dev-cleanEnvironment', function () {
    return (pipes.cleanBuild(paths.buildDev));
});

gulp.task('dev-activity-createRootJS', function () {
    var lang = 'en';
    var dest = paths.buildDevActivity + '/app/scripts/';
    var rootJs = paths.scripts + '/activityApp.js'
    return (
        pipes.generateRootJsFile('en', 'EXT', rootJs, dest) &&
        pipes.generateRootJsFile('fr', 'EXT', rootJs, dest) &&
        pipes.generateRootJsFile('en', 'INT', rootJs, dest) &&
        pipes.generateRootJsFile('fr', 'INT', rootJs, dest)
    );
});


//clean only seems to work becase of the timestam
gulp.task('dev-activity-htmlBuild', ['dev-activity-copySrc', 'dev-activity-copyLib', 'dev-activity-createRootJS', 'dev-activity-createResources'], function () {

    pipes.createRootHtml(paths.frenchTemplate, activityRootTitles_fr, 'activityEnrolINT-fr.html', 'activityAppINT-fr' + createSuffixDate() + '.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'fr', 'INT');
    pipes.createRootHtml(paths.frenchTemplate, activityRootTitles_fr, 'activityEnrolEXT-fr.html', 'activityAppEXT-fr' + createSuffixDate() + '.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'fr', 'EXT');
    pipes.createRootHtml(paths.englishTemplate, activityRootTitles_en, 'activityEnrolEXT-en.html', 'activityAppEXT-en' + createSuffixDate() + '.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'en', 'EXT');
    pipes.createRootHtml(paths.englishTemplate, activityRootTitles_en, 'activityEnrolINT-en.html', 'activityAppINT-en' + createSuffixDate() + '.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'en', 'INT')

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
    return (pipes.cleanBuild(dossierPaths.buildDevDossier + 'app/'));

});


/******* Company Taska ****/

//copy all the needed files for company
gulp.task('dev-company-copySrc', function () {

    var companySrcPaths = [
        jsComponentPaths.companyMainPath + '**/*',
        jsComponentPaths.applicationInfoPath + '**/*',
        jsComponentPaths.contactDetailsPath + '**/*',
        jsComponentPaths.countrySelectPath + '**/*',
        jsComponentPaths.addressRolePath + '**/*',
        jsComponentPaths.expandingTablePath + '**/*',
        jsComponentPaths.fileIOComponentAndDepPath + '**/*',
        jsComponentPaths.addressListPath + '**/*',
        jsComponentPaths.contactListPath + '**/*',
        jsComponentPaths.addressDetailsPath + '**/*',
        jsComponentPaths.addressRecordPath + '**/*',
        jsComponentPaths.contactRecordPath + '**/*'
    ];

    var companyHtml = [];
    var companyJs = [];
    for (var i = 0; i < companySrcPaths.length; i++) {
        companyHtml.push(companySrcPaths[i] + '.html')
        companyJs.push(companySrcPaths[i] + '.js')
    }
    //add the services
    companyJs.push(jsServiceFiles.companyService);
    companyJs.push(jsServiceFiles.applicationInfoService);
    companyJs.push(jsServiceFiles.filterLists);
    companyJs.push(jsServiceFiles.hpfbConstants);
    companyJs.push(jsServiceFiles.dataLists);
    companyJs.push(jsDirectiveFiles.numberOnly);


    var copySourcesJs = gulp.src(companyJs, {read: true, base: './'});
    var copySourcesHtml = gulp.src(companyHtml, {read: true, base: './'});

    var dateToday = createSuffixDate();

    copyCompanyHtml(copySourcesHtml, dateToday)

    var def = Q.defer();
    copySourcesJs.pipe(rename({
            suffix: dateToday
        }))
        .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
        .pipe(gulp.dest(paths.buildDevCompany))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;
});

function copyCompanyHtml(src, dateToday) {

    //TODO inefficient
    return (
        src.pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(paths.buildDevCompany))
    );
}

gulp.task('dev-company-createRootJS', function () {
    var lang = 'en';
    var dest = paths.buildDevCompany + '/app/scripts/';
    var rootFile = paths.scripts + '/companyApp.js';
    return (
        pipes.generateRootJsFile('en', 'EXT', rootFile, dest) &&
        pipes.generateRootJsFile('fr', 'EXT', rootFile, dest) &&
        pipes.generateRootJsFile('en', 'INT', rootFile, dest) &&
        pipes.generateRootJsFile('fr', 'INT', rootFile, dest)
    );
});

gulp.task('dev-company-copyTranslate', function () {
    var translationList = [
        translationBaseFiles.countries,
        translationBaseFiles.address,
        translationBaseFiles.stateProvinces,
        translationBaseFiles.contact,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.fileIO,
        translationBaseFiles.general,
        translationBaseFiles.messages,
        translationBaseFiles.companyInfo
    ];
    return (pipes.translateDev(translationList, paths.buildDevCompany))
});

gulp.task('dev-company-htmlBuild', ['dev-company-copySrc', 'dev-company-copyLib', 'dev-company-createRootJS', 'dev-company-createResources'], function () {
    var ignoreDir = '/build/dev/company';
    var buildDir = paths.buildDevCompany;
    var htmlPartial = jsRootContent.partialCompanyRoot;
    pipes.createRootHtml(paths.frenchTemplate, companyRootTitles_fr, 'companyEnrolINT-fr.html', 'companyAppINT-fr' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir, 'fr', 'INT');
    pipes.createRootHtml(paths.frenchTemplate, companyRootTitles_fr, 'companyEnrolEXT-fr.html', 'companyAppEXT-fr' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir, 'fr', 'EXT');
    pipes.createRootHtml(paths.englishTemplate, companyRootTitles_en, 'companyEnrolEXT-en.html', 'companyAppEXT-en' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir, 'en', 'EXT');
    pipes.createRootHtml(paths.englishTemplate, companyRootTitles_en, 'companyEnrolINT-en.html', 'companyAppINT-en' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir, 'en', 'INT')
    return (
        pipes.cleanBuild(buildDir + paths.translations)

    );


});
gulp.task('dev-company-copyWetDep', function () {
    return (pipes.copyWet(paths.buildDevCompany))
});

gulp.task('dev-company-copyLib', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevCompany))

});
/**********************Start Transaction Gulp scripts******/
//copy all the needed files for company
gulp.task('dev-transaction-copySrc', function () {

    var transactionSrcPaths = [
        jsComponentPaths.transactionMainPath + '**/*',
        jsComponentPaths.contactDetailsPath + '**/*',
        jsComponentPaths.countrySelectPath + '**/*',
        jsComponentPaths.expandingTablePath + '**/*',
        jsComponentPaths.fileIOComponentAndDepPath + '**/*',
        jsComponentPaths.transactionInfoPath + '**/*',
        jsComponentPaths.transactionAddressRecordPath + '**/*',
        jsComponentPaths.repContactListPath + '**/*',
        jsComponentPaths.repContactRecordPath + '**/*',
        jsComponentPaths.lifecycleDetailsPath + '**/*',
        jsComponentPaths.lifecycleListPath + '**/*',
        jsComponentPaths.addressListPath + '**/*',
        jsComponentPaths.contactListPath + '**/*',
        jsComponentPaths.addressDetailsPath + '**/*',
        jsComponentPaths.addressRecordPath + '**/*',
        jsComponentPaths.contactRecordPath + '**/*'
    ];

    var transactionHtml = [];
    var transactionJs = [];
    for (var i = 0; i < transactionSrcPaths.length; i++) {
        transactionHtml.push(transactionSrcPaths[i] + '.html')
        transactionJs.push(transactionSrcPaths[i] + '.js')
    }
    transactionJs.push(jsServiceFiles.transactionService);
    transactionJs.push(jsServiceFiles.repContactService);
    transactionJs.push(jsServiceFiles.dataLists);
    transactionJs.push(jsServiceFiles.dataListsActivity);
    transactionJs.push(jsServiceFiles.applicationInfoService);
    transactionJs.push(jsServiceFiles.filterLists);
    transactionJs.push(jsServiceFiles.hpfbConstants);
    transactionJs.push(jsDirectiveFiles.numberOnly);

    var copySourcesJs = gulp.src(transactionJs, {read: true, base: './'});
    var copySourcesHtml = gulp.src(transactionHtml, {read: true, base: './'});
    var dateToday = createSuffixDate();
    copyTransactionHtml(copySourcesHtml, dateToday)
    var def = Q.defer();
    copySourcesJs.pipe(rename({
            suffix: dateToday
        }))
        .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
        .pipe(gulp.dest(paths.buildDevTransaction))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;

    //return copySources.pipe(gulp.dest(paths.buildDevTransaction))

});
function copyTransactionHtml(src, dateToday) {
    //TODO inefficient
    return (
        src.pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(paths.buildDevTransaction))
    );
}


gulp.task('dev-transaction-createRootJs', function () {
    var dest = paths.buildDevTransaction + '/app/scripts/';
    //formType not needed
    return (
        pipes.generateRootJsFile('en', '', paths.scripts + '/transactionApp.js', dest) &&
        pipes.generateRootJsFile('fr', '', paths.scripts + '/transactionApp.js', dest)
    );
});
gulp.task('dev-transaction-copyTranslate', function () {
    var translationList = [
        translationBaseFiles.countries,
        translationBaseFiles.address,
        translationBaseFiles.stateProvinces,
        translationBaseFiles.contact,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.fileIO,
        translationBaseFiles.general,
        translationBaseFiles.messages,
        translationBaseFiles.transaction
    ];
    return (pipes.translateDev(translationList, paths.buildDevTransaction))
});

gulp.task('dev-transaction-copyLib', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevTransaction))

});
gulp.task('dev-transaction-copyWetDep', function () {
    return (pipes.copyWet(paths.buildDevTransaction))
});


gulp.task('dev-transaction-htmlBuild', ['dev-transaction-copySrc', 'dev-transaction-copyLib', 'dev-transaction-createRootJs', 'dev-transaction-createResources'], function () {
    var ignoreDir = '/build/dev/transaction';
    var buildDir = paths.buildDevTransaction;
    var htmlPartial = jsRootContent.partialTransactionRoot;

    pipes.createRootHtml(paths.frenchTemplate, transactionRootTitles_fr, 'transactionEnrol-fr.html', 'transactionApp-fr' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir, 'fr', '');
    pipes.createRootHtml(paths.englishTemplate, transactionRootTitles_en, 'transactionEnrol-en.html', 'transactionApp-en' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir, 'en', '')

    return (
        pipes.cleanBuild(buildDir + paths.translations)
    );

});
function callback() {

    console.log("complete")
}


/******** Dossier Related  tasks  *****************/

gulp.task('dev-dossier-copyWet', function () {
    return (pipes.copyWet(dossierPaths.buildDevDossier))
});
gulp.task('dev-dossier-copyLib', function () {
    var def = Q.defer();
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return (copySources.pipe(gulp.dest(dossierPaths.buildDevDossier)));
});
gulp.task('dev-dossier-copyData', function () {
    var def = Q.defer();
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(dossierPaths.buildDevDossier)));
});



gulp.task('dev-dossier-copyTranslate', ['dev-dossier-copyCommonTranslate'], function () {
    var translationList = [
        dossierTranslationBaseFiles.dosageForm,
        dossierTranslationBaseFiles.dossier,
        dossierTranslationBaseFiles.dossierGeneral,
        dossierTranslationBaseFiles.appendix4,
        dossierTranslationBaseFiles.msg,
        dossierTranslationBaseFiles.scheduleA,
        dossierTranslationBaseFiles.formulation
        //dossierTranslationBaseFiles.roa
    ];
    var baseIgnore = "../dossierEnrol";

    return (pipes.translateDev(translationList, dossierPaths.buildDevDossier, baseIgnore))
});


gulp.task('dev-dossier-copySrc', ['dev-dossier-copyCommonSrc'], function () {

    var dossierSrcPaths = [

        jsDossierComponentPaths.appendix4 + '**/*',
        jsDossierComponentPaths.canRefProducts + '**/*',
        jsDossierComponentPaths.checkboxList + '**/*',
        jsDossierComponentPaths.countryList + '**/*',
        jsDossierComponentPaths.dossier + '**/*',
        jsDossierComponentPaths.drugUse + '**/*',
        jsDossierComponentPaths.routeAdmin + '**/*',
        jsDossierComponentPaths.scheduleA + '**/*',
        jsDossierComponentPaths.tabs + '**/*',
        jsDossierComponentPaths.theraClass + '**/*',
        jsDossierComponentPaths.formulations + '**/*'
    ];

    var dossierHtml = [];
    var dossierJs = [];
    for (var i = 0; i < dossierSrcPaths.length; i++) {
        dossierHtml.push(dossierSrcPaths[i] + '.html')
        dossierJs.push(dossierSrcPaths[i] + '.js')
    }
    //add the services, no html
    dossierJs.push(jsDossierServicePaths.dossierDataList);
    dossierJs.push(jsDossierServicePaths.dossierService);
    dossierJs.push(jsDossierServicePaths.dossierLoadService);

    var copySourcesJS = gulp.src(dossierJs, {read: true, base: '../dossierEnrol'});
    var copySourcesHtml = gulp.src(dossierHtml, {read: true, base: '../dossierEnrol'});

    var dateToday = createSuffixDate();
    copyDossierHtml(copySourcesHtml, dateToday);

    var def = Q.defer();
    //TODO inefficient
    copySourcesJS.pipe(stringReplace('./components/', './app/components/'))
        .pipe(stringReplace('../lib/uib-templates/tpl-accordian-group-caret.html', 'app/lib/uib-templates/tpl-accordian-group-caret.html'))
        .pipe(rename({
            suffix: dateToday
        }))
        .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
        .pipe(gulp.dest(dossierPaths.buildDevDossier))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;

});
function copyDossierHtml(src, dateToday) {

    //TODO inefficient
    return (
        src.pipe(stringReplace('../lib/uib-templates/tpl-accordian-group-caret.html', 'app/lib/uib-templates/tpl-accordian-group-caret.html'))
            .pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(dossierPaths.buildDevDossier))
    );
}


/**
 * Copies the common components from the release 1 directory to the dossier build
 * */
gulp.task('dev-dossier-copyCommonSrc', function () {
    var dossierSrcPaths = [
        jsComponentPaths.fileIOComponentAndDepPath + '**/*',
        jsComponentPaths.repContactListPath + '**/*',
        jsComponentPaths.repContactRecordPath + '**/*',
        jsComponentPaths.contactDetailsPath + '**/*',
        jsComponentPaths.applicationInfoPath + '**/*',
        jsComponentPaths.expandingTablePath + '**/*',


    ];
    var dossierHtml = [];
    var dossierJs = [];
    for (var i = 0; i < dossierSrcPaths.length; i++) {
        dossierHtml.push(dossierSrcPaths[i] + '.html')
        dossierJs.push(dossierSrcPaths[i] + '.js')
    }
    //add the services and directives, no html
    dossierJs.push(jsDirectiveFiles.numberOnly);
    dossierJs.push(jsServiceFiles.applicationInfoService);
    dossierJs.push(jsServiceFiles.dataLists);
    dossierJs.push(jsServiceFiles.filterLists);
    dossierJs.push(jsServiceFiles.repContactService);
    dossierJs.push(jsServiceFiles.hpfbConstants);

    var copySourcesJS = gulp.src(dossierJs, {read: true, base: './app/scripts'});
    var copySourcesHtml = gulp.src(dossierHtml, {read: true, base: './app/scripts'});

    var dateToday = createSuffixDate();
    copyCommonDossierHtml(copySourcesHtml, dateToday)
    var def = Q.defer();
    copySourcesJS.pipe(stringReplace('app/scripts/components/', './app/components/'))
        .pipe(rename({
            suffix: dateToday
        }))
        .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
        .pipe(gulp.dest(dossierPaths.buildDevDossier + 'app/'))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;
});
function copyCommonDossierHtml(src, dateToday) {

    //TODO inefficient
    return (
        src.pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(dossierPaths.buildDevDossier + 'app/'))
    );
}


gulp.task('dev-dossier-copyCommonTranslate', function () {
    var translationList = [
        jsComponentPaths.fileIOComponentAndDepPath + '**/*',
        translationBaseFiles.general,
        translationBaseFiles.fileIO,
        //translationBaseFiles.countries,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.messages,
        translationBaseFiles.contact
    ];
    return (pipes.translateDev(translationList, dossierPaths.buildDevDossier))

});


/* Copies the common services dossier uses to the dev build folder
 **
 */
gulp.task('dev-dossier-copyCommonServices', function () {
    var copySources = gulp.src([
            jsServiceFiles.applicationInfoService,
            jsServiceFiles.dataLists,
            jsServiceFiles.filterLists,
            jsServiceFiles.repContactService,
            jsServiceFiles.hpfbConstants

        ],
        {read: true, base: './app/scripts'});

    var def = Q.defer();
    copySources.pipe(gulp.dest(dossierPaths.buildDevDossier + 'app/'))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;

});


/**
 * Copies Dossier service files from the dossier github folder to the build folder
 */
/*gulp.task('copyDossierServicesDev', function () {
 var copySources = gulp.src([
 jsDossierServicePaths.dossierDataList,
 jsDossierServicePaths.dossierService
 ],
 {read: true, base: '../dossierEnrol'});
 var def = Q.defer();
 copySources.pipe(gulp.dest(dossierPaths.buildDevDossier))
 .on('end', function () {
 def.resolve();
 })
 .on('error', def.reject);
 return def.promise;

 });*/

gulp.task('dev-dossier-createRootJS', function () {

    var dest = dossierPaths.buildDevDossier + 'app/';
    //formType not needed
    return (
        pipes.generateRootJsFile('en', 'EXT', dossierPaths.dossierApp, dest) &&
        pipes.generateRootJsFile('fr', 'EXT', dossierPaths.dossierApp, dest) &&
        pipes.generateRootJsFile('en', 'INT', dossierPaths.dossierApp, dest) &&
        pipes.generateRootJsFile('fr', 'INT', dossierPaths.dossierApp, dest)
    );
});


//Used for injecting into file. Not doing complicated
/*gulp.task('dev-dossier-insertTranslateLoader', ['dev-dossier-createResources'], function () {
    var ignorePath = '/build/dev/dossier';
    var translations_en = dossierPaths.buildDevDossier + 'dossierTranslate-en.json'
    var translations_fr = dossierPaths.buildDevDossier + 'dossierTranslate-fr.json'
    return (
        pipes.insertTranslations(jsDossierServicePaths.dossierLoadService, dossierPaths.buildDevDossier + 'app/services/', ignorePath, translations_en, translations_fr)
        // pipes.insertTranslations ("fr",jsDossierServicePaths.dossierLoadService, dossierPaths.buildDevDossier+'app/services/', ignorePath,translations_fr )
    )
 });*/


/**
 * Generates the base Dossier HTML file.
 * First copies the source files (copyDossierSrcDev),
 * library files (copyLibDevDossier),
 * Then creates 4 versions of main app file (dossierApp).
 * Creates 4 html files- internal english, internal french, external english, external french
 */
//' dev-dossier-insertTranslateLoader '
gulp.task('dev-dossier-htmlBuild', ['dev-dossier-copyData', 'dev-dossier-copySrc', 'dev-dossier-copyLib', 'dev-dossier-createRootJS', 'dev-dossier-createResources'], function () {
    var ignoreDir = '/build/dev/dossier';
    var buildDir = dossierPaths.buildDevDossier;
    var htmlPartial = jsRootContent.partialDossierRoot;
    var serviceName = 'dossier-load-service.js';
    var loadService = (serviceName).substring(0, serviceName.length - 3);
    pipes.createDossierDev(paths.englishTemplate, dossierRootTitles_en, 'dossierEnrolINT-en.html', 'dossierAppINT-en' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir);
    pipes.createDossierDev(paths.frenchTemplate, dossierRootTitles_fr, 'dossierEnrolINT-fr.html', 'dossierAppINT-fr' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir);
    pipes.createDossierDev(paths.frenchTemplate, dossierRootTitles_fr, 'dossierEnrolEXT-fr.html', 'dossierAppEXT-fr' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir);
    pipes.createDossierDev(paths.englishTemplate, dossierRootTitles_en, 'dossierEnrolEXT-en.html', 'dossierAppEXT-en' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir)

    return (
        pipes.cleanBuild(buildDir + paths.translations)
    );
});

gulp.task('prod-cleanEnvironment', function () {
    pipes.cleanBuild(paths.buildProd)

});

//activity
gulp.task('prod-activity-createRoots', function () {
    var dest = paths.buildProd + 'activity/app/scripts/';
    //var result= pipes.cleanBuild(dest);
    return (
        pipes.generateRootJsFile('en', 'INT', paths.scripts + '/activityApp.js', dest) &&
        pipes.generateRootJsFile('fr', 'INT', paths.scripts + '/activityApp.js', dest) &&
        pipes.generateRootJsFile('fr', 'EXT', paths.scripts + '/activityApp.js', dest) &&
        pipes.generateRootJsFile('en', 'EXT', paths.scripts + '/activityApp.js', dest)
    );
});


gulp.task('prod-activity-compileSrc', ['prod-activity-copyDependencies', 'prod-activity-createRoots'], function () {
    var baseActivityPath = paths.buildProd + 'activity/app/scripts/';
    var def = Q.defer();
    // var outName = 'activityEXT-en.min.js';
    var filesToConcat = [
        baseActivityPath + 'translations*.js',
        baseActivityPath + 'components/**/*.js',
        baseActivityPath + 'directives/**/*.js',
        baseActivityPath + 'services/**/*.js'
    ];
    var dateToday = createSuffixDate();
    var outFiles = filesToConcat.slice();
    var result = "";
    var destPath = paths.buildProd + '/activity/';
    // var result= pipes.cleanBuild(destPath);

    outFiles.push(baseActivityPath + 'activityAppEXT-en*.js');
    result = pipes.builtAppCmpScriptsProd(outFiles, 'activityEXT-en' + dateToday + '.min.js', destPath);
    outFiles = filesToConcat.slice();
    outFiles.push(baseActivityPath + 'activityAppINT-en*.js');
    result = pipes.builtAppCmpScriptsProd(outFiles, 'activityINT-en' + dateToday + '.min.js', destPath);
    outFiles = filesToConcat.slice();
    outFiles.push(baseActivityPath + 'activityAppINT-fr*.js');
    result = pipes.builtAppCmpScriptsProd(outFiles, 'activityINT-fr' + dateToday + '.min.js', destPath);
    outFiles = filesToConcat.slice();
    outFiles.push(baseActivityPath + 'activityAppEXT-fr*.js');
    return (pipes.builtAppCmpScriptsProd(outFiles, 'activityEXT-fr' + dateToday + '.min.js', destPath));
})


pipes.createProdRootHtml = function (templatePath, metaObj, htmlPartial, src, ignorePath, outName, destDir) {
    pipes.insertDateStamp(templatePath, metaObj)
        .pipe(inject(gulp.src([htmlPartial]), {
            starttag: placeholders.mainContent,
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src([
                'app/lib/**/*.js',
                '!app/lib/**/angular*.js'
            ]),
            {
                name: 'thirdParty',
                ignorePath: ignorePath,
                addRootSlash: false
            }))
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


gulp.task('prod-copySrc-components', function () {
    /*
     components: baseScript + '/components/',
     directives: baseScript + '/directives/',
     services: baseScript + '/services/',
     */
    var destPath = paths.buildProd + 'app/scripts/components/';
    var dateToday = createSuffixDate();
    var copyComponentsHtml = gulp.src([paths.components + '**/*.html'],
        {read: true, base: ''});
    var copyComponentsJS = gulp.src([paths.components + '**/*.js'],
        {read: true, base: ''});
    pipes.copyHtml(copyComponentsHtml, dateToday, destPath);

    return (
        copyComponentsJS.pipe(rename({
                suffix: dateToday
            }))
            .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
            .pipe(gulp.dest(destPath))
    )

});
gulp.task('prod-copySrc-services', function () {

    var destPath = paths.buildProd + 'app/scripts/services/';
    var dateToday = createSuffixDate();
    var copyJS = gulp.src([paths.services + '**/*.js'],
        {read: true, base: ''});
    var result = pipes.cleanBuild(destPath);
    return (
        copyJS.pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(destPath))
    )
});

gulp.task('prod-copySrc-directives', function () {

    var destPath = paths.buildProd + 'app/scripts/directives/';
    var dateToday = createSuffixDate();
    var copyHtml = gulp.src([paths.directives + '**/*.html'],
        {read: true, base: ''});
    var copyJS = gulp.src([paths.directives + '**/*.js'],
        {read: true, base: ''});

    var result = pipes.cleanBuild(destPath);
    result = pipes.copyHtml(copyHtml, dateToday, destPath);

    return (
        copyJS.pipe(rename({
                suffix: dateToday
            }))
            .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
            .pipe(gulp.dest(destPath))
    )
});
gulp.task('prod-copySrc-root', function () {

    var destPath = paths.buildProd + 'app/scripts/';
    var dateToday = createSuffixDate();
    var copyRootJs = gulp.src(['./app/scripts/' + '*.js'],
        {read: true, base: ''});
    var result = pipes.cleanBuild(destPath + '*.js');
    return (
        copyRootJs.pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(destPath))
    )

});


gulp.task('prod-copySrc-translate', function () {

    var destPath = paths.buildProd + 'app/resources/';
    var translationList = [
        paths.translations + '*.json'
    ];

    var copyTranslations = gulp.src(translationList,
        {read: true, base: ''});
    copyTranslations.pipe(gulp.dest(destPath))

    return (copyTranslations.pipe(gulp.dest(destPath)));
});

gulp.task('prod-copyAllSrc', ['prod-copySrc-directives', 'prod-copySrc-components', 'prod-copySrc-root', 'prod-copySrc-services', 'prod-copySrc-translate'], function () {

});


gulp.task('prod-activity-copyLib', function () {
    var copySources = gulp.src([paths.lib + '**/*'],
        {read: true, base: ''});
    return (
        copySources.pipe(gulp.dest(paths.buildProd + 'activity/app/lib/'))
    );
});
gulp.task('prod-activity-copyStyle', function () {
    var copySources = gulp.src([paths.styles + '**/*'],
        {read: true, base: ''});
    return copySources.pipe(gulp.dest(paths.buildProd + 'activity/app/styles/'))

});

gulp.task('prod-activity-cleanComponents', function () {
    return pipes.cleanBuild(paths.buildProd + 'activity/app/scripts/components/')
})
gulp.task('prod-activity-copyDependencies', ['prod-activity-cleanComponents'], function () {
    var dest = paths.buildProd + '/activity/'
    var src = [];
    for (var i = 0; i < activityComponentFolders.length; i++) {
        var onePath = paths.buildProd + 'app/scripts/components/' + activityComponentFolders[i] + "*.*";
        src.push(onePath)
    }
    //directives
    src.push(paths.buildProd + 'app/scripts/directives/' + directivePathsProd.numberOnly + "*.*");
    //services
    for (var i = 0; i < activityServicesFilesProd.length; i++) {

        src.push(paths.buildProd + 'app/scripts/services/' + activityServicesFilesProd[i]);
    }
    //root App reference
    //  src.push(paths.buildProd + 'app/scripts/activityApp*.js');

    var copySources = gulp.src(src,
        {read: true, base: paths.buildProd});
    return copySources.pipe(gulp.dest(dest))
});

var activityComponentFolders = [
    componentFolders.activityChange,
    componentFolders.activityMain,
    componentFolders.activityRationale,
    componentFolders.applicationInfo,
    componentFolders.contactDetails,
    componentFolders.dinDetails,
    componentFolders.expandingTable,
    componentFolders.fileIOComponentAndDep,
    componentFolders.relatedActivity,
    componentFolders.relatedActivityList,
    componentFolders.repContactList,
    componentFolders.repContactRecord

];
var servicesFilesProd = {
    //add services and directives
    activityService: 'activity-service*.js',
    applicationInfoService: 'application-info-service*.js',
    companyService: 'company-service*.js',
    dataListsActivity: 'data-lists.activity*.js',
    dataLists: 'data-lists*.js',
    filterLists: 'filter-lists*.js',
    hpfbConstants: 'hpfb-constants*.js',
    transactionService: 'transactionService*.js',
    repContactService: 'rep-contact-service*.js'
};
var activityServicesFilesProd = [
    //add services and directives
    servicesFilesProd.activityService,
    servicesFilesProd.applicationInfoService,
    servicesFilesProd.dataLists,
    servicesFilesProd.dataListsActivity,
    servicesFilesProd.filterLists,
    servicesFilesProd.hpfbConstants,
    servicesFilesProd.repContactService
];
var directivePathsProd = {
    country: 'country/',
    numberOnly: 'numberOnly/'
};


gulp.task('prod-activityHtml', ['prod-activity-copyLib', 'prod-activity-copyStyle', 'prod-activity-compileResources', 'prod-activity-compileSrc'], function () {
    var baseActivityPath = paths.buildProd + 'actvity/app/scripts/';
    var htmlPartial = jsRootContent.partialActivityRoot;
    var dateToday = createSuffixDate();
    var srcJsExtEn = [
        paths.buildProd + 'activity/' + 'activityEXT-en' + dateToday + '.min.js',
        paths.buildProd + 'activity/app/lib/**/angular*.js'
    ];
    var srcJsExtFr = [
        paths.buildProd + 'activity/' + 'activityEXT-fr' + dateToday + '.min.js',
        paths.buildProd + 'activity/app/lib/**/angular*.js'
    ];
    var srcJsIntFr = [
        paths.buildProd + 'activity/' + 'activityINT-fr' + dateToday + '.min.js',
        paths.buildProd + 'activity/app/lib/**/angular*.js'
    ];
    var srcJsIntEn = [
        paths.buildProd + 'activity/' + 'activityINT-en' + dateToday + '.min.js',
        paths.buildProd + 'activity/app/lib/**/angular*.js'
    ];
    var result = "";
    result = pipes.createProdRootHtml(paths.englishTemplate, activityRootTitles_en, htmlPartial, srcJsExtEn, '/build/prod/activity/', 'indexActivityEXT-en.html', paths.buildProd + 'activity/');
    result = pipes.createProdRootHtml(paths.frenchTemplate, activityRootTitles_fr, htmlPartial, srcJsIntFr, '/build/prod/activity/', 'indexActivityINT-fr.html', paths.buildProd + 'activity/');
    result = pipes.createProdRootHtml(paths.frenchTemplate, activityRootTitles_fr, htmlPartial, srcJsIntEn, '/build/prod/activity/', 'indexActivityINT-en.html', paths.buildProd + 'activity/');


    return pipes.createProdRootHtml(paths.englishTemplate, activityRootTitles_en, htmlPartial, srcJsExtFr, '/build/prod/activity/', 'indexActivityEXT-fr.html', paths.buildProd + 'activity/');


});


gulp.task('prod-activity-htmlBuild', ['prod-activityHtml'], function () {

    return (
        pipes.cleanBuild([paths.buildProd + 'activity/app/resources/',
            paths.buildProd + 'activity/app/scripts/services/',
            paths.buildProd + 'activity/app/scripts/directives/',
            paths.buildProd + 'activity/app/scripts/**/*.js']))
})


gulp.task('prod-activity-copyWetDep', function () {
    return (pipes.copyWet(paths.buildProd + 'activity/'))
});

gulp.task('prod-activity-copyResources', function () {
    var translationList = [
        translationBaseFiles.activityInfo,
        translationBaseFiles.activityList,
        translationBaseFiles.contact,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.fileIO,
        translationBaseFiles.general,
        translationBaseFiles.messages
    ];
    return (pipes.translateDev(translationList, paths.buildProd + 'activity/'));
});
gulp.task('prod-activity-compileResources', ['prod-activity-copyResources'], function () {
    var destPath = paths.buildProd + '/activity/';
    return (
        gulp.src(destPath + paths.translations + '*.json')
            .pipe(angularTranslate('translations' + createSuffixDate() + '.js'))
            .pipe(gulp.dest(destPath + paths.relScript))
    )
});


gulp.task('watch-dev', function () {
    var watcher = gulp.watch('app/**/*.js', ['ActivityHtml-devBuild', 'CompanyHtml-devBuild', 'TransactionHtml-devBuild', 'DossierHtml-devBuild']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

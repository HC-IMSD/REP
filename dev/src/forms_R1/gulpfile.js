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
    relLib:'app/lib/',
    data: './app/data/',
    scripts: baseScript,
    relScript: '/app/scripts/',
    components: baseScript + '/components/',
    directives: baseScript + '/directives/',
    services: baseScript + '/services/',
    // rootActivity: './app/activityApp.js',
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
    adminSubmissionPath: paths.components + 'adminSubmission/',
    repContactListPath: paths.components + 'repContactList/',
    repContactRecordPath: paths.components + 'rep-contact-record/',
    transactionMainPath: paths.components + 'transactionMain/',
    transactionInfoPath: paths.components + 'transactionInfo/',
    countrySelectPath: paths.components + 'countrySelect/'
};


/**
 * All the component folders
 * @type {{activityChange: string, activityMain: string, activityRationale: string, addressDetails: string, addressList: string, addressRecord: string, addressRole: string, applicationInfo: string, companyMain: string, contactDetails: string, contactList: string, contactRecord: string, dinDetails: string, expandingTable: string, fileIOComponentAndDep: string, lifecycleDetails: string, lifecycleList: string, relatedActivity: string, relatedActivityList: string, repContactList: string, repContactRecord: string, transactionMain: string, transactionAddressRecord: string, transactionInfo: string, countrySelect: string, adminSubmissionPath: string}}
 */
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
    countrySelect: 'countrySelect/',
    adminSubmissionPath: 'adminSubmission/'
};
//service file names. Leave off the .js
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
    commonLists: 'common-lists'
};
//leave off the .js
var rootFileNames = {
    activityRoot: "activityApp",
    companyRoot: "companyApp",
    transactionRoot: "transactionApp"
};

//good
var directiveFolders = {
    country: 'country/',
    numberOnly: 'numberOnly/'
};


var jsServiceFiles = {
    activityService: paths.services + 'activity-service.js',
    activityLoadService: paths.services + 'activity-load-service.js',
    activityLists: paths.services + 'activity-lists.js',
    applicationInfoService: paths.services + 'application-info-service.js',
    companyService: paths.services + 'company-service.js',
    companyLoadService: paths.services + 'company-load-service.js',
    dataListsActivity: paths.services + 'data-lists.activity.js',
    dataLists: paths.services + 'data-lists.js',
    filterLists: paths.services + 'filter-lists.js',
    hpfbConstants: paths.services + 'hpfb-constants.js',
    transactionService: paths.services + 'transactionService.js',
    transactionLoadService: paths.services + 'transaction-load-service.js',
    repContactService: paths.services + 'rep-contact-service.js',
    commonLists: paths.services + 'common-lists.js'
};
//TODO refactor
var jsDirectiveFiles = {
    country: paths.directives + 'country/country-select.js',
    numberOnly: paths.directives + 'numberOnly/only-digits.js'
};

var jsRootContent = {
    partialActivityRoot: 'rootContent/activityRoot.html',
    partialCompanyRoot: 'rootContent/companyRoot.html',
    partialTransactionRoot: 'rootContent/transactionRoot.html',
    partialDossierRoot: 'rootContent/dossierRoot.html'
};

//good
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
        //.pipe(plugins.uglify())
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
pipes.generateRootJsFile = function (lang, type, rootFile, destPath, skipDate) {

    console.log("generating the root file")
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

/**
 * Array of the component folders used for the Pharam Activity form
 * @type {*[]}
 */
//good
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
    componentFolders.adminSubmissionPath
];
//good
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
//good
var activityDirectiveFolders = [
    directiveFolders.numberOnly
];

//goood
var activityTranslationFilesBaseList = [
    translationBaseFiles.activityInfo,
    translationBaseFiles.activityList,
    translationBaseFiles.contact,
    translationBaseFiles.applicationInfo,
    translationBaseFiles.fileIO,
    translationBaseFiles.general,
    translationBaseFiles.messages
];

//COMPANY definitions


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
        componentFolders.contactRecord
    ];

var companyServiceFileNames =
    [
        serviceFileNames.companyService,
        serviceFileNames.companyLoadService,
        serviceFileNames.applicationInfoService,
        serviceFileNames.filterLists,
        serviceFileNames.hpfbConstants,
        serviceFileNames.dataLists
    ];

var companyDirectiveFolders =
    [
        directiveFolders.numberOnly
    ];

var companyTranslationFilesBaseList =
    [
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

var transactionTranslationFilesBaseList=[
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
var transactionComponentFolders=[

    componentFolders.transactionMain,
    componentFolders.transactionInfo,
    componentFolders.contactDetails,
    componentFolders.expandingTable,
    componentFolders.fileIOComponentAndDep,
    componentFolders.repContactList,
    componentFolders.repContactRecord,
    componentFolders.lifecycleList,
    componentFolders.lifecycleDetails,
    componentFolders.addressDetails
];
var transactionServiceFileNames=[

    serviceFileNames.transactionService,
    serviceFileNames.transactionLoadService,
    serviceFileNames.dataLists,
    serviceFileNames.dataListsActivity,
    serviceFileNames.filterLists,
    serviceFileNames.hpfbConstants

];
var transactionDirectiveFolders =
    [
        directiveFolders.numberOnly
    ];

/*


 */

/**
 * Copy the source files based on the arrays for the different components
 *
 * */
pipes.copySrcs = function (noDate, destDir, componentFolders, serviceFileNames, directiveFolders) {
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
        jsArray.push(paths.directives + directiveFolders[i] + "**/*.js")
        htmlArray.push(paths.directives + directiveFolders[i] + "**/*.html")
    }

    var copySourcesJs = gulp.src(jsArray, {read: true, base: './'});
    var copySourcesHtml = gulp.src(htmlArray, {read: true, base: './'});

    var dateToday = createSuffixDate();
    if (noDate === true) dateToday = "";

    pipes.copyHtml(copySourcesHtml, dateToday, destDir);
    return (
        copySourcesJs.pipe(rename({
                suffix: dateToday
            }))
            .pipe(stringReplace('.html', (dateToday + '.html')))//dangerous, blind replace
            .pipe(gulp.dest(destDir))
    )
};


gulp.task('dev-activity-copySrc', function (noDate) {
    /*  return (pipes.copyActivitySrc(false, paths.buildDevActivity))*/
    return (
        pipes.copySrcs(false, paths.buildDevActivity, activityComponentFolders, activityServiceFileNames, activityDirectiveFolders)
    );

});

pipes.copyHtml = function (copySourcesHtml, dateToday, destDir) {

    return (
        copySourcesHtml.pipe(rename({
                suffix: dateToday
            }))
            .pipe(gulp.dest(destDir))
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


gulp.task('dev-global-watch', function () {
    var watcher = gulp.watch('app/**/*.js', ['ActivityHtml-devBuild', 'CompanyHtml-devBuild', 'TransactionHtml-devBuild', 'DossierHtml-devBuild']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
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
    var dest = paths.buildDevActivity + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.activityRoot + '.js';
    return (
        pipes.createRootFileSet(rootFile, dest, false, true)
    );

});


//clean only seems to work becase of the timestam
gulp.task('dev-activity-htmlBuild', ['dev-activity-copyData', 'dev-activity-copySrc', 'dev-activity-copyLib', 'dev-activity-createRootJS', 'dev-activity-createResources'], function () {

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
    return (
        pipes.copySrcs(false, paths.buildDevCompany, companyComponentFolders, companyServiceFileNames, companyDirectiveFolders)
    )
});


gulp.task('dev-company-createRootJS', function () {
    var dest = paths.buildDevCompany + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.companyRoot + '.js';
    return (
        pipes.createRootFileSet(rootFile, dest, false, true)
    );
});

gulp.task('dev-company-copyTranslate', function () {
    return (pipes.translateDev(companyTranslationFilesBaseList, paths.buildDevCompany))
});

gulp.task('dev-company-htmlBuild', ['dev-company-copyData', 'dev-company-copySrc', 'dev-company-copyLib', 'dev-company-createRootJS', 'dev-company-createResources'], function () {
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
        jsComponentPaths.expandingTablePath + '**/*',
        jsComponentPaths.fileIOComponentAndDepPath + '**/*',
        jsComponentPaths.transactionInfoPath + '**/*',
        jsComponentPaths.lifecycleDetailsPath + '**/*',
        jsComponentPaths.lifecycleListPath + '**/*',
        jsComponentPaths.addressDetailsPath + '**/*'

    ];

    var transactionHtml = [];
    var transactionJs = [];
    for (var i = 0; i < transactionSrcPaths.length; i++) {
        transactionHtml.push(transactionSrcPaths[i] + '.html')
        transactionJs.push(transactionSrcPaths[i] + '.js')
    }
    transactionJs.push(jsServiceFiles.transactionService);
    transactionJs.push(jsServiceFiles.transactionLoadService);
    transactionJs.push(jsServiceFiles.dataLists);
    transactionJs.push(jsServiceFiles.dataListsActivity);
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
    var dest = paths.buildDevTransaction + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.transactionRoot + '.js';
    return (
        pipes.createRootFileSet(rootFile, dest, false, false)
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
gulp.task('dev-transaction-copyWetDep', function () {
    return (pipes.copyWet(paths.buildDevTransaction))
});


gulp.task('dev-transaction-htmlBuild', ['dev-transaction-copyData', 'dev-transaction-copySrc', 'dev-transaction-copyLib', 'dev-transaction-createRootJs', 'dev-transaction-createResources'], function () {
    var ignoreDir = '/build/dev/transaction';
    var buildDir = paths.buildDevTransaction;
    var htmlPartial = jsRootContent.partialTransactionRoot;

    pipes.createRootHtml(paths.frenchTemplate, transactionRootTitles_fr, 'transactionEnrol-fr.html', 'transactionAppEXT-fr' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir, 'fr', '');
    pipes.createRootHtml(paths.englishTemplate, transactionRootTitles_en, 'transactionEnrol-en.html', 'transactionAppEXT-en' + createSuffixDate() + '.js', htmlPartial, buildDir, ignoreDir, 'en', '')

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
gulp.task('dev-company-copyData', function () {
    var def = Q.defer();
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDevCompany)));
});
gulp.task('dev-activity-copyData', function () {
    var def = Q.defer();
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDevActivity)));
});

gulp.task('dev-transaction-copyData', function () {
    var def = Q.defer();
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildDevTransaction)));
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


//good


/*******************PRODUCTIION SCRIPTS START HERE **********************/

gulp.task('prod-global-cleanEnvironment', function () {
    pipes.cleanBuild(paths.buildProd)

});

gulp.task('prod-global-copyAll', ['prod-global-copyLibFolder', 'prod-global-copyAllSources', 'prod-global-copyDataFolder', 'prod-global-copyStyleFolder', 'prod-global-copyWetDependencies'], function () {
    return true;
});


/**
 * Copies the activity library file to the prod directory
 **/
gulp.task('prod-global-copyLibFolder', function () {
    var copySources = gulp.src([paths.lib + '**/*'],
        {read: true, base: ''});
    return (
        copySources.pipe(gulp.dest(paths.buildProd + 'app/lib/'))
    );
});

/**
 * Want all the sources to have the same time stamp
 *
 * */
gulp.task('prod-global-copyAllSources', ['prod-activity-copySourceFiles','prod-company-copySourceFiles','prod-transaction-copySourceFiles'], function () {
    // var destDir = paths.buildProd;
    //return(pipes.copyActivitySrc(false,paths))
    return (true);
});


/**
 * Blind copies all the data files from the data source directory to the prod directory
 * */
gulp.task('prod-global-copyDataFolder', function () {
    var copySources = gulp.src([paths.data + '**/*'],
        {read: true, base: 'app'});
    return (copySources.pipe(gulp.dest(paths.buildProd)));
});

/**
 *  Copy all the styles to the activity folder
 * */
gulp.task('prod-global-copyStyleFolder', function () {
    var copySources = gulp.src([paths.styles + '**/*'],
        {read: true, base: ''});
    return copySources.pipe(gulp.dest(paths.buildProd + 'app/styles/'))

});

gulp.task('prod-global-copyWetDependencies', function () {
    return (pipes.copyWet(paths.buildProd))
});


gulp.task('prod-global-deleteNonMinifiedJs', function () {
    var basePath = paths.buildProd;
    var deletePaths = [
        basePath + 'app/scripts/**/*.js',
        '!' + basePath + 'app/scripts/*.min.js'
    ];

    return (del(deletePaths));
});


/********* PRODUCTION ACTIVITY**********/


gulp.task('prod-activity-copyTranslateFiles', function () {

    var destPath = paths.buildProd + 'app/resources/';

    var translationList = activityTranslationFilesBaseList;

    return (pipes.translateDev(translationList, paths.buildProd));

});

gulp.task('prod-activity-compileTranslateFile', ['prod-activity-copyTranslateFiles'], function () {

    var destPath = paths.buildProd + paths.relScript;
    return (pipes.compileTranslateFile(paths.buildProd, destPath, "activityTranslations", activityTranslationFilesBaseList));

});


//Leaves out copying activity source files as that should be done globally
gulp.task('prod-activity-compileHtml', ['prod-activity-compileSrcJs'], function () {
    var baseActivityPath = paths.buildProd + 'app/scripts/';
    var htmlPartial = jsRootContent.partialActivityRoot;
    var dateToday = createSuffixDate();
    var srcJsExtEn = [
        baseActivityPath + 'activityAppEXT-en' + '*.min.js',
        paths.buildProd + 'app/lib/**/angular*.js'
    ];
    var srcJsExtFr = [
        baseActivityPath + 'activityAppEXT-fr' + '*.min.js',
        paths.buildProd + 'app/lib/**/angular*.js'
    ];
    var srcJsIntFr = [
        baseActivityPath + 'activityAppINT-fr' + '*.min.js',
        paths.buildProd + 'app/lib/**/angular*.js'
    ];
    var srcJsIntEn = [
        baseActivityPath + 'activityAppINT-en' + '*.min.js',
        paths.buildProd + 'app/lib/**/angular*.js'
    ];
    var result = "";
    result = pipes.createProdRootHtml(paths.englishTemplate, activityRootTitles_en, htmlPartial, srcJsExtEn, '/build/prod/', 'activityEXT-en.html', paths.buildProd);
    result = pipes.createProdRootHtml(paths.frenchTemplate, activityRootTitles_fr, htmlPartial, srcJsIntFr, '/build/prod/', 'activityINT-fr.html', paths.buildProd);
    result = pipes.createProdRootHtml(paths.frenchTemplate, activityRootTitles_fr, htmlPartial, srcJsIntEn, '/build/prod/', 'activityINT-en.html', paths.buildProd);

    return pipes.createProdRootHtml(paths.englishTemplate, activityRootTitles_en, htmlPartial, srcJsExtFr, '/build/prod/', 'activityEXT-fr.html', paths.buildProd);

});


//copy source files
gulp.task('prod-activity-copySourceFiles', function () {
    return (
        pipes.copySrcs(false, paths.buildProd, activityComponentFolders, activityServiceFileNames, activityDirectiveFolders)
    );
});


gulp.task('prod-activity-compileSrcJs', ['prod-activity-compileTranslateFile', 'prod-activity-createRootJsFiles'], function () {

    var srcPath = paths.buildProd + 'app/scripts/';
    var dest = paths.buildProd + 'app/scripts/';
    var rootJsBaseName = "activityApp";
    var translateName = "activityTranslations";
    return (
        pipes.compileSourceJsMinified(srcPath, dest, rootJsBaseName, activityComponentFolders, activityServiceFileNames, activityDirectiveFolders, translateName, true)
    )
});


/**
 * Creates the root JS files for internal/external and french/English forms
 * */
gulp.task('prod-activity-createRootJsFiles', function () {
    var dest = paths.buildProd + 'app/scripts/';
    var rootFile = paths.scripts + "/" + rootFileNames.activityRoot + ".js";
    return (
        pipes.createRootFileSet(rootFile, dest, true, true)
    );
});

/*********** COMPANY PRODCTION SCRIPTS ****************/


gulp.task('prod-company-copyTranslateFiles', function () {

    var destPath = paths.buildProd + 'app/resources/';
    var translationList = companyTranslationFilesBaseList;

    return (pipes.translateDev(translationList, paths.buildProd));

});

gulp.task('prod-company-compileTranslateFile', ['prod-company-copyTranslateFiles'], function () {

    var destPath = paths.buildProd + paths.relScript;
    return (pipes.compileTranslateFile(paths.buildProd, destPath, "companyTranslations", companyTranslationFilesBaseList));

});


/**
 * Creates the root JS files for internal/external and french/English forms
 * */
gulp.task('prod-company-createRootJsFiles', function () {
    var dest = paths.buildProd + 'app/scripts/';
    var rootPath = paths.scripts + "/" + rootFileNames.companyRoot + ".js";
    //skip the date and and generate internal files
    return (
        pipes.createRootFileSet(rootPath, dest, true, true)
    );

});


gulp.task('prod-company-compileSrcJs', ['prod-company-compileTranslateFile', 'prod-company-createRootJsFiles'], function () {

    var srcPath = paths.buildProd + 'app/scripts/';
    var dest = paths.buildProd + 'app/scripts/';
    var rootJsBaseName = "companyApp";
    var translateName = "commpanyTranslations";
    return (
        pipes.compileSourceJsMinified(srcPath, dest, rootJsBaseName, companyComponentFolders, companyServiceFileNames, companyDirectiveFolders, translateName, true)
    )
});


gulp.task('prod-company-copySourceFiles', function () {
    return (
        pipes.copySrcs(false, paths.buildProd, companyComponentFolders, companyServiceFileNames, companyDirectiveFolders)
    );
});

gulp.task('prod-company-compileTranslateFile', ['prod-company-copyTranslateFiles'], function () {

    var destPath = paths.buildProd + paths.relScript;
    return (pipes.compileTranslateFile(paths.buildProd, destPath, "companyTranslations", companyTranslationFilesBaseList));

});


gulp.task('prod-company-compileHtml', ['prod-company-compileSrcJs'], function () {
    var basePath = paths.buildProd + 'app/scripts/';
    var htmlPartial = jsRootContent.partialCompanyRoot;
    var dateToday = createSuffixDate();
    var libFiles= paths.buildProd + paths.relLib+'**/angular*.js';
    var srcJsExtEn = [
        basePath + 'companyAppEXT-en' + '*.min.js',
        libFiles
    ];
    var srcJsExtFr = [
        basePath + 'companyAppEXT-fr' + '*.min.js',
        libFiles
    ];
    var srcJsIntFr = [
        basePath + 'companyAppINT-fr' + '*.min.js',
        libFiles
    ];
    var srcJsIntEn = [
        basePath + 'companyAppINT-en' + '*.min.js',
        libFiles
    ];
    var result = "";
    result = pipes.createProdRootHtml(paths.englishTemplate, activityRootTitles_en, htmlPartial, srcJsExtEn, '/build/prod/', 'companyEXT-en.html', paths.buildProd);
    result = pipes.createProdRootHtml(paths.frenchTemplate, activityRootTitles_fr, htmlPartial, srcJsIntFr, '/build/prod/', 'companyINT-fr.html', paths.buildProd);
    result = pipes.createProdRootHtml(paths.englishTemplate, activityRootTitles_en, htmlPartial, srcJsIntEn, '/build/prod/', 'companyINT-en.html', paths.buildProd);
    return pipes.createProdRootHtml(paths.frenchTemplate, activityRootTitles_fr, htmlPartial, srcJsExtFr, '/build/prod/', 'companyEXT-fr.html', paths.buildProd);

});



/****** END COMPANY PROD SCRIPTS******/


/******START TRANSACTION PROD SCRIPTS******/

gulp.task('prod-transaction-copyTranslateFiles', function () {

    var destPath = paths.buildProd + 'app/resources/';
    var translationList = transactionTranslationFilesBaseList;

    return (pipes.translateDev(translationList, paths.buildProd));

});
gulp.task('prod-transaction-compileTranslateFile', ['prod-transaction-copyTranslateFiles'], function () {

    var destPath = paths.buildProd + paths.relScript;
    return (pipes.compileTranslateFile(paths.buildProd, destPath, "transactionTranslations", transactionTranslationFilesBaseList));

});

/**
 * Creates the root JS files for internal/external and french/English forms
 * */
gulp.task('prod-transaction-createRootJsFiles', function () {
    var dest = paths.buildProd + 'app/scripts/';
    var rootPath = paths.scripts + "/" + rootFileNames.transactionRoot + ".js";
    //skip the date and and generate internal files
    return (
        pipes.createRootFileSet(rootPath, dest, true, false)
    );

});

gulp.task('prod-transaction-compileSrcJs', ['prod-transaction-compileTranslateFile', 'prod-transaction-createRootJsFiles'], function () {

    var srcPath = paths.buildProd + 'app/scripts/';
    var dest = paths.buildProd + 'app/scripts/';
    var rootJsBaseName = "transactionApp";
    var translateName = "transactionTranslations";
    var hasInternal=false;
    return (
        pipes.compileSourceJsMinified(srcPath, dest, rootJsBaseName, transactionComponentFolders, transactionServiceFileNames, transactionDirectiveFolders, translateName, hasInternal)
    )
});


gulp.task('prod-transaction-copySourceFiles', function () {
    return (
        pipes.copySrcs(false, paths.buildProd, transactionComponentFolders, transactionServiceFileNames, transactionDirectiveFolders)
    );
});

gulp.task('prod-transaction-compileHtml', ['prod-transaction-compileSrcJs'], function () {
    var basePath = paths.buildProd + 'app/scripts/';
    var htmlPartial = jsRootContent.partialTransactionRoot;
    var dateToday = createSuffixDate();
    var libFiles= paths.buildProd + paths.relLib+'**/angular*.js';
    var srcJsExtEn = [
        basePath + 'transactionAppEXT-en' + '*.min.js',
        libFiles
    ];
    var srcJsExtFr = [
        basePath + 'transactionAppEXT-fr' + '*.min.js',
        libFiles
    ];

    var result = "";
    result = pipes.createProdRootHtml(paths.englishTemplate, transactionRootTitles_en, htmlPartial, srcJsExtEn, '/build/prod/', 'transactionEXT-en.html', paths.buildProd);
    return pipes.createProdRootHtml(paths.frenchTemplate, transactionRootTitles_en, htmlPartial, srcJsExtFr, '/build/prod/', 'transactionEXT-fr.html', paths.buildProd);
});



/******END TRANSACTION PROD SCRIPTS******/

//TODO: move and copy to other locations
pipes.createRootFileSet = function (rootPath, destDir, skipDate, generateInternal) {
    /*
     console.log(rootPath)
     console.log(destDir)
     console.log("skipdData "+skipDate)
     console.log("generate internal"+generateInternal)*/

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
    var result = false;
    if (hasInternal) {
        //filesToConcat = filesToConcat.slice();
        filesToConcat.push(srcPath + rootJsBaseName + "INT-en" + "*.js");
        result = pipes.builtAppCmpScriptsProd(filesToConcat, rootJsBaseName + "INT-en" + dateToday + '.min.js', destPath);
        filesToConcat = filesToConcat.slice();
        filesToConcat.push(srcPath + rootJsBaseName + "INT-fr" + "*.js");
        result = pipes.builtAppCmpScriptsProd(filesToConcat, rootJsBaseName + "INT-fr" + dateToday + '.min.js', destPath);
        filesToConcat = filesToConcat.slice();
    }
    filesToConcat.push(srcPath + rootJsBaseName + "EXT-en" + "*.js");
    result = pipes.builtAppCmpScriptsProd(filesToConcat, rootJsBaseName + "EXT-en" + dateToday + '.min.js', destPath);
    filesToConcat = filesToConcat.slice();
    filesToConcat.push(srcPath + rootJsBaseName + "EXT-fr" + "*.js");
    return (
        (pipes.builtAppCmpScriptsProd(filesToConcat,  rootJsBaseName + "EXT-fr" + dateToday + '.min.js', destPath))
    )
};








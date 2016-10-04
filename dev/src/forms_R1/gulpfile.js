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

// == PATH STRINGS ========
var baseScript = './app/scripts';
var wetBase = './wet_4_0_22_base';
var buildDev = './build/dev';

var paths = {
    styles: './app/styles/',
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
    scripts: baseScript,
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
    mainHeading: "Activity Form for the Regulatory Enrolment Process (REP)",
    title: 'Health Canada Activity Form'

};
var activityRootTitles_fr = {
    mainHeading: "fr_Activity Form for the Regulatory Enrolment Process (REP)",
    title: 'fr_Health Canada Activity Form'

};

var companyRootTitles_en = {
    mainHeading: "Company Form for the Regulatory Enrolment Process (REP)",
    title: 'Health Canada Company Form'

};
var companyRootTitles_fr = {
    mainHeading: "fr_Company Form for the Regulatory Enrolment Process (REP)",
    title: 'fr_Health Canada Company Form'

};

var transactionRootTitles_en = {
    mainHeading: "Transaction Form for the Regulatory Enrolment Process (REP)",
    title: 'Health Canada Transaction Form'

};
var transactionRootTitles_fr = {
    mainHeading: "fr_Transaction Form for the Regulatory Enrolment Process (REP)",
    title: 'fr_Health Canada Transaction Form'

};

var
    dossierRootTitles_en = {
        mainHeading: "Dossier Form for the Regulatory Enrolment Process (REP)",
        title: 'Health Canada Dossier Form'

    };

var
    dossierRootTitles_fr = {
        mainHeading: "fr_Dossier Form for the Regulatory Enrolment Process (REP)",
        title: 'fr_Health Canada Dossier Form'

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
/** Dossier stuff */
var dossierTranslationBaseFiles = {

    dosageForm: dossierPaths.translations + 'dossier-dosageform',
    dossier: dossierPaths.translations + 'dossier',
    dossierGeneral: dossierPaths.translations + 'dossier-general',
    appendix4: dossierPaths.translations + 'appendix4',
    msg: dossierPaths.translations + 'dossier-msg',
    scheduleA: dossierPaths.translations + 'scheduleA',
    formulation: dossierPaths.translations + 'formulation',
};

var jsDossierComponentPaths = {
    appendix4: dossierPaths.components + 'appendix-four/',
    canRefProducts: dossierPaths.components + 'can-ref-products/',
    checkboxList: dossierPaths.components + 'checkbox-list/',
    contact: dossierPaths.components + 'contact/',
    dossier: dossierPaths.components + 'dossier/',
    drugUse: dossierPaths.components + 'drug-use/',
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
    dossierDataList: dossierPaths.services + "dossier-data-list.js"
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

    if (!baseIgnore) baseIgnore = ".";
    var completeList = pipes.fullTranslateList(translateList);
    var copySources = gulp.src(completeList,
        {read: true, base: baseIgnore});
    return copySources.pipe(gulp.dest(destPath))
};
pipes.insertDateStamp = function (template, valsObj) {

    var utc = new Date().toJSON().slice(0, 10);
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
            .pipe(rename(rootName + type + "-" + lang + '.js'))
            .pipe(gulp.dest(destPath))
    )

};

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

                buildDir + 'app/scripts/components/**/*.js',
                buildDir + 'app/scripts/directives/**/*.js',
                buildDir + 'app/scripts/services/**/*.js',
                buildDir + 'app/scripts/' + injectRootJs,
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
                buildDir + 'app/components/**/*.js',
                buildDir + 'app/directives/**/*.js',
                buildDir + 'app/services/**/*.js',
                buildDir + 'app/' + injectRootJs,
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
    var deferred = Q.defer();
    del(baseDir, function () {
        deferred.resolve();
    });
    return deferred.promise;
    //return (del(paths.buildDev));
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

// == TASKS ========


// Dan added, TODO convert to pipes
gulp.task('translate', function () {
    return gulp.src(paths.translations + '*.json')
        .pipe(angularTranslate())
        .pipe(gulp.dest(paths.buildDev));
});


gulp.task('copyActivitySrcDev', function () {
    var copySources = gulp.src([
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
            jsComponentPaths.repContactRecordPath + '**/*',
            jsServiceFiles.activityService,
            jsServiceFiles.applicationInfoService,
            jsServiceFiles.repContactService,
            jsServiceFiles.filterLists,
            jsServiceFiles.dataLists,
            jsServiceFiles.dataListsActivity,
            jsDirectiveFiles.numberOnly
        ],
        {read: true, base: './'});


    return copySources.pipe(gulp.dest(paths.buildDevActivity))

});

gulp.task('copyActivityTranslateDev', function () {
    var translationList = [
        translationBaseFiles.activityInfo,
        translationBaseFiles.activityList,
        translationBaseFiles.contact,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.fileIO,
        translationBaseFiles.general,
        translationBaseFiles.messages
    ];
    pipes.translateDev(translationList, paths.buildDevActivity)
});

gulp.task('copyLibDevActivity', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevActivity))

});

gulp.task('copyWetDepActivity', function () {
    return (pipes.copyWet(paths.buildDevActivity))
});

gulp.task('clean-devBuild', function () {
    return (pipes.cleanBuild(paths.buildDev));
});


gulp.task('copyFrActivityRoot', function () {
    var lang = 'fr';
    var dest = paths.buildDevActivity + '/app/scripts/';
    return (
        pipes.generateRootJsFile(lang, 'EXT', paths.scripts + '/activityApp.js', dest)
    );
});
gulp.task('copyEnActivityRoot', function () {
    var lang = 'en';
    var dest = paths.buildDevActivity + '/app/scripts/';
    return (
        pipes.generateRootJsFile(lang, 'EXT', paths.scripts + '/activityApp.js', dest)
    );
});
gulp.task('copyFrActivityRootINT', function () {
    var lang = 'fr';
    var dest = paths.buildDevActivity + '/app/scripts/';
    return (
        pipes.generateRootJsFile(lang, 'INT', paths.scripts + '/activityApp.js', dest)
    );
});
gulp.task('copyEnActivityRootINT', function () {
    var lang = 'en';
    var dest = paths.buildDevActivity + '/app/scripts/';
    return (
        pipes.generateRootJsFile(lang, 'INT', paths.scripts + '/activityApp.js', dest)
    );
});


gulp.task('ActivityHtml', ['copyActivitySrcDev', 'copyLibDevActivity', 'copyFrActivityRoot', 'copyEnActivityRoot', 'copyFrActivityRootINT', 'copyEnActivityRootINT', 'copyActivityTranslateDev'], function () {


    pipes.createRootHtml(paths.frenchTemplate, activityRootTitles_fr, 'activityEnrolINT-fr.html', 'activityAppINT-fr.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'fr', 'INT');
    pipes.createRootHtml(paths.frenchTemplate, activityRootTitles_fr, 'activityEnrolEXT-fr.html', 'activityAppEXT-fr.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'fr', 'EXT');
    pipes.createRootHtml(paths.englishTemplate, activityRootTitles_en, 'activityEnrolEXT-en.html', 'activityAppEXT-en.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'en', 'EXT');
    return (
        pipes.createRootHtml(paths.englishTemplate, activityRootTitles_en, 'activityEnrolINT-en.html', 'activityAppINT-en.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'en', 'INT')
    );

});

/******* Company Taska ****/

//copy all the needed files for company
gulp.task('copyCompanySrcDev', function () {
    var copySources = gulp.src([

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
            jsComponentPaths.contactRecordPath + '**/*',
            jsServiceFiles.companyService,
            jsServiceFiles.applicationInfoService,
            jsServiceFiles.filterLists,
            jsServiceFiles.dataLists,
            jsDirectiveFiles.numberOnly
        ],
        {read: true, base: './'});


    return copySources.pipe(gulp.dest(paths.buildDevCompany))

});
//TODO make non repetitive
gulp.task('copyEnCompanyRootINT', function () {
    var lang = 'en';
    var dest = paths.buildDevCompany + '/app/scripts/';
    return (
        pipes.generateRootJsFile(lang, 'INT', paths.scripts + '/companyApp.js', dest)
    );
});
gulp.task('copyEnCompanyRootEXT', function () {
    var lang = 'en';
    var dest = paths.buildDevCompany + '/app/scripts/';
    return (
        pipes.generateRootJsFile(lang, 'EXT', paths.scripts + '/companyApp.js', dest)
    );
});
gulp.task('copyFrCompanyRootINT', function () {
    var lang = 'fr';
    var dest = paths.buildDevCompany + '/app/scripts/';
    return (
        pipes.generateRootJsFile(lang, 'INT', paths.scripts + '/companyApp.js', dest)
    );
});
gulp.task('copyFrCompanyRootExt', function () {
    var lang = 'fr';
    var dest = paths.buildDevCompany + '/app/scripts/';
    return (
        pipes.generateRootJsFile(lang, 'EXT', paths.scripts + '/companyApp.js', dest)
    );
});

gulp.task('copyCompanyTranslateDev', function () {
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
    pipes.translateDev(translationList, paths.buildDevCompany)
});

gulp.task('CompanyHtml', ['copyCompanySrcDev', 'copyLibDevCompany', 'copyEnCompanyRootINT', 'copyFrCompanyRootExt', 'copyEnCompanyRootEXT', 'copyFrCompanyRootINT', 'copyCompanyTranslateDev'], function () {
    var ignoreDir = '/build/dev/company';
    var buildDir = paths.buildDevCompany;
    var htmlPartial = jsRootContent.partialCompanyRoot;
    pipes.createRootHtml(paths.frenchTemplate, companyRootTitles_fr, 'companyEnrolINT-fr.html', 'companyAppINT-fr.js', htmlPartial, buildDir, ignoreDir, 'fr', 'INT');
    pipes.createRootHtml(paths.frenchTemplate, companyRootTitles_fr, 'companyEnrolEXT-fr.html', 'companyAppEXT-fr.js', htmlPartial, buildDir, ignoreDir, 'fr', 'EXT');
    pipes.createRootHtml(paths.englishTemplate, companyRootTitles_en, 'companyEnrolEXT-en.html', 'companyAppEXT-en.js', htmlPartial, buildDir, ignoreDir, 'en', 'EXT');
    return (
        pipes.createRootHtml(paths.englishTemplate, companyRootTitles_en, 'companyEnrolINT-en.html', 'companyAppINT-en.js', htmlPartial, buildDir, ignoreDir, 'en', 'INT')
    );

});
gulp.task('copyWetDepCompany', function () {
    return (pipes.copyWet(paths.buildDevCompany))
});

gulp.task('copyLibDevCompany', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevCompany))

});
/**********************Start Transaction Gulp scripts******/
//copy all the needed files for company
gulp.task('copyTransactionSrcDev', function () {
    var copySources = gulp.src([
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
            jsComponentPaths.contactRecordPath + '**/*',
            jsServiceFiles.transactionService,
            jsServiceFiles.repContactService,
            jsServiceFiles.dataLists,
            jsServiceFiles.dataListsActivity,
            jsServiceFiles.applicationInfoService,
            jsServiceFiles.filterLists,
            jsDirectiveFiles.numberOnly
        ],
        {read: true, base: './'});


    var def = Q.defer();
    copySources.pipe(gulp.dest(paths.buildDevTransaction))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;

    //return copySources.pipe(gulp.dest(paths.buildDevTransaction))

});
gulp.task('copyEnTransactionRootEXT', function () {
    var lang = 'en';
    var dest = paths.buildDevTransaction + '/app/scripts/';
    //formType not needed
    return (
        pipes.generateRootJsFile(lang, '', paths.scripts + '/transactionApp.js', dest)
    );
});
gulp.task('copyFrTransactionRootEXT', function () {
    var lang = 'fr';
    var dest = paths.buildDevTransaction + '/app/scripts/';
    //formType not needed
    return (
        pipes.generateRootJsFile(lang, '', paths.scripts + '/transactionApp.js', dest)
    );
});
gulp.task('copyTransactionTranslateDev', function () {
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
    pipes.translateDev(translationList, paths.buildDevTransaction)
});

gulp.task('copyLibDevTransaction', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDevTransaction))

});
gulp.task('copyWetDepTransaction', function () {
    return (pipes.copyWet(paths.buildDevTransaction))
});


gulp.task('TransactionHtml', ['copyTransactionSrcDev', 'copyLibDevTransaction', 'copyEnTransactionRootEXT', 'copyFrTransactionRootEXT', 'copyTransactionTranslateDev'], function () {
    var ignoreDir = '/build/dev/transaction';
    var buildDir = paths.buildDevTransaction;
    var htmlPartial = jsRootContent.partialTransactionRoot;
    pipes.createRootHtml(paths.frenchTemplate, transactionRootTitles_fr, 'transactionEnrol-fr.html', 'transactionApp-fr.js', htmlPartial, buildDir, ignoreDir, 'fr', '');


    return (
        pipes.createRootHtml(paths.englishTemplate, transactionRootTitles_en, 'transactionEnrol-en.html', 'transactionApp-en.js', htmlPartial, buildDir, ignoreDir, 'en', '')
    );

});

gulp.task('copyWetDepDemo', function () {
    var dest = './build/demo/';
    return (pipes.copyWet(dest))
});

gulp.task('demo-deploy', function () {
    pipes.copyAllSrc();
    pipes.copyDemoCompany();
    pipes.copyDemoActivity();
    pipes.copyDemoTransaction();
});

/**
 * Creates the help files and places in base folder of buld
 */
gulp.task('dev-activity-help', function () {
    var dest = paths.buildDevActivity;
    var ActLoadEn = {
        mainHeading: "REP Activity Form Load File Help",
        title: 'Health Canada Activity Form Help'

    };
    var ActMainEn = {
        mainHeading: "REP Activity Form Main Help",
        title: 'Health Canada Activity Form Help'

    };
    var ActcontactEn = {
        mainHeading: "REP Activity Form Rep Contact Help",
        title: 'Health Canada Activity Form Help'

    };
    var destName = "help-activity-load-en.html";
    pipes.createHelpFile(paths.englishTemplate, ActLoadEn, (paths.helpTemplates + destName), dest, destName);
    destName = "help-activity-main-en.html";
    pipes.createHelpFile(paths.englishTemplate, ActMainEn, (paths.helpTemplates + destName), dest, destName);
    destName = "help-activity-rep-en.html";
    pipes.createHelpFile(paths.englishTemplate, ActcontactEn, (paths.helpTemplates + destName), dest, destName);

    //french
    destName = "help-activity-load-fr.html";
    pipes.createHelpFile(paths.englishTemplate, ActLoadEn, (paths.helpTemplates + destName), dest, destName);
    destName = "help-activity-main-fr.html";
    pipes.createHelpFile(paths.englishTemplate, ActMainEn, (paths.helpTemplates + destName), dest, destName);
    destName = "help-activity-rep-fr.html";
    pipes.createHelpFile(paths.englishTemplate, ActcontactEn, (paths.helpTemplates + destName), dest, destName)

});

/******** Dossier Related  tasks  *****************/

gulp.task('copyWetDevDossier', function () {
    return (pipes.copyWet(dossierPaths.buildDevDossier))
});
gulp.task('copyLibDevDossier', function () {
    var def = Q.defer();
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
   return(copySources.pipe(gulp.dest(dossierPaths.buildDevDossier)));
});

gulp.task('copyDossierTranslateDev', function () {
    var translationList = [
        dossierTranslationBaseFiles.dosageForm,
        dossierTranslationBaseFiles.dossier,
        dossierTranslationBaseFiles.dossierGeneral,
        dossierTranslationBaseFiles.appendix4,
        dossierTranslationBaseFiles.msg,
        dossierTranslationBaseFiles.scheduleA,
        dossierTranslationBaseFiles.formulation
    ];
    var baseIgnore = "../dossierEnrol";

    pipes.translateDev(translationList, dossierPaths.buildDevDossier, baseIgnore)
});

gulp.task('copyDossierSrcDev', ['copyDossierServicesDev', 'copyDossierCommonSrcDev'], function () {
    var copySources = gulp.src([

            jsDossierComponentPaths.appendix4 + '**/*',
            jsDossierComponentPaths.canRefProducts + '**/*',
            jsDossierComponentPaths.checkboxList + '**/*',
            jsDossierComponentPaths.dossier + '**/*',
            jsDossierComponentPaths.drugUse + '**/*',
            jsDossierComponentPaths.expandingTable + '**/*',
            jsDossierComponentPaths.scheduleA + '**/*',
            jsDossierComponentPaths.tabs + '**/*',
            jsDossierComponentPaths.theraClass + '**/*',
            jsDossierComponentPaths.formulations + '**/*'
        ],

        {read: true, base: '../dossierEnrol'});

    var def = Q.defer();
    //TODO inefficient
    copySources.pipe(stringReplace('./components/', './app/components/'))
    .pipe(stringReplace('../lib/uib-templates/tpl-accordian-group-caret.html', 'app/lib/uib-templates/tpl-accordian-group-caret.html'))
        .pipe(gulp.dest(dossierPaths.buildDevDossier))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;

});
/**
 * Copies the common components from the release 1 directory to the dossier build
 * */
gulp.task('copyDossierCommonSrcDev', ['copyDossierCommonServicesDev', 'copyDossierCommonTranslateDev'], function () {
    var copySources = gulp.src([
            jsComponentPaths.fileIOComponentAndDepPath + '**/*',
            jsComponentPaths.repContactListPath + '**/*',
            jsComponentPaths.repContactRecordPath + '**/*',
            jsComponentPaths.contactDetailsPath + '**/*',
            jsComponentPaths.applicationInfoPath + '**/*',
            jsDirectiveFiles.numberOnly
        ],
        {read: true, base: './app/scripts'});

    var def = Q.defer();
    copySources.pipe(stringReplace('app/scripts/components/', './app/components/'))
        .pipe(gulp.dest(dossierPaths.buildDevDossier + 'app/'))
        .on('end', function () {
            def.resolve();
        })
        .on('error', def.reject);
    return def.promise;
});
gulp.task('copyDossierCommonTranslateDev', function () {
    var translationList = [
        jsComponentPaths.fileIOComponentAndDepPath + '**/*',
        translationBaseFiles.general,
        translationBaseFiles.fileIO,
        translationBaseFiles.countries,
        translationBaseFiles.applicationInfo,
        translationBaseFiles.messages,
        translationBaseFiles.contact
    ];
    pipes.translateDev(translationList, dossierPaths.buildDevDossier)

});


/* Copies the common services dossier uses to the dev build folder
 **
 */
gulp.task('copyDossierCommonServicesDev', function () {
    var copySources = gulp.src([
            jsServiceFiles.applicationInfoService,
            jsServiceFiles.dataLists,
            jsServiceFiles.filterLists,
            jsServiceFiles.repContactService,
            jsServiceFiles.filterLists
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
gulp.task('copyDossierServicesDev', function () {
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

});

gulp.task('copyEnDossierRootEXT', function () {
    var lang = 'en';
    var dest = dossierPaths.buildDevDossier + 'app/';
    //formType not needed
    return (
        pipes.generateRootJsFile(lang, 'EXT', dossierPaths.dossierApp, dest)
    );
});

gulp.task('copyFrDossierRootEXT', function () {
    var lang = 'fr';
    var dest = dossierPaths.buildDevDossier + 'app/';
    //formType not needed
    return (
        pipes.generateRootJsFile(lang, 'EXT', dossierPaths.dossierApp, dest)
    );
});

gulp.task('copyFrDossierRootINT', function () {
    var lang = 'fr';
    var dest = dossierPaths.buildDevDossier + 'app/';
    //formType not needed
    return (
        pipes.generateRootJsFile(lang, 'INT', dossierPaths.dossierApp, dest)
    );
});

/**
 *
 *
 */
gulp.task('copyEnDossierRootINT', function () {
    var lang = 'en';
    var dest = dossierPaths.buildDevDossier + 'app/';
    //formType not needed
    return (
        pipes.generateRootJsFile(lang, 'INT', dossierPaths.dossierApp, dest)
    );
});

/**
 * Generates the base Dossier HTML file.
 * First copies the source files (copyDossierSrcDev),
 * library files (copyLibDevDossier),
 * Then creates 4 versions of main app file (dossierApp).
 * Creates 4 html files- internal english, internal french, external english, external french
 */

gulp.task('DossierHtml', ['copyDossierSrcDev', 'copyLibDevDossier', 'copyEnDossierRootEXT', 'copyFrDossierRootEXT', 'copyFrDossierRootINT', 'copyEnDossierRootINT', 'copyDossierTranslateDev'], function () {
    var ignoreDir = '/build/dev/dossier';
    var buildDir = dossierPaths.buildDevDossier;
    var htmlPartial = jsRootContent.partialDossierRoot;

    pipes.createDossierDev(paths.englishTemplate, dossierRootTitles_en, 'dossierEnrolINT-en.html', 'dossierAppINT-en.js', htmlPartial, buildDir, ignoreDir);
    pipes.createDossierDev(paths.frenchTemplate, dossierRootTitles_fr, 'dossierEnrolINT-fr.html', 'dossierAppINT-fr.js', htmlPartial, buildDir, ignoreDir);
    pipes.createDossierDev(paths.frenchTemplate, dossierRootTitles_fr, 'dossierEnrolEXT-fr.html', 'dossierAppEXT-fr.js', htmlPartial, buildDir, ignoreDir);
    return (
        pipes.createDossierDev(paths.englishTemplate, dossierRootTitles_en, 'dossierEnrolEXT-en.html', 'dossierAppEXT-en.js', htmlPartial, buildDir, ignoreDir)

    );
});

gulp.task('cleanProd', function () {
    pipes.cleanBuild(paths.buildProd)

});
gulp.task('compileProdSrc', function () {
    var baseActivityPath = paths.buildDevActivity + 'app/scripts/';
    var outName = 'activityEXT-en.min.js';


    return (pipes.builtAppCmpScriptsProd([baseActivityPath + 'activityAppEXT-en.js', baseActivityPath + 'components/**/*.js', baseActivityPath + 'directives/**/*.js', baseActivityPath + 'services/**/*.js']
        , outName, paths.buildProd + '/app/scripts'))
})


gulp.task('testProd', ['compileProdSrc'], function () {
    var baseActivityPath = paths.buildDevActivity + 'app/scripts/';
    var outName = 'activityEXT-en.min.js';

    /*
     pipes.builtAppCmpScriptsProd([paths.buildDevActivity + 'activityAppEXT-en.js', baseActivityPath + 'components/!**!/!*.js', baseActivityPath + 'directives/!**!/!*.js', baseActivityPath + 'services/!**!/!*.js']
     , outName, paths.buildProd + '/app/scripts')*/

    var srcs = [
        baseActivityPath + 'components/**/*.html',
        baseActivityPath + 'directives/**/*.html'
    ];
    pipes.copySrcProd(srcs, './build/dev/activity', paths.buildProd);
    var htmlPartial = jsRootContent.partialActivityRoot;
    var srcJs = [
        paths.buildProd + '/app/scripts/' + 'activityEXT-en.min.js',
        paths.buildProd + '/app/lib/**/*.js']
    pipes.createProdRootHtml(paths.englishTemplate, activityRootTitles_en, htmlPartial, srcJs, '/build/prod/', 'indexActivityEXT-en.html', paths.buildProd);

});


gulp.task('copyWetProd', function () {
    var dest = './build/prod/';
    return (pipes.copyWet(dest))
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
        .pipe(inject(gulp.src(src)
            .pipe(angularFilesort())
            , {
                ignorePath: ignorePath,
                addRootSlash: false
            }))
        .pipe(rename(outName))
        .pipe(gulp.dest(destDir))

};

gulp.task('copyLibProd', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: ''});
    return copySources.pipe(gulp.dest(paths.buildProd))

});

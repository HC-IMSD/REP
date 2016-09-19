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
var angularFilesort = require('gulp-angular-filesort')
var replace = require('gulp-replace-task');
var stringReplace=require('gulp-string-replace')

// == PATH STRINGS ========
var baseScript = './app/scripts';
var wetBase = './wet_4_0_22_base';
var buildDev = './build/dev';

var paths = {
    styles: './app/styles/',
    translations: 'app/resources/',
    helpTemplates: 'app/help/',
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
    wetBase: wetBase,

};

var baseDossier = '../dossierEnrol';
var dossierPaths = {
    lib: './app/lib/', //going to use the same as transaction paths
    translations: baseDossier + '/app/resources/',
    buildDevDossier: buildDev + '/dossier/',
    services: baseDossier + '/app/services/',
    components: baseDossier + '/app/components/',
    dossierApp: baseDossier + '/app/dossierApp.js'
}


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
};
//TODO refactor
var jsDirectiveFiles = {
    country: paths.directives + 'country/country-select.js',
    numberOnly: paths.directives + 'numberOnly/only-digits.js'
}

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
}


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
    companyInfo: paths.translations + 'companyInfo',
}
/** Dossier stuff */
var dossierTranslationBaseFiles = {

    dosageForm: dossierPaths.translations + 'dossier-dosageform',
    dossier: dossierPaths.translations + 'dossier',
    dossierGeneral: dossierPaths.translations + 'dossier-general',
    fileIO: dossierPaths.translations + 'fileIO'

}

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
    theraClass: dossierPaths.components + 'therapeutic-classification/'
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

pipes.builtAppScriptsProd = function () {
    var scriptedPartials = pipes.scriptedPartials();
    var validatedAppScripts = pipes.validatedAppScripts();

    return es.merge(scriptedPartials, validatedAppScripts)
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.distScriptsProd));
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
    var completeList = []
    for (var i = 0; i < translateList.length; i++) {
        completeList.push(translateList[i] + '-en.json')
        completeList.push(translateList[i] + '-fr.json')
    }
    return completeList;
}
pipes.translateDev = function (translateList, destPath, baseIgnore) {

    if (!baseIgnore) baseIgnore = ".";
    var completeList = pipes.fullTranslateList(translateList);
    var copySources = gulp.src(completeList,
        {read: true, base: baseIgnore});
    return copySources.pipe(gulp.dest(destPath))
}
pipes.insertDateStamp = function (template, valsObj) {

    var utc = new Date().toJSON().slice(0, 10);
    console.log("date" + utc)
    // var datePH = placeholders.dateStamp; doesnt work
    return (gulp.src(template)
            .pipe(htmlreplace({
                dateToday: utc,
                mainHeading: valsObj.mainHeading,
                formTitle: valsObj.title
            }))
    );

};
pipes.insertTitleInfo = function (template, valsObj) {

    var utc = new Date().toJSON().slice(0, 10);

    var datePH = placeholders.dateStamp;
    return (gulp.src(template)
            .pipe(htmlreplace({
                mainHeading: utc
            }))
    );

};


pipes.copyWet = function (destDirectory) {
    var copySources = gulp.src([paths.wetBase + '/**/*', '!' + paths.englishTemplate, '!' + paths.frenchTemplate],
        {read: true, base: paths.wetBase});
    return (copySources.pipe(gulp.dest(destDirectory)))
}

//creates ALL the root files js TODO rename
pipes.activityRootJS = function (lang, type, rootFile, destPath, ignorePath) {
    if (!ignorePath) ignorePath = "."
    var rootName = rootFile.split("/");
    rootName = rootName[rootName.length - 1]
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
pipes.createActivityDev = function (templatePath, valsObj, templateName, injectRootJs, partialRoot, buildDir, ignorePath, lang, formType) {


    pipes.insertDateStamp(templatePath, valsObj)
        .pipe(inject(gulp.src([partialRoot]), {
            starttag: placeholders.mainContent,
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src([

                buildDir + 'app/scripts/components/**/*.js',
                buildDir + 'app/scripts/directives/**/*.js',
                buildDir + 'app/scripts/services/**/*.js',
                buildDir + 'app/scripts/' + injectRootJs,
                buildDir + 'app/lib/**/*.js',

            ])
            .pipe(angularFilesort())
            , {
                ignorePath: ignorePath,
                addRootSlash: false
            }))

        .pipe(rename(templateName))
        .pipe(gulp.dest(buildDir))

}

//dosssier is special
pipes.createDossierDev = function (templatePath, valsObj, templateName, injectRootJs, partialRoot, buildDir, ignorePath, lang, formType) {


    pipes.insertDateStamp(templatePath, valsObj)
        .pipe(inject(gulp.src([partialRoot]), {
            starttag: placeholders.mainContent,
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src([

                buildDir + 'app/components/**/*.js',
                buildDir + 'app/directives/**/*.js',
                buildDir + 'app/services/**/*.js',
                buildDir + 'app/' + injectRootJs,
                buildDir + 'app/lib/**/*.js',

            ])
            .pipe(angularFilesort())
            , {
                ignorePath: ignorePath,
                addRootSlash: false
            }))

        .pipe(rename(templateName))
        .pipe(gulp.dest(buildDir))

}


pipes.cleanBuild = function (baseDir) {
    var deferred = Q.defer();
    del(baseDir, function () {
        deferred.resolve();
    });
    return deferred.promise;
    //return (del(paths.buildDev));
}
pipes.copyAllSrc = function () {
    var dest = './build/demo/'
    var copySources = gulp.src(['./app/**/*', '!./app/views/**/*', '!./app/spec/**/*',
            '!./app/scripts/*'],
        {read: true, base: '.'});
    return (copySources.pipe(gulp.dest(dest)))
}
pipes.copyDemoActivity = function () {
    var dest = './build/demo/'
    var copySources = gulp.src([
        paths.buildDevActivity + '/*.html',
        paths.buildDevActivity + '/app/scripts/*.js'
    ], {read: true, base: paths.buildDevActivity});
    return (copySources.pipe(gulp.dest(dest)))
}
pipes.copyDemoTransaction = function () {
    var dest = './build/demo/'
    var copySources = gulp.src([
        paths.buildDevTransaction + '/*.html',
        paths.buildDevTransaction + '/app/scripts/*.js'
    ], {read: true, base: paths.buildDevTransaction});
    return (copySources.pipe(gulp.dest(dest)))
}
pipes.copyDemoCompany = function () {
    var dest = './build/demo/'
    var copySources = gulp.src([
        paths.buildDevCompany + '/*.html',
        paths.buildDevCompany + '/app/scripts/*.js'
    ], {read: true, base: paths.buildDevCompany});
    return (copySources.pipe(gulp.dest(dest)))
}

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
        .pipe(gulp.dest(destDir))
    // }

}

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
        pipes.activityRootJS(lang, 'EXT', paths.scripts + '/activityApp.js', dest)
    );
});
gulp.task('copyEnActivityRoot', function () {
    var lang = 'en';
    var dest = paths.buildDevActivity + '/app/scripts/';
    return (
        pipes.activityRootJS(lang, 'EXT', paths.scripts + '/activityApp.js', dest)
    );
});
gulp.task('copyFrActivityRootINT', function () {
    var lang = 'fr';
    var dest = paths.buildDevActivity + '/app/scripts/';
    return (
        pipes.activityRootJS(lang, 'INT', paths.scripts + '/activityApp.js', dest)
    );
});
gulp.task('copyEnActivityRootINT', function () {
    var lang = 'en';
    var dest = paths.buildDevActivity + '/app/scripts/';
    return (
        pipes.activityRootJS(lang, 'INT', paths.scripts + '/activityApp.js', dest)
    );
});


gulp.task('ActivityHtml', ['copyActivitySrcDev', 'copyLibDevActivity', 'copyFrActivityRoot', 'copyEnActivityRoot', 'copyFrActivityRootINT', 'copyEnActivityRootINT', 'copyActivityTranslateDev'], function () {


    pipes.createActivityDev(paths.frenchTemplate, activityRootTitles_fr, 'activityEnrolINT-fr.html', 'activityAppINT-fr.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'fr', 'INT');
    pipes.createActivityDev(paths.frenchTemplate, activityRootTitles_fr, 'activityEnrolEXT-fr.html', 'activityAppEXT-fr.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'fr', 'EXT');
    pipes.createActivityDev(paths.englishTemplate, activityRootTitles_en, 'activityEnrolEXT-en.html', 'activityAppEXT-en.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'en', 'EXT')
    return (
        pipes.createActivityDev(paths.englishTemplate, activityRootTitles_en, 'activityEnrolINT-en.html', 'activityAppINT-en.js', jsRootContent.partialActivityRoot, paths.buildDevActivity, '/build/dev/activity', 'en', 'INT')
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
        pipes.activityRootJS(lang, 'INT', paths.scripts + '/companyApp.js', dest)
    );
});
gulp.task('copyEnCompanyRootEXT', function () {
    var lang = 'en';
    var dest = paths.buildDevCompany + '/app/scripts/';
    return (
        pipes.activityRootJS(lang, 'EXT', paths.scripts + '/companyApp.js', dest)
    );
});
gulp.task('copyFrCompanyRootINT', function () {
    var lang = 'fr';
    var dest = paths.buildDevCompany + '/app/scripts/';
    return (
        pipes.activityRootJS(lang, 'INT', paths.scripts + '/companyApp.js', dest)
    );
});
gulp.task('copyFrCompanyRootExt', function () {
    var lang = 'fr';
    var dest = paths.buildDevCompany + '/app/scripts/';
    return (
        pipes.activityRootJS(lang, 'EXT', paths.scripts + '/companyApp.js', dest)
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
    var htmlPartial = jsRootContent.partialCompanyRoot
    pipes.createActivityDev(paths.frenchTemplate, companyRootTitles_fr, 'companyEnrolINT-fr.html', 'companyAppINT-fr.js', htmlPartial, buildDir, ignoreDir, 'fr', 'INT');
    pipes.createActivityDev(paths.frenchTemplate, companyRootTitles_fr, 'companyEnrolEXT-fr.html', 'companyAppEXT-fr.js', htmlPartial, buildDir, ignoreDir, 'fr', 'EXT');
    pipes.createActivityDev(paths.englishTemplate, companyRootTitles_en, 'companyEnrolEXT-en.html', 'companyAppEXT-en.js', htmlPartial, buildDir, ignoreDir, 'en', 'EXT')
    return (
        pipes.createActivityDev(paths.englishTemplate, companyRootTitles_en, 'companyEnrolINT-en.html', 'companyAppINT-en.js', htmlPartial, buildDir, ignoreDir, 'en', 'INT')
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
        pipes.activityRootJS(lang, '', paths.scripts + '/transactionApp.js', dest)
    );
});
gulp.task('copyFrTransactionRootEXT', function () {
    var lang = 'fr';
    var dest = paths.buildDevTransaction + '/app/scripts/';
    //formType not needed
    return (
        pipes.activityRootJS(lang, '', paths.scripts + '/transactionApp.js', dest)
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
    var htmlPartial = jsRootContent.partialTransactionRoot
    pipes.createActivityDev(paths.frenchTemplate, transactionRootTitles_fr, 'transactionEnrol-fr.html', 'transactionApp-fr.js', htmlPartial, buildDir, ignoreDir, 'fr', '')


    return (
        pipes.createActivityDev(paths.englishTemplate, transactionRootTitles_en, 'transactionEnrol-en.html', 'transactionApp-en.js', htmlPartial, buildDir, ignoreDir, 'en', '')
    );

});

gulp.task('copyWetDepDemo', function () {
    var dest = './build/demo/'
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
    var destName = "help-activity-load-en.html"
    pipes.createHelpFile(paths.englishTemplate, ActLoadEn, (paths.helpTemplates + destName), dest, destName)
    destName = "help-activity-main-en.html"
    pipes.createHelpFile(paths.englishTemplate, ActMainEn, (paths.helpTemplates + destName), dest, destName)
    destName = "help-activity-rep-en.html"
    pipes.createHelpFile(paths.englishTemplate, ActcontactEn, (paths.helpTemplates + destName), dest, destName)

    //french
    destName = "help-activity-load-fr.html"
    pipes.createHelpFile(paths.englishTemplate, ActLoadEn, (paths.helpTemplates + destName), dest, destName)
    destName = "help-activity-main-fr.html"
    pipes.createHelpFile(paths.englishTemplate, ActMainEn, (paths.helpTemplates + destName), dest, destName)
    destName = "help-activity-rep-fr.html"
    pipes.createHelpFile(paths.englishTemplate, ActcontactEn, (paths.helpTemplates + destName), dest, destName)


});

/******** Dossier Related  tasks  *****************/

gulp.task('copyWetDevDossier', function () {
    return (pipes.copyWet(dossierPaths.buildDevDossier))
});
gulp.task('copyLibDevDossier', function () {
    var copySources = gulp.src([paths.lib + '**/*', paths.styles + '**/*'],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(dossierPaths.buildDevDossier))

});

gulp.task('copyDossierTranslateDev', function () {
    var translationList = [
        dossierTranslationBaseFiles.dosageForm,
        dossierTranslationBaseFiles.dossier,
        dossierTranslationBaseFiles.dossierGeneral,
        dossierTranslationBaseFiles.fileIO
    ];
    var baseIgnore = "../dossierEnrol"

    pipes.translateDev(translationList, dossierPaths.buildDevDossier, baseIgnore)
});

gulp.task('copyDossierSrcDev', function () {
    var copySources = gulp.src([

            jsDossierComponentPaths.appendix4 + '**/*',
            jsDossierComponentPaths.canRefProducts + '**/*',
            jsDossierComponentPaths.checkboxList + '**/*',
            jsDossierComponentPaths.contact + '**/*',
            jsDossierComponentPaths.dossier + '**/*',
            jsDossierComponentPaths.drugUse + '**/*',
            jsDossierComponentPaths.expandingTable + '**/*',
            jsDossierComponentPaths.fileIO + '**/*',
            jsDossierComponentPaths.scheduleA + '**/*',
            jsDossierComponentPaths.tabs + '**/*',
            jsDossierComponentPaths.theraClass + '**/*',
            dossierPaths.services+'**/*'
        ],
        {read: true, base: '../dossierEnrol'});


    var def = Q.defer();
    copySources.pipe(stringReplace('./components/', './app/components/'))
        .pipe(gulp.dest(dossierPaths.buildDevDossier))
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
        pipes.activityRootJS(lang, 'EXT', dossierPaths.dossierApp, dest)
    );
});


gulp.task('DossierHtml', ['copyDossierSrcDev', 'copyLibDevDossier', 'copyEnDossierRootEXT', 'copyDossierTranslateDev'], function () {
    var ignoreDir = '/build/dev/dossier';
    var buildDir = dossierPaths.buildDevDossier
    var htmlPartial = jsRootContent.partialDossierRoot
    var rootTitles_en = {
        mainHeading: "Dossier Form for the Regulatory Enrolment Process (REP)",
        title: 'Health Canada Dossier Form'

    };

    // pipes.createActivityDev(paths.englishTemplate, transactionRootTitles_en, 'transactionEnrol-en.html', 'transactionApp-en.js', htmlPartial, buildDir, ignoreDir, 'en', '')

    return (
        pipes.createDossierDev(paths.englishTemplate, rootTitles_en, 'dossierEnrol-en.html', 'dossierAppEXT-en.js', htmlPartial, buildDir, ignoreDir, 'en', '')

    );

});
/*
gulp.task ('DossierUpdateComponent',function(){

        gulp.src([dossierPaths.components+"**!/!*.js"])
            .pipe(replace('./components', './app/components'))
            .pipe(gulp.dest('build/file.txt'));
    });

})
*/


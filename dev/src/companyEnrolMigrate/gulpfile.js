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
var Promise = require('promise')

// == PATH STRINGS ========
var baseScript = './app/scripts';
var paths = {
    scripts: ['./app/scripts/**/*.js', '!app/scripts/*.js'],
    styles: ['./app/styles/*.css', './app/**/*.scss'],
    index: 'companyEnrol.html',
    partials: ['app/**/*.html', '!app/index.html'],
    distDev: './dist/dev',
    distProd: './dist/prod',
    distScriptsProd: './dist.prod/scripts',
    scriptsDevServer: 'devServer/**/*.js',
    translations: 'app/resources/*.json',
    buildDev: './build/dev/',
    englishTemplate: '../../../wet_4_0_22_base/content-en.html',
    activityRoot: 'rootContent/activityRoot.html',
    lib: './app/lib/',
    scripts: baseScript,
    components: baseScript + '/components/',
    directives: baseScript + '/directives/',
    services: baseScript + '/services/',
    rootActivity: './app/activityApp.js'

};

var placeholders = {
    mainContent: '<!-- inject:mainContent-->'

};
var jsLibFiles = {
    angular: paths.lib + "angular.min.js",
    angularMessages: paths.lib + "angular-messages.min.js",
    angularMessages: paths.lib + "angular-translate.min.js",
    angularMessages: paths.lib + "angular-translate.min.js"
}
var jsComponentFiles = {
    activityChangeCmp: paths.components + 'activityChangeType/cmp-activity-change.js',
    activityMainCmp: paths.components + 'activityMain/cmp-activity-main.js',
    activityRationaleCmp: paths.components + 'activityRationale/cmp-activity-rationale.js',
    addressDetailsCmp: paths.components + 'addressDetails/cmp-address-details.js',
    addressListCmp: paths.components + 'addressList/cmp-company-address-list.js',
    addressRecordCmp: paths.components + 'addressRecord/cmp-address-record.js',
    addressRoleCmp: paths.components + 'addressRole/cmp-address-role.js',
    applicationInfoCmp: paths.components + 'applicationInfo/cmp-application-info.js',
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
    trackRecordCmp: paths.components + 'trackRecord/cmp-track-record.js',
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
    trackRecordPath: paths.components + 'trackRecord/cmp-track-record.js',
    transactionAddressRecordPath: paths.components + 'transactionCompanyRecord/',
    transactionInfoPath: paths.components + 'transactionInfo/',
    countrySelectPath: paths.components
};

var jsServiceFiles = {
    activityService: paths.services + 'activity-service.js',
    applicationInfoService: paths.services + 'application-info-service.js',
    companyService: paths.services + 'company-service.js',
    dataListsActivity: paths.services + 'data-lists.activity.js',
    dataLists: paths.services + 'data-lists.js',
    filterLists: paths.services + 'filter-lists.js',
    hpfbConstants: paths.services + 'hpfb-constants.js',
    transactionService: paths.services + 'transaction-service.js',
};

var jsDirectiveFiles={
    country: paths.directives +'country/country-select.js',
    numberOnly:paths.directives +'numberOnly/only-digits.js'
}

var jsAppFiles={
    companyApp:'app/app.js',
    activityApp:'app/activityApp.js',
    transactionApp:'app/transactionApp.js'
};

// == PIPE SEGMENTS ========

var pipes = {};

pipes.orderedVendorScripts = function () {
    return plugins.order(['jquery.js', 'angular.js']);
};

pipes.orderedAppScripts = function () {
    return plugins.angularFilesort();
};

pipes.minifiedFileName = function () {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

pipes.validatedAppScripts = function () {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
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

pipes.builtVendorScriptsDev = function () {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist.dev/bower_components'));
};

pipes.builtVendorScriptsProd = function () {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.validatedDevServerScripts = function () {
    return gulp.src(paths.scriptsDevServer)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
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

// == TASKS ========

// removes all compiled dev files
gulp.task('clean-dev', function () {
    var deferred = Q.defer();
    del(paths.distDev, function () {
        deferred.resolve();
    });
    return deferred.promise;
});

// removes all compiled production files
gulp.task('clean-prod', function () {
    var deferred = Q.defer();
    del(paths.distProd, function () {
        deferred.resolve();
    });
    return deferred.promise;
});

// checks html source files for syntax errors
gulp.task('validate-partials', pipes.validatedPartials);

// checks index.html for syntax errors
gulp.task('validate-index', pipes.validatedIndex);

// moves html source files into the dev environment
gulp.task('build-partials-dev', pipes.builtPartialsDev);

// converts partials to javascript using html2js
gulp.task('convert-partials-to-js', pipes.scriptedPartials);

// runs jshint on the dev server scripts
gulp.task('validate-devserver-scripts', pipes.validatedDevServerScripts);

// runs jshint on the app scripts
gulp.task('validate-app-scripts', pipes.validatedAppScripts);

// moves app scripts into the dev environment
gulp.task('build-app-scripts-dev', pipes.builtAppScriptsDev);

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task('build-app-scripts-prod', pipes.builtAppScriptsProd);

// compiles app sass and moves to the dev environment
gulp.task('build-styles-dev', pipes.builtStylesDev);

// compiles and minifies app sass to css and moves to the prod environment
gulp.task('build-styles-prod', pipes.builtStylesProd);

// moves vendor scripts into the dev environment
gulp.task('build-vendor-scripts-dev', pipes.builtVendorScriptsDev);

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task('build-vendor-scripts-prod', pipes.builtVendorScriptsProd);

// validates and injects sources into index.html and moves it to the dev environment
gulp.task('build-index-dev', pipes.builtIndexDev);

// validates and injects sources into index.html, minifies and moves it to the dev environment
gulp.task('build-index-prod', pipes.builtIndexProd);

// builds a complete dev environment
gulp.task('build-app-dev', pipes.builtAppDev);

// builds a complete prod environment
gulp.task('build-app-prod', pipes.builtAppProd);

// cleans and builds a complete dev environment
gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtAppDev);

// cleans and builds a complete prod environment
gulp.task('clean-build-app-prod', ['clean-prod'], pipes.builtAppProd);

// clean, build, and watch live changes to the dev environment
gulp.task('watch-dev', ['clean-build-app-dev', 'validate-devserver-scripts'], function () {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV: 'development'}})
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function () {
        return pipes.builtIndexDev()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function () {
        return pipes.builtAppScriptsDev()
            .pipe(plugins.livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function () {
        return pipes.builtPartialsDev()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function () {
        return pipes.builtStylesDev()
            .pipe(plugins.livereload());
    });

});

// clean, build, and watch live changes to the prod environment
gulp.task('watch-prod', ['clean-build-app-prod', 'validate-devserver-scripts'], function () {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV: 'production'}})
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function () {
        return pipes.builtIndexProd()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function () {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    // watch hhtml partials
    gulp.watch(paths.partials, function () {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function () {
        return pipes.builtStylesProd()
            .pipe(plugins.livereload());
    });

});

// default task builds for prod
gulp.task('default', ['clean-build-app-prod']);


// Dan added, TODO convert to pipes
gulp.task('translate', function () {
    return gulp.src(paths.translations)
        .pipe(angularTranslate())
        .pipe(gulp.dest(paths.buildDev));
});


gulp.task('copyActivitySrcDev', function () {
    var copySources = gulp.src([
            jsComponentPaths.activityChangePath + '**/*',
            jsComponentPaths.activityMainPath + '**/*',
            jsComponentPaths.activityRationalePath + '**/*',
            jsComponentPaths.applicationInfoPath + '**/*',
            jsComponentPaths.countrySelectPath + 'cmp-country-select.js',
            jsComponentPaths.dinDetailsPath + '**/*',
            jsComponentPaths.expandingTablePath + '**/*',
            jsComponentPaths.fileIOComponentAndDepPath + '**/*',
            jsComponentPaths.relatedActivityListPath + '**/*',
            jsComponentPaths.relatedActivityPath + '**/*',
            jsComponentPaths.repContactListPath + '**/*',
            jsComponentPaths.repContactRecordPath + '**/*',
        ],
        {read: true, base: '.'});
    return copySources.pipe(gulp.dest(paths.buildDev))

});

gulp.task('injectActivityJS', ['copyActivitySrcDev'], function () {
    var utc = new Date().toJSON().slice(0, 10);
    gulp.src(paths.englishTemplate)
        .pipe(htmlreplace({
            'dateToday': utc
        }))
        .pipe(inject(gulp.src(paths.buildDev + 'app/**/*.js', {read: false}), {
            ignorePath: '/build/dev/',
            addRootSlash: false
        }))
        .pipe(rename("actvityEnrol-en.html"))
        .pipe(gulp.dest(paths.buildDev))
});


Forms Release 1 code and tests

Helpers

Protractor

cd dev\src\forms_r1

webdriver-manager start

Run gulp script connect-server-start

Right click and rum protractorconf.js





Gulp scripts
-----------

connect-server-start - starts a local server at localhost:2121

dev-global-watch - watches for changes in the dev folders. Automatically rebuilds the form. Exclusions: translations and the root js file

dev-XXX-clean - cleans the folder for the XXX form
dev-XXX-htmlBuild- builds the XXX form for development. Calls dependency tasks. Combines the root content html to the template
dev-XXX-copyData - copies the data folder containing all the data json files
dev-XXX-copyLib- copies all the library dependency files
dev-XXX-copySrc- copies all the component, directive, and service files
dev-XXX-copyTranslate- copies all the translation files for a given form
dev -XXX-createResources- compiles a translation js file. Allows for synchronous load of the files
dev-XXX-createRootJS -creates the root JS file for each form



prod-XXX-clean -cleans the prod folder for the XXX form
prod-XXX-allFormsCreate- creates the XXX production form

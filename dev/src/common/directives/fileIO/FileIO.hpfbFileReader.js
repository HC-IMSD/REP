/**
 * Created by dkilty on 12/07/2016.
 */

(function () {
    'use strict';
    angular
        .module('FileIO', []);

})();

(function () {
    'use strict';
    /**
     * @ngdoc directive -attribute directive for file load. Place on file input element
     * attribute must be bound to a function with a parameter named fileContent. On load
     * the function will be called to update values
     */
    angular
        .module('FileIO')
        .directive('hpfbFileSelect', ngFileSelect);

    ngFileSelect.$inject = ['hpfbFileProcessing'];
    function ngFileSelect(hpfbFileReader) {
        var directive = {

            link: link,
            restrict: 'A',
            scope: {
                hpfbFileSelect: "&",
            },
        };
        return directive;

        function link(scope, element, attrs) {
            scope.rootTag = attrs.rootTag;
            element.bind("change", function (e) {
                scope.file = (e.srcElement || e.target).files[0];
                if (scope.file) {
                    hpfbFileReader.readAsDataText(scope.file, scope)
                        .then(function (result) {

                            scope.hpfbFileSelect({fileContent: result});

                        })
                }
            })
        }

    }
})();

(function () {
    'use strict';

    angular.module('FileIO').component('danFileSelect', {
        templateUrl: '../../../../../../FileReader3/fileSelect.html',
        controller: FileSelectController,
        bindings: {
            updateModelRoot: '&',
            rootElem: '@',
        }
    });


    FileSelectController.$inject = ['hpfbFileProcessing']
    function FileSelectController(hpfbFileProcessing) {
        var vm = this;

        vm.modelCallback = function (fileContent) {
            vm.status = ""
            if (fileContent) {
                vm.status = fileContent.messages;
            }
            vm.updateModelRoot({fileContent: fileContent});
        };

    }

})();

(function () {
    'use strict';

    angular.module('FileIO').component('hpfbFileSave', {
        templateUrl: '../../../../../../FileReader3/fileSave.html',
        controller: FileWriteController,
        bindings: {
            jsonToSave: '<',
            rootTag: '@',
            saveType: '@',
            buttonLabel: '@'
        }
    });

    /* @ngInject */
    FileWriteController.$inject = ['hpfbFileProcessing']
    function FileWriteController(hpfbFileProcessing) {
        var vm = this;
        vm.generate = function () {
            if (vm.saveType.toUpperCase() === "JSON") {
                hpfbFileProcessing.writeAsJson(vm.jsonToSave, vm.fileName, vm.rootTag);
            } else if (vm.saveType.toUpperCase() === "XML") {
                hpfbFileProcessing.writeAsXml(vm.jsonToSave, vm.fileName, vm.rootTag);
            }
        }
    }

})();


(function () {
    'use strict';
    angular
        .module('FileIO')
        .factory('hpfbFileProcessing', fileReader);

    fileReader.$inject = ['$q'];
    /* @ngInject */
    function fileReader($q) {
        //constants used for messaging
        var msg_success = "MSG_SUCCESS_LOAD"; //load was a success
        var msg_err_jsonparse = "MSG_ERR_JSONPARSE"; //json parsing error
        var msg_err_xmlparse = "MSG_ERR_XMLPARSE"; //xml parsing error
        var msg_err_load = "MSG_ERR_FILE_LOAD"; //file load error
        var msg_err_fileType = "MSG_ERR_FILE_TYPE"; //file type error
        var msg_err_formType = "MSG_ERR_FORM_TYPE"; //fa valid json but incorrect root tag
        var msg_err_checksum_compareFail = "MSG_ERR_CHECKSUM_FAIL"
        /**
         * @ngObject: used to store the jsonResult and any messages
         * @type {{jsonResult: string, messages: string}}
         */
        var convertResult = {
            jsonResult: "",
            messages: msg_success
        }
        var service = {
            readAsDataText: readAsDataText,
            writeAsJson: jsonToFile,
            writeAsXml: xmlToFile
        };
        return service;

        ////////////////
        function onLoad(reader, deferred, scope, file) {
            return function () {
                scope.$apply(function () {
                    if (!file) return;
                    var splitFile = file.name.split('.');
                    var fileType = splitFile[splitFile.length - 1];
                    if ((fileType.toLowerCase()) == "json") {
                        console.log("loading json....")
                        convertToJSONObjects(reader);
                        console.log("Json result " + reader.result)
                        checkRootTagMatch(reader, scope);
                        if (reader.parseResult.jsonResult) {
                            compareHashInJson(reader, scope.rootTag);
                        }
                    } else if ((fileType.toLowerCase() === "xml")) {
                        convertXMLToJSONObjects(reader);
                        checkRootTagMatch(reader, scope);
                    } else {
                        convertResult.parseResult = null;
                        convertResult.messages = msg_err_fileType;
                        reader.parseResult = convertResult;
                    }

                    deferred.resolve(reader.parseResult);
                });
            }
        }

        function onError(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    //TODO need to review reject case
                    deferred.reject(msg_err_load);
                });
            }
        }
        function getReader(deferred, scope, file) {
            var reader = new FileReader();
            //extend the fileReader object
            reader.onload = onLoad(reader, deferred, scope, file);
            reader.onError = onError(reader, deferred, scope);
            reader.parseResult = null;
            return reader;
        }

        function readAsDataText(file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope, file);
            if (file) {
                //var result = null;
                reader.readAsText(file);
            }
            return deferred.promise;
        }

        function convertToJSONObjects(reader) {

            try {
                convertResult.jsonResult = JSON.parse(reader.result);
                reader.parseResult = convertResult;
            } catch (e) {
                convertResult.jsonResult = null;
                convertResult.messages = msg_err_jsonparse;
                reader.parseResult = convertResult;
            }
        }

        /**
         * @ngdoc method converts a valid XML file to a JSON object
         * @param reader- the extended file reader object
         * @returns null
         */
        function convertXMLToJSONObjects(reader) {
            var xmlConfig = {
                attributePrefix: "$",
                escapeMode: "true",
                emptyNodeForm: "text",
            }
            var xmlConverter = new X2JS(xmlConfig);
            //converts XML as a string to a json
            convertResult.jsonResult = xmlConverter.xml_str2json(reader.result);
            if (convertResult.jsonResult === null) {
                convertResult.messages = msg_err_xmlparse;
            }
            reader.parseResult = convertResult;
        }

        function convertJSONObjectsToXML(jsonObj) {

            var jsonConverter = new X2JS();
            var xmlResult = null;
            //converts XML as a string to a json
            xmlResult = jsonConverter.json2xml_str(jsonObj)
            return (xmlResult);
        }


        /**
         * @ngDoc method - checks if the root tag matches the expected. If it doesn't match, clears the data
         * and sets the error message
         * @param reader the file reader object that is used to read in a file
         * @param scope - scope of the service
         *  @returns null
         */
        function checkRootTagMatch(reader, scope) {
            if (!scope.rootTag || !reader.parseResult || !reader.parseResult.jsonResult) return;

            if (!reader.parseResult.jsonResult[scope.rootTag]) {
                reader.parseResult.jsonResult = null;
                reader.parseResult.messages = msg_err_formType;
            }
        }

        function insertHashInJson(jsonObj, rootTag) {
            jsonObj[rootTag].data_checksum = "";
            var hash = CryptoJS.SHA256(JSON.stringify(jsonObj));
            jsonObj[rootTag].data_checksum = hash.toString();
        }

        function compareHashInJson(reader, rootTag) {
            var currentTagValue = reader.parseResult.jsonResult[rootTag].data_checksum;
            reader.parseResult.jsonResult[rootTag].data_checksum = "";
            console.log(JSON.stringify(reader.parseResult.jsonResult))
            var generatedHash = CryptoJS.SHA256(JSON.stringify(reader.parseResult.jsonResult));
            console.log("Generated hash " + generatedHash.toString() + "file Hash " + currentTagValue);
            if (currentTagValue !== generatedHash.toString()) {
                reader.parseResult.jsonResult = null;
                reader.parseResult.messages = msg_err_checksum_compareFail;
            }
        }

        function compareHashInXML(reader, scope) {
            var currentTagValue = reader.parseResult.jsonResult[scope.rootTag].data_checksum;
            reader.parseResult.jsonResult[scope.rootTag].data_checksum = "";
            //convert to xml
            scope.hash = CryptoJS.SHA256("reader.result");
            console.log(scope.hash.toString());
            if (currentTagValue !== scope.hash.toString()) {
                reader.parseResult.jsonResult = null;
                reader.parseResult.messages = msg_err_checksum_compareFail;
            }
        }

        function jsonToFile(jsonObj, fileName, rootTag) {
            if (!jsonObj) return;
            insertHashInJson(jsonObj, rootTag)
            var makeStrSave = JSON.stringify(jsonObj);
            var blob = new Blob([makeStrSave], {type: "text/plain;charset=utf-8"});
            if (!fileName) {
                fileName = "hpfbDraft.json"
            } else {
                fileName += ".json";
            }
            saveAs(blob, fileName);
        }

        function xmlToFile(jsonObj, fileName, rootTag) {
            if (!jsonObj) return;
            insertHashInJson(jsonObj, rootTag)
            var xmlResult = convertJSONObjectsToXML(jsonObj)
            var blob = new Blob([xmlResult], {type: "text/plain;charset=utf-8"});
            if (!fileName) {
                fileName = "hpfbXML.xml"
            } else {
                fileName += ".xml";
            }
            saveAs(blob, fileName);
        }
    }
})();





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

    ngFileSelect.$inject = ['hpfbFileReader'];
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
    angular
        .module('FileIO')
        .factory('hpfbFileReader', fileReader);

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
        /**
         * @ngObject: used to store the jsonResult and any messages
         * @type {{jsonResult: string, messages: string}}
         */
        var convertResult = {
            jsonResult: "",
            messages: msg_success
        }
        var service = {
            readAsDataText: readAsDataText
        };
        return service;

        ////////////////


        function onLoad(reader, deferred, scope, file) {
            return function () {
                scope.$apply(function () {
                    if (file) {
                        var splitFile = file.name.split('.');
                        var fileType = splitFile[splitFile.length - 1];
                        if ((fileType.toLowerCase()) == "json") {
                            convertToJSONObjects(reader);
                            checkRootTagMatch(reader, scope);
                        } else if ((fileType.toLowerCase() === "xml")) {
                            convertXMLToJSONObjects(reader);
                            checkRootTagMatch(reader, scope);
                        } else {
                            convertResult.parseResult = null;
                            convertResult.messages = msg_err_fileType;
                            reader.parseResult = convertResult;
                        }
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
                var result = null;
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
    }
})();





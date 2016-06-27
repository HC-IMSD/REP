/**
 * Created by dkilty on 09/06/2016.
 */

(function () {
    'use strict';
    angular
        .module('fileIO', []);

})();

(function () {
    'use strict';
    angular
        .module('fileIO')
        .directive('hpfbFileReader2', hpfbFileReader2);

   // hpfbFileReader2.$inject = ['$parse'];

    /* @ngInject */
    function hpfbFileReader2() {
        var directive = {
            bindToController: true,
            controller: FileReaderCtrl,
            controllerAs: 'vm',
            replace: true,
            link: link,
            restrict: 'E',
            scope: {
                fileResults: '='
            },
            templateUrl: 'app/common/directives/fileIO/fileBrowser.html'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('change', function (onChangeEvent) {
                var reader = new FileReader();
                var filename;
                var fileType;
                reader.onload = function (onLoadEvent) {
                    var fileContent= onLoadEvent.target.result;
                    var result={
                            fileType:fileType,
                            fileContents:fileContent
                    };
                    scope.$emit('fileLoadFinished', result);
                };
                var file=onChangeEvent.srcElement || onChangeEvent.target;
                //don't read if canceled
                if(file && file.files[0]) {
                reader.readAsText(file.files[0]);
                    filename=(onChangeEvent.srcElement || onChangeEvent.target).files[0].name;
                    var splitFile=file.files[0].name.split('.');
                    fileType=splitFile[splitFile.length-1];
                }
            });
        }
    }

    FileReaderCtrl.$inject = ['$scope'];
    /**
     * @ngdoc controller
     * @name FILEIO.controller:FileReaderController
     * @param $scope
     *
     */
    function FileReaderCtrl($scope) {
        var vm = this;
        vm.fileMessage = "FILE_NOLOAD";
        vm.fileTypes = ".json, .xml";
        $scope.$on('fileLoadFinished', function (evt, value) {
            //process the file. if JSON create JSON file
            var fileParseResult = {};
            var result=false;
            if((value.fileType.toLowerCase())=="json"){
                result = convertToJSONObjects(value.fileContents, fileParseResult)
            }else if((value.fileType.toLowerCase()==="xml")){
                result = convertXMLToJSONObjects(value.fileContents, fileParseResult);
            }
            if (result) {
                vm.fileMessage = "FILE_LOADSUCCESS"
            } else {
                vm.fileMessage = "FILE_LOADERR"
            }
            $scope.$emit('fileReadComplete', result, fileParseResult);
        });
    }


    /**
     * @ngdoc method
     * @methodName convertToJSONObjects
     * @param jsonString -the string representing a json object to convert
     * @param fileResult -an empty json object that is populated by the function
     * @returns {boolean}
     */
    function convertToJSONObjects(jsonString, fileResult){
        try {
             fileResult.contents= JSON.parse(jsonString);
            return true;
        }catch(e){
            fileResult.contents = null;
        }
        return false;
    }
    function convertXMLToJSONObjects(inputXML, fileResult){

        var xmlConfig = {
            attributePrefix: "$",
            escapeMode: "true",
            emptyNodeForm: "text"
        };
        var xmlConverter = new X2JS(xmlConfig);
        //converts XML as a string to a json
        fileResult.contents = xmlConverter.xml_str2json(inputXML);
        if (fileResult.contents === null) {
            return false;
        }
        return true;
    }
})();

(function () {
    'use strict';

    angular
        .module('fileIO')
        .factory('fileCheckFactory', fileCheck);

    //factoryName.$inject = ['dependency'];
    var expectedRootName;
    /* @ngInject */
    function fileCheck() {
        var service = {
            functionName: setExpectedRoot
        };
        return service;


        function setExpectedRoot(value) {
            expectedRootName = value;
        }
    }

})();






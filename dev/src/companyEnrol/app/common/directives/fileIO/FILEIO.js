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

    hpfbFileReader2.$inject = ['$parse'];

    /* @ngInject */
    function hpfbFileReader2($parse) {
        var directive = {
            bindToController: true,
            controller: FileReaderController,
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
                    }
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

     FileReaderController.$inject = ['$scope'];
    /* @ngInject */
    function FileReaderController($scope) {
        var vm = this;
        $scope.$on('fileLoadFinished', function (evt, value) {
            //process the file. if JSON create JSON file
            var fileContents={};
            var result=false;
            if((value.fileType.toLowerCase())=="json"){
                result=convertToJSONObjects(value.fileContents,fileContents);
                console.debug(fileContents)
            }else if((value.fileType.toLowerCase()==="xml")){
                 console.log("xml convert")
                result=convertXMLToJSONObjects(value.fileContents,fileContents);
                console.debug(fileContents)
            }
            $scope.$emit('fileReadComplete',result,fileContents);
        });
    }
    function convertToJSONObjects(jsonString, fileResult){
        try {
             fileResult.contents= JSON.parse(jsonString);
            return true;
        }catch(e){
            fileResult.contents="Not a valid JSON file. "+e;
        }
        return false;
    }
    function convertXMLToJSONObjects(inputXML, fileResult){
        console.log("Starting the parse"+inputXML)
       // inputXML= "<root>Hello xml2js!</root>";
        //var res2=testme.test(inputXML);
        //console.log(res2)
        var newres=repConv.convertxml2js(inputXML);
        console.log(newres);
        //var parseResult=repXMLParse.convertXML(inputXML);
        //var res2=repXMLParse.convertXML(test);
        //console.log("This is the parse "+parseResult);
        //fileResult.contents=parseResult;
        return true;
    }

})();


1. Depends on the library: https://github.com/abdmob/x2js

To use:
Since the file read is asynchronous, need to capture the emit 'fileReadComplete' message:

 $scope.$on('fileReadComplete',function(evt,result,value){

            //value contains the JSON data model as value.contents
           //do stuff example
            //vm.content=value.contents;
           // if(result===false) error!

        });
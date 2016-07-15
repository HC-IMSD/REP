1. Depends on the library: https://github.com/abdmob/x2js

For FileIO.hpfbFileReader
To use:

In the calling scope create a function that will process the json object model

For example:

 vm.showContent = function (fileContent) {
            vm.content = fileContent.jsonResult;
           vm.messages=fileContent.messages;
        };


Define the function in the value of the attribute. Name the attribute fileContent

For example:

 <input type="file" hpfb-file-select="main.showContent(fileContent)" root-tag="COMPANY_ENROL"/>

Optional:

Define the expected root tag. If the root tag doesn't match, will throw an error
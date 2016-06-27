/**
 * Created by hcuser on 09/06/2016.
 */
var xml2js=require('xml2js');
var jsString=""
module.exports={
    test:function(xml) {
        var parser= new xml2js.Parser({"explicitArray":false,
            "normalize":true
        });
        //var xml = "<root>Hello xml2js!</root>";
        parser.addListener('end',function(result){
            console.log("result"+result);
            jsString=result;
            //jsString=JSON.stringify(result,null,7);
        });
        parser.addListener('error',function(result){
            console.log("result in listener error "+result);
            jsString=result;
        });


        var jsonResult= parser.parseString(xml, function (err, result) {
            console.dir(result);
            console.dir(err);
        });

        parser.onerror = function (e) {
            // an error happened.
            jsString=e;
        };

        parser.reset();
        return (jsString);
    }
};

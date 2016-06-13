(function () {
    'use strict';

    angular
        .module('myApp', [
            'ngValidate',
            'model.companies',
            'ngTable',
            'countrySelect',
            'pascalprecht.translate',
            'address',
            'hpfbConstants',
            'filterLists',
            'ngAria',
            'fileIO'
        ])
        .config(function ($validatorProvider) {
            $validatorProvider.setDefaults({
                meta: 'validate',
                focusInvalid: false,
                errorElement: 'strong',
                errorClass: 'error',
                errorPlacement: function ($error, $element) {
                    var type = $element.attr("type"),
                        $fieldset, $legend;

                    $error.data("element-id", $element.attr("id"));
                    if (type) {
                        type = type.toLowerCase();
                        if (type === "radio" || type === "checkbox") {
                            $fieldset = $element.closest("fieldset");
                            if ($fieldset.length !== 0) {
                                $legend = $fieldset.find("legend").first();
                                if ($legend.length !== 0 && $fieldset.find("input[name='" + $element.attr("name") + "']") !== 1) {
                                    $error.appendTo($legend);
                                    return;
                                }
                            }
                        }
                    }
                    //TODO what if label is after the element? Should never happen?

                    $error.appendTo($element.prev("label[for='" + $element.attr("id") + "']"));
                    // $error.appendTo( $form.find( "label[for='" + $element.attr( "id" ) + "']" ) );
                    return;
                },


                showErrors: function (errorMap, errorList) {
                    this.defaultShowErrors();
                    // var $form=this.currentForm;
                    var $form = $('form[name="' + this.currentForm.name + '"]')
                    var $errors = $form.find("strong.error").filter(":not(:hidden)");
                    var summaryHeading = "h2";
                    var $errorfields = $form.find("input.error, select.error, textarea.error"),
                        prefixStart = "<span class='prefix'>" + "Error" + "&#160;",
                        prefixEnd = ':' + " </span>",
                        separator = '-',
                        ariaLive = $form.parent().find(".arialiveREP")[0],
                        $summaryContainer, summary, key, i, len, $error, prefix, $fieldName, $fieldset, label, labelString;
                    var formId = $form.attr("id");
                    var errorFormId = "errors-" + ( !formId ? "default" : formId );
                    // Correct the colouring of fields that are no longer invalid
                    $form
                        .find(".has-error [aria-invalid=false]")
                        .closest(".has-error")
                        .removeClass("has-error");

                    if ($errors.length !== 0) {

                        // Post process
                        summary = "<" + summaryHeading + ">" +
                            "Cannot Proceed " + $errors.length +
                            (
                                $errors.length !== 1 ?
                                    " Errors Found" :
                                    " Error Found"
                            ) + "</" + summaryHeading + "><ul>";
                        $errorfields
                            .closest(".form-group")
                            .addClass("has-error");
                        len = $errors.length;
                        for (i = 0; i !== len; i += 1) {
                            $error = $errors.eq(i);
                            prefix = prefixStart + ( i + 1 ) + prefixEnd;
                            $fieldName = $error.closest("label").find(".field-name");

                            // Try to find the field name in the legend (if one exists)
                            if ($fieldName.length === 0) {
                                $fieldset = $error.closest("fieldset");
                                if ($fieldset.length !== 0) {
                                    $fieldName = $fieldset.find("legend .field-name");
                                }
                            }

                            $error.find("span.prefix").detach();
                            summary += "<li><a href='#" + $error.data("element-id") +
                                "'>" + prefix + ( $fieldName.length !== 0 ? $fieldName.html() + separator : "" ) +
                                $error.text() + "</a></li>";
                            $error.html("<span class='label label-danger'>" + prefix + $error.text() + "</span>");
                        }
                        summary += "</ul>";
                        var submitted = false;
                        if (!submitted) {

                            // Update the aria-live region as necessary
                            i = 0;
                            for (key in errorMap) {
                                if (errorMap.hasOwnProperty(key)) {
                                    i += 1;
                                    break;
                                }
                            }
                            if (i !== 0) {
                                len = $errors.length;
                                for (i = 0; i !== len; i += 1) {
                                    label = $errors[i].parentNode;
                                    if (label.getAttribute("for") === key) {
                                        labelString = label.innerHTML;
                                        if (labelString !== ariaLive.innerHTML) {
                                            ariaLive.innerHTML = labelString;
                                        }
                                        break;
                                    }
                                }
                            } else if (ariaLive.innerHTML.length !== 0) {
                                ariaLive.innerHTML = "";
                            }
                        }
                        // }//temp if

                        // Delay updating the summary container in case a summary link was clicked
                        setTimeout(function () {
                            $summaryContainer = $form.find("#" + errorFormId);

                            // Output our error summary and place it in the error container
                            // Create our container if one doesn't already exist
                            if ($summaryContainer.length === 0) {
                                $summaryContainer = $("<section id='" + errorFormId + "' class='alert alert-danger' tabindex='-1'>" + summary + "</section>").prependTo($form);
                            } else {
                                $summaryContainer.empty().append(summary);
                            }

                            // Put focus on the error if the errors are generated by an attempted form submission
                            if (submitted) {

                                // Assign focus to $summaryContainer
                                $summaryContainer.trigger(setFocusEvent);
                                submitted = false;
                            }
                        }, 100);
                    } else {

                        // Update the aria-live region as necessary
                        if (ariaLive.innerHTML.length !== 0) {
                            ariaLive.innerHTML = "";
                        }
                        $form.find("#" + errorFormId).detach();
                    }
                }
            })

        })

        .config(function ($validatorProvider) {



            $validatorProvider.addMethod("postalCodeCA", function (value, element) {
                return this.optional(element) || /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] *\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(value);
            }, "Please specify a valid postal code");

            $validatorProvider.addMethod("postalCodeUS", function (value, element) {
                return this.optional(element) ||  /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/i.test(value);
            }, "Please specify a valid zip code");
        });


})();

(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('CompanyEnrolCtrl', CompanyEnrolCtrl);

    CompanyEnrolCtrl.$inject = ['CompanyAddresses', 'AddressRoles', 'NgTableParams', '$translate', '$scope'];

    /* @ngInject */
    function CompanyEnrolCtrl(CompanyAddresses, AddressRoles, NgTableParams, $translate, $scope) {
        var vm = this;
        vm.title = 'CompanyEnrolCtrl';
        vm.preSelection = null;

        vm.addresses = CompanyAddresses.getAddresses();
        vm.rolesList = AddressRoles.roleTypes;
        vm.rolesService = AddressRoles;
        vm.idSelected = 0;
        vm.test;
        vm.deleteRow = deleteAddress;
        vm.addRow = addAddr;
        vm.numberAddresses = numberAddresses;
        vm.content="start";
        vm.showContent=getContent;
        vm.setMailing=setMailing;

        function setMailing(record, type){
            CompanyAddresses.addAddressRole(type,record);
            return true;
        }

        $scope.$on('fileReadComplete',function(evt,result,value){
            console.log("File Load result a success " +result);
            vm.content=value.contents;
            console.debug(vm.content);
            $scope.$apply();
            //$scope.$watch(vm.getContent)
        });


        function getContent($fileContent){
            console.log("This is the content!!!!"+$fileContent);
            vm.content = $fileContent;
        }

        $scope.$watch(vm.numberAddresses)

        function deleteAddress(rec, tableRow) {
            CompanyAddresses.deleteAddress(rec);
            vm.addresses = CompanyAddresses.getAddresses();
            vm.tableParams.reload();
            var newSelect = tableRow - 1;
            if (newSelect < 0) newSelect = 0;
            vm.preSelection = null;
            vm.changeSelection(vm.addresses[newSelect])
        }

        function addAddr() {
            console.log("adding an address")
            CompanyAddresses.addAddress();
            vm.addresses = CompanyAddresses.getAddresses();
            vm.tableParams.reload();
            vm.changeSelection(vm.addresses[vm.addresses.length - 1])
        }

        function numberAddresses() {
            if (vm.addresses) {
                return (vm.addresses.length);
            }
            return 0;
        }

        vm.tableParams = new NgTableParams(
            {},
            {
                dataset: vm.addresses
            }
        );
        vm.changeSelection = function (daily) {

            console.debug(daily);
            console.log()
            if (vm.preSelection) {
                vm.idSelected = null;
            }
            if (vm.preSelection == daily) {
                //deselect the value
                vm.preSelection = null;
                vm.idSelected = null;
            } else {

                vm.preSelection = daily;
                vm.idSelected = daily
                //vm.test2 = daily.$$hashKey;
            }


        };

        $translate('ZIP').then(function (foo) {
           vm.temp = foo;
            console.log("This is function"+foo)

            vm.validationOptions = {
                //sets classes to mandatory
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 6
                    },
                    postalCA:{
                        required: true,
                        postalCodeCA:true
                    }
                },
                messages: {
                    email: {
                        required: "We need your email address to contact you. Yes!!!!!!!!!!!!",
                        email: "Your email address must be in the format of name@domain.com"
                    },
                    password: {
                        required: "You must enter a password",
                        minlength: "Your password must have a minimum length of 6 characters"
                    },
                    postalCA: {
                        required: "Valid postal please!!!!!!!!",
                        postalCodeCA:"Canaada",

                    },

                }
            };
        });


        vm.register = function (form) {
            console.log("inside register " + form)
            if (form.validate()) {
                // Form is valid!
                console.debug(form)
                console.log("form is valid")
            } else {
                console.debug(form)
                console.log("form is not valid")
                console.log(form.numberOfInvalids())
            }

        };


        vm.errorSummary = function (form) {
            // Create our error summary that will appear before the form
            /*  showErrors: function( errorMap ) {*/
            //this.defaultShowErrors();
            var $form = $('form[name="' + form.$name + '"]')
            var $errors = $form.find("strong.error").filter(":not(:hidden)");
            var summaryHeading = "h2";
            var $errorfields = $form.find("input.error, select.error, textarea.error"),
                prefixStart = "<span class='prefix'>" + "Error" + "&#160;",
                prefixEnd = ':' + " </span>",
                separator = '-',
                ariaLive = $form.parent().find(".arialive")[0],
                $summaryContainer, summary, key, i, len, $error, prefix, $fieldName, $fieldset, label, labelString;

            // Correct the colouring of fields that are no longer invalid
            $form
                .find(".has-error [aria-invalid=false]")
                .closest(".has-error")
                .removeClass("has-error");

            if ($errors.length !== 0) {

                // Post process
                summary = "<" + summaryHeading + ">" +
                    "Cannot Proceed " + $errors.length +
                    (
                        $errors.length !== 1 ?
                            " Errors Found" :
                            " Error Found"
                    ) + "</" + summaryHeading + "><ul>";
                $errorfields
                    .closest(".form-group")
                    .addClass("has-error");
                len = $errors.length;
                for (i = 0; i !== len; i += 1) {
                    $error = $errors.eq(i);
                    prefix = prefixStart + ( i + 1 ) + prefixEnd;
                    $fieldName = $error.closest("label").find(".field-name");

                    // Try to find the field name in the legend (if one exists)
                    if ($fieldName.length === 0) {
                        $fieldset = $error.closest("fieldset");
                        if ($fieldset.length !== 0) {
                            $fieldName = $fieldset.find("legend .field-name");
                        }
                    }

                    $error.find("span.prefix").detach();
                    summary += "<li><a href='#" + $error.data("element-id") +
                        "'>" + prefix + ( $fieldName.length !== 0 ? $fieldName.html() + separator : "" ) +
                        $error.text() + "</a></li>";
                    $error.html("<span class='label label-danger'>" + prefix + $error.text() + "</span>");
                }
                summary += "</ul>";
                var submitted = false
                if (!submitted) {

                    // Update the aria-live region as necessary
                    i = 0;
                    for (key in errorMap) {
                        if (errorMap.hasOwnProperty(key)) {
                            i += 1;
                            break;
                        }
                    }
                    if (i !== 0) {
                        len = $errors.length;
                        for (i = 0; i !== len; i += 1) {
                            label = $errors[i].parentNode;
                            if (label.getAttribute("for") === key) {
                                labelString = label.innerHTML;
                                if (labelString !== ariaLive.innerHTML) {
                                    ariaLive.innerHTML = labelString;
                                }
                                break;
                            }
                        }
                    } else if (ariaLive.innerHTML.length !== 0) {
                        ariaLive.innerHTML = "";
                    }
                }
                // }//temp if

                // Delay updating the summary container in case a summary link was clicked
                setTimeout(function () {
                    $summaryContainer = $form.find("#" + errorFormId);

                    // Output our error summary and place it in the error container
                    // Create our container if one doesn't already exist
                    if ($summaryContainer.length === 0) {
                        $summaryContainer = $("<section id='" + errorFormId + "' class='alert alert-danger' tabindex='-1'>" + summary + "</section>").prependTo($form);
                    } else {
                        $summaryContainer.empty().append(summary);
                    }

                    // Put focus on the error if the errors are generated by an attempted form submission
                    if (submitted) {

                        // Assign focus to $summaryContainer
                        $summaryContainer.trigger(setFocusEvent);
                        submitted = false;
                    }
                }, 100);
            } else {

                // Update the aria-live region as necessary
                if (ariaLive.innerHTML.length !== 0) {
                    ariaLive.innerHTML = "";
                }
                $form.find("#" + errorFormId).detach();
            }

        }

    }//end controller

})();


//defaults of the grid
(function () {
    "use strict";

    angular.module("myApp").run(configureDefaults);
    configureDefaults.$inject = ["ngTableDefaults"];

    function configureDefaults(ngTableDefaults) {
        ngTableDefaults.params.count = 15;
        ngTableDefaults.settings.counts = [];
    }
})();


(function () {
    'use strict';
    angular
        .module('myApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                files: [
                    {
                        prefix: 'app/resources/countries-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/address-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/company-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/stateProvinces-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/general-',
                        suffix: '.json'
                    }

                ]
            })
            $translateProvider.preferredLanguage('en');
        }]);

})();

(function () {
    angular.module('myApp').config(function ($locationProvider) {
        $locationProvider.html5Mode({
                enabled: true,
               requiredBase: false
            }
        );


    });
})();

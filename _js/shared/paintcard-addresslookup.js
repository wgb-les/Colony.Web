$(document)
    .ready(function () {
        $.validator.setDefaults({
            ignore: []
        });

        var serviceLookupHost = "https://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/Find/v1.10/json3.ws";
        var serviceGetHost = "https://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/RetrieveById/v1.30/json3.ws";
      
        $('#ZoffanySelector').on('click', function () {
            setBrand("Zoffany");
        });

        $('#SandersonSelector').on('click', function () {
            setBrand("Sanderson");
        });

        $('#FindPaintAddress').on('click', function () {
            var postCode = $('input[id$=Postcode]').val();

            if (postCode != null && postCode !== "") {
                lookupAddress(postCode);
            }
        });
        
        $('#SelectPaintAddress').on('change', function () {
            var selectedId = $('#SelectPaintAddress').val();

            if (selectedId != null) {
                getAddress(selectedId);
            }
        });

        $('#SendRequest').on('click', function () {
            validateForm();
        });

        function validateForm () {
           var $form = $('#EnquiryFormPaint');
            
           if ($form.valid()) {
                $form.submit();
           } else {
               if ($('#SelectedBrand').val() === "") {
                   $('#sl-modal').animate({ scrollTop: 0 }, 'slow');
               }
               else if ($('#Address_Title').val() === "") {
                   $('#Address_Title').focus();
               }
               else if ($('#Address_FirstName').val() === "") {
                   $('#Address_FirstName').focus();
               }
               else if ($('#Address_LastName').val() === "") {
                   $('#Address_LastName').focus();
               }
               else if ($('#Address_Email').val() === "") {
                   $('#Address_Email').focus();
               }
               else if ($('#Person_Email').val() === "") {
                   $('#Person_Email').focus();
               }
               else if ($('#Address_Postcode').val() === "") {
                   $('#Address_Postcode').focus();
               }
               else if ($('#Address_Line1').val() === "") {
                   $('#Address_Line1').focus();
               }
           }
        };
 
        function setBrand(valueToSet) {
            var fieldValue = $('#SelectedBrand').val();
            var newValue = "";

            if (fieldValue.indexOf(valueToSet) != -1) {
                var newValue = fieldValue
                    .replace(valueToSet, "")
                    .replace("|", "");
            } else {                
                if (fieldValue != "") {
                    newValue = fieldValue + "|" + valueToSet;
                } else {
                    newValue = valueToSet;                   
                }
            }

            $('#SelectedBrand').val(newValue);

            t2 = $('#SelectedBrand').val();
        }

        function lookupAddress(postCode) {
            var serviceURl = serviceLookupHost;
               //+ "?Key=" + serviceKey + "&SearchTerm=" + $('input[id$=Postcode]').val() + "&PreferredLanguage=English"  + "&Filter=None";

            $.ajax(
                {
                url: serviceURl,
                data: {
                    key: "XE96-DF45-NX33-XA92",
                    SearchTerm: postCode,
                    PreferredLanguage: "English",
                    Filter: "None"
                },
                success: function (data) {
                    $('#SelectPaintAddress')
                        .find('option')
                        .remove()
                        .end();

                    if (data) {
                        $('#PaintAddressError').hide();

                        $('#SelectPaintAddress')
                            .append($('<option></option>')
                                .attr('value', "")
                                .text("Please Choose"));

                        if (data.Items.length > 0) {
                            $.each(data.Items, function (key, value) {
                                $('#SelectPaintAddress')
                                    .append($('<option></option>')
                                        .attr('value', value.Id)
                                        .text(value.StreetAddress + "," + value.Place));
                            });

                            $('#SelectPaintAddress')
                                .addClass('highlighted')
                                .show();
                        } else {
                            $('#PaintAddressError').show();

                            $('#SelectPaintAddress')
                                .hide()
                                .removeClass('highlighted');
                        }
                    } else {
                        $('#PaintAddressError').show();
                    }
                },
                error: function(data) {
                    $('#PaintAddressError').show();
                }
            });
        }

        function getAddress(addressId) {
            var serviceURl = serviceGetHost;
                //+ "?Key=" + serviceKey + "&PreferredLanguage=English";

            $.ajax({
                url: serviceURl,
                data: {
                    key: "XE96-DF45-NX33-XA92",
                    id: addressId,
                    PreferredLanguage: "English"
                },
                success: function(data) {

                    if (data.Items.length > 0) {                      
                        setAddress(data.Items[0]);
                    }
                },
                error: function (data) {
                    $('#PaintAddressError').show();
                }
            });
        }

        function setAddress(address) {
            if (address.BuildingName === null && address.BuildingNumber === null && address.Company !== null) {
                $('input[id$=Line1]').val(address.Company + ', ' + address.Line1);
            }
            else {
                $('input[id$=Line1]').val(address.Line1);
                $('input[id$=Town]').val(address.PostTown);

                var county = (address.PostTown === 'London')
                    ? 'London'
                    : address.County;

                $('input[id$=County]').val(county);
                $('input[id$=Postcode]').val(address.Postcode);

                $("#Address_CountryISO2 option[value=" + address.CountryISO2 + "]").prop("selected", true);

                $('#SelectPaintAddress').hide();
            }
        }
    });

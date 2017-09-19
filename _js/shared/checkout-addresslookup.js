$(document)
    .ready(function () {
        $('#Address_Postcode').keydown(function(event) {
            if (event.keyCode === 13) {
                $('#findAddress').trigger('click');
                return false;
            }
        });

        $('#findAddress').on("click", function(e) {
            e.preventDefault();

            var url = $(this).attr('href');

            $.ajax(url, {
                data: { postcode: $('input[id$=Postcode]').val() },
                success: function(data) {
                    $('#selectAddress')
                        .find('option')
                        .remove()
                        .end();
                    if (data.Success) {
                        $('#findAddressError').hide();
                        $('#selectAddress')
                            .append($('<option></option>')
                                .attr('value', "")
                                .text("Please Choose"));
                        if (data.Addresses.length > 0) {
                            $.each(data.Addresses, function(key, value) {
                                $('#selectAddress')
                                    .append($('<option></option>')
                                        .attr('value', value.Id)
                                        .text(value.StreetAddress));
                            });
                            $('#addressSelection').addClass('highlighted').show();
                        } else {
                            $('#findAddressError').show();
                            $('#addressSelection').hide().removeClass('highlighted');
                        }
                    } else {
                        $('#findAddressError').show();
                    }
                }
            });
        });

        function isNullOrEmpty(str) {
            return str == null || str === '';
        }

        $('#selectAddress').bind('change', function(e) {
            $.ajax({
                url: $(this).attr('data-callbackUrl'),
                data: { id: $('#selectAddress').val() },
                success: function(data) {
                    if (data.Success) {
                        if (data.SelectedAddress != null) {
                            console.log(data.SelectedAddress);
                            if (isNullOrEmpty(data.SelectedAddress.BuildingName) && isNullOrEmpty(data.SelectedAddress.BuildingNumber) && !isNullOrEmpty(data.SelectedAddress.Company)) {
                                $('input[id$=Line1]').val(data.SelectedAddress.Company + ', ' + data.SelectedAddress.Line1);
                            } else {
                                $('input[id$=Line1]').val(data.SelectedAddress.Line1);
                                //$('#@(prefix)Line2').val(data.SelectedAddress.Line2);
                                $('input[id$=Town]').val(data.SelectedAddress.PostTown);

                                var county = (data.SelectedAddress.PostTown === 'London')
                                    ? 'London'
                                    : data.SelectedAddress.County;

                                $('input[id$=County]').val(county);
                                $('input[id$=Postcode]').val(data.SelectedAddress.Postcode);
                                $('input[id$=CountryISO2]').val(data.SelectedAddress.CountryISO2);
                                $('#addressSelection').hide();
                            }

                            AddSelectedAddress();                            
                        } else {
                            $('#addressSelection').show();
                        }
                    }
                }
            });
        });

        function AddSelectedAddress() {
            var form = $('#addAddressForm');
            var formValid = $('#addAddressForm');

            if (form != null) {
                form.submit();
            }
        }
    });

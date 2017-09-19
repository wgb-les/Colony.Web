$(document)
       .ready(function () {
           $('#newsletterSubmitButton')
               .on('click',
                   function (e) {
                       var email = $('#Person_Email').val();
                       var site = $('#SiteKey').val();
                       var newsletterRegistration = { 'Site': site, 'EmailAddress': email };
                       if (validateEmail(email)) {
                           $.ajax({
                               type: 'POST',
                               data: JSON.stringify(newsletterRegistration),
                               contentType: "application/json",
                               url: '/members/register/NewsLetterRegistration',
                                   //'@Url.Action("NewsLetterRegistration", "Register", new {Area = "Members", returnUrl = "/"})',
                               success: function (result) {
                                   if (result) {
                                       window.location.href = '/members/register/?returnUrl=""&email=' + encodeURIComponent(email);
                                   } else {
                                       $('#newsletterError').text('Something went wrong, please check the details entered and try again');
                                       //todo email didn't save or Modelstate invalid                                    
                                   }
                               },
                               error: function () {
                                   //todo ajax didn't work
                                   $('#newsletterError').text('Something went wrong, please try again');
                               }
                           });

                       } else {
                           $('#newsletterError').text('Please enter a valid email address');
                       };

                   });

           function validateEmail(sEmail) {
               var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               if (filter.test(sEmail)) {
                   return true;
               } else {
                   return false;
               };
           };
       });
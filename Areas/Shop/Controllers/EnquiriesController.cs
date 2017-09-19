using System;
using System.Linq;
using System.Web.Mvc;
using AutoMapper;
using Colony.Commerce;
using Colony.Models.Core.CRM;
using Colony.Models.Core.Enquiries;
using Colony.Services.Core.Abstract.CRM;
using Colony.Services.Core.Abstract.Enquiries;
using Colony.Services.Email;
using Colony.Util.Serialization;
using Colony.Web.Areas.Shop.Models;

namespace Colony.Web.Areas.Shop.Controllers
{
    public class EnquiriesController : ColonyCommerceFrontendController
    {
        private readonly IAddressService _addressService;
        private readonly IEnquiryRecipientService _enquiryRecipientService;
        private readonly IEnquiryService _enquiryService;
        private readonly IEnquiryTypeService _enquiryTypeService;
        private readonly IMailerService _mailerService;
        private readonly IMappingEngine _mappingEngine;
        private readonly IPersonService _personService;
        private readonly ISerializer _serializer;

        public EnquiriesController(IPersonService personService, IMailerService mailerService,
            IMappingEngine mappingEngine, IAddressService addressService,
            IEnquiryTypeService enquiryTypeService, IEnquiryService enquiryService,
            ISerializer serializer, IEnquiryRecipientService enquiryRecipientService)
        {
            if (mailerService == null) throw new ArgumentNullException("mailerService");
            if (personService == null) throw new ArgumentNullException("personService");
            if (mappingEngine == null) throw new ArgumentNullException("mappingEngine");
            if (addressService == null) throw new ArgumentNullException("addressService");
            if (enquiryTypeService == null) throw new ArgumentNullException("enquiryTypeService");
            if (enquiryService == null) throw new ArgumentNullException("enquiryService");
            if (serializer == null) throw new ArgumentNullException("serializer");
            if (enquiryRecipientService == null) throw new ArgumentNullException("enquiryRecipientService");

            _mailerService = mailerService;
            _mappingEngine = mappingEngine;
            _personService = personService;
            _addressService = addressService;
            _enquiryService = enquiryService;
            _enquiryTypeService = enquiryTypeService;
            _serializer = serializer;
            _enquiryRecipientService = enquiryRecipientService;
        }

        [AcceptVerbs("GET", "HEAD", "OPTIONS")]
        public ActionResult OrderPaintCard(string brand = "")
        {
            var viewModel = new OrderPaintCardViewModel
            {
                SelectedBrand = brand
            };

            var loggedInUser = LoggedInUser();

            if (loggedInUser != null)
            {
                var person = _personService.GetByUserAccount(loggedInUser).FirstOrDefault();
                _mappingEngine.Map(person, viewModel.Person);

                var address = _addressService.GetAddresses(loggedInUser).FirstOrDefault();
                _mappingEngine.Map(address, viewModel.Address);
            }

            return PartialView(viewModel);
        }

        [HttpPost]
        public ActionResult OrderPaintCard(OrderPaintCardViewModel viewModel, string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl) && string.IsNullOrEmpty(viewModel.Person.FirstName))
            {
                var loggedInUser = LoggedInUser();
                if (loggedInUser != null)
                {
                    var person = _personService.GetByUserAccount(loggedInUser).FirstOrDefault();
                    _mappingEngine.Map(person, viewModel.Person);

                    var address = _addressService.GetAddresses(loggedInUser).FirstOrDefault();
                    _mappingEngine.Map(address, viewModel.Address);
                }

                return PartialView(viewModel);
            }

            viewModel.Person.Title = viewModel.Address.Title;
            viewModel.Person.FirstName = viewModel.Address.FirstName;
            viewModel.Person.LastName = viewModel.Address.LastName;
            
            ModelState.Clear();
            TryValidateModel(viewModel);

            if (ModelState.IsValid)
            {
                var person = _mappingEngine.Map<Person>(viewModel.Person);
                var address = _mappingEngine.Map<Address>(viewModel.Address);

                var enquiryType = _enquiryTypeService.Get(new {FormID = "OrderPaintCard"}).FirstOrDefault();

                var enquiry = new Enquiry
                {
                    UserAgent = Request.UserAgent,
                    FormXML = _serializer.GetXml(viewModel),
                    EnquiryTypeID = enquiryType.Id,
                    SiteId = ColonyContext.CurrentSite.Id,
                    Title =
                        enquiryType.DynamicTitle.Replace("$FirstName", address.FirstName)
                            .Replace("$LastName", address.LastName)
                };

                enquiry = _enquiryService.Create(enquiry);

                var enquiryRecipients = _enquiryRecipientService.Get(new {SiteID = ColonyContext.CurrentSite.Id, EnquiryTypeID = enquiryType.Id});

                if (enquiryRecipients != null && enquiryRecipients.Any())
                {
                    // send to admin
                    var emailAddresses = string.Join(";", enquiryRecipients.Select(x => x.EmailAddress));
                    
                    _mailerService.Send(emailAddresses, ColonyContext.CurrentSite.DefaultSenderEmail,
                        string.Format("{0} - Paint Card Request", ColonyContext.CurrentSite.Name),
                        "PaintCardRequestAdminEmail", viewModel);
                }

                if (Request.IsAjaxRequest())
                    return Json(new {success = enquiry != null && enquiry.Id != 0});

                return Redirect(returnUrl);
            }

            return PartialView(viewModel);
        }
    }
}
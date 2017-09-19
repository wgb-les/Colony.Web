using System.IO;
using System.Web.Mvc;
using AutoMapper;
using Colony.CMS;
using Colony.CMS.Areas.CRM.Models;
using Colony.Commerce;
using Colony.Commerce.Areas.AccountArea.Controllers.Models;
using Colony.Commerce.Areas.OnlinePayments.ViewModels;
using Colony.Commerce.Areas.ShopPurchase.Models;
using Colony.Commerce.Models;
using Colony.Commerce.Services.ShopPurchase;
using Colony.Models.Base;
using Colony.Services.Core.Abstract.CRM;
using Colony.Services.Email;

namespace Colony.Web.Areas.Email.Controllers
{
    public class EmailController : ColonyFrontendController
    {
        private readonly ITransactionService _transactionService;
        private readonly IBasketViewModelBuilder _basketViewModelBuilder;
        private readonly ICheckoutService _checkoutService;
        private readonly IMailerService _mailer;
        private readonly IMappingEngine _mappingEngine;
        private readonly IPersonService _personService;

        public EmailController(ITransactionService transactionService, ICheckoutService checkoutService, IPersonService personService,
            IMappingEngine mappingEngine, IMailerService mailerService, IBasketViewModelBuilder basketViewModelBuilder)
        {
            _transactionService = transactionService;
            _checkoutService = checkoutService;
            _mappingEngine = mappingEngine;
            _mailer = mailerService;
            _basketViewModelBuilder = basketViewModelBuilder;
            _personService = personService;
        }
        
        //
        // GET: /Email/Email/
        public ActionResult Index(int id = 628817)
        {
            ColonyCommerceContext CommerceContext = new ColonyCommerceContext();

            var transaction = _transactionService.GetById(id);

            var checkout = _checkoutService.GetReadOnlyCheckoutFromXml(transaction.CheckOutXml);
            
            if (checkout == null)
                return HttpNotFound("Could not load order detail for the specified transaction id");


            BasketViewModel basketViewModel = _basketViewModelBuilder.GetBasketViewModel(checkout.Basket, CommerceContext, checkout);

                var orderDetailViewModel = new OrderDetailViewModel
                {
                    Basket = basketViewModel,
                    Person = _mappingEngine.Map<PersonViewModel>(_personService.GetById(checkout.Person.Id)),
                    DeliveryAddress = _mappingEngine.Map<AddressViewModel>(checkout.GetAddress(AddressType.Delivery)),
                    BillingAddress = _mappingEngine.Map<AddressViewModel>(checkout.GetAddress(AddressType.Billing)),
                    OrderDate = transaction.LastModified,
                    OrderNumber = transaction.OrderNumber,
                    TransactionStatus = transaction.TransactionStatus
                };

            var viewModel = new EmailReceiptViewModel
            {
                Order = orderDetailViewModel,
                Site = CommerceContext.ColonyContext.CurrentSite
            };

            SendEmailReceipt(orderDetailViewModel);

            return View("~/Areas/Email/Views/Email/OrderConfirmation.cshtml", viewModel);
        }

        private void SendEmailReceipt(OrderDetailViewModel orderDetail)
        {
            if (orderDetail.TransactionStatus == TransactionStatus.PaymentComplete)
            {
                var viewModel = new EmailReceiptViewModel
                {
                    Order = orderDetail,
                    Site = ColonyContext.CurrentSite
                };

                var path = System.Web.HttpContext.Current.Request.PhysicalApplicationPath + "EmailTemplates";
                var templatePath = Path.Combine(path, string.Format("{0}.cshtml", "Receipt"));
                // read in the contents of this template.
                var template = System.IO.File.ReadAllText(templatePath);

                // do the merge and return
                //var body = Razor.Parse(template, model);

                //_mailer.Send("osman_osman@sylelibrary.com",
                //    ColonyContext.Current.CurrentSite.DefaultSenderEmail,
                //    string.Format("{0} Order ({1}) - Receipt",
                //    viewModel.Site.Name, viewModel.Order.OrderNumber),
                //    "Receipt", viewModel);

            }
        }
    }
}

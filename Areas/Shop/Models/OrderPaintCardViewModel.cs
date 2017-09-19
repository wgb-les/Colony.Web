using System.ComponentModel.DataAnnotations;
using Colony.CMS.Areas.CRM.Models;

namespace Colony.Web.Areas.Shop.Models
{
    public class OrderPaintCardViewModel
    {
        public OrderPaintCardViewModel()
        {
            Person = new PersonViewModel();
            Address = new AddressViewModel();
            MarkettingOptIn = true;
        }

        public PersonViewModel Person { get; set; }
        public AddressViewModel Address { get; set; }

        [Required(ErrorMessage = "You must select a brand")]
        public string SelectedBrand { get; set; }

        public bool MarkettingOptIn { get; set; }
    }
}
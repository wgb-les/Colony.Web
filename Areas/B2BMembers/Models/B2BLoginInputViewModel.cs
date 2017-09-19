using System.ComponentModel.DataAnnotations;
using Colony.CMS.Areas.Members.ViewModels;

namespace Colony.Web.Areas.B2BMembers.Models
{
    public class B2BLoginInputViewModel : LoginInputViewModel
    {
        [Required]
        [Display(Name = "Login ID")]
        public string LoginId
        {
            get
            {
                return base.Email;
            }
            set
            {
                base.Email = value;
            }
        }
    }
}
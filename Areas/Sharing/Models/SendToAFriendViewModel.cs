using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Colony.Models.Core.Sites;

namespace Colony.Web.Areas.Sharing.Models
{
    public class SendToAFriendViewModel
    {
        [DisplayName("Your Email Address")]
        [Required]
        [EmailAddress]
        public string EmailFrom { get; set; }

        [DisplayName("Your Friend's Email Address")]
        [Required]
        [EmailAddress]
        public string EmailTo { get; set; }

        [UIHint("MultilineTextCharCount")]
        [StringLength(250)]
        [Required]
        public string Message { get; set; }

        public string ShareUrl { get; set; }

        public Site Site { get; set; }
    }
}
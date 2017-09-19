{
	"behaviourId": "CmsEditEnquiryRecipient",
	"page": {
		"label": "Edit Enquiry Recipient",
		"back": "#/enquiryrecipients/index/?id=<%=App.QueryString['enquiryTypeId']%>",
		"backdescription": "Enquiry Recipients",
		"messages": [{
			"message": "EditEnquiryRecipient",
			"behaviourId": "CmsListEnquiryRecipient",
			"trigger": "submit",
			"success": "redirect:/enquiryrecipients/index/?id=<%=App.QueryString['enquiryTypeId']%>"
		}]
	},
	"componentContainer":  
		[			
			{
				"label":"EnquiryTypeId",
				"type": "hidden",
				"componentId": "EnquiryTypeID",
				"map": [
					{"friendlyName": "Value", "source":"querystring.enquiryTypeId" }
				]
			},
            {
                "label":"EnquiryRecipientId",
                "type": "hidden",
                "componentId": "EnquiryRecipientID",
                "map": [
					{"friendlyName": "Value", "source":"recipient.id" }
                ]
            },
			{
				"label":"Email Address",
				"type": "text",
				"componentId": "EmailAddress",
				"map": [
					{"friendlyName": "Value", "source":"recipient.emailAddress" }
				],
				"validation": {
					"required": true,
					"email": true,
					"maxlength": 255
				}
			}, {
			    "label":"Site",
			    "type": "dropdown",
			    "componentId": "SiteID",
                "dataCollection": "sites",
			    "map": [
					{"friendlyName": "Value", "source":"recipient.siteId" }
			    ],
			    "validation": {
			        "required": true
			    }
			}, {
				"label":"Save",
				"type": "button",
				"componentId": "SaveButton"
			}
		],
	"data": {
	    "execute": [
            {
                "name": "recipient",
                "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryRecipientService, Colony.Services",
                "ServiceMethod": "GetById",
                "ServiceMethodParams": [
                    { "Key": "id", "Value": 1 }
                ]
            },
            {
			"name": "Sites",
			"ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
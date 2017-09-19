{
	"behaviourId": "CmsAddEnquiryRecipient",
	"page": {
		"label": "Add Enquiry Recipient",
		"back": "#/enquiryrecipients/index/?id=<%=App.QueryString['enquiryTypeId']%>",
		"backdescription": "Enquiry Recipients",
		"messages": [{
			"message": "AddEnquiryRecipient",
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
		"execute": [{
			"name": "Sites",
			"ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
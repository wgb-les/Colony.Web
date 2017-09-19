{
	"behaviourId": "CmsAddEnquiryType",
	"page": {
		"label": "Add Enquiry Type",
		"back": "#/enquirytypes/index/",
		"backdescription": "Enquiry Types",
		"messages": [{
			"message": "AddEnquiryType",
			"behaviourId": "CmsListEnquiryType",
			"trigger": "submit",
			"success": "redirect:/enquirytypes/index/"
		}]
	},
	"componentContainer":  
		[			
			{
				"label":"Name",
				"type": "text",
				"componentId": "Name",
				"map": [
					{"friendlyName": "Value", "source":"enquirytype.name" }
				],
				"validation": {
					"required": true,
					"email": true,
					"maxlength": 255
				}
			}, {
			    "label":"Dynamic Title",
                "helptext": "Use parameters starting with $ to define the title for this enquiry type",
			    "type": "text",
			    "componentId": "DynamicTitle",
			    "map": [
					{"friendlyName": "Value", "source":"enquirytype.dynamicTitle" }
			    ],
			    "validation": {
			        "required": true,
                    "maxlength": 255
			    }
			}, {
			    "label":"Redirect URL",
			    "helptext": "The page to which the user is directed after completing this enquiry (e.g. /contact-us/thanks/)",
			    "type": "text",
			    "componentId": "RedirectUrl",
			    "map": [
					{"friendlyName": "Value", "source":"enquirytype.redirectUrl" }
			    ],
			    "validation": {
			        "required": true,
			        "maxlength": 255
			    }
			}, {
			    "label":"Form ID",
			    "helptext": "Used to match this enquiry type to an enquiry sent by the system (should only be modified by developers)",
			    "type": "text",
			    "componentId": "FormID",
			    "map": [
					{"friendlyName": "Value", "source":"enquirytype.formID" }
			    ],
			    "validation": {
			        "required": true,
			        "maxlength": 255
			    }
			}, {
				"label":"Save",
				"type": "button",
				"componentId": "SaveButton"
			}
		]
}
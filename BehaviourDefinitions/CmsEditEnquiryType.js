{
	"behaviourId": "CmsEditEnquiryType",
	"page": {
		"label": "Edit Enquiry Type",
		"back": "#/enquirytypes/index/",
		"backdescription": "Enquiry Types",
		"messages": [{
			"message": "EditEnquiryType",
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
			    "label":"ID",
			    "type": "hidden",
			    "componentId": "EnquiryTypeID",
			    "map": [
					{"friendlyName": "Value", "source":"enquirytype.id" }
			    ]
			}, {
				"label":"Save",
				"type": "button",
				"componentId": "SaveButton"
			}
		],
    "data": {
        "execute": [{
            "name": "enquirytype",
            "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryTypeService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "PageID": "id"
            }
        }]
    }
}
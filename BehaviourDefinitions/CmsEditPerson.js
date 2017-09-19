{
	"behaviourId": "CmsEditPerson",
	"page": {
		"label": "Edit Person",
		"back": "#/crm/index/",
		"backdescription": "CRM",
		"messages": [{
			"message": "EditPerson",
			"behaviourId": "CmsListPerson",
			"trigger": "submit",
			"success": "redirect:/crm/index/"
		}]
	},
	"componentContainer":  
		[		
			{
				"label":"Email Address",
				"type": "text",
				"componentId": "Email",
				"map": [
					{"friendlyName": "Value", "source":"member.emailAddress" }
				],
				"validation": {
				    "required": true,
				    "maxlength": 255
				}
			},
			{
			    "label": "Title",
			    "type": "text",
			    "componentId": "Title",
			    "map": [
					{"friendlyName": "Value", "source": "member.title" }
			    ],
			    "validation": {
			        "required": true,
			        "maxlength": 20
			    }
			}, {
			    "label": "First Name",
			    "type": "text",
			    "componentId": "FirstName",
			    "map": [
					{"friendlyName": "Value", "source": "member.firstName" }
			    ],
			    "validation": {
			        "required": true,
			        "maxlength": 255
			    }
			}, {
			    "label": "Last Name",
			    "type": "text",
			    "componentId": "LastName",
			    "map": [
					{"friendlyName": "Value", "source": "member.lastName" }
			    ],
			    "validation": {
			        "required": true,
			        "maxlength": 255
			    }
			}, {
			    "label": "Allow Third-party marketing",
			    "type": "switch",
			    "componentId": "AllowThirdParty",
			    "map": [
					{"friendlyName": "Value", "source": "member.allowThirdParty" }
			    ]
			}, {
			    "label": "Allow Marketing",
			    "type": "switch",
			    "componentId": "AllowMarketing",
			    "map": [
					{"friendlyName": "Value", "source": "member.allowMarketing" }
			    ]
			}, {
			    "label": "Date of Birth",
			    "type": "datetime",
			    "componentId": "DateOfBirth",
			    "map": [
					{"friendlyName": "Value", "source": "member.dateOfBirth" }
			    ]
			}, {
				"label":"Save",
				"type": "button",
				"componentId": "SaveButton"
			}
		],
	"data": {
	    "execute": [{
	        "name": "Member",
	        "ServiceType": "Colony.Services.Core.Abstract.CRM.IPersonService, Colony.Services",
	        "ServiceMethod": "GetById",
	        "ServiceMethodParams": [
                {"Key": "id", "Value": "" }
	        ]
	    }]
	}
}
{
	"behaviourId": "CmsEditCmsUser",
	"page": {
		"label": "Edit CMS User",
		"back": "#/users/index/",
		"backdescription": "CMS Users",
		"messages": [{
			"message": "EditUser",
			"behaviourId": "CmsListCmsUser",
			"trigger": "submit",
			"success": "redirect:/users/index/"
		}]
	},
	"componentContainer":  
		[			
			{
				"label":"Tenant",
				"type": "hidden",
				"componentId": "Tenant",
				"map": [
					{"friendlyName": "Value", "source":"member.tenant", "default": "ColonyCMSBackend" }
				]
			},
            {
                "label":"UserId",
                "type": "hidden",
                "componentId": "Id",
                "map": [
					{"friendlyName": "Value", "source":"member.id" }
                ]
            },
			{
				"label":"Email Address",
				"type": "text",
				"componentId": "Email",
				"map": [
					{"friendlyName": "Value", "source":"member.email" }
				],
				"validation": {
				    "required": true,
				    "maxlength": 255
				}
			},
			{
			    "label": "Password",
			    "type": "password",
			    "componentId": "Password",
			    "map": [
					{"friendlyName": "Value", "source": "member.password" }
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
			        "maxlength": 10
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
			    "label": "Date of Birth",
			    "type": "datetime",
			    "componentId": "DateOfBirth",
			    "map": [
					{"friendlyName": "Value", "source": "member.dateOfBirth" }
			    ]
			}, {
			    "label": "Roles",
			    "type": "checkboxlist",
			    "dataCollection": "roles",
			    "componentId": "Roles",
			    "map": [
					{"friendlyName": "Value", "source": "member.roles" }
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
	        "name": "Member",
	        "ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
	        "ServiceMethod": "GetById",
	        "ServiceMethodParams": [
                {"Key": "id", "Value": "" }
	        ]
	    }, {
			"name": "Roles",
			"ServiceType": "Colony.Services.Core.Abstract.IRoleService, Colony.Services",
			"ServiceMethod": "GetAll",
			"ServiceMethodParams": [
				{"Key": "tenant", "Value": "ColonyCMSBackend" }
			]
		}]
	}
}
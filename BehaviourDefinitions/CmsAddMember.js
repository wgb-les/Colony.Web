{
	"behaviourId": "CmsAddMember",
	"page": {
		"label": "Add Website Member",
		"back": "#/members/index/",
		"backdescription": "Website Members",
		"messages": [{
			"message": "AddMember",
			"behaviourId": "CmsListMember",
			"trigger": "submit",
			"success": "redirect:/members/index/"
		}]
	},
	"componentContainer":  
		[			
			{
				"label":"Tenant",
				"type": "hidden",
				"componentId": "Tenant",
				"map": [
					{"friendlyName": "Value", "source":"member.tenant", "default": "ColonyCMSFrontend" }
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
					"email": true,
					"maxlength": 255
				}
			},
			{
				"label": "Password",
				"type": "password",
				"componentId": "Password",
				"map": [
					{"friendlyName": "Value", "source": "member.password" }
				]
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
					"maxlength": 255
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
				"label": "Roles",
				"type": "checkboxlist",
				"dataCollection": "roles",
				"componentId": "Roles",
				"map": [
					{"friendlyName": "Value", "source": "member.roles" }
				]
			}, {
				"label": "Is this account verified",
				"type": "switch",
				"componentId": "IsAccountVerified",
				"map": [
					{"friendlyName": "Value", "source": "member.isAccountVerified", "default": "true" }
				]
			}, {
				"label": "Is this account allowed to log in",
				"type": "switch",
				"componentId": "IsLoginAllowed",
				"map": [
					{"friendlyName": "Value", "source": "member.isLoginAllowed", "default": "true" }
				]
			}, {
				"label": "Is this account closed",
				"type": "switch",
				"componentId": "IsAccountClosed",
				"map": [
					{"friendlyName": "Value", "source": "member.isAccountClosed", "default": "false" }
				]
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
		}, {
			"name": "Roles",
			"ServiceType": "Colony.Services.Core.Abstract.IRoleService, Colony.Services",
			"ServiceMethod": "GetAll",
			"ServiceMethodParams": [
				{"Key": "tenant", "Value": "ColonyCMSFrontend" }
			]
		}]
	}
}
{
	"behaviourId": "CmsAddCmsUser",
	"page": {
		"label": "Add CMS User",
		"back": "#/users/index/",
		"backdescription": "CMS Users",
		"messages": [{
			"message": "AddUser",
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
					{"friendlyName": "Value", "source":"<%='ColonyCMSBackend'%>", "default": "ColonyCMSBackend" }
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
				{"Key": "tenant", "Value": "ColonyCMSBackend" }
			]
		}]
	}
}
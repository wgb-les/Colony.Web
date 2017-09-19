{
	"behaviourId": "CmsEditMemberPassword",
	"page": {
		"label": "Reset Member Password",
		"back": "#/members/index/",
		"backdescription": "Website Members",
		"messages": [{
			"message": "EditMemberPassword",
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
				"label":"UserId",
				"type": "hidden",
				"componentId": "Username",
				"map": [
					{"friendlyName": "Value", "source":"member.username" }
				]
			},
			{
				"label": "Password",
				"type": "password",
				"componentId": "newPassword",
				"map": [
					{"friendlyName": "Value", "source": "member.password" }
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
		],
	"data": {
		"execute": [{
			"name": "Member",
			"ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [
				{"Key": "id", "Value": "" }
			]
		}]
	}
}
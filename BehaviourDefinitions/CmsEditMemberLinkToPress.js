{
    "behaviourId": "CmsEditMemberLinkToPress",
	"page": {
	    "label": "Edit Press Membership information for Website Member",
		"back": "#/members/index/",
		"backdescription": "Website Members",
		"messages": [{
		    "message": "EditMemberLinkToPress",
		    "behaviourId": "CmsListMember",
		    "trigger": "submit",
		    "success": "redirect:/members/index/"
		}]
	},
	"componentContainer":  
        [{
            "label": "",
            "type": "content",
            "componentId": "EditTradeMemberLinkContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Email: <strong><%=App.data.member.userAccount.email%></strong></p><p>Name: <strong><%=App.data.member.userAccount.title%> <%=App.data.member.userAccount.firstName%> <%=App.data.member.userAccount.lastName%></strong></p><p>Publication/Company Name: <strong><%=App.data.member.publication%></strong></p>"
            }]
        }, {
            "label":"Tenant",
            "type": "hidden",
            "componentId": "Tenant",
            "map": [
                {"friendlyName": "Value", "source":"member.tenant", "default": "ColonyCMSFrontend" }
            ]
        }, {
            "label":"Press Membership Level",
            "type": "dropdown",
            "componentId": "Role",
            "dataCollection": "roles",
            "map": [
                {"friendlyName": "Value", "source":"member.role", "default": "ColonyCMSFrontend" }
            ]
        }, {
                "label":"UserId",
                "type": "hidden",
                "componentId": "Id",
                "map": [
					{"friendlyName": "Value", "source": "member.id" }
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
	        "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IPressMemberService, WalkerGreenbank.Modules",
	        "ServiceMethod": "GetByUserAccountId",
	        "ServiceMethodParams": [
                {"Key": "useraccountid", "Value": "" }
	        ]
	    }, {
	        "name": "Sites",
	        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
	        "ServiceMethod": "GetAll"
	    }, {
	        "name": "Roles",
	        "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IPressMemberService, WalkerGreenbank.Modules",
	        "ServiceMethod": "GetRoles"
	    }]
	}
}
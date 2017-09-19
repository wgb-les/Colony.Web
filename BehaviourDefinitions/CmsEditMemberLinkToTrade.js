{
    "behaviourId": "CmsEditMemberLinkToTrade",
	"page": {
	    "label": "Edit Trade Membership information for Website Member",
		"back": "#/members/index/",
		"backdescription": "Website Members",
		"messages": [{
		    "message": "EditMemberLinkToTrade",
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
                "source": "<p>Email: <strong><%=App.data.member.userAccount.email%></strong></p><p>Name: <strong><%=App.data.member.userAccount.title%> <%=App.data.member.userAccount.firstName%> <%=App.data.member.userAccount.lastName%></strong></p><p>Company Name: <strong><%=App.data.member.companyName%></strong></p>"
            }]
        }, {
            "label":"Tenant",
            "type": "hidden",
            "componentId": "Tenant",
            "map": [
                {"friendlyName": "Value", "source":"member.tenant", "default": "ColonyCMSFrontend" }
            ]
        }, {
            "label":"Trade Membership Level",
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
                "label": "Webtex Login Id",
                "type": "text",
                "componentId": "WebtexLoginId",
                "map": [
					{"friendlyName": "Value", 
					    "source": "member.webtexLoginId" }
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
	        "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.ITradeMemberService, WalkerGreenbank.Modules",
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
	        "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.ITradeMemberService, WalkerGreenbank.Modules",
	        "ServiceMethod": "GetRoles"
	    }]
	}
}
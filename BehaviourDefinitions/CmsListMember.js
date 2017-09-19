{
    "behaviourId": "CmsListMember",
    "messageHandlers": [{
        "Name": "AddMember",
        "ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditMember",
        "ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditMemberPassword",
        "ServiceType": "Colony.Services.Security.Accounts.IUserAccountService, Colony.Services",
        "ServiceMethod": "SetPassword",
        "ServiceMethodParams": [
            {"Key": "tenant", "Value": "" },
            {"Key": "username", "Value": "" },
            {"Key": "newPassword", "Value": "" }
        ]
    }, {
        "Name": "DeleteMember",
        "ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    }, {
        "Name": "EditMemberLinkToTrade",
        "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.ITradeMemberService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateWebtexLogin",
        "ServiceMethodParams": [
            {"Key": "userAccountId", "Value": "" },
            {"Key": "webtexLoginId", "Value": "" },
            {"Key": "role", "Value": 0 }
        ]
    }, {
        "Name": "EditMemberLinkToPress",
        "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IPressMemberService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdatePressLogin",
        "ServiceMethodParams": [
            {"Key": "userAccountId", "Value": "" },
            {"Key": "role", "Value": 0 }
        ]
    },
    {
        "Name": "SearchMember",
        "ReturnName": "cmsuser",
        "ServiceType": "Colony.Services.Security.Accounts.IUserAccountService, Colony.Services",
        "ServiceMethod": "GetForCms",
        "ServiceMethodParams": [
            {"Key": "keywords", "Value": "" },
            {"Key": "memberType", "Value": "" }
        ]
    }],
    "page": {
        "label": "Website Members" 
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "CmsUsersTabs",
        "actions": [{
            "icon": "plus",
            "url": "/members/add/",
            "name": "Add Website Member"
        }]
    }, {
        "label": "Search",
        "type": "searchform",
        "components": [
			{
			    "label": "keywords",
			    "type": "fieldset",
			    "componentId": "keywordsFieldset",
			    "className": "half",
			    "components": [
					{
					    "label": "Enter partial name or email address",
					    "componentId": "Keywords",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.keywords" }
					    ]
					},
                    {
                        "label": "Type of member",
                        "componentId": "MemberType",
                        "type": "dropdown",
                        "items": [
                            {"id": "press", "name": "Press Members" },
                            {"id": "trade", "name": "Trade Members" },
                            {"id": "all", "name": "All Members" }
                        ],
                        "map": [
								{"friendlyName": "value", "source": "cache.memberType" }
                        ]
                    }
			    ]
			}
        ],
        "messages": [
            {
                "message": "SearchMember",
                "behaviourId": "CmsListMember",
                "Trigger": "submitSearch"
            }
        ]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "CmsUserList",
        "dataCollection": "cmsuser",
        "map": [{
            "friendlyName": "Last Name",
            "source": "lastName"
        }, {
            "friendlyName": "First Name",
            "source": "firstName"
        }, {
            "friendlyName": "Email",
            "source": "email"
        }, {
            "friendlyName": "Closed",
            "source": "isAccountClosed"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Website member",
            "url": "/edit/#/members/edit/?id=<%=id%>"
        }, {
            "icon": "key",
            "name": "Set this Website Member's password",
            "url": "/edit/#/members/editpassword/?id=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Website member",
            "url": "/edit/#/members/delete/?id=<%=id%>"
        }, {
            "icon": "briefcase",
            "name": "Link this website member to a trade account",
            "url": "/edit/#/members/tradelink/?useraccountid=<%=id%>"
        }, {
            "icon": "quote-right",
            "name": "Configure this website member with a press account",
            "url": "/edit/#/members/presslink/?useraccountid=<%=id%>"
        }],
        "batchactions": [
            {
                "icon": "download",
                "name": "Export CSV",
                "trigger": "export-csv",
                "url": "/actionuri/members/cms/getmembersforcsv/"
            }
        ]
    }]
}
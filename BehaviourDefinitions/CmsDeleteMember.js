{
    "behaviourId": "CmsDeleteMember",
    "page": {
        "label": "Close Website Member Account",
        "back": "/members/index/",
        "backdescription": "Website Members",
        "messages": [{
            "message": "DeleteMember",
            "behaviourId": "CmsListMember",
            "trigger": "submit",
            "success": "redirect:/members/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to close the account <strong><%=App.data.member.email%></strong>?</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "member.id"
            }]
        }, {
            "label": "Close",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute":[{
            "name": "Member",
            "ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [
                {"Key": "id", "Value": "" }
            ]
        }]
    }
}
{
    "behaviourId": "CmsDeleteCmsUser",
    "page": {
        "label": "Delete CMS User",
        "back": "/users/index/",
        "backdescription": "CMS Users",
        "messages": [{
            "message": "DeleteUser",
            "behaviourId": "CmsListCmsUser",
            "trigger": "submit",
            "success": "redirect:/users/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the user <strong><%=App.data.member.email%></strong>?  This action cannot be undone.</p>"
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
            "label": "Delete",
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
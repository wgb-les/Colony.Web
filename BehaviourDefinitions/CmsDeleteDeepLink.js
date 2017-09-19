{
    "behaviourId": "CmsDeleteDeepLink",
    "page": {
        "label": "Delete Deep Link",
        "back": "deeplinks/index/?siteId=<%=App.Colony.currentSiteId%>&deepLinkCategoryId=<%=App.data.deeplink.deepLinkCategoryId || 0%>",
        "backdescription": "deep links",
        "messages": [{
            "message": "DeleteDeepLink",
            "behaviourId": "CmsListDeepLink",
            "trigger": "submit",
            "success": "redirect:/deeplinks/index/?siteId=<%=App.Colony.currentSiteId%>&deepLinkCategoryId=<%=App.data.deeplink.deepLinkCategoryId || 0%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the deep link <strong><%=App.data.deeplink.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "deeplink.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "deeplink",
            "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "BlogID": "id"
            }
        }]
    }
}
{
    "behaviourId": "CmsDeleteRedirect",
    "page": {
        "label": "Delete Redirect",
        "back": "redirects/index/?siteId=<%=App.data.redirect.siteId%>",
        "backdescription": "Redirects",
        "messages": [{
            "message": "DeleteRedirect",
            "behaviourId": "CmsListRedirect",
            "trigger": "submit",
            "success": "redirect:/redirects/index/?siteId=<%=App.data.redirect.siteId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteSiteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the redirect from <strong><%=App.data.redirect.oldUrl%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Site ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "page.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "Redirect",
            "ServiceType": "Colony.Services.Core.Abstract.IRedirectService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "PageID": "id"
            }
        }]
    }
}
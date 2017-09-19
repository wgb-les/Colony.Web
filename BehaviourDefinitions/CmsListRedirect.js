{
    "behaviourId": "CmsListRedirect",
    "messageHandlers": [{
        "Name": "EditRedirect",
        "ServiceType": "Colony.Services.Core.Abstract.IRedirectService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddRedirect",
        "ServiceType": "Colony.Services.Core.Abstract.IRedirectService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteRedirect",
        "ServiceType": "Colony.Services.Core.Abstract.IRedirectService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Redirects",
        "back": "/sites/index/",
        "backdescription": "Sites"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "SitesTabs",
        "actions": [{
            "icon": "plus",
            "url": "/redirects/add/?siteId=<%=App.Colony.currentSiteId%>",
            "name": "Add Redirect"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "RedirectList",
        "dataCollection": "redirect",
        "map": [{
            "friendlyName": "Old URL",
            "source": "oldUrl"
        }, {
            "friendlyName": "New URL",
            "source": "newUrl"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Redirect",
            "url": "/edit/#/redirects/edit/?id=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Redirect",
            "url": "/edit/#/redirects/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "Redirect",
            "ServiceType": "Colony.Services.Core.Abstract.IRedirectService, Colony.Services",
            "ServiceMethod": "GetRedirectsForSite",
            "ServiceMethodParams": [{
                "Key": "siteId",
                "Value": 1
            }],
            "map": [{
                "Name": "name",
                "PageID": "id"
            }]
        }]
    }
}
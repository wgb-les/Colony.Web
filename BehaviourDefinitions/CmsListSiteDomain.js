{
    "behaviourId": "CmsListSiteDomain",
    "messageHandlers": [{
        "Name": "EditSiteDomain",
        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISiteDomainsService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddSiteDomain",
        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISiteDomainsService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteSiteDomain",
        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISiteDomainsService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
        { "Key": "id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Site Domains",
        "back": "/sites/index/",
        "backdescription": "Sites"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "SitesTabs",
        "actions": [{
            "icon": "plus",
            "url": "/sitedomains/add/?siteId=<%=App.QueryString['siteId']%>",
            "name": "Add Domain"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "SiteDomainList",
        "dataCollection": "sitedomain",
        "map": [{
            "friendlyName": "Domain name",
            "source": "uri"
        }, {
            "friendlyName": "Main domain for site",
            "source": "isMain"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Site Domain",
            "url": "/edit/#/sitedomains/edit/?id=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Site Domain",
            "url": "/edit/#/sitedomains/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "Sitedomain",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISiteDomainsService, Colony.Services",
            "ServiceMethod": "GetDomainsForSite",
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
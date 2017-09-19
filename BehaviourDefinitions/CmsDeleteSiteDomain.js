{
    "behaviourId": "CmsDeleteSiteDomain",
    "page": {
        "label": "Delete Site Domain",
        "back": "sitedomains/index/?siteId=<%=App.data.sitedomain.siteId%>",
        "backdescription": "Site Domains",
        "messages": [{
            "message": "DeleteSiteDomain",
            "behaviourId": "CmsListSiteDomain",
            "trigger": "submit",
            "success": "redirect:/sitedomains/index/?siteId=<%=App.data.sitedomain.siteId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteSiteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the site domain <strong><%=App.data.sitedomain.domainName%></strong>?  This action cannot be undone.</p>"
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
            "name": "sitedomain",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISiteDomainsService, Colony.Services",
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
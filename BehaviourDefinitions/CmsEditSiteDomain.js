{
    "behaviourId": "CmsEditSiteDomain",
    "page": {
        "label": "Edit Site Domain",
        "back": "/sitedomains/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "Site Domains",
        "messages": [{
            "message": "EditSiteDomain",
            "behaviourId": "CmsListSiteDomain",
            "trigger": "submit",
            "success": "redirect:/sitedomains/index/?siteId=<%=App.Colony.currentSiteId%>"
        }]
    },
    "componentContainer": [{
        "label": "Domain Name",
        "type": "text",
        "componentId": "Uri",
        "map": [{
            "friendlyName": "Value",
            "source": "sitedomain.uri"
        }],
        "validation": {
            "required": true,
            "maxlength": 255
        }
    }, {
        "label": "Is this the default domain for this site",
        "type": "switch",
        "componentId": "IsMain",
        "map": [{
            "friendlyName": "Value",
            "source": "sitedomain.isMain"
        }]
    }, {
        "label": "Site Domain ID",
        "type": "hidden",
        "componentId": "Id",
        "map": [{
            "friendlyName": "Value",
            "source": "sitedomain.id"
        }]
    }, {
        "label": "Site ID",
        "type": "hidden",
        "componentId": "SiteId",
        "map": [{
            "friendlyName": "Value",
            "source": "sitedomain.siteId"
        }]
    }, {
        "label": "Save",
        "type": "button",
        "componentId": "SaveButton"
    }],
    "data": {
        "execute": [{
            "name": "Sitedomain",
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
{
    "behaviourId": "CmsAddSiteDomain",
    "page": {
        "label": "Edit Site Domain",
        "back": "/sitedomains/index/?siteId=<%= App.QueryString['siteId']%>",
        "backdescription": "Site Domains",
        "messages": [{
            "message": "AddSiteDomain",
            "behaviourId": "CmsListSiteDomain",
            "trigger": "submit",
            "success": "redirect:/sitedomains/index/?siteId=<%= App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [{
        "label": "Domain Name",
        "type": "text",
        "componentId": "Uri",
        "map": [{
            "friendlyName": "Value",
            "source": "sitedomain.uri"
        }]
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
            "source": "querystring.siteId"
        }]
    }, {
        "label": "Save",
        "type": "button",
        "componentId": "SaveButton"
    }]
}
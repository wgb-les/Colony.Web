{
    "behaviourId": "CmsDeleteSite",
    "page": {
        "label": "Delete Site",
        "back": "sites/index/",
        "backdescription": "Sites",
        "messages": [{
            "message": "DeleteSite",
            "behaviourId": "CmsListSite",
            "trigger": "submit",
            "success": "redirect:/sites/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteSiteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the site <strong><%=App.data.site.name%></strong>?  This action cannot be undone.</p>"
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
            "name": "Site",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
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
{
    "behaviourId": "CmsDeleteHomepageItem",
    "page": {
        "label": "Delete Homepage Item",
        "back": "/homepageitems/index/?id=<%=App.QueryString['featuredItemId']%>&siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "items",
        "messages": [{
            "message": "DeleteHomepageItem",
            "behaviourId": "CmsListHomepageItem",
            "trigger": "submit",
            "success": "redirect:/homepageitems/index/?id=<%=App.QueryString['featuredItemId']%>&siteId=<%=App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteFeaturedItemImage",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the item <strong><%=App.data.featureditem.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "featureditem.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "featureditem",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FeaturedItemID": "id"
            }
        }]
    }
}
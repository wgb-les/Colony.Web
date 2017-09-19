{
    "behaviourId": "CmsDeleteHomeAccessory",
    "page": {
        "label": "Delete Home Accessory",
        "back": "/homeaccessories/index/?homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>&siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "items",
        "messages": [{
            "message": "DeleteHomeAccessory",
            "behaviourId": "CmsListHomeAccessories",
            "trigger": "submit",
            "success": "redirect:/homeaccessories/index/?homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>&siteId=<%=App.Colony.currentSiteId['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteHomeAccessory",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the item <strong><%=App.data.homeaccessory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "homeaccessory",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "HomeAccessoryID": "id"
            }
        }]
    }
}
{
    "behaviourId": "CmsDeleteHomeAccessoryCategory",
    "page": {
        "label": "Delete Home Accessory",
        "back": "/homeaccessorycategories/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "items",
        "messages": [{
            "message": "DeleteHomeAccessoryCategory",
            "behaviourId": "CmsListHomeAccessoryCategories",
            "trigger": "submit",
            "success": "redirect:/homeaccessorycategories/index/?siteId=<%=App.Colony.currentSiteId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteHomeAccessoryCategory",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the item <strong><%=App.data.homeaccessorycategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "homeaccessorycategory",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "HomeAccessoryCategoryID": "id"
            }
        }]
    }
}
{
    "behaviourId": "CmsDeleteHomeAccessoryImage",
    "page": {
        "label": "Delete Homepage Accessory Image",
        "back": "/homeaccessoryimages/edit/?homeAccessoryId=<%=App.QueryString['homeAccessoryId']%>&siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "images",
        "messages": [{
            "message": "DeleteImage",
            "behaviourId": "CmsListHomeAccessories",
            "trigger": "submit",
            "success": "redirect:/homeaccessoryimages/edit/?homeAccessoryId=<%=App.QueryString['homeAccessoryId']%>&siteId=<%=App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteHomeAccessoryImage",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the image <strong><%=App.data.homeaccessoryimage.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Home Accessory ID",
            "type": "hidden",
            "componentId": "HomeAccessoryID",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessoryimage.homeAccessoryID"
            }]
        }, {
            "label": "Image Asset ID",
            "type": "hidden",
            "componentId": "ImageAssetId",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessoryimage.featuredItemId"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "homeaccessoryimage",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImageById",
            "ServiceMethodParams": [{
                "Key": "homeAccessoryId",
                "Value": 1
            },
            {
                "Key": "imageAssetId",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "HomeAccessoryID": "id"
            }
        }]
    }
}
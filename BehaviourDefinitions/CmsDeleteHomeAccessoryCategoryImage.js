{
    "behaviourId": "CmsDeleteHomeAccessoryCategoryImage",
    "page": {
        "label": "Delete Homepage Accessory Category Image",
        "back": "/homeaccessorycategoryimages/edit/?homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>&siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "images",
        "messages": [{
            "message": "DeleteImage",
            "behaviourId": "CmsListHomeAccessoryCategories",
            "trigger": "submit",
            "success": "redirect:/homeaccessorycategoryimages/edit/?homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>&siteId=<%=App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteHomeAccessCategoryImage",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the image <strong><%=App.data.homeaccessorycategoryimage.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "HomeAccessoryCategory ID",
            "type": "hidden",
            "componentId": "HomeAccessoryCategoryID",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategoryimage.homeAccessoryCategoryId"
            }]
        }, {
            "label": "Image Asset ID",
            "type": "hidden",
            "componentId": "ImageAssetId",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategoryimage.imageAssetId"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "homeaccessorycategoryimage",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImageById",
            "ServiceMethodParams": [{
                "Key": "homeAccessoryCategoryId",
                "Value": 1
            },
            {
                "Key": "imageAssetId",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "homeAccessoryCategoryID": "id"
            }
        }]
    }
}
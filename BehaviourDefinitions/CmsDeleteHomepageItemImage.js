{
    "behaviourId": "CmsDeleteHomepageItemImage",
    "page": {
        "label": "Delete Homepage Item Image",
        "back": "/homepageitemimages/edit/?featuredItemId=<%=App.QueryString['featuredItemId']%>&siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "images",
        "messages": [{
            "message": "DeleteImage",
            "behaviourId": "CmsListHomepageItem",
            "trigger": "submit",
            "success": "redirect:/homepageitemimages/edit/?featuredItemId=<%=App.QueryString['featuredItemId']%>&siteId=<%=App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteFeaturedItemImage",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the image <strong><%=App.data.featureditemimage.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Featured Item ID",
            "type": "hidden",
            "componentId": "FeaturedItemId",
            "map": [{
                "friendlyName": "Value",
                "source": "featureditemimage.featuredItemId"
            }]
        }, {
            "label": "Image Asset ID",
            "type": "hidden",
            "componentId": "ImageAssetId",
            "map": [{
                "friendlyName": "Value",
                "source": "featureditemimage.featuredItemId"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "featureditemimage",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImageById",
            "ServiceMethodParams": [{
                "Key": "featuredItemId",
                "Value": 1
            },
            {
                "Key": "imageAssetId",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FeaturedItemID": "id"
            }
        }]
    }
}
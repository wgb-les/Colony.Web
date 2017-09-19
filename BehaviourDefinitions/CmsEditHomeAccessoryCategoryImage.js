{
    "behaviourId": "CmsEditHomeAccessoryCategoryImage",
    "page": {
        "label": "Edit Home Accessory Category Images",
        "back": "#/homeaccessorycategories/edit/?siteId=<%=App.Colony.currentSiteId%>&id=<%=App.QueryString['homeAccessoryCategoryId']%>",
        "backdescription": "Home Accessory Category",
        "messages": [{
            "message": "AddImage",
            "behaviourId": "CmsListHomeAccessoryCategories",
            "trigger": "submit",
            "success": "redirect:/homeaccessorycategoryimages/edit/?siteId=<%=App.Colony.currentSiteId%>&homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset",
            "components": [{
                    "label": "Images",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessorycategoryimage.imageAssetId"
                    }]
            }]
        },
        {
            "label": "Home Accessory Id",
            "type": "hidden",
            "componentId": "HomeAccessoryId",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.homeAccessoryCategoryId"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategoryimage.order"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        },
        {
            "label": "",
            "type": "datatable",
            "dataCollection": "homeaccessorycategpryimages",
            "map": [{
                "friendlyName": "Name",
                "source": "name"
            },
            {
                "friendlyName": "_ImageAssetID",
                "source": "imageAssetID"
            }],
            "actions": [
            {
                "icon": "remove",
                "name": "Delete this Home Accessory Category image",
                "url": "/edit/#/homeaccessorycategoryimages/delete/?imageAssetId=<%=obj.attributes._ImageAssetID%>&homeAccessoryCategoryId=<%=App.QueryString.homeAccessoryCategoryId%>&siteId=<%=App.QueryString['siteId']%>"
            }],
            "messages": [
                {
                    "message": "UpdateOrder",
                    "behaviourId": "CmsListHomeAccessoryCategories",
                    "trigger": "UpdateOrder"
                }
            ]
        }],
    "data": {
        "execute": [{
            "name": "Languages",
            "ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
            "ServiceMethod": "GetAll"
        }, {
            "name": "Sites",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll"
        },
        {
            "name": "homeaccessorycategpryimages",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImagesById",
            "ServiceMethodParams": [
                { "Key": "homeaccessorycategoryid", "Value": 1 }
            ],
            "map": {
                "Name": "name",
                "HomeAccessoryCategoryID": "id"
            }
    }]
    }
}
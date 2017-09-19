{
    "behaviourId": "CmsEditHomeAccessoryImage",
    "messageHandlers": [{
        "Name": "UpdateOrder",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules.HomeAccessories",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 },
            { "Key": "homeAccessoryId", "Value": 0 }
        ]
    }],
    "page": {
        "label": "Edit Home Accessory Images",
        "back": "#/homeaccessories/edit/?siteId=<%=App.Colony.currentSiteId%>&id=<%=App.QueryString['homeAccessoryId']%>&homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>",
        "backdescription": "Home Accessory",
        "messages": [{
            "message": "AddImage",
            "behaviourId": "CmsListHomeAccessories",
            "trigger": "submit",
            "success": "redirect:/homeaccessoryimages/edit/?siteId=<%=App.Colony.currentSiteId%>&homeAccessoryId=<%=App.QueryString['homeAccessoryId']%>&homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>"
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
                        "source": "homeaccessoryimage.imageAssetId"
                    }]
            }]
        },
        {
            "label": "Home Accesory Id",
            "type": "hidden",
            "componentId": "HomeAccessoryId",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.homeAccessoryId"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessoryimage.order"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        },
        {
            "label": "",
            "type": "datatable",
            "dataCollection": "homeaccessoryimages",
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
                "name": "Delete this Homepage Item image",
                "url": "/edit/#/homeaccessoryimages/delete/?imageAssetId=<%=obj.attributes._ImageAssetID%>&homeAccessoryId=<%=App.QueryString.homeAccessoryId%>&siteId=<%=App.QueryString['siteId']%>"
            }],
            "messages": [
                {
                    "message": "UpdateOrder",
                    "behaviourId": "CmsEditHomeAccessoryImage",
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
            "name": "homeaccessoryimages",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImagesById",
            "ServiceMethodParams": [
                { "Key": "homeaccessoryid", "Value": 1 }
            ],
            "map": {
                "Name": "name",
                "featureditemId": "id"
            }
    }]
    }
}
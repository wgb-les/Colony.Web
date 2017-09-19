{
    "behaviourId": "CmsListHomeAccessories",
    "messageHandlers": [{
        "Name": "EditHomeAccessory",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddHomeAccessory",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteHomeAccessory",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "AddImage",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "AddImageById",
        "ServiceMethodParams": [{ "Key": "homeAccessoryId", "Value": 1 },{ "Key": "imageAssetId", "Value": 1 }]
    }, {
        "Name": "DeleteImage",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteImageById",
        "ServiceMethodParams": [{ "Key": "homeAccessoryId", "Value": 1 },{ "Key": "imageAssetId", "Value": 1 }]
    }, {
        "Name": "UpdateImageOrder",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 },
            { "Key": "homeAccessoryId", "Value": 0 }
        ]
    }, {
        "Name": "UpdateOrder",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
        ]
    }],
    "page": {
        "label": "Home Accessories",
        "back": "/homeaccessorycategories/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "Home Accessory Categories"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "HomeAccessoryTabs",
        "actions": [{
            "icon": "plus",
            "url": "/homeaccessories/add/?siteId=<%=App.Colony.currentSiteId%>&homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>",
            "name": "Add Home Accessory"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "HomeAccessoryList",
        "dataCollection": "homeaccessory",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/homeaccessories/edit/?id=<%=id%>&homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>",
            "name": "Edit this Home Accessory"
        }, {
            "icon": "remove",
            "name": "Delete this Home Accessory",
            "url": "/edit/#/homeaccessories/delete/?id=<%=id%>&homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>"
        }],
        "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListHomeAccessories",
                "trigger": "UpdateOrder"
            }
        ]
    }],
    "data": {
        "execute": [{
            "name": "homeaccessory",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [
                {"Key": "homeAccessoryCategoryId", "Value": "<%=App.QueryString['homeAccessoryCategoryId']%>" }
                
            ],
            "map": [{
                "Name": "name",
                "HomeAccessoryId": "id"
            }]
        }]
    }
}
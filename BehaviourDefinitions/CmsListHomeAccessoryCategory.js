{
    "behaviourId": "CmsListHomeAccessoryCategories",
    "messageHandlers": [{
        "Name": "EditHomeAccessoryCategory",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddHomeAccessoryCategory",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteHomeAccessoryCategory",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "ListHomeAccessoryCategories",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "GetAll"
    }, {
        "Name": "AddImage",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "AddImageById",
        "ServiceMethodParams": [{ "Key": "homeAccessoryCategoryId", "Value": 1 },{ "Key": "imageAssetId", "Value": 1 }]
    }, {
        "Name": "DeleteImage",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteImageById",
        "ServiceMethodParams": [{ "Key": "homeAccessoryCategoryId", "Value": 1 },{ "Key": "imageAssetId", "Value": 1 }]
    }, {
        "Name": "UpdateOrder",
        "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "insertBeforeEntityId", "Value": 0 },
            { "Key": "entityId", "Value": 0 }
        ]
    }],
    "page": {
        "label": "Home Accessory Categories"
    },
    "componentContainer": [{ 
        "label": "",
        "type": "tablist",
        "componentId": "HomeAccessoryCategoryTabs",
        "actions": [{
            "icon": "plus",
            "url": "/homeaccessorycategories/add/?siteId=<%=App.Colony.currentSiteId%>",
            "name": "Add Home Accessory Category"
        }]
    },{
        "label": "",
        "type": "treeview",
        "componentId": "CollectionList",
        "dataCollection": "homeaccessorycategories",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/homeaccessorycategories/edit/?id=<%=id%>",
            "name": "Edit this Home Accessory Category"
        }, {
            "icon": "align-justify",
            "name": "View Home Accessories for this Category",
            "url": "/edit/#/homeaccessories/index/?siteId=<%=App.Colony.currentSiteId%>&homeAccessoryCategoryId=<%=id%>"
        }, {
            "icon": "plus",
            "name": "Add a child Category beneath this Home Accessory Category",
            "url": "/edit/#/homeaccessorycategories/add/?parentId=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Category",
            "url": "/edit/#/homeaccessorycategories/delete/?id=<%=id%>"
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
            "name": "homeaccessorycategories",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetBySite",
            "ServiceMethodParams": [
				{"Key": "siteId", "Value": 1 }
            ],
            "map": [{
                "Name": "name",
                "BlogID": "id"
            }]
        }]
    }
}
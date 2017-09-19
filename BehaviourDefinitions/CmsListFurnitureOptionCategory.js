{
    "behaviourId": "CmsListFurnitureOptionCategory",
    "messageHandlers": [{
        "Name": "EditFurnitureOptionCategory",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionCategoryService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddFurnitureOptionCategory",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionCategoryService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteFurnitureoptionCategory",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionCategoryService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Furniture Option Categories",
        "back": "/furniturecollections/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "Furniture Collections"
    },
    "componentContainer": [{
        "label": "",
        "type": "treeview",
        "componentId": "CollectionList",
        "dataCollection": "furnitureoptioncategories",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/furnitureoptioncategories/edit/?id=<%=id%>&siteId=<%=App.Colony.currentSiteId%>",
            "name": "Edit this Category"
        }, {
            "icon": "align-justify",
            "name": "View Options for this Category",
            "url": "/edit/#/furnitureoptions/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureOptionCategoryId=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Category",
            "url": "/edit/#/furnitureoptioncategories/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "furnitureoptioncategories",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionCategoryService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [{
                "Key": "siteId",
                "Value": 1
            }],
            "map": [{
                "Name": "name",
                "FurnitureOptionCategoryID": "id"
            }]
        }]
    }
}
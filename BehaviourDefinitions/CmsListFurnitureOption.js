{
    "behaviourId": "CmsListFurnitureOption",
    "messageHandlers": [{
        "Name": "EditFurnitureOption",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddFurnitureOption",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteFurnitureoption",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Furniture Options",
        "back": "/furnitureoptioncategories/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureOptionCategoryId=<%=App.QueryString['furnitureOptionCategoryId']%>",
        "backdescription": "Furniture Option Categories"
    },
    "componentContainer": [{
        "label": "",
        "type": "treeview",
        "componentId": "CollectionList",
        "dataCollection": "furnitureoptions",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/furnitureoptions/edit/?id=<%=id%>&siteId=<%=App.Colony.currentSiteId%>&furnitureOptionCategoryId=<%=App.QueryString['furnitureOptionCategoryId']%>",
            "name": "Edit this Category"
        }, {
            "icon": "remove",
            "name": "Delete this Category",
            "url": "/edit/#/furnitureoptions/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "furnitureoptions",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCmsCategory",
            "ServiceMethodParams": [{"Key": "furnitureOptionCategoryId", "Value": "<%=App.QueryString['furnitureOptionCategoryId']%>" }],
            "map": [{
                "Name": "name",
                "FurnitureOptionCategoryID": "id"
            }]
        }]
    }
}
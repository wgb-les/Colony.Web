{
  "behaviourId": "CmsListFurnitureType",
    "messageHandlers": [{
        "Name": "EditFurnitureType",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureTypeService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddFurnitureType",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureTypeService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteFurnitureType",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureTypeService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Furniture Types",
        "back": "/furniturecollections/index/",
        "backdescription": "Furniture Collections"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "FurnitureTypeTabs",
        "actions": [{
            "icon": "plus",
            "url": "/furnituretypes/add/?siteId=<%=App.Colony.currentSiteId%>&furnitureCollectionId=<%=App.QueryString['furnitureCollectionId']%>",
            "name": "Add Furniture Type"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "FurnitureTypeList",
        "dataCollection": "furnituretype",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/furnituretypes/edit/?id=<%=id%>&furnitureCollectionId=<%=App.QueryString['furnitureCollectionId']%>&siteId=<%=App.Colony.currentSiteId%>",
            "name": "Edit this Furniture Type"
        }, {
            "icon": "remove",
            "name": "Delete this Furniture Type",
            "url": "/edit/#/furnituretypes/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "furnituretype",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureTypeService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [
                {"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
                {"Key": "furnitureCollectionId", "Value": "<%=App.QueryString['furnitureCollectionId']%>" }
                
            ],
            "map": [{
                "Name": "name",
                "FurnitureTypeId": "id"
            }]
        }]
    }
}
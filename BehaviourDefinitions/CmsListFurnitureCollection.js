{
    "behaviourId": "CmsListFurnitureCollection",
    "messageHandlers": [{
        "Name": "EditFurnitureCollection",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddFurnitureCollection",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteFurnitureCollection",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "ListFurnitureCollections",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
        "ServiceMethod": "GetAll"
    }, {
        "Name": "AddImage",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
        "ServiceMethod": "AddImageById",
        "ServiceMethodParams": [{ "Key": "furnitureCollectionId", "Value": 1 },{ "Key": "imageAssetId", "Value": 1 }]
    }, {
        "Name": "DeleteImage",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteImageById",
        "ServiceMethodParams": [{ "Key": "furnitureCollectionId", "Value": 1 },{ "Key": "imageAssetId", "Value": 1 }]
    },{
        "Name": "UpdateOrder",
        "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
        ]
    }],
    "page": {
        "label": "Furniture Collections"
    },
    "componentContainer": [{
        "label": "",
        "type": "treeview",
        "componentId": "CollectionList",
        "dataCollection": "furniturecollections",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/furniturecollections/edit/?id=<%=id%>&siteId=<%=App.Colony.currentSiteId%>",
            "name": "Edit this Furniture Collection"
        }, {
            "icon": "align-justify",
            "name": "View Furniture Types for this Collection",
            "url": "/edit/#/furnituretypes/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureCollectionId=<%=id%>"
        }, {
            "icon": "plus",
            "name": "Add a child Collection beneath this Furniture Collection",
            "url": "/edit/#/furniturecollections/add/?parentId=<%=id%>&siteId=<%=App.Colony.currentSiteId%>"
        }, {
            "icon": "remove",
            "name": "Delete this Collection",
            "url": "/edit/#/furniturecollections/delete/?id=<%=id%>&siteId=<%=App.Colony.currentSiteId%>"
        }],
        "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListFurnitureCollection",
                "trigger": "UpdateOrder"
            }
        ]
    }],
    "data": {
        "execute": [{
            "name": "furniturecollections",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [{
                "Key": "siteId",
                "Value": 1
            }],
            "map": [{
                "Name": "name",
                "FurnitureCollectionID": "id"
            }]
        }]
    }
}
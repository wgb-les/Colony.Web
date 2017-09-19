{
    "behaviourId": "CmsListFeatured",
    "messageHandlers": [{
        "Name": "EditFeatured",
        "ServiceType": "WalkerGreenbank.Modules.Featured.Services.IFeaturedItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddFeatured",
        "ServiceType": "WalkerGreenbank.Modules.Featured.Services.IFeaturedItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteFeatured",
        "ServiceType": "WalkerGreenbank.Modules.Featured.Services.IFeaturedItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "UpdateOrder",
        "ServiceType": "WalkerGreenbank.Modules.Featured.Services.IFeaturedItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
        ]
    }, {
        "Name": "DeleteBatch",
        "ServiceType": "WalkerGreenbank.Modules.Featured.Services.IFeaturedItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteBatch",
        "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
        ]
    }],
    "page": {
        "label": "Featured Items"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "FeaturedTabs",
        "actions": [{
            "icon": "plus",
            "url": "/featured/add/?siteId=<%=App.Colony.currentSiteId%>",
            "name": "Add Featured Item"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "FeaturedItemList",
        "dataCollection": "featured",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/featured/edit/?id=<%=id%>",
            "name": "Edit this Featured Item"
        }, {
            "icon": "remove",
            "name": "Delete this Featured",
            "url": "/edit/#/featured/delete/?id=<%=id%>"
        }],
        "batchactions": [{
            "icon": "remove",
            "name": "Delete",
            "messages": [{
                "message": "DeleteBatch",
                "behaviourId": "CmsListFeatured"
            }]
        }],
        "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListFeatured",
                "trigger": "UpdateOrder"
            }
        ]
    }],
    "data": {
        "execute": [{
            "name": "featured",
            "ServiceType": "WalkerGreenbank.Modules.Featured.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetAll",
            "map": [{
                "Name": "name",
                "FeaturedItemID": "id"
            }]
        }]
    }
}
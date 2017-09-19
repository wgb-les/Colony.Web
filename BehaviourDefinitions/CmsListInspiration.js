{
    "behaviourId": "CmsListInspiration",
    "messageHandlers": [{
        "Name": "EditInspiration",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddInspiration",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteInspiration",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "EditInspirationImage",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateImage",
        "ServiceMethodParams": [
            {"Key": "inspirationId", "Value": 0 },
            {"Key": "imageAssetID", "Value": 0 },
            {"Key": "type", "Value": 0 },
            {"Key": "productCategoryId", "Value": 0 }
        ]
    }, {
        "Name": "AddInspirationImage",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
        "ServiceMethod": "AddImage",
        "ServiceMethodParams": [
            {"Key": "inspirationId", "Value": 0 },
            {"Key": "imageAssetID", "Value": 0 },
            {"Key": "type", "Value": 0 },
            {"Key": "productCategoryId", "Value": 0 }
        ]
    }, {
        "Name": "DeleteInspirationImage",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteImageById",
        "ServiceMethodParams": [
            { "Key": "InspirationId", "Value": 1 },
            { "Key": "ImageAssetId", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Inspiration"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "FeaturedTabs",
        "actions": [{
            "icon": "plus",
            "url": "/inspiration/add/?siteId=<%=App.Colony.currentSiteId%>",
            "name": "Add Inspiration"
        },
        {
            "icon": "align-justify",
            "url": "/inspirationcategories/index/?siteId=<%=App.Colony.currentSiteId%>",
            "name": "Manage Inspiration Categories"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "FeaturedItemList",
        "dataCollection": "inspiration",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/inspiration/edit/?id=<%=id%>",
            "name": "Edit this Inspiration"
        }, {
            "icon": "align-justify",
            "url": "/edit/#/inspirationimages/index/?inspirationId=<%=id%>",
            "name": "Edit Images for this Inspiration"
        }, {
            "icon": "remove",
            "name": "Delete this Inspiration",
            "url": "/edit/#/inspiration/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "inspiration",
            "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [
                {"Key": "siteId", "Value": 0 }
            ]
        }]
    }
}
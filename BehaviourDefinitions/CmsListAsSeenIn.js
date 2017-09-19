{
    "behaviourId": "CmsListAsSeenIn",
    "messageHandlers": [{
        "Name": "EditAsSeenIn",
        "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddAsSeenIn",
        "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteAsSeenIn",
        "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "DeleteBatch",
        "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteBatch",
        "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
        ]
    }],
    "page": {
        "label": "As Seen In Items",
        "back": "/asseenincategories/index/",
        "backdescription": "As Seen In Categories"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "AsSeenInTabs",
        "actions": [{
            "icon": "plus",
            "url": "/asseenin/add/?siteId=<%=App.Colony.currentSiteId%>",
            "name": "Add As Seen Item"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "AsSeenInList",
        "dataCollection": "asseeninitem",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/asseenin/edit/?id=<%=id%>",
            "name": "Edit this As Seen In item"
        }, {
            "icon": "remove",
            "name": "Delete this As Seen In item",
            "url": "/edit/#/asseenin/delete/?id=<%=id%>"
        }],
        "batchactions": [{
            "icon": "remove",
            "name": "Delete",
            "messages": [{
                "message": "DeleteBatch",
                "behaviourId": "CmsListAsSeenIn"
            }]
        }]
    }],
    "data": {
        "execute": [{
            "name": "asseeninitem",
            "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [
                {"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
                {"Key": "asSeenInCategoryId", "Value": "<%=App.QueryString['asSeenInCategoryId']%>" }
                
            ],
            "map": [{
                "Name": "name",
                "AsSeenInItemID": "id"
            }]
        }]
    }
}
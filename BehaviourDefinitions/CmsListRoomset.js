{
    "behaviourId": "CmsListRoomset",
    "messageHandlers": [{
        "Name": "EditRoomset",
        "ServiceType": "WalkerGreenbank.Modules.Hotspots.Services.IRoomsetService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddRoomset",
        "ServiceType": "WalkerGreenbank.Modules.Hotspots.Services.IRoomsetService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteRoomset",
        "ServiceType": "WalkerGreenbank.Modules.Hotspots.Services.IRoomsetService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "id", "Value": 1 }
        ]
    }, {
        "Name": "SearchRoomset",
        "ReturnName": "roomset",
        "ServiceType": "WalkerGreenbank.Modules.Hotspots.Services.IRoomsetService, WalkerGreenbank.Modules",
        "ServiceMethod": "CmsSearch",
        "ServiceMethodParams": [
			{"Key": "searchCriteria", "Value": "", "IsDynamic": true }
        ]
    }, {
        "Name": "DeleteBatch",
        "ServiceType": "WalkerGreenbank.Modules.Hotspots.Services.IRoomsetService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteBatch",
        "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
        ]
    }],
    "page": {
        "label": "Roomsets"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "SitesTabs",
        "actions": [{
            "icon": "plus",
            "url": "/roomsets/add/",
            "name": "Add Roomset"
        }]
    }, {
        "label": "Search",
        "type": "searchform",
        "components": [
			{
			    "label": "keywords",
			    "type": "fieldset",
			    "componentId": "keywordsFieldset",
			    "className": "half",
			    "components": [
					{
					    "label": "Enter keywords (roomset name, design or sku)",
					    "componentId": "Keywords",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.keywords" }
					    ]
					}
			    ]
			}
        ],
        "messages": [
			{
			    "message": "SearchRoomset",
			    "behaviourId": "CmsListRoomset",
			    "Trigger": "submitSearch"
			}
        ]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "ListRoomset",
        "dataCollection": "roomset",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Roomset",
            "url": "/edit/#/roomsets/edit/?id=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Roomset",
            "url": "/edit/#/roomsets/delete/?id=<%=id%>"
        }],
        "batchactions": [{
            "icon": "remove",
            "name": "Delete",
            "messages": [{
                "message": "DeleteBatch",
                "behaviourId": "CmsListRoomset"
            }]
        }]
    }],
    "data": {
        "execute": [{
            "name": "Roomset",
            "ServiceType": "WalkerGreenbank.Modules.Hotspots.Services.IRoomsetService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetAll"
        }]
    }
}
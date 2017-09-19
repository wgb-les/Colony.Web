{
    "behaviourId": "CmsListMenu",
    "messageHandlers": [{
        "Name": "EditMenu",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteMenu",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [{
            "Key": "Id",
            "Value": 1
        }]
    }, {
        "name": "ListMenu",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
        "ServiceMethod": "GetAll",
        "map": [{
            "Name": "name",
            "PageID": "id"
        }]
    }, {
        "Name": "AddMenu",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditMegaMenu",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "UpdateOrder",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
        ]
    }],
    "page": {
        "label": "Menus",
        "back": "/sites/index/",
        "backdescription": "Sites"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "MenusTabs",
        "actions": [{
            "icon": "plus",
            "url": "/menus/add/?siteId=<%=App.QueryString['siteId']%>",
            "name": "Add Menu"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "MenusList",
        "dataCollection": "menus",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/menus/edit/?id=<%=id%>",
            "name": "Edit this Menu"
        }, {
            "icon": "remove",
            "name": "Delete this Menu",
            "url": "/edit/#/menus/delete/?id=<%=id%>"    
        }],
        "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListMenu",
                "trigger": "UpdateOrder"
            }
        ]
    }],
    "data": {
        "execute": [{
            "name": "menus",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [{
                "Key": "siteId",
                "Value": 1
            }],
            "map": [{
                "Name": "name",
                "MenuId": "id"
            }]
        }]
    }
}
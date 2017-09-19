{
    "behaviourId": "CmsListMegaMenuItems",
    "messageHandlers": [{
        "Name": "EditMegaMenuItem",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteMegaMenuItem",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [{
            "Key": "Id",
            "Value": 1
        }]
    }, {
        "name": "ListMegaMenuItems",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
        "ServiceMethod": "GetAll",
        "map": [{
            "Name": "name",
            "PageID": "id"
        }]
    }, {
        "Name": "AddMegaMenuItem",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "UpdateOrder",
        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuItemService, WalkerGreenbank.Modules",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
    ]
}],
    "page": {
        "label": "Mega Menu Content Sections",
        "back": "/menus/edit/?id=<%= App.QueryString['menuId'] %>&siteId=<%= App.QueryString['siteId'] %>",
        "backdescription": "Menu"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "MenusTabs",
        "actions": [{
            "icon": "plus",
            "url": "/menus/mega-menu-items/add/?menuId=<%=App.QueryString['menuId']%>&siteId=<%=App.QueryString['siteId']%>",
            "name": "Add Content Section"
        }, {
            "icon": "penci;",
            "url": "/menus/mega-menu/edit/?menuId=<%=App.QueryString['menuId']%>&siteId=<%=App.QueryString['siteId']%>",
            "name": "Edit Mega Menu Details"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "MenusList",
        "dataCollection": "menus",
        "map": [{
            "friendlyName": "Content",
            "source": "<div class='wysiwygContentContainer'><%= htmlContent%></div>"
        }, {
            "friendlyName": "Is Visible",
            "source": "<%= isVisible%>"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/menus/mega-menu-items/edit/?id=<%=id%>&siteId=<%=App.QueryString['siteId']%>",
            "name": "Edit this Menu"
        }, {
            "icon": "remove",
            "name": "Delete this Menu",
            "url": "/edit/#/menus/mega-menu-items/delete/?id=<%=id%>&siteId=<%=App.QueryString['siteId']%>"    
        }],
        "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListMegaMenuItems",
                "trigger": "UpdateOrder"
            }
        ]
    }],
    "data": {
        "execute": [{
            "name": "menus",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForMenu",
            "ServiceMethodParams": [{
                "Key": "menuId",
                "Value": 1
            }],
            "map": [{
                "Name": "name",
                "MenuId": "id"
            }]
        }]
    }
}
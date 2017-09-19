{
    "behaviourId": "CmsDeleteMegaMenuItem",
    "page": {
        "label": "Delete Mega Menu Content Section",
        "back": "menus/mega-menu-items/index/?menuId=<%= App.data.megaMenuItem.menuId %>&siteId=<%=App.QueryString['siteId']%>",
        "backdescription": "Mega Menu Items",
        "messages": [{
            "message": "DeleteMegaMenuItem",
            "behaviourId": "CmsListMegaMenuItems",
            "trigger": "submit",
            "success": "redirect:/menus/mega-menu-items/index?menuId=<%= App.data.megaMenuItem.menuId %>&siteId=<%=App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteMenuContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete this content<span data-id='<%=App.data.megaMenuItem.menuId %>'></span> section?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Menu ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "megaMenuItem.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "megaMenuItem",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "PageID": "id"
            }
        }]
    }
}
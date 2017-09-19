{
    "behaviourId": "CmsDeleteMenu",
    "page": {
        "label": "Delete Menu",
        "back": "menus/index/?siteId=<%=App.data.menu['siteId']%>",
        "backdescription": "Menus",
        "messages": [{
            "message": "DeleteMenu",
            "behaviourId": "CmsListMenu",
            "trigger": "submit",
            "success": "redirect:/menus/index/?siteId=<%=App.data.menu['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteMenuContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the menu <strong><%=App.data.menu.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Menu ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "menu.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "menu",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
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
{
    "behaviourId": "CmsDeleteRoomset",
    "page": {
        "label": "Delete Roomset",
        "back": "roomsets/index/",
        "backdescription": "Roomsets",
        "messages": [{
            "message": "DeleteRoomset",
            "behaviourId": "CmsListRoomset",
            "trigger": "submit",
            "success": "redirect:/roomsets/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteSiteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the roomset <strong><%=App.data.roomset.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Site ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "roomset.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "Roomset",
            "ServiceType": "WalkerGreenbank.Modules.Hotspots.Services.IRoomsetService, WalkerGreenbank.Modules",
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
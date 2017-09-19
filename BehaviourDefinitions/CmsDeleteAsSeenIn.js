{
    "behaviourId": "CmsDeleteAsSeenIn",
    "page": {
        "label": "Delete As Seen In Item",
        "back": "asseenin/index/",
        "backdescription": "as seen in",
        "messages": [{
            "message": "DeleteAsSeenIn",
            "behaviourId": "CmsListAsSeenIn",
            "trigger": "submit",
            "success": "redirect:/asseenin/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteAsSeenInContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the as seen in item <strong><%=App.data.asseeninitem.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "asseeninitem.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "asseeninitem",
            "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "AsSeenInItemId": "id"
            }
        }]
    }
}
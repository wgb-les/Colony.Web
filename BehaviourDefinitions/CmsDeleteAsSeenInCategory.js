{
    "behaviourId": "CmsDeleteAsSeenInCategory",
    "page": {
        "label": "Delete As Seen In Category",
        "back": "asseenincategories/index/",
        "backdescription": "As Seen In Categories",
        "messages": [{
            "message": "DeleteAsSeenInCategory",
            "behaviourId": "CmsListAsSeenInCategory",
            "trigger": "submit",
            "success": "redirect:/asseenincategories/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteAsSeenInContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the as seen in category <strong><%=App.data.asseenincategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "asseenincategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "asseenincategory",
            "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInCategoryService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "AsSeenInCategoryID": "id"
            }
        }]
    }
}
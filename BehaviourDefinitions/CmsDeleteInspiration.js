{
    "behaviourId": "CmsDeleteInspiration",
    "page": {
        "label": "Delete Inspiration",
        "back": "inspiration/index/?siteId=<%=App.data.inspiration.siteId%>",
        "backdescription": "Inspiration",
        "messages": [{
            "message": "DeleteInspiration",
            "behaviourId": "CmsListInspiration",
            "trigger": "submit",
            "success": "redirect:/inspiration/index/?siteId=<%=App.data.inspiration.siteId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteInspirationContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the inspiration item <strong><%=App.data.inspiration.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "inspiration.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "Inspiration",
            "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [
                { "Key": "Id", "Value": 1 }
            ]
        }]
    }
}
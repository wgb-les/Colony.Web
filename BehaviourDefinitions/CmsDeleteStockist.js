{
    "behaviourId": "CmsDeleteStockist",
    "page": {
        "label": "Delete Stockist",
        "back": "stockists/index/",
        "backdescription": "Stockist management",
        "messages": [{
            "message": "DeleteStockist",
            "behaviourId": "CmsListStockist",
            "trigger": "submit",
            "success": "redirect:/stockists/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the stockist <strong><%=App.data.stockist.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "stockist.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "stockist",
            "ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStockistService, Colony.Commerce.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "BlogID": "id"
            }
        }]
    }
}
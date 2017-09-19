{
    "behaviourId": "CmsDeleteShop",
    "page": {
        "label": "Delete Shop",
        "back": "shops/index/",
        "backdescription": "Shops",
        "messages": [{
            "message": "DeleteShop",
            "behaviourId": "CmsListShop",
            "trigger": "submit",
            "success": "redirect:/shops/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the shop <strong><%=App.data.shop.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "shop.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "shop",
            "ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
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
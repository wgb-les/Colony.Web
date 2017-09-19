{
    "behaviourId": "CmsDeleteSkuAttribute",
    "page": {
        "label": "Delete Stock Attribute",
        "back": "skuattributes/index/",
        "backdescription": "Stock Attributes",
        "messages": [{
            "message": "DeleteSkuAttribute",
            "behaviourId": "CmsListSkuAttribute",
            "trigger": "submit",
            "success": "redirect:/skuattributes/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteSkuContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the stock attribute <strong><%=App.data.sku.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "sku.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
     "data": {
         "execute": [{
             "name": "sku",
             "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributesService, Colony.Commerce.Services",
             "ServiceMethod": "GetById",
             "ServiceMethodParams": [{
                 "Key": "id",
                 "Value": 1
             }],
             "map": [{
                 "Name": "name",
                 "BlogID": "id"
             }]
         }]
     }
}
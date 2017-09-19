{
    "behaviourId": "CmsDeleteSkuGroup",
    "page": {
        "label": "Delete Stock Item Group",
        "back": "skugroups/index/",
        "backdescription": "Stock Management",
        "messages": [{
            "message": "DeleteSkuGroup",
            "behaviourId": "CmsListSkuGroup",
            "trigger": "submit",
            "success": "redirect:/skugroups/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteSkuContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the stock item group <strong><%=App.data.sku.name%></strong>?  This action cannot be undone.</p>"
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
             "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuGroupsService, Colony.Commerce.Services",
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
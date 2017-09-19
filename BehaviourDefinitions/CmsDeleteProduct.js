{
    "behaviourId": "CmsDeleteProduct",
    "page": {
        "label": "Delete Product",
        "back": "#/products/index/?productCategoryId=<%=App.data.product.productCategoryId%>",
        "backdescription": "Products",
        "messages": [{
            "message": "DeleteProduct",
            "behaviourId": "CmsListProduct",
            "trigger": "submit",
            "success": "redirect:/products/index/?productCategoryId=<%=App.data.product.productCategoryId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the product <strong><%=App.data.product.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "product.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "product",
            "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [
                {"Key": "Id", "Value": 1 }
            ]
        }]
    }
}
{
    "behaviourId": "CmsDeleteProductCategory",
    "page": {
        "label": "Delete Product Category",
        "back": "#/productcategories/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "Product Categories",
        "messages": [{
            "message": "DeleteProductCategory",
            "behaviourId": "CmsListProductCategory",
            "trigger": "submit",
            "success": "redirect:/productcategories/index/?siteId=<%=App.Colony.currentSiteId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the product category <strong><%=App.data.productcategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "productcategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "productcategory",
            "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [
                {"Key": "Id", "Value": 1 }
            ]
        }]
    }
}
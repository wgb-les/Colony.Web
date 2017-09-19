{
    "behaviourId": "CmsDeleteProductCategoryImage",
    "page": {
        "label": "Delete Product Category Image",
        "back": "#/productcategories/images/?productCategoryId=<%=App.data.productcategoryimage.productCategoryID%>",
        "backdescription": "Product Category Images",
        "messages": [{
            "message": "DeleteProductCategoryImage",
            "behaviourId": "CmsListProductCategoryImage",
            "trigger": "submit",
            "success": "redirect:/productcategories/images/?productCategoryId=<%=App.data.productcategoryimage.productCategoryID%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the product category image <strong><%=App.data.productcategoryimage.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "productcategoryimage.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "productcategoryimage",
            "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
            "ServiceMethod": "GetImage",
            "ServiceMethodParams": [
                {"Key": "productCategoryId", "Value": 1 },
                {"Key": "imageAssetId", "Value": 1 }
            ]
        }]
    }
}
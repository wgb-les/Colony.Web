{
    "behaviourId": "CmsDeleteHomepageItemProduct",
    "page": {
        "label": "Delete Homepage Item Product",
        "back": "/homepageitemproducts/edit/?featuredItemId=<%=App.QueryString['featuredItemId']%>&siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "products",
        "messages": [{
            "message": "DeleteProduct",
            "behaviourId": "CmsListHomepageItem",
            "trigger": "submit",
            "success": "redirect:/homepageitemproducts/edit/?featuredItemId=<%=App.QueryString['featuredItemId']%>&siteId=<%=App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteFeaturedItemProduct",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the product <strong><%=App.data.featureditemproduct.name%></strong> from the homepage?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Featured Item ID",
            "type": "hidden",
            "componentId": "FeaturedItemId",
            "map": [{
                "friendlyName": "Value",
                "source": "featureditemproduct.featuredItemId"
            }]
        }, {
            "label": "Product ID",
            "type": "hidden",
            "componentId": "ProductId",
            "map": [{
                "friendlyName": "Value",
                "source": "featureditemproduct.productId"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "featureditemproduct",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetProductById",
            "ServiceMethodParams": [{
                "Key": "featuredItemId",
                "Value": 1
            },
            {
                "Key": "skuID",
                "Value": 1
            },
            {
                "Key": "siteId",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FeaturedItemID": "id"
            }
        }]
    }
}
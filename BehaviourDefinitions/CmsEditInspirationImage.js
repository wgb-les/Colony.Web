{
	"behaviourId": "CmsEditInspirationImage",
	"page": {
		"label": "Edit Inspiration Image",
		"back": "#/inspirationimages/index/?inspirationId=<%=App.QueryString['inspirationId']%>",
		"backdescription": "Inspiration Images",
		"messages": [{
			"message": "EditInspirationImage",
			"behaviourId": "CmsListInspiration",
			"trigger": "submit",
			"success": "redirect:/inspirationimages/index/?inspirationId=<%=App.QueryString['inspirationId']%>"
		}]
	},
	"componentContainer": [
		{
			"label": "",
			"type": "fieldset",
			"componentId": "BasicDetailsFieldset",
			"className": "half",
			"components": [
                {
                    "label": "InspirationId",
                    "type": "hidden",
                    "componentId": "InspirationId",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "inspirationimage.inspirationId"
                    }]
                }, {
                    "label": "Order",
                    "type": "hidden",
                    "componentId": "Order",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "inspirationimage.order"
                    }]
                }, {
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "inspirationimage.imageAssetID"
                    }]
                }, {
					"label": "Type",
					"type": "dropdown",
					"componentId": "Type",
					"items": [
                        {"id": "1", "name": "Carousel"},
                        {"id": "2", "name": "Gallery"}
					],
					"map": [{
						"friendlyName": "Value",
						"source": "inspirationimage.type"
					}],
					"validation": {
					    "required": true
					}
                },
                {
                    "label": "Collection",
                    "type": "dropdown",
                    "componentId": "ProductCategoryId",
                    "dataCollection": "productcategories",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "inspirationimage.productCategoryId"
                    }]
                }
			]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
    "data": {
        "execute": [{
            "name": "Inspirationimage",
            "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImageById",
            "ServiceMethodParams": [
                { "Key": "inspirationId", "Value": 1 },
                { "Key": "imageAssetId", "Value": 1 }
            ]
        }, {
            "name": "productcategories",
            "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}
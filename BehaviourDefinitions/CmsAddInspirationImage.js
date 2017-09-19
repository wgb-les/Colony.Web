{
	"behaviourId": "CmsAddInspirationImage",
	"page": {
		"label": "Add Inspiration Image",
		"back": "#/inspirationimages/index/?inspirationId=<%=App.QueryString['inspirationId']%>",
		"backdescription": "Inspiration Images",
		"messages": [{
			"message": "AddInspirationImage",
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
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "inspirationimage.imageAssetId"
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
					}]
                }, {
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
            "name": "productcategories",
            "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}
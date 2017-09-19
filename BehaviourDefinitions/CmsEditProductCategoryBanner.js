{
    "behaviourId": "CmsEditProductCategoryBanner",
	"page": {
		"label": "Edit Product Category Banner",
		"back": "#/productcategories/edit/?siteId=<%=App.Colony.currentSiteId%>&id=<%=App.QueryString['productCategoryId'] %>",
		"backdescription": "Product Category Banner",
		"messages": [{
			"message": "EditProductCategoryBanner",
			"behaviourId": "CmsListProductCategory",
			"trigger": "submit",
			"success": "redirect:/productcategories/edit/?siteId=<%=App.Colony.currentSiteId%>&id=<%=App.QueryString['productCategoryId'] %>"
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
					"label": "Banner HTML",
					"type": "richtext",
					"componentId": "BannerHtml",
					"map": [{
						"friendlyName": "Value",
						"source": "banner.bannerHtml"
					}],
					"validation": {
						"required": true
					}
				}, {
				    "label": "SKU Attribute Option ID",
				    "type": "number",
				    "componentId": "SkuAttributeOptionId",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "banner.skuAttributeOptionId"
				    }],
				    "validation": {
				        "required": true
				    }
				}, {
					"label": "Should this banner be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "banner.isVisible",
						"default": "true"
					}]
				}, {
				    "label": "Save",
				    "type": "button",
				    "componentId": "SaveButton"
				}
			]
		}
	],
	"data": {
		"execute": [{
			"name": "banner",
			"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
			"ServiceMethod": "GetBanner",
			"ServiceMethodParams": [
				{"Key": "ProductCategoryId", "Value": 1 }
			]
		}]
	}
}
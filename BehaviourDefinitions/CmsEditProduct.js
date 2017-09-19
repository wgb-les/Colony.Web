{
	"behaviourId": "CmsEditProduct",
	"page": {
		"label": "Edit Product",
		"back": "#/products/index/?productCategoryId=<%=App.data.product.productCategoryId%>",
		"backdescription": "Products",
		"messages": [{
			"message": "EditProduct",
			"behaviourId": "CmsListProduct",
			"trigger": "submit",
			"success": "redirect:/products/index/?productCategoryId=<%=App.data.product.productCategoryId%>"
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
					"label": "Title",
					"type": "text",
					"helptext": "Leave this field blank to inherit from the associated stock item",
					"componentId": "Name",
					"map": [{
						"friendlyName": "Value",
						"source": "product.name"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				}, {
					"label": "Short Description",
					"type": "textarea",
					"helptext": "Leave this field blank to inherit from the associated stock item",
					"componentId": "ShortDescription",
					"map": [{
						"friendlyName": "Value",
						"source": "product.shortDescription"
					}],
					"validation": {
						"required": true,
						"maxlength": 512
					}
				}, {
					"label": "Should this product be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "product.isVisible",
						"default": "true"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "product.uri"
					}]
				}
			]
		},
		{
			"label": "",
			"type": "fieldset",
			"componentId": "BasicDetailsFieldset2",
			"className": "half",
			"components": [{
				"label": "Long Description",
				"type": "richtext",
				"helptext": "Leave this field blank to inherit from the associated stock item",
				"componentId": "LongDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "product.longDescription"
				}],
				"validation": {
					"required": true
				}
			},
			{
				"label": "Specification",
				"type": "richtext",
				"helptext": "Leave this field blank to inherit from the associated stock item",
				"componentId": "Specification",
				"map": [{
					"friendlyName": "Value",
					"source": "product.specification"
				}]
			},
			{
				"label": "Further Info",
				"type": "richtext",
				"helptext": "Leave this field blank to inherit from the associated stock item",
				"componentId": "FurtherInfo",
				"map": [{
					"friendlyName": "Value",
					"source": "product.furtherInfo"
				}]
			},
			{
				"label": "In which category should this product be displayed",
				"type": "dropdown",
				"componentId": "ProductCategoryId",
				"dataCollection": "productcategories",
				"map": [{
					"friendlyName": "Value",
					"source": "product.productCategoryId"
				}]
			}, {
			    "label": "Analytics Code",
			    "type": "textarea",
			    "componentId": "AnalyticsCode",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "product.analyticsCode"
			    }],
			    "validation": {
			        "maxlength": 512
			    }
			}]
		}, {
			"label": "Product ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "product.id"
			}]
		}, {
		    "label": "Sku ID",
		    "type": "hidden",
		    "componentId": "SkuId",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "product.skuId"
		    }]
		}, {
		    "label": "Sku Group ID",
		    "type": "hidden",
		    "componentId": "SkuGroupId",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "product.skuGroupId"
		    }]
		}, {
		    "label": "Sku Bundle ID",
		    "type": "hidden",
		    "componentId": "SkuBundleId",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "product.skuBundleId"
		    }]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
			"name": "product",
			"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [
				{"Key": "Id", "Value": 1 }
			]
		}, {
			"name": "productcategories",
			"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
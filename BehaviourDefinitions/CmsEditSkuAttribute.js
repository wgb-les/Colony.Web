{
	"behaviourId": "CmsEditSkuAttribute",
	"page": {
		"label": "Edit Stock Attribute",
		"back": "#/skuattributes/index",
		"backdescription": "Stock Attributes",
		"messages": [{
			"message": "EditSkuAttribute",
			"behaviourId": "CmsListSkuAttribute",
			"trigger": "submit",
			"success": "redirect:/skuattributes/index"
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
					"componentId": "Name",
					"map": [{
						"friendlyName": "Value",
						"source": "skuattribute.name"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				}, {
					"label": "Code",
					"type": "text",
					"componentId": "Code",
					"map": [{
						"friendlyName": "Value",
						"source": "skuattribute.code"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				}, {
					"label": "Attribute Type",
					"type": "dropdown",
					"componentId": "Type",
					"map": [{
						"friendlyName": "Value",
						"source": "skuattribute.type",
						"default": "1"
					}],
					"items": [
						{"id": "1", "name": "Text" },
						{"id": "2", "name": "Multi-select" }
					],
					"validation": {
						"required": true
					}
				}
			]
		},
		{
			"label": "",
			"type": "fieldset",
			"componentId": "BasicDetailsFieldset2",
			"className": "half",
			"components": [{
				"label": "Is this attribute searchable",
				"type": "yesno",
				"componentId": "DisplayInSearch",
				"map": [{
					"friendlyName": "Value",
					"source": "skuattribute.displayInSearch"
				}]
			}, {
				"label": "Should this attribute be displayed on the product page",
				"type": "yesno",
				"componentId": "DisplayOnProduct",
				"map": [{
					"friendlyName": "Value",
					"source": "skuattribute.displayOnProduct"
				}]
			}, {
				"label": "Is this attribute mutually exclusive",
				"type": "yesno",
				"componentId": "MutuallyExclusive",
				"map": [{
					"friendlyName": "Value",
					"source": "skuattribute.mutuallyExclusive"
				}]
			}, {
				"label": "Is this attribute a range value",
				"type": "yesno",
				"componentId": "IsRange",
				"map": [{
					"friendlyName": "Value",
					"source": "skuattribute.isRange"
				}]
			}]
		}, {
			"label": "Sku ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "skuattribute.id"
			}]
		}, {
			"label": "SearchOrder",
			"type": "hidden",
			"componentId": "SearchOrder",
			"map": [{
				"friendlyName": "Value",
				"source": "skuattribute.searchOrder"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
			"name": "skuattribute",
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
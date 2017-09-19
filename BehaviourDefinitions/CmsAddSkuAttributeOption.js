{
	"behaviourId": "CmsAddSkuAttributeOption",
	"page": {
		"label": "Add Stock Attribute Option",
		"back": "#/skuattributeoptions/index/?id=<%=App.QueryString['skuAttributeOptionId']%>",
		"backdescription": "Stock Attributes",
		"messages": [{
			"message": "AddSkuAttributeOption",
			"behaviourId": "CmsListSkuAttributeOption",
			"trigger": "submit",
			"success": "redirect:/skuattributeoptions/index/?id=<%=App.QueryString['skuAttributeOptionId']%>"
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
				}
			]
		}, {
			"label": "Sku Attribute Option ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "skuattribute.id"
			}]
		}, {
		    "label": "Sku Attribute ID",
		    "type": "hidden",
		    "componentId": "SkuAttributeID",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "skuattribute.skuAttributeID",
                "default": "<%=App.QueryString['skuAttributeId']%>"
		    }]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "skuattribute.order"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}]
}
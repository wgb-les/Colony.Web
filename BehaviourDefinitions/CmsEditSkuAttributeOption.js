{
	"behaviourId": "CmsEditSkuAttributeOption",
	"page": {
		"label": "Edit Stock Attribute Option",
		"back": "#/skuattributeoptions/index/?id=<%=App.data.skuattributeoption['skuAttributeID']%>",
		"backdescription": "Stock Attribute Options",
		"messages": [{
			"message": "EditSkuAttributeOption",
			"behaviourId": "CmsListSkuAttributeOption",
			"trigger": "submit",
			"success": "redirect:/skuattributeoptions/index/?id=<%=App.data.skuattributeoption['skuAttributeID']%>"
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
						"source": "skuattributeoption.name"
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
						"source": "skuattributeoption.code"
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
				"source": "skuattributeoption.id"
			}]
		}, {
			"label": "Sku Attribute ID",
			"type": "hidden",
			"componentId": "SkuAttributeID",
			"map": [{
				"friendlyName": "Value",
				"source": "skuattributeoption.skuAttributeID",
				"default": "<%=App.QueryString['skuAttributeID']%>"
			}]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "skuattributeoption.order"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
			"name": "skuattributeoption",
			"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributeOptionsService, Colony.Commerce.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [
				{ "Key": "Id", "Value": 0 }
			]
		}]
	}
}
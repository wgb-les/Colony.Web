{
	"behaviourId": "CmsAddSkuSkuAttribute",
	"page": {
		"label": "Set Stock Item Attributes",
		"back": "#/stock/index/",
		"backdescription": "Stock Management"
	},
	"componentContainer": [
		{
			"label": "",
			"type": "tablist",
			"componentId": "SkuTabs",
			"actions": [{
				"icon": "pencil",
				"url": "/stock/edit/?id=<%=App.QueryString['skuId']%>",
				"name": "Edit Stock Item"
			}]
		}, 
		{
			"label": "Sku Attributes",
			"type": "skuattributes",
			"componentId": "SkuAttributes",
			"map": [{
				"friendlyName": "Value",
				"source": ""
			}]
		}],
	"data": {
	"execute": [{
		"name": "skuAttributes",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributesService, Colony.Commerce.Services",
		"ServiceMethod": "GetAll"
	}, {
		"name": "skuSkuAttribute",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuService, Colony.Commerce.Services",
		"ServiceMethod": "GetAttributesForSkuBySkuId",
		"ServiceMethodParams": [
			{"Key": "skuId", "Value": 0 }
		]
	}]
	}

}
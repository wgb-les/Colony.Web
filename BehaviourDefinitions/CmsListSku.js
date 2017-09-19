{
	"behaviourId": "CmsListSku",
	"messageHandlers": [{
		"Name": "EditSku",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddSku",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteSku",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "SearchSku",
	    "ReturnName": "sku",
	    "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuService, Colony.Commerce.Services",
	    "ServiceMethod": "CmsSearch",
	    "ServiceMethodParams": [
			{"Key": "searchCriteria", "Value": "", "IsDynamic": true }
	    ]
	}, {
        "Name": "DeleteBatch",
        "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuService, Colony.Commerce.Services",
        "ServiceMethod": "DeleteBatch",
        "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	]
}],
	"page": {
		"label": "Stock Management"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "SkuTabs",
		"actions": [{
			"icon": "plus",
			"url": "/stock/add/",
			"name": "Add Stock Item"
		},{
		    "icon": "align-justify",
		    "url": "/skugroups/index/",
		    "name": "Manage Stock Item Groups"
		},{
		    "icon": "align-justify",
		    "url": "/skubundles/index/",
		    "name": "Manage Stock Item Bundles"
		},{
		    "icon": "list-alt",
		    "url": "/skuattributes/index/",
		    "name": "Manage Stock Attributes"
		}]
	}, {
	    "label": "Search",
	    "type": "searchform",
	    "components": [
			{
			    "label": "keywords",
			    "type": "fieldset",
			    "componentId": "keywordsFieldset",
			    "className": "half",
			    "components": [
					{
					    "label": "Enter keywords (product code or SKU name)",
					    "componentId": "Keywords",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.keywords" }
					    ],
					    "validation": {
					        "required": true
					    }
					}
			    ]
			}
	    ],
	    "messages": [
			{
			    "message": "SearchSku",
			    "behaviourId": "CmsListSku",
			    "Trigger": "submitSearch"
			}
	    ]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "SkuList",
		"dataCollection": "sku",
		"map": [{
		    "friendlyName": "Product Code",
		    "source": "code"
		}, {
		    "friendlyName": "Stock Level",
		    "source": "stockLevel"
		}, {
		    "friendlyName": "Visible",
		    "source": "<%=(isVisible) ? 'Visible' : 'Not Visible'%>"
		}, {
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/stock/edit/?id=<%=id%>",
			"name": "Edit this Stock Item"
		}, {
		    "icon": "list-alt",
		    "url": "/edit/#/skuskuattributes/edit/?skuId=<%=id%>",
		    "name": "Edit attributes for this Stock Item"
		}, {
			"icon": "remove",
			"name": "Delete this Stock Item",
			"url": "/edit/#/stock/delete/?id=<%=id%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteBatch",
		        "behaviourId": "CmsListSku"
		    }]
		}]
	}]
}
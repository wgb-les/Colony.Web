{
	"behaviourId": "CmsListSkuAttribute",
	"messageHandlers": [{
		"Name": "EditSkuAttribute",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributesService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddSkuAttribute",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributesService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteSkuAttribute",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributesService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	},
	{
	    "Name": "DeleteBatch",
	    "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributesService, Colony.Commerce.Services",
	    "ServiceMethod": "DeleteBatch",
	    "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	    ]
	}],
	"page": {
		"label": "Stock Attributes"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "SkuTabs",
		"actions": [{
			"icon": "plus",
			"url": "/stock/add/",
			"name": "Add Stock Attribute"
		},{
		    "icon": "align-justify",
		    "url": "/stock/index/",
		    "name": "Manage Stock Items"
		},{
		    "icon": "align-justify",
		    "url": "/skugroups/index/",
		    "name": "Manage Stock Item Groups"
		},{
		    "icon": "align-justify",
		    "url": "/skubundles/index/",
		    "name": "Manage Stock Item Bundles"
        }]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "SkuList",
		"dataCollection": "sku",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/skuattributes/edit/?id=<%=id%>",
			"name": "Edit this Stock Attribute"
		}, {
		    "icon": "align-justify",
		    "name": "Manage options for this Stock Attribute",
		    "url": "/edit/#/skuattributeoptions/index/?id=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this Stock Attribute",
			"url": "/edit/#/skuattributes/delete/?id=<%=id%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteBatch",
		        "behaviourId": "CmsListSkuAttribute"
		    }]
		}]
	}],
	"data": {
		"execute": [{
			"name": "sku",
			"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributesService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
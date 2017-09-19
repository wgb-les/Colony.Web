{
	"behaviourId": "CmsListSkuGroup",
	"messageHandlers": [{
		"Name": "EditSkuGroup",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuGroupsService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddSkuGroup",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuGroupsService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteSkuGroup",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuGroupsService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	},
	{
	    "Name": "DeleteBatch",
	    "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuGroupsService, Colony.Commerce.Services",
	    "ServiceMethod": "DeleteBatch",
	    "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	    ]
	}],
	"page": {
		"label": "Stock Item Groups"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "SkuTabs",
		"actions": [{
			"icon": "plus",
			"url": "/skugroups/add/",
			"name": "Add Stock Item Group"
		},{
		    "icon": "align-justify",
		    "url": "/stock/index/",
		    "name": "Manage Stock Items"
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
		"label": "",
		"type": "datatable",
		"componentId": "SkuList",
		"dataCollection": "sku",
		"map": [{
		    "friendlyName": "Product Code",
		    "source": "code"
		}, {
		    "friendlyName": "Visible",
		    "source": "<%=(isVisible) ? 'Visible' : 'Not Visible'%>"
		}, {
		    "friendlyName": "Name",
		    "source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/skugroups/edit/?id=<%=id%>",
			"name": "Edit this Stock Item Group"
		}, {
			"icon": "remove",
			"name": "Delete this Stock Item Group",
			"url": "/edit/#/skugroups/delete/?id=<%=id%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteBatch",
		        "behaviourId": "CmsListSkuGroup"
		    }]
		}]
	}],
	"data": {
		"execute": [{
			"name": "sku",
			"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuGroupsService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
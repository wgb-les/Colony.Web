{
	"behaviourId": "CmsListShop",
	"messageHandlers": [{
		"Name": "EditShop",
		"ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddShop",
		"ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteShop",
		"ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "DeleteBatch",
	    "ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
	    "ServiceMethod": "DeleteBatch",
	    "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	    ]
	}],
	"page": {
		"label": "Shops"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "ShopTabs",
		"actions": [{
			"icon": "plus",
			"url": "/shops/add/",
			"name": "Add Shop"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "ShopList",
		"dataCollection": "shop",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/shops/edit/?id=<%=id%>",
			"name": "Edit this Shop"
		}, {
			"icon": "remove",
			"name": "Delete this Shop",
			"url": "/edit/#/shops/delete/?id=<%=id%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteBatch",
		        "behaviourId": "CmsListShop"
		    }]
		}]
	}],
	"data": {
		"execute": [{
			"name": "shop",
			"ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
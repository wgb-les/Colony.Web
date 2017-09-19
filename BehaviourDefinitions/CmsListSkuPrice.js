{
	"behaviourId": "CmsListSkuPrice",
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
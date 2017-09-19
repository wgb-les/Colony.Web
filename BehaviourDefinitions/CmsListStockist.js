{
	"behaviourId": "CmsListStockist",
	"messageHandlers": [{
		"Name": "EditStockist",
		"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStockistService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddStockist",
		"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStockistService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteStockist",
		"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStockistService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
		"Name": "SearchStockist",
		"ReturnName": "stockist",
		"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStockistService, Colony.Commerce.Services",
		"ServiceMethod": "CmsSearch",
		"ServiceMethodParams": [
			{"Key": "searchCriteria", "Value": "", "IsDynamic": true }
		]
	},
	{
	    "Name": "DeleteBatch",
	    "ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStockistService, Colony.Commerce.Services",
	    "ServiceMethod": "DeleteBatch",
	    "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	    ]
	}],
	"page": {
		"label": "Stockist Management"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "StockistTabs",
		"actions": [{
			"icon": "plus",
			"url": "/stockists/add/",
			"name": "Add Stockist"
		}, {
			"icon": "globe",
			"url": "/countries/index/",
			"name": "Manage Countries/Regions"
		}, {
			"icon": "map-marker",
			"url": "/states/index/",
			"name": "Manage US States/Territories"
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
						"label": "Enter keywords",
						"componentId": "Keywords",
						"type": "text",
						"map": [
							{"friendlyName": "value", "source": "cache.keywords" }
						]
					},
					{
						"label": "Filter by shop",
						"componentId": "ShopID",
						"type": "dropdown",
						"dataCollection": "shop"
					},
					{
						"label": "Filter by geo-coding result",
						"componentId": "NonGeocodedStockists",
						"type": "dropdown",
						"items": [
						{"id": "1", "name": "Stockists without geo-coding information" },
						{"id": "0", "name": "Stockists with geo-coding information" }
						]
					}
				]
			},{
			    "label": "fields",
			    "type": "fieldset",
			    "componentId": "fieldFieldset",
			    "className": "half",
			    "components": [
					{
					    "label": "Enter name",
					    "componentId": "Name",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.name" }
					    ]
					},{
					    "label": "County",
					    "componentId": "County",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.county" }
					    ]
					},{
					    "label": "Country",
					    "componentId": "Country",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.country" }
					    ]
					},{
					    "label": "Postcode",
					    "componentId": "Postcode",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.postcode" }
					    ]
					}

					
			    ]
			}
		],
		"messages": [
			{
				"message": "SearchStockist",
				"behaviourId": "CmsListStockist",
				"Trigger": "submitSearch"
			}
		]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "StockistList",
		"dataCollection": "stockist",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"csvMap": [{
		    "friendlyName": "Company Name",
			"source": "name"
		},{
			"friendlyName": "Telephone Number",
			"source": "telephoneNumber"
		},{
			"friendlyName": "Email",
			"source": "email"
		},{
			"friendlyName": "Address",
			"source": "address1"
		},{
			"friendlyName": "Postcode",
			"source": "postcode"
		},{
			"friendlyName": "do they sell fabrics",
			"source": "sellsFabric"
		},{
			"friendlyName": "do they sell wallpaper",
			"source": "sellsWallpaper"
		},{
			"friendlyName": "do they sell paint",
			"source": "sellsPaint"
		},{
			"friendlyName": "do they sell trimmings",
			"source": "sellsTrimmings"
		},{
			"friendlyName": "do they sell rugs",
			"source": "sellsRugs"
		},{
			"friendlyName": "do they sell home accessories",
			"source": "sellsHomeAccessories"
		},{
			"friendlyName": "do they sell furniture",
			"source": "sellsFurniture"
		}
		],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/stockists/edit/?id=<%=id%>",
			"name": "Edit this Stockist"
		}, {
			"icon": "remove",
			"name": "Delete this Stockist",
			"url": "/edit/#/stockists/delete/?id=<%=id%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteBatch",
		        "behaviourId": "CmsListStockist"
		    }]
		}]
	}],
	"data": {
		"execute": [{
			"name": "shop",
			"ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
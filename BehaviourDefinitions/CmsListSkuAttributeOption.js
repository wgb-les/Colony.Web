{
	"behaviourId": "CmsListSkuAttributeOption",
	"messageHandlers": [{
		"Name": "EditSkuAttributeOption",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributeOptionsService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddSkuAttributeOption",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributeOptionsService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteSkuAttributeOption",
		"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributeOptionsService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "UpdateOrder",
	    "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributeOptionsService, Colony.Commerce.Services",
	    "ServiceMethod": "UpdateOrder",
	    "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
	    ]
	},
    {
        "Name": "DeleteBatch",
        "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributeOptionsService, Colony.Commerce.Services",
        "ServiceMethod": "DeleteBatch",
        "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
        ]
    }
	],
	"page": {
	    "label": "Stock Attribute Options",
	    "back": "/skuattributes/index/",
        "backdescription": "Stock Attributes"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "SkuTabs",
		"actions": [{
			"icon": "plus",
			"url": "/skuattributeoptions/add/",
			"name": "Add Stock Attribute Option"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "SkuList",
		"dataCollection": "skuattributeoption",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/skuattributeoptions/edit/?id=<%=id%>",
			"name": "Edit this Stock Attribute Option"
		}, {
			"icon": "remove",
			"name": "Delete this Stock Attribute Option",
			"url": "/edit/#/skuattributeoptions/delete/?id=<%=id%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteBatch",
		        "behaviourId": "CmsListSkuAttributeOption"
		    }]
		}],
		"messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListSkuAttributeOption",
                "trigger": "UpdateOrder"
            }
		]
	}],
	"data": {
		"execute": [{
			"name": "skuattributeoption",
			"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuAttributeOptionsService, Colony.Commerce.Services",
			"ServiceMethod": "GetBySkuAttributeId",
			"ServiceMethodParams": [
                { "Key": "Id", "Value": 0 }
			]
		}]
	}
}
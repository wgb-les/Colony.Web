{
	"behaviourId": "CmsListState",
	"messageHandlers": [{
		"Name": "EditState",
		"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStateService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddState",
		"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStateService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteState",
		"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStateService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "DeleteBatch",
	    "ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStateService, Colony.Commerce.Services",
	    "ServiceMethod": "DeleteBatch",
	    "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	    ]
	}],
	"page": {
		"label": "US States and Territories",
		"back": "/stockists/index/",
		"backdescription": "Stockist Management"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "StateTabs",
		"actions": [{
			"icon": "plus",
			"url": "/states/add/",
			"name": "Add State"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "StateList",
		"dataCollection": "state",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/states/edit/?id=<%=id%>",
			"name": "Edit this State"
		}, {
			"icon": "remove",
			"name": "Delete this State",
			"url": "/edit/#/states/delete/?id=<%=id%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteBatch",
		        "behaviourId": "CmsListState"
		    }]
		}]
	}],
	"data": {
		"execute": [{
			"name": "state",
			"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStateService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
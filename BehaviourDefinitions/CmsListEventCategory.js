{
	"behaviourId": "CmsListEventCategory",
	"messageHandlers": [{
	    "Name": "EditEventCategory",
		"ServiceType": "Colony.Modules.Events.Services.IEventCategoriesService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddEventCategory",
	    "ServiceType": "Colony.Modules.Events.Services.IEventCategoriesService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteEventCategory",
	    "ServiceType": "Colony.Modules.Events.Services.IEventCategoriesService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "ListEventCategory",
	    "ServiceType": "Colony.Modules.Events.Services.IEventCategoriesService, Colony.Modules",
	    "ServiceMethod": "GetAll"
	}],
	"page": {
		"label": "Event Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "EventTabs",
		"actions": [{
			"icon": "plus",
			"url": "/eventcategories/add/",
			"name": "Add Event Category"
		}, {
		    "icon": "align-justify",
		    "url": "/events/index/?siteId=<%=App.Colony.currentSiteId%>&eventCategoryId=0",
		    "name": "List Root Level Events"
		}]
	}, {
		"label": "",
		"type": "treeview",
		"componentId": "EventList",
		"dataCollection": "eventcategories",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/eventcategories/edit/?id=<%=id%>",
			"name": "Edit this Event Category"
		}, {
		    "icon": "align-justify",
		    "name": "View Events for this Event Category",
		    "url": "/edit/#/events/index/?siteId=<%=App.Colony.currentSiteId%>&eventCategoryId=<%=id%>"
		}, {
		    "icon": "plus",
		    "name": "Add a child Event Category beneath this Event Category",
		    "url": "/edit/#/eventcategories/add/?parentId=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this Event Category",
			"url": "/edit/#/eventcategories/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "eventcategories",
			"ServiceType": "Colony.Modules.Events.Services.IEventCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
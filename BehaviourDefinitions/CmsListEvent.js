{
	"behaviourId": "CmsListEvent",
	"messageHandlers": [{
		"Name": "EditEvent",
		"ServiceType": "Colony.Modules.Events.Services.IEventsService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddEvent",
		"ServiceType": "Colony.Modules.Events.Services.IEventsService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteEvent",
	    "ServiceType": "Colony.Modules.Events.Services.IEventsService, Colony.Modules",
	    "ServiceMethod": "DeleteById",
	    "ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
	    ]
	}],
    "page": {
        "label": "Events",
        "back": "/eventcategories/index/",
        "backdescription": "Event Categories"
    },
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "EventTabs",
		"actions": [{
			"icon": "plus",
			"url": "/events/add/?siteId=<%=App.QueryString['siteId']%>&eventCategoryId=<%=App.QueryString['eventCategoryId']%>",
			"name": "Add Event"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "EventList",
		"dataCollection": "event",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/events/edit/?id=<%=id%>",
			"name": "Edit Event"
		}, {
		    "icon": "remove",
		    "name": "Delete this Event",
		    "url": "/edit/#/events/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "Event",
			"ServiceType": "Colony.Modules.Events.Services.IEventsService, Colony.Modules",
			"ServiceMethod": "GetForCms",
			"ServiceMethodParams": [
                {"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
                {"Key": "eventCategoryId", "Value": "<%=App.QueryString['eventCategoryId']%>" }
                
			],
			"map": [{
			    "Name": "name",
			    "BlogID": "id"
			}]
		}]
	}
}
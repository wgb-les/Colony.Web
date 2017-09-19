{
    "behaviourId": "CmsDeleteEvent",
    "page": {
        "label": "Delete Event",
        "back": "events/index/?siteId=<%=App.Colony.currentSiteId%>&eventCategoryId=<%=App.data.event.eventCategoryId || 0%>",
        "backdescription": "events",
        "messages": [{
            "message": "DeleteEvent",
            "behaviourId": "CmsListEvent",
            "trigger": "submit",
            "success": "redirect:/events/index/?siteId=<%=App.Colony.currentSiteId%>&eventCategoryId=<%=App.data.event.eventCategoryId || 0%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the event <strong><%=App.data.event.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "event.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "event",
            "ServiceType": "Colony.Modules.Events.Services.IEventsService, Colony.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "BlogID": "id"
            }
        }]
    }
}
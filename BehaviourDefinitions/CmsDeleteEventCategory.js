{
    "behaviourId": "CmsDeleteEventCategory",
    "page": {
        "label": "Delete Event Category",
        "back": "eventcategories/index/",
        "backdescription": "Event Categories",
        "messages": [{
            "message": "DeleteEventCategory",
            "behaviourId": "CmsListEventCategory",
            "trigger": "submit",
            "success": "redirect:/eventcategories/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteEventContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the event category <strong><%=App.data.eventcategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "eventcategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "eventcategory",
            "ServiceType": "Colony.Modules.Events.Services.IEventCategoriesService, Colony.Modules",
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
{
    "behaviourId": "CmsDeleteState",
    "page": {
        "label": "Delete State",
        "back": "states/index/",
        "backdescription": "US States and Territories",
        "messages": [{
            "message": "DeleteState",
            "behaviourId": "CmsListState",
            "trigger": "submit",
            "success": "redirect:/states/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the state <strong><%=App.data.state.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "state.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "state",
            "ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStateService, Colony.Commerce.Services",
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
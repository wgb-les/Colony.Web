{
    "behaviourId": "CmsDeleteVideoCategory",
    "page": {
        "label": "Delete Video Category",
        "back": "videocategories/index/",
        "backdescription": "Video Categories",
        "messages": [{
            "message": "DeleteVideoCategory",
            "behaviourId": "CmsListVideoCategory",
            "trigger": "submit",
            "success": "redirect:/videocategories/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteVideoContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the video category <strong><%=App.data.videocategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "videocategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "videocategory",
            "ServiceType": "Colony.Modules.Videos.Services.IVideoCategoriesService, Colony.Modules",
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
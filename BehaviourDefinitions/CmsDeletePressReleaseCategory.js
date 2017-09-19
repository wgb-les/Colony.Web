{
    "behaviourId": "CmsDeletePressReleaseCategory",
    "page": {
        "label": "Delete Press Release Category",
        "back": "blogcategories/index/",
        "backdescription": "Press Release Categories",
        "messages": [{
            "message": "DeletePressReleaseCategory",
            "behaviourId": "CmsListPressReleaseCategory",
            "trigger": "submit",
            "success": "redirect:/pressreleasecategories/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeletePressReleaseContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the press release category <strong><%=App.data.pressreleasecategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "pressreleasecategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "pressreleasecategory",
            "ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
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
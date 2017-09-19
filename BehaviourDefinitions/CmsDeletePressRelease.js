{
    "behaviourId": "CmsDeletePressRelease",
    "page": {
        "label": "Delete Press Release",
        "back": "#/pressreleases/index/?siteId=<%=App.Colony.currentSiteId%>&pressReleaseCategoryId=<%=App.data.pressRelease.pressReleaseCategoryId || 0 %>",
        "backdescription": "press releasess",
        "messages": [{
            "message": "DeletePressRelease",
            "behaviourId": "CmsListPressRelease",
            "trigger": "submit",
            "success": "redirect:/pressreleases/index/?siteId=<%=App.Colony.currentSiteId%>&pressReleaseCategoryId=<%=App.data.pressRelease.pressReleaseCategoryId || 0 %>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeletePressReleaseContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the press release <strong><%=App.data.pressRelease.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "pressRelease.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "pressRelease",
            "ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
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
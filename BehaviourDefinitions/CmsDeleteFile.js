{
    "behaviourId": "CmsDeleteFile",
    "page": {
        "label": "Delete File",
        "back": "files/index/",
        "backdescription": "File Library",
        "messages": [{
            "message": "DeleteFile",
            "behaviourId": "CmsListFile",
            "trigger": "submit",
            "success": "redirect:/files/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the file <strong><%=App.data.file.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "file.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "file",
            "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IFileAssetService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }]
        }]
    }
}
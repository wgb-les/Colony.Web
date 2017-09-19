{
    "behaviourId": "CmsEditFile",
    "page": {
        "label": "Edit File",
        "back": "files/index/",
        "backdescription": "File Library",
        "Messages": [{
            "Message": "EditFile",
            "BehaviourId": "CmsListFile",
            "Trigger": "submit",
            "success": "redirect:/files/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "DetailsFieldset",
            "className": "half",
            "components": [
                {
                    "label": "Name",
                    "type": "text",
                    "componentId": "Name",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "file.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Description",
                    "type": "text",
                    "componentId": "Description",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "file.description"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Tags",
                    "type": "tags",
                    "componentId": "Tags",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "file.tags"
                    }]
                }, {
                    "label": "File Asset ID",
                    "type": "hidden",
                    "componentId": "Id",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "file.id"
                    }]
                }, {
                    "label": "Filename",
                    "type": "hidden",
                    "componentId": "Filename",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "file.filename"
                    }]
                }
            ]
        }, {
        "label": "Save",
        "type": "button",
        "componentId": "SaveButton"
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
            }],
            "map": {
                "Name": "name",
                "ImageID": "id"
            }
        }]
    }
}
{
    "behaviourId": "CmsEditImage",
    "page": {
        "label": "Edit Image",
        "back": "images/index/",
        "backdescription": "Images",
        "Messages": [{
            "Message": "EditImage",
            "BehaviourId": "CmsListImage",
            "Trigger": "submit",
            "success": "redirect:/images/index/"
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
                    "label": "Image Name",
                    "type": "text",
                    "componentId": "Name",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "image.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Image Alt. Text (Description)",
                    "type": "text",
                    "componentId": "ImageAlt",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "image.imageAlt"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Tags",
                    "type": "tags",
                    "componentId": "Tags",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "image.tags"
                    }]
                }, {
                    "label": "Image Asset ID",
                    "type": "hidden",
                    "componentId": "Id",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "image.id"
                    }]
                }, {
                    "label": "Filename",
                    "type": "hidden",
                    "componentId": "Filename",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "image.filename"
                    }]
                }
            ]
        },
        {
            "label": "",
            "type": "fieldset",
            "className": "half",
            "componentId": "PreviewFieldset",
            "components": [
                {
                    "label": "Image",
                    "type": "imagepreview",
                    "componentId": "ImagePreview",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "image.filename"
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
            "name": "image",
            "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IImageAssetService, Colony.Services",
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
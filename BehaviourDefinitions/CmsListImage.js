{
    "behaviourId": "CmsListImage",
    "messageHandlers": [{
        "Name": "EditImage",
        "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IImageAssetService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteImage",
        "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IImageAssetService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Images"
    },
    "componentContainer": [{
        "label": "",
        "type": "imagelibrarygridview",
        "componentId": "ImageLibraryGridView",
        "behaviourId": "CmsListImage"
    }]
}
{
    "behaviourId": "CmsDeleteImage",
    "page": {
        "label": "Delete Image",
        "back": "images/index/",
        "backdescription": "Images",
        "messages": [{
            "message": "DeleteImage",
            "behaviourId": "CmsListImage",
            "trigger": "submit",
            "success": "redirect:/images/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the image <strong><%=App.data.image.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
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
{
    "behaviourId": "CmsListFile",
    "messageHandlers": [{
        "Name": "EditFile",
        "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IFileAssetService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddFile",
        "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IFileAssetService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteFile",
        "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IFileAssetService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "DeleteBatch",
        "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IFileAssetService, Colony.Services",
        "ServiceMethod": "DeleteBatch",
        "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
        ]
    }],
    "page": {
        "label": "File Library"
    },
    "componentContainer": [{
        "label": "Upload Files",
        "type": "file",
        "componentId": "Files",
        "map": [{
            "friendlyName": "Value",
            "source": "blog.author"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "FileList",
        "dataCollection": "file",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }, {
            "friendlyName": "File Name",
            "source": "filename"
        }, {
            "friendlyName": "File Size (Bytes)",
            "source": "fileSize"
        }, {
            "friendlyName": "MIME Type",
            "source": "type"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/files/edit/?id=<%=id%>",
            "name": "Edit this File"
        }, {
            "icon": "remove",
            "name": "Delete this File",
            "url": "/edit/#/files/delete/?id=<%=id%>"
        }],
        "batchactions": [{
            "icon": "remove",
            "name": "Delete",
            "messages": [{
                "message": "DeleteBatch",
                "behaviourId": "CmsListFile"
            }]
        }]
    }],
    "data": {
        "execute": [{
            "name": "file",
            "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IFileAssetService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}
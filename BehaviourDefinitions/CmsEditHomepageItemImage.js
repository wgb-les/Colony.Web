{
    "behaviourId": "CmsEditHomepageItemImage",
    "page": {
        "label": "Edit Homepage Item Images",
        "back": "#/homepageitems/edit/?siteId=<%=App.QueryString['siteId']%>&id=<%=App.QueryString['featuredItemId']%>",
        "backdescription": "Homepage Item",
        "messages": [{
            "message": "AddImage",
            "behaviourId": "CmsListHomepageItem",
            "trigger": "submit",
            "success": "redirect:/homepageitemimages/edit/?siteId=<%=App.QueryString['siteId']%>&featuredItemId=<%=App.QueryString['featuredItemId']%>"
        }]
    },
    "messageHandlers": [
        {
	    "Name": "UpdateOrder",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules.Homepage",
	    "ServiceMethod": "UpdateImageOrder",
	    "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 },
            { "Key": "featuredItemId", "Value": 0 }
	    ]
        }
    ],
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset",
            "components": [{
                    "label": "Images",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homepageitemimage.imageAssetId"
                    }]
            },
                    {
                        "label": "Image Type",
                        "type": "dropdown",
                        "componentId": "ImageType",
                        "map": [{
                            "friendlyName": "Value",
                            "source": "homepageitemimage.imageType"
                        }],
                        "items": [
                            {"id": "0", "name": "Full Bleed" },
                            {"id": "1", "name": "Gallery" },
                            {"id": "3", "name": "Style Library - Tile" },
                            {"id": "4", "name": "Style Library - Large" }
                        ],
                        "validation": {
                            "required": true
                        }
                    },
                    {
                        "label": "Crop Option",
                        "type": "dropdown",
                        "componentId": "CropOption",
                        "map": [{
                            "friendlyName": "Value",
                            "source": "homepageitemimage.cropOption"
                        }],
                        "items": [
                            {"id": "default", "name": "Default" },
                            {"id": "topLeft", "name": "Top Left" },
                            {"id": "topRight", "name": "Top Right" },
                            {"id": "bottomRight", "name": "Bottom Right" },
                            {"id": "bottomLeft", "name": "Bottom Left" },
                            {"id": "left", "name": "Left" },
                            {"id": "top", "name": "Top" },
                            {"id": "right", "name": "Right" },
                            {"id": "bottom", "name": "Bottom" },
                            {"id": "center", "name": "Center" }
                        ]
                    }
            ]
        },
        {
            "label": "Featured Item Id",
            "type": "hidden",
            "componentId": "FeaturedItemId",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.featuredItemId"
            }]
        }, {
            "label": "Type",
            "type": "hidden",
            "componentId": "Type",
            "map": [{
                "friendlyName": "Value",
                "source": "homepageitemimage.type",
                "default": "1"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "homepageitemimage.order"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        },
        {
            "label": "",
            "type": "datatable",
            "dataCollection": "homepageitemimages",
            "map": [{
                "friendlyName": "Name",
                "source": "name"
            },
            {
                "friendlyName": "Image Type",
                "source": "imageTypeDescription"
            },
            {
                "friendlyName": "Crop Option",
                "source": "cropOption"
            },
            {
                "friendlyName": "_ImageAssetID",
                "source": "imageAssetID"
            }],
            "actions": [
            {
                "icon": "remove",
                "name": "Delete this Homepage Item image",
                "url": "/edit/#/homepageitemimages/delete/?imageAssetId=<%=obj.attributes._ImageAssetID%>&featuredItemId=<%=App.QueryString.featuredItemId%>&siteId=<%=App.QueryString['siteId']%>"
            }],
    	    "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsEditHomepageItemImage",
                "trigger": "UpdateOrder"
            }
	    ]
        }],
    "data": {
        "execute": [{
            "name": "Languages",
            "ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
            "ServiceMethod": "GetAll"
        }, {
            "name": "Sites",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll"
        },
        {
            "name": "homepageitemimages",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImagesById",
            "ServiceMethodParams": [
                { "Key": "featureditemid", "Value": 1 }
            ],
            "map": {
                "Name": "name",
                "featureditemId": "id"
            }
    }]
    }
}
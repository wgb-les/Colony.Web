{
    "behaviourId": "CmsEditAsSeenIn",
    "page": {
        "label": "Edit As Seen In Item",
        "back": "/asseenin/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "as seen in",
        "messages": [{
            "Message": "EditAsSeenIn",
            "BehaviourId": "CmsListAsSeenIn",
            "Trigger": "submit",
            "success": "redirect:/asseenin/index/?siteId=<%=App.Colony.currentSiteId%>"
        }]
    },    
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset",
            "className": "half",
            "components": [
                {
                    "label": "Title",
                    "type": "text",
                    "componentId": "Name",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "asseeninitem.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Short Description",
                    "type": "textarea",
                    "componentId": "ShortDescription",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "asseeninitem.shortDescription"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "asseeninitem.imageAssetID"
                    }]
                }, {
                    "label": "URI",
                    "type": "text",
                    "componentId": "URI",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "asseeninitem.uri"
                    }]
                }, {
                    "label": "Tags",
                    "type": "tags",
                    "componentId": "Tags",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "asseeninitem.tags"
                    }]
                }, {
                    "label": "Should this item be visible on the front end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "asseeninitem.isVisible"
                    }]
                }
            ]
        },
        {
        "label": "",
        "type": "fieldset",
        "componentId": "BasicDetailsFieldset2",
        "className": "half",
        "components": [{
            "label": "Long Description",
            "type": "richtext",
            "componentId": "LongDescription",
            "map": [{
                "friendlyName": "Value",
                "source": "asseeninitem.longDescription"
            }],
            "validation": {
                "required": true
            }
        }, {
            "label": "On which Sites should this item appear",
            "type": "checkboxlist",
            "componentId": "SiteIds",
            "dataCollection": "sites",
            "map": [{
                "friendlyName": "Value",
                "source": "asseeninitem.siteIds",
                "default": "1"
            }]
        }, {
            "label": "Products",
            "type": "skus",
            "componentId": "Skus",
            "map": [{
                "friendlyName": "Value",
                "source": "<%=App.data.asseeninitem.skus.join(',')%>"
            }]
        }]
    }, {
        "label": "As Seen In Item ID",
        "type": "hidden",
        "componentId": "Id",
        "map": [{
            "friendlyName": "Value",
            "source": "asseeninitem.id"
        }]
    }, {
        "label": "Save",
        "type": "button",
        "componentId": "SaveButton"
    }],
    "data": {
        "execute": [{
            "name": "asseeninitem",
            "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "AsSeenInItemId": "id"
            }
        }, {
            "name": "Sites",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}
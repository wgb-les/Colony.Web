{
    "behaviourId": "CmsEditHomepageItemProduct",
    "page": {
        "label": "Edit Homepage Item Products",
        "back": "#/homepageitems/edit/?siteId=<%=App.QueryString['siteId']%>&id=<%=App.QueryString['featuredItemId']%>",
        "backdescription": "Homepage Item",
        "messages": [{
            "message": "AddProduct",
            "behaviourId": "CmsListHomepageItem",
            "trigger": "submit",
            "success": "redirect:/homepageitemproducts/edit/?siteId=<%=App.QueryString['siteId']%>&featuredItemId=<%=App.QueryString['featuredItemId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset",
            "components": [
                 {
                     "label": "Add Skus",
                     "type": "skus",
                     "componentId": "SkuIds",
                     "map": [{
                         "friendlyName": "Value",
                         "source": "homepageitem.skuIds"
                     }],
                     "validation": {
                         "required": true
                     }
                 }
            ]
        },
         {
             "label": "Featured Item Id",
             "type": "hidden",
             "componentId": "Id",
             "map": [{
                 "friendlyName": "Value",
                 "source": "querystring.featuredItemId"
             }]
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
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "homepageitemproduct.order"
            }]
        }, 
        {
            "label": "SiteId",
            "type": "hidden",
            "componentId": "SiteId",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.siteId"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        },
        {
            "label": "",
            "type": "datatable",
            "dataCollection": "homepageitemproducts",
            "map": [{
                "friendlyName": "Name",
                "source": "name"
            },
            {
                "friendlyName": "Description",
                "source": "shortDescription"
            },
            {
                "friendlyName": "_SkuId",
                "source": "skuId"
            }],
            "actions": [
            {
                "icon": "remove",
                "name": "Delete this Homepage Item Product",
                "url": "/edit/#/homepageitemproducts/delete/?skuId=<%=obj.attributes._SkuId%>&featuredItemId=<%=App.QueryString.featuredItemId%>&siteId=<%=App.QueryString['siteId']%>"
            }]
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
        }, {
            "name": "homepageitem",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FeaturedItemID": "featuredItemId"
            }
        },
        {
            "name": "homepageitemproducts",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetProductsById",
            "ServiceMethodParams": [
                { "Key": "featureditemid", "Value": 1 },
                { "Key": "siteid", "Value": 1 }
            ],
            "map": {
                "Name": "name",
                "featureditemId": "id"
            }
    }]
    }
}
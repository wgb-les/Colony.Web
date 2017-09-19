{
    "behaviourId": "CmsListHomepageItem",
	"messageHandlers": [{
	    "Name": "EditHomepageItem",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "Update",
	    "BindEntityFromParameters": "true"
	}, {
	    "Name": "AddHomepageItem",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "Create",
	    "BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteHomepageItem",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "DeleteById",
	    "ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
	    ]
	}, {
	    "Name": "ListHomepageItem",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "GetAll"
	}, {
	    "Name": "AddImage",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "AddImageById",
	    "ServiceMethodParams": [
            { "Key": "featuredItemId", "Value": 1 },
            { "Key": "imageAssetId", "Value": 1 },
            { "Key": "imageType", "Value": "0"},
            { "Key": "cropOption", "Value": "0"}]
	}, {
	    "Name": "DeleteImage",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "DeleteImageById",
	    "ServiceMethodParams": [{ "Key": "featuredItemId", "Value": 1 },{ "Key": "imageAssetId", "Value": 1 }]
	}, {
	    "Name": "AddProduct",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "AddProducts",
	    "BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteProduct",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "DeleteProductById",
	    "ServiceMethodParams": [{ "Key": "featuredItemId", "Value": 1 },{ "Key": "skuId", "Value": 1 },{ "Key": "siteId", "Value": 1 } ]
	}, {
	    "Name": "UpdateOrder",
	    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	    "ServiceMethod": "UpdateOrder",
	    "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
	    ]
	}],
	"page": {
	    "label": "Homepage Items"
	},
	"componentContainer": [{
	    "label": "",
	    "type": "tablist",
	    "componentId": "HomepageItemTabs",
	    "actions": [{
	        "icon": "plus",
	        "url": "/homepageitems/add/?siteId=<%=App.Colony.currentSiteId%>",
	        "name": "Add Homepage Item"
	    }]
	}, {
	    "label": "",
	    "type": "datatable",
	    "componentId": "BlogList",
	    "dataCollection": "homepageitem",
	    "map": [{
	        "friendlyName": "Name",
	        "source": "name"
	    }],
	    "actions": [{
	        "icon": "pencil",
	        "url": "/edit/#/homepageitems/edit/?siteId=<%=App.Colony.currentSiteId%>&id=<%=id%>",
	        "name": "Edit this Homepage Item"
	    }, {
	        "icon": "remove",
	        "name": "Delete this Homepage Item",
	        "url": "/edit/#/homepageitems/delete/?id=<%=id%>&siteId=<%=App.Colony.currentSiteId%>"
	    }],
	    "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListHomepageItem",
                "trigger": "UpdateOrder"
            }
	    ]
	}],
	"data": {
	    "execute": [{
	        "name": "homepageitem",
	        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	        "ServiceMethod": "GetItemsForSite",
	        "ServiceMethodParams": [{
	            "Key": "siteId",
	            "Value": 1
	        }],
	        "map": [{
	            "Name": "name",
	            "FeaturedItemID": "id"
	        }]
	    }]
	}
}
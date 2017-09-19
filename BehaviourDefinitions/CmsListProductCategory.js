{
	"behaviourId": "CmsListProductCategory",
	"messageHandlers": [{
		"Name": "EditProductCategory",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddProductCategory",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteProductCategory",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
		"Name": "ListProductCategory",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
		"ServiceMethod": "GetAll"
	}, {
	    "Name": "EditProductCategoryBanner",
	    "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
	    "ServiceMethod": "UpdateBanner",
	    "ServiceMethodParams": [
			{ "Key": "productCategoryId", "Value": 1 },
            { "Key": "bannerHtml", "Value": 1 },
            { "Key": "isVisible", "Value": 1 },
            { "Key": "skuAttributeOptionId", "Value": 1 }
	    ]
	}, {
	    "Name": "UpdateOrder",
	    "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
	    "ServiceMethod": "UpdateOrder",
	    "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
	    ]
	}],
	"page": { 
		"label": "Product Categories"
	},
	"componentContainer": [{ 
		"label": "",
		"type": "tablist",
		"componentId": "PressReleaseTabs",
		"actions": [{
			"icon": "plus",
			"url": "/productcategories/add/?siteId=<%=App.Colony.currentSiteId%>",
			"name": "Add Product Category"
		}]
	}, {
		"label": "",
		"type": "treeview",
		"componentId": "PressReleaseList",
		"dataCollection": "productcategories", 
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"parentIdentifier": "parentID",
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/productcategories/edit/?id=<%=id%>",
			"name": "Edit this Product Category"
		}, {
		    "icon": "align-justify",
			"name": "View Products for this Product Category",
			"url": "/edit/#/products/index/?productCategoryId=<%=id%>"
		}, {
			"icon": "picture",
			"name": "View Gallery Images for this Product Category",
			"url": "/edit/#/productcategories/images/?productCategoryId=<%=id%>"
		}, {
			"icon": "plus",
			"name": "Add a child Product Category beneath this Product Category",
			"url": "/edit/#/productcategories/add/?parentId=<%=id%>&siteId=<%=App.Colony.currentSiteId%>"
		}, {
			"icon": "remove",
			"name": "Delete this Product Category",
			"url": "/edit/#/productcategories/delete/?id=<%=id%>"
		}],
		"messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListProductCategory",
                "trigger": "UpdateOrder"
            }
		]
	}],
	"data": {
		"execute": [{
			"name": "productcategories",
			"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
			"ServiceMethod": "GetBySite",
			"ServiceMethodParams": [
				{"Key": "siteId", "Value": 1 }
			],
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
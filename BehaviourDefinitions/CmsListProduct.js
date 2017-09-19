{
	"behaviourId": "CmsListProduct",
	"messageHandlers": [{
		"Name": "EditProduct",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddProduct",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteProduct",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "UpdateOrder",
	    "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
	    "ServiceMethod": "UpdateOrder",
	    "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
	    ]
	},
	{
	    "Name": "DeleteBatch",
	    "ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
	    "ServiceMethod": "DeleteBatch",
	    "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	    ]
	}],
	"page": {
		"label": "Products",
		"back": "/productcategories/index/?siteId=<%=App.Colony.currentSiteId%>",
		"backdescription": "Product Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "productTabs",
		"actions": [{
			"icon": "plus",
			"url": "/productcategories/addskugroup/?productCategoryId=<%=App.QueryString['productCategoryId']%>",
			"name": "Add Products"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "productList",
		"dataCollection": "product",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		},
		{
			"friendlyName": "Type",
			"source": "<% if (obj.skuId) print('Stock Item'); else if (obj.skuGroupId) print('Stock Item Group'); else if (obj.skuBundleId) print('Bundle');%>"
		},{
			"friendlyName": "_skuId",
			"source": "skuId"
		},{
			"friendlyName": "_skuGroupId",
			"source": "skuGroupId"
		},{
			"friendlyName": "_skuBundleId",
			"source": "skuBundleId"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/products/edit/?id=<%=id%>",
			"name": "Edit this Product"
		}, {
			"icon": "pencil",
			"url": "/edit/#/<% if (obj.attributes._skuId != null) print('stock/edit/?id=' + obj.attributes._skuId); else if (obj.attributes._skuGroupId != null) print('skugroups/edit/?id='+ obj.attributes._skuGroupId); else if (obj.attributes._skuBundleId != null) print('skubundles/edit/?id=' + obj.attributes._skuBundleId);%>",
			"name": "Edit the Stock Item associated to this Product"
		}, {
			"icon": "remove",
			"name": "Delete this Product",
			"url": "/edit/#/products/delete/?id=<%=id%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteBatch",
		        "behaviourId": "CmsListProduct"
		    }]
		}],
		"messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListProduct",
                "trigger": "UpdateOrder"
            }
		]
	}],
	"data": {
		"execute": [{
			"name": "product",
			"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
			"ServiceMethod": "GetProductsById",
			"ServiceMethodParams": [
				{"Key": "productCategoryId", "Value": "<%=App.QueryString['productCategoryId']%>" }				
			],
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
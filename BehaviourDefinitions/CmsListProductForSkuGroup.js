{
	"behaviourId": "CmsListProductForSkuGroup",
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
	}],
	"page": {
		"label": "Products"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "productTabs",
		"actions": [{
			"icon": "pencil",
			"url": "/skugroups/edit/?id=<%=App.QueryString['skuGroupId']%>",
			"name": "Edit Stock Item Group"
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
			"friendlyName": "Shop",
			"source": "<%=_.find(App.data.shops, function(shop) { return _.find(App.data.productcategories, function(cat) { return cat.id == obj.productCategoryId }).shopId == shop.id }).name%>"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/products/edit/?id=<%=id%>",
			"name": "Edit this Product"
		}, {
			"icon": "remove",
			"name": "Delete this Product",
			"url": "/edit/#/products/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "product",
			"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
			"ServiceMethod": "GetProductsBySkuGroupId",
			"ServiceMethodParams": [
				{"Key": "skuGroupId", "Value": 0 }				
			]
		},{
			"name": "productcategories",
			"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
		},{
			"name": "shops",
			"ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
			
		}]
	}
}
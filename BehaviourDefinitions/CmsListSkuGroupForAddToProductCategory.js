{
	"behaviourId": "CmsListSkuGroupForAddToProductCategory",
	"messageHandlers": [{
		"Name": "AddProduct",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductsService, Colony.Commerce.Services",
		"ServiceMethod": "AddProductsForSkuGroups",
		"ServiceMethodParams": [
			{ "Key": "skuGroupIds", "Value": null },
			{ "Key": "productCategoryId", "Value": 0 }
		]
	}],
	"page": {
		"label": "Add Stock Item Groups To Product Category",
		"messages": [{
			"message": "AddProduct",
			"behaviourId": "CmsListSkuGroupForAddToProductCategory",
			"trigger": "submit",
			"success": "redirect:/products/index/?productCategoryId=<%=App.QueryString['productCategoryId']%>"
		}]
	},
	"componentContainer": [{
		"label": "",
		"type": "datatable",
		"componentId": "SkuList",
		"dataCollection": "sku",
		"map": [{
			"friendlyName": "Product Code",
			"source": "code"
		}, {
			"friendlyName": "Visible",
			"source": "<%=(isVisible) ? 'Visible' : 'Not Visible'%>"
		}, {
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"id": "skuGroupIds",
			"type": "checkbox"
		}]
	},
	{
		"label": "Add",
		"type": "button",
		"componentId": "SaveButton"
	}],
	"data": {
		"execute": [{
			"name": "sku",
			"ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuGroupsService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
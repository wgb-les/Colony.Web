{
	"behaviourId": "CmsListProductCategoryImage",
	"messageHandlers": [ {
		"Name": "AddProductCategoryImage",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
		"ServiceMethod": "AddProductCategoryImageById",
		"ServiceMethodParams": [
			{"Key": "categoryId", "Value": 0 },
			{"Key": "imageAssetId", "Value": 0 }
		]
	}, {
		"Name": "DeleteProductCategoryImage",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
		"ServiceMethod": "DeleteProductCategoryImageById",
		"ServiceMethodParams": [
			{"Key": "productCategoryId", "Value": 0 },
			{"Key": "imageAssetId", "Value": 0 }
		]
	}, {
		"Name": "ListProductCategory",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
		"ServiceMethod": "GetAll"
	}, {
		"Name": "UpdateOrder",
		"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
		"ServiceMethod": "UpdateOrder",
		"ServiceMethodParams": [
			{ "Key": "entityId", "Value": 0 },
			{ "Key": "insertBeforeEntityId", "Value": 0 },
			{ "Key": "productCategoryId", "Value": 0 }
		]
	}],
	"page": { 
		"label": "Product Category Images"
	},
	"componentContainer": [{ 
		"label": "",
		"type": "tablist",
		"componentId": "PressReleaseTabs",
		"actions": [{
			"icon": "plus",
			"url": "/productcategories/add-image/?categoryId=<%=App.QueryString['productCategoryId']%>",
			"name": "Add Product Category Image"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "PressReleaseList",
		"dataCollection": "productcategoryimages", 
		"map": [{
		    "friendlyName": "Thumbnail",
		    "source": "<img width=\"150px\" height=\"150px\" src=\"/_assets/images/cloud/<%=imageAssetID%>/asset-library/gridview/\" />"
		}, {
			"friendlyName": "Name",
			"source": "name"
		}, {
			"friendlyName": "File",
			"source": "filename"
		}, {
			"friendlyName": "_productCategoryId",
			"source": "productCategoryID"
		}, {
			"friendlyName": "_imageAssetId",
			"source": "imageAssetID"
		}],
		"actions": [{
			"icon": "remove",
			"name": "Delete this Product Category",
			"url": "/edit/#/productcategories/delete-image/?productCategoryId=<%=obj.attributes._productCategoryId%>&imageAssetId=<%=obj.attributes._imageAssetId%>"
		},
		{
		    "id": "productCategoryImageIds",
		    "type": "checkbox",
		    "dataOverride": "productCategoryId=<%=obj.attributes._productCategoryId%>&imageAssetId=<%=obj.attributes._imageAssetId%>"
		}],
		"multiactions": [{
		    "icon": "remove",
		    "name": "Delete images",
		    "messageHandler": "DeleteProductCategoryImage",
		    "confirmMessage" : "Are you sure you want to delete these images?",
		    "checkId": "productCategoryImageIds",
		    "behaviourId": "CmsListProductCategoryImage"
		}],
		"messages": [
			{
				"message": "UpdateOrder",
				"behaviourId": "CmsListProductCategoryImage",
				"trigger": "UpdateOrder"
			}
		]
	}],
	"data": {
		"execute": [{
			"name": "productcategoryimages",
			"ServiceType": "Colony.Commerce.Services.ProductCatalogue.IProductCategoriesService, Colony.Commerce.Services",
			"ServiceMethod": "GetImagesByCategoryId",
			"ServiceMethodParams": [
				{"Key": "productCategoryId", "Value": 1 }
			],
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
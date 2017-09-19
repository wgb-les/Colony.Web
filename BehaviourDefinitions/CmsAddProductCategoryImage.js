{
	"behaviourId": "CmsAddProductCategoryImage",
	"page": {
		"label": "Add Product Category Image",
		"back": "#/productcategories/images/?productCategoryId=<%=App.QueryString['categoryId']%>",
		"backdescription": "Product Category Images",
		"messages": [{
			"message": "AddProductCategoryImage",
			"behaviourId": "CmsListProductCategoryImage",
			"trigger": "submit",
			"success": "redirect:/productcategories/images/?productCategoryId=<%=App.QueryString['categoryId']%>"
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
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "blogcategory.imageAssetId"
					}]
				}]
		}, {
			"label": "Product Category ID",
			"type": "hidden",
			"componentId": "CategoryId",
			"map": [{
				"friendlyName": "Value",
				"source": "querystring.categoryId"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
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
		}]
	}
}
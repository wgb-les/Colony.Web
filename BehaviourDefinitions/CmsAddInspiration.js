{
	"behaviourId": "CmsAddInspiration",
	"page": {
		"label": "Add Inspiration",
		"back": "#/inspiration/index/?siteId=<%=App.QueryString['siteId']%>",
		"backdescription": "Inspiration",
		"messages": [{
			"message": "AddInspiration",
			"behaviourId": "CmsListInspiration",
			"trigger": "submit",
			"success": "redirect:/inspiration/index/?siteId=<%=App.QueryString['siteId']%>"
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
						"source": "inspiration.name"
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
						"source": "inspiration.shortDescription"
					}],
					"validation": {
						"required": true,
						"maxlength": 512
					}
				}, {
					"label": "Category",
					"type": "dropdown",
					"componentId": "Category",
					"map": [{
						"friendlyName": "Value",
						"source": "inspiration.category"
					}],			
					"items": [
						{"id": "Style", "name": "By Style"},
						{"id": "Room", "name": "By Room"},
						{"id": "Colour", "name": "By Colour"}
					]
				}, {
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "inspiration.imageAssetId"
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
				"label": "Tag",
				"type": "tags",
				"componentId": "Tags",
				"map": [{
					"friendlyName": "Value",
					"source": "inspiration.tags"
				}]
			}, {
				"label": "Should this item be marked as New",
				"type": "switch",
				"componentId": "IsNew",
				"map": [{
					"friendlyName": "Value",
					"source": "inspiration.isNew"
				}]
			}, {
				"label": "On which Sites should this inspiration appear",
				"type": "checkboxlist",
				"componentId": "SiteIds",
				"dataCollection": "sites",
				"map": [{
					"friendlyName": "Value",
					"source": "inspiration.siteIds",
					"default": "1"
				}]
			}]
		}, {
			"label": "Item ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "inspiration.id"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
			"name": "Sites",
			"ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
	
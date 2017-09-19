{
	"behaviourId": "CmsAddSku",
	"page": {
		"label": "Add Stock Item",
		"back": "#/stock/index",
		"backdescription": "Stock Management",
		"messages": [{
			"message": "AddSku",
			"behaviourId": "CmsListSku",
			"trigger": "submit",
			"success": "redirect:/stock/index"
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
						"source": "sku.name"
					}],
					"validation": {
					    "required": true,
					    "maxlength": 255
					}
				}, {
					"label": "Code",
					"type": "text",
					"componentId": "Code",
					"map": [{
						"friendlyName": "Value",
						"source": "sku.code"
					}],
					"validation": {
					    "required": true,
					    "maxlength": 255
					}
				}, {
				    "label": "Stock Level",
				    "type": "text",
				    "componentId": "StockLevel",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.stockLevel"
				    }],
				    "validation": {
				        "required": true
				    }
				}, {
				    "label": "Maximum Allowed per order",
				    "type": "text",
				    "componentId": "MaxPerOrder",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.maxPerOrder"
				    }]
				}, {
				    "label": "Height",
				    "type": "text",
				    "componentId": "Height",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.height"
				    }]
				}, {
				    "label": "Width",
				    "type": "text",
				    "componentId": "Width",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.width"
				    }]
				}, {
				    "label": "Depth",
				    "type": "text",
				    "componentId": "Depth",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.depth"
				    }]
				}, {
				    "label": "Weight",
				    "type": "text",
				    "componentId": "Weight",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.weight"
				    }]
				}, {
					"label": "Is this stock item visible",
					"type": "yesno",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "sku.isVisible"
					}]
				}, {
				    "label": "Is this stock item oversized",
				    "type": "yesno",
				    "componentId": "IsOversized",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.isOversized"
				    }]
				}, {
				    "label": "Is this a physical stock item",
				    "type": "yesno",
				    "componentId": "TangibleItem",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.tangibleItem"
				    }]
				}, {
				    "label": "Is this stock item visible in the site search",
				    "type": "yesno",
				    "componentId": "IsSearchable",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.isSearchable"
				    }]
				}, {
				    "label": "Is this stock item featured",
				    "type": "yesno",
				    "componentId": "IsFeatured",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.isFeatured"
				    }]
				}, {
				    "label": "Is this stock item NEW",
				    "type": "yesno",
				    "componentId": "IsNew",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.isNew"
				    }]
				}, {
				    "label": "Is this stock item available for stock notifications",
				    "type": "yesno",
				    "componentId": "AllowStockNotification",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.allowStockNotification"
				    }]
				}, {
				    "label": "Is this stock item available for pre-order",
				    "type": "yesno",
				    "componentId": "AllowPreOrder",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.allowPreOrder"
				    }]
				}, {
				    "label": "Ready For Web",
				    "type": "dropdown",
				    "componentId": "ReadyForWeb",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.readyForWeb",
				        "default": "S"
				    }],
				    "items": [
                        {"id": "L", "name": "L - Display on live environment" },
                        {"id": "S", "name": "S - Display on staging environment only" },
                        {"id": "N", "name": "N - Do not display on web" }
				    ]
				}, {
				    "label": "Is B2C",
				    "type": "yesno",
				    "componentId": "IsB2C",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.isB2C",
                        "default": true
				    }]
				}, {
				    "label": "Is B2B",
				    "type": "yesno",
				    "componentId": "IsB2B",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "sku.isB2B",
                        "default": true
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
					"source": "sku.longDescription"
				}]
			}, {
				"label": "Short Description",
				"type": "textarea",
				"componentId": "ShortDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "sku.shortDescription"
				}]
			}, {
			    "label": "Specification",
			    "type": "richtext",
			    "componentId": "Specification",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "sku.specification"
			    }]
			}, {
			    "label": "Further Information",
			    "type": "richtext",
			    "componentId": "FurtherInfo",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "sku.furtherInfo"
			    }]
			}, {
				"label": "Window Title",
				"type": "text",
				"componentId": "MetaTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "sku.metaTitle"
				}]
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "sku.metaKeywords"
				}]
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "sku.metaDescription"
				}]
			}, {
			    "label": "Out of Stock",
			    "type": "yesno",
			    "componentId": "OutOfStock",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "sku.outOfStock"
			    }]
			}, {
			    "label": "Default Order Location",
			    "type": "text",
			    "componentId": "DefaultOrderLocation",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "sku.defaultOrderLocation"
			    }]
			}]
		}, {
			"label": "Sku ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "sku.id"
			}]
		}, {
			"label": "SearchOrder",
			"type": "hidden",
			"componentId": "SearchOrder",
			"map": [{
				"friendlyName": "Value",
				"source": "sku.searchOrder"
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
		},
		{
		    "name": "blogcategories",
		    "ServiceType": "Colony.Modules.Blog.Services.IBlogPostsCategoriesService, Colony.Modules",
		    "ServiceMethod": "GetAll",
		    "map": {
		        "Name": "name",
		        "BlogID": "id"
		    }
		}]
	}
}
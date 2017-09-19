{
	"behaviourId": "CmsAddProductCategory",
	"page": {
		"label": "Add Product Category",
		"back": "#/productcategories/index/?siteId=<%=App.QueryString['siteId']%>",
		"backdescription": "Product Categories",
		"messages": [{
			"message": "AddProductCategory",
			"behaviourId": "CmsListProductCategory",
			"trigger": "submit",
			"success": "redirect:/productcategories/index/?siteId=<%=App.QueryString['siteId']%>"
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
						"source": "productcategory.name"
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
						"source": "productcategory.shortDescription"
					}],
					"validation": {
						"required": true,
						"maxlength": 512
					}
				}, {
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "productcategory.imageAssetId"
					}]
				},{
				    "label": "Should this category be visible on the front-end",
				    "helptext": "Set this value to 'No' to remove the category and its products from the site entirely",
				    "type": "switch",
				    "componentId": "IsVisible",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "productcategory.isVisible",
				        "default": "true"
				    }]
				}, {
				    "label": "Should this category be marked as new on the front-end",
				    "type": "switch",
				    "componentId": "IsNew",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "productcategory.isNew",
				        "default": "true"
				    }]
				}, {
				    "label": "Should this category be visible in front-end listings",
				    "helptext": "Set this value to 'No' to hide the category from the site, but to still allow products to be searchable",
				    "type": "switch",
				    "componentId": "DisplayInListing",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "productcategory.displayInListing",
				        "default": "true"
				    }]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "productcategory.uri"
					}]
				}, 
                {
					"label": "Language",
					"type": "dropdown",
					"componentId": "LanguageId",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "productcategory.languageId",
						"default": 1
					}]
				},
                 {
                    "label": "Brochure Uri",
                    "type": "text",
                    "componentId": "BrochureUri",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "productcategory.brochureUri"
                    }]
                 },
                     {
                         "label": "Best Sellers",
                         "type": "richtext",
                         "componentId": "BestSellers",
                         "map": [{
                             "friendlyName": "Value",
                             "source": "productcategory.bestSellers"
                         }],
                         "validation": { "required": false }
                     },
                  {
                      "label": "Designer Notes",
                      "type": "richtext",
                      "componentId": "DesignerNotes",
                      "map": [{
                          "friendlyName": "Value",
                          "source": "productcategory.designerNotes"
                      }],
                      "validation": { "required": false }
                  },
                   {
                       "label": "Design Process",
                       "type": "richtext",
                       "componentId": "DesignProcess",
                       "map": [{
                           "friendlyName": "Value",
                           "source": "productcategory.designProcess"
                       }],
                       "validation": { "required": false }
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
					"source": "productcategory.longDescription"
				}],
				"validation": {
					"required": true
				}
			},
            {
                "label": "Module Content",
                "type": "richtext",
                "componentId": "ModuleContent",
                "map": [{
                    "friendlyName": "Value",
                    "source": "productcategory.moduleContent"
                    }],
                "validation": { "required": false }
            },
            {
			    "label": "Analytics Code",
			    "type": "textarea",
			    "componentId": "AnalyticsCode",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "productcategory.analyticsCode"
			    }],
			    "validation": {
			        "maxlength": 1024
			    }
			}, {
				"label": "Window Title",
				"type": "text",
				"componentId": "MetaTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "productcategory.metaTitle"
				}]
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "productcategory.metaKeywords"
				}]
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "productcategory.metaDescription"
				}]
			},
			{
				"label": "In which shop should this category be displayed",
				"type": "dropdown",
				"componentId": "ShopId",
				"dataCollection": "shops",
				"map": [{
					"friendlyName": "Value",
					"source": "productcategory.shopId"
				}],
				"validation": {
				    "required": true
				}
			}, {
			    "label": "Display related content",
			    "type": "switch",
			    "componentId": "DisplayRelatedContent",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "productcategory.displayRelatedContent",
			        "default": "true"
			    }]
			}, {
				"label": "Tags",
				"type": "tags",
				"componentId": "Tags",
				"dataCollection": "languages",
				"map": [{
					"friendlyName": "Value",
					"source": "productcategory.tags"
				}]
			}]
		}, {
			"label": "Blog Category ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "productcategory.id"
			}]
		}, {
			"label": "Type",
			"type": "hidden",
			"componentId": "Type",
			"map": [{
				"friendlyName": "Value",
				"source": "productcategory.type",
				"default": "1"
			}]
		}, {
			"label": "Parent ID",
			"type": "hidden",
			"componentId": "ParentID",
			"map": [{
				"friendlyName": "Value",
				"source": "querystring.parentId"
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
			"name": "Shops",
			"ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
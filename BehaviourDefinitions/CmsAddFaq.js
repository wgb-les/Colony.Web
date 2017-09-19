{
	"behaviourId": "CmsAddFaq",
	"page": {
		"label": "Add FAQ",
		"back": "#/faqs/index/?siteId=<%=App.Colony.currentSiteId%>&faqCategoryId=<%=App.QueryString['faqCategoryId'] || 0%>",
		"backdescription": "FAQs",
		"messages": [{
			"message": "AddFaq",
			"behaviourId": "CmsListFaq",
			"Trigger": "submit",
			"success": "redirect:/faqs/index/?siteId=<%=App.Colony.currentSiteId%>&faqCategoryId=<%=App.QueryString['faqCategoryId'] || 0%>"
		}]
	}, 
	"componentContainer": [{
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset",
		"className": "half",
		"components": [{
			"label": "Question",
			"type": "textarea",
			"componentId": "Name",
			"map": [{
				"friendlyName": "Value",
				"source": "faq.name"
			}],
			"validation": {
				"required": true,
				"maxlength": 255
			}
		}, {
			"label": "Answer",
			"type": "richtext",
			"componentId": "Description",
			"map": [{
				"friendlyName": "Value",
				"source": "faq.description"
			}],
			"validation": {
			    "required": true,
                "maxlength": 1024
			}
		}, {
			"label": "Image",
			"type": "imagelibrary",
			"componentId": "ImageAssetID",
			"map": [{
				"friendlyName": "Value",
				"source": "faq.imageAssetId"
			}]
		}, {
			"label": "URI",
			"type": "text",
			"componentId": "URI",
			"map": [{
				"friendlyName": "Value",
				"source": "faq.URI"
			}]
		}, {
			"label": "Should this FAQ be visible on the front-end",
			"type": "switch",
			"componentId": "IsVisible",
			"map": [{
				"friendlyName": "Value",
				"source": "faq.isVisible",
				"default": "true"
			}]
		}, {
			"label": "Language",
			"type": "dropdown",
			"componentId": "LanguageId",
			"dataCollection": "languages",
			"map": [{
				"friendlyName": "Value",
				"source": "faq.languageId",
				"default": 1
			}]
		}, {
			"label": "Tags",
			"type": "tags",
			"componentId": "Tags",
			"dataCollection": "languages",
			"map": [{
				"friendlyName": "Value",
				"source": "faq.tags"
			}]
		}
		]
	},{
			"label": "",
			"type": "fieldset",
			"componentId": "BasicDetailsFieldset2",
			"className": "half",
			"components": [{
				"label": "Window Title",
				"type": "text",
				"componentId": "MetaTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "faq.metaTitle"
				}]
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "faq.metaKeywords"
				}]
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "faq.metaDescription"
				}]
			}, {
				"label": "On which Sites should this FAQ appear",
				"type": "checkboxlist",
				"componentId": "SiteIds",
				"dataCollection": "sites",
				"map": [{
					"friendlyName": "Value",
					"source": "faq.siteIds",
					"default": "1"
				}]
			}, {
				"label": "Category",
				"type": "dropdown",
				"componentId": "FAQCategoryId",
				"dataCollection": "faqcategories",
				"map": [{
					"friendlyName": "Value",
					"source": "querystring.faqCategoryId",
					"default": "querystring.faqCategoryId"
				}]
			}, {
			    "label": "Fabric Help",
			    "type": "switch",
			    "componentId": "IsFabricHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isFabricHelp"
			    }]
			}, {
			    "label": "Wallpaper Help",
			    "type": "switch",
			    "componentId": "IsWallpaperHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isWallpaperHelp"
			    }]
			}, {
			    "label": "Trimmings Help",
			    "type": "switch",
			    "componentId": "IsTrimmingsHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isTrimmingsHelp"
			    }]
			}, {
			    "label": "Paint Help",
			    "type": "switch",
			    "componentId": "IsPaintHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isPaintHelp"
			    }]
			}, {
			    "label": "Home Accessories Help",
			    "type": "switch",
			    "componentId": "IsHomeAccessoriesHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isHomeAccessoriesHelp"
			    }]
			}, {
			    "label": "Technical Help",
			    "type": "switch",
			    "componentId": "IsTechnicalHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isTechnicalHelp"
			    }]
			}, {
			    "label": "Website Help",
			    "type": "switch",
			    "componentId": "IsWebsiteHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isWebsiteHelp"
			    }]
			}, {
			    "label": "Account Help",
			    "type": "switch",
			    "componentId": "IsAccountHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isAccountHelp"
			    }]
			}, {
			    "label": "Orders Help",
			    "type": "switch",
			    "componentId": "IsOrdersHelp",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isOrdersHelp"
			    }]
			}, {
			    "label": "USA Help",
			    "type": "switch",
			    "componentId": "IsUSA",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isusa"
			    }]
			}, {
			    "label": "UK/Europe Help",
			    "type": "switch",
			    "componentId": "IsEurope",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isEurope"
			    }]
			}, {
			    "label": "Rest of World Help",
			    "type": "switch",
			    "componentId": "IsRestOfWorld",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "faq.isRestOfWorld"
			    }]
			}]
	},{
		"label": "FAQ ID",
		"type": "hidden",
		"componentId": "Id",
		"map": [{
			"friendlyName": "Value",
			"source": "faq.id"
		}]
	}, {
		"label": "Moderation Status ID",
		"type": "hidden",
		"componentId": "ModerationStatusID",
		"map": [{
			"friendlyName": "Value",
			"source": "faq.moderationStatusId",
			"default": "5"
		}]
	}, {
		"label": "order",
		"type": "hidden",
		"componentId": "Order",
		"map": [{
			"friendlyName": "Value",
			"source": "faq.order",
			"default": "1"
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
			 "name": "faqcategories",
			 "ServiceType": "Colony.Modules.FAQs.Services.IFAQCategoriesService, Colony.Modules",
			 "ServiceMethod": "GetAll",
			 "map": {
				 "Name": "name",
				 "BlogID": "id"
			 }
		 }]
	 }
}
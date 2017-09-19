{
	"behaviourId": "CmsEditSite",
	"page": {
		"label": "Edit Site",
		"back": "/sites/index/",
		"backdescription": "Sites",
		"messages": [{
			"message": "EditSite",
			"behaviourId": "CmsListSite",
			"trigger": "submit",
			"success": "redirect:/sites/index/"
		}]
	},
	"componentContainer": [{
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetails",
		"className": "half",
		"components": [{
			"label": "Name",
			"type": "text",
			"componentId": "Name",
			"map": [{
				"friendlyName": "Value",
				"source": "site.name"
			}],
			"validation": {
				"required": true,
				"maxlength": 255
			}
		}, {
			"label": "Default Language",
			"type": "dropdown",
			"componentId": "LanguageID",
			"dataCollection": "languages",
			"map": [{
				"friendlyName": "Value",
				"source": "site.languageId"
			}],
			"validation": {
				"required": true
			}
		}, {
			"label": "Is this a mobile site",
			"type": "switch",
			"componentId": "IsMobile",
			"map": [{
				"friendlyName": "Value",
				"source": "site.isMobile"
			}]
		}, {
			"label": "To which site should mobile users be redirected",
			"type": "dropdown",
			"componentId": "MobileSiteId",
			"dataCollection": "sites",
			"map": [{
				"friendlyName": "Value",
				"source": "site.mobileSiteId"
			}]
		}, {
			"label": "Is this site a Facebook tab application",
			"type": "switch",
			"componentId": "IsFacebook",
			"map": [{
				"friendlyName": "Value",
				"source": "site.isFacebook"
			}]
		}, {
			"label": "Facebook Application URL",
			"type": "text",
			"componentId": "FacebookApplicationUrl",
			"map": [{
				"friendlyName": "Value",
				"source": "site.facebookApplicationUrl"
			}]
		}, {
		    "label": "Facebook Application ID",
		    "type": "text",
		    "componentId": "FacebookAppId",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "site.facebookAppId"
		    }]
		}, {
		    "label": "Facebook Application Secret Key",
		    "type": "text",
		    "componentId": "FacebookSecret",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "site.facebookSecret"
		    }]
		}, {
		    "label": "Default Email Sender",
		    "type": "text",
		    "componentId": "DefaultSenderEmail",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "site.defaultSenderEmail"
		    }]
		}]
	}, {
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetails2",
		"className": "half",
		"components": [
			{
				"label": "Window Title",
				"type": "text",
				"componentId": "WindowTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "site.windowTitle"
				}],
				"validation": {
					"maxlength": 255
				}
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "site.metaDescription"
				}],
				"validation": {
					"maxlength": 512
				}
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "site.metaKeywords"
				}],
				"validation": {
					"maxlength": 512
				}
			}, {
				"label": "Analytics Code",
				"type": "textarea",
				"componentId": "SiteAnalyticsCode",
				"map": [{
					"friendlyName": "Value",
					"source": "site.siteAnalyticsCode"
				}],
				"validation": {
					"maxlength": 1024
				}
			}
		]
	}, {
		"label": "Page Not Found Heading",
		"type": "text",
		"componentId": "PageNotFoundHeading",
		"map": [{
			"friendlyName": "Value",
			"source": "site.pageNotFoundHeading"
		}],
		"validation": {
			"maxlength": 255
		}
	}, {
		"label": "Page Not Found Content",
		"type": "richtext",
		"componentId": "PageNotFoundContent",
		"map": [{
			"friendlyName": "Value",
			"source": "site.pageNotFoundContent"
		}]
	}, {
		"label": "Site ID",
		"type": "hidden",
		"componentId": "Id",
		"map": [{
			"friendlyName": "Value",
			"source": "site.id"
		}]
	}, {
		"label": "Save",
		"type": "button",
		"componentId": "SaveButton"
	}],
	"data": {
		"execute": [{
			"name": "Site",
			"ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}],
			"map": {
				"Name": "name",
				"PageID": "id"
			}
		}, {
			"name": "Sites",
			"ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			"ServiceMethod": "GetAll",
			"map": {
				"Name": "name",
				"PageID": "id"
			}
		}, {
			"name": "Languages",
			"ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
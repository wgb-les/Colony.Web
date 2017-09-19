{
	"behaviourId": "CmsAddPage",
"page": {
	"label": "Add Page",
	"back": "pages/index/?siteId=<%=App.QueryString['siteId']%>",
	"backdescription": "Site Structure",
	"messages": [{
		"message": "AddPage",
		"behaviourId": "CmsListPage",
		"trigger": "submit",
		"success": "redirect:/pagesections/index/?pageId=<%=data.data.addPage.id%>"
	}]
},
	"componentContainer": [{
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset",
		"className": "half",
		"components": [{
			"label": "Page Name",
			"type": "text",
			"componentId": "Name",
			"map": [{
				"friendlyName": "Value",
				"source": "page.name"
			}],
			"validation": {
				"required": true,
				"maxlength": 255
			}
		}, {
			"label": "Page Heading",
			"type": "text",
			"componentId": "Heading",
			"map": [{
				"friendlyName": "Value",
				"source": "page.heading"
			}],
			"validation": {
				"required": true,
				"maxlength": 255
			}
		}, {
			"label": "Template",
			"type": "dropdown",
			"componentId": "Template",
			"map": [{
				"friendlyName": "Value",
				"source": "page.template"
			}],
			"items": [
				{"id": "Default", "name": "Default" },
				{"id": "Homepage", "name": "Homepage" },
				{"id": "B2B", "name": "B2B" },
				{"id": "B2C", "name": "B2C" },
				{"id": "ProductCategories", "name": "Product Categories" },
				{"id": "Products", "name": "Products" },
				{"id": "AccountArea", "name": "Account Area" },
				{"id": "Paint", "name": "Paint" },
				{"id": "ContainerOnly", "name": "Container Only" },
				{"id": "ModuleContent", "name": "Module Content" },
				{"id": "PaintLandingPage", "name": "Paint Landing Page" },
                {"id": "Brands", "name": "Brands" },
                {"id": "PressAreaContainerOnly", "name": "Press Area Container Only" },
                {"id": "TradeAreaContainerOnly", "name": "Trade Area Container Only" },
                {"id": "PressArea", "name": "Press Area" },
                {"id": "TradeArea", "name": "Trade Area" },
                {"id": "PressAreaWide", "name": "Press Area Wide" },
                {"id": "TradeAreaWide", "name": "Trade Area Wide" },
                {"id": "Brochures", "name": "Brochures" },
			    {"id": "Search", "name": "Search" },
                {"id": "PressLandingPage", "name": "Press Landing Page" },
                {"id": "TradeLandingPage", "name": "Trade Landing Page" },
                {"id": "Cushion", "name": "Cushions" },
                 {"id": "Calculator", "name": "Calculator" },
                 {"id": "Inspire", "name": "Inspire" }
			],
			"validation": {
				"required": true
			}
		}, {
			"label": "Window Title",
			"type": "text",
			"componentId": "MetaTitle",
			"map": [{
				"friendlyName": "Value",
				"source": "page.metaTitle"
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
				"source": "page.metaDescription"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
			"label": "Meta Keywords",
			"type": "text",
			"componentId": "MetaKeywords",
			"map": [{
				"friendlyName": "Value",
				"source": "page.metaKeywords"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
			"label": "Custom Meta Tags",
			"type": "textarea",
			"componentId": "MetaCustomTags",
			"map": [{
				"friendlyName": "Value",
				"source": "page.metaCustomTags"
			}],
			"validation": {
				"maxlength": 512
			}
		}]
	}, {
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset2",
		"className": "half",
		"components": [{
			"label": "Page URL",
			"type": "text",
			"componentId": "Uri",
			"map": [{
				"friendlyName": "Value",
				"source": "page.uri"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
			"label": "Action URI",
			"type": "text",
			"componentId": "ModuleActionUri",
			"map": [{
				"friendlyName": "Value",
				"source": "page.moduleActionUri"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
			"label": "Show this page in the menu",
			"type": "switch",
			"componentId": "ShowInMenu",
			"map": [{
				"friendlyName": "Value",
				"source": "page.showInMenu",
				"default": "true"
			}]
		}, {
			"label": "Show this page in the sitemap",
			"type": "switch",
			"componentId": "ShowInSiteMap",
			"map": [{
				"friendlyName": "Value",
				"source": "page.showInSiteMap",
				"default": "true"
			}]
		}, {
			"label": "Show this page in the site search",
			"type": "switch",
			"componentId": "ShowInSearch",
			"map": [{
				"friendlyName": "Value",
				"source": "page.showInSearch",
				"default": "true"
			}]
		}, {
			"label": "Should this page be visible on the front-end",
			"type": "switch",
			"componentId": "IsVisible",
			"map": [{
				"friendlyName": "Value",
				"source": "page.isVisible",
				"default": "true"
			}]
		}, {
			"label": "Is HTTPS required for this page",
			"type": "switch",
			"componentId": "HttpsRequired",
			"map": [{
				"friendlyName": "Value",
				"source": "page.httpsRequired"
			}]
		}, {
			"label": "Analytics Code",
			"type": "textarea",
			"componentId": "AnalyticsCode",
			"map": [{
				"friendlyName": "Value",
				"source": "page.analyticsCode"
			}],
			"validation": {
				"maxlength": 512
			}
		}]
	},

		{
			"label": "Page ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "page.id"
			}]
		}, {
			"label": "Parent ID",
			"type": "hidden",
			"componentId": "ParentId",
			"map": [{
				"friendlyName": "Value",
				"source": "querystring.parentId"
			}]
		}, {
			"label": "Site ID",
			"type": "hidden",
			"componentId": "SiteId",
			"map": [{
				"friendlyName": "Value",
				"source": "querystring.siteId"
			}]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "page.order"
			}]
		}, {
			"label": "Should this item be approved for publishing on the website",
			"type": "switch",
			"componentId": "Publish",
			"map": [{
				"friendlyName": "Value",
				"source": "page.publish",
				"default": "true"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}
	],
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
		}]
	}
}
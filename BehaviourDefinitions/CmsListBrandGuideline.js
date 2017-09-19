{
	"behaviourId": "CmsListBrandGuideline",
	"messageHandlers": [{
	    "Name": "EditBrandGuideline",
	    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IBrandGuidelinesService, WalkerGreenbank.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddBrandGuideline",
	    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IBrandGuidelinesService, WalkerGreenbank.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteBrandGuideline",
	    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IBrandGuidelinesService, WalkerGreenbank.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}],
	"page": {
		"label": "Brand Guidelines"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "BlogTabs",
		"actions": [{
			"icon": "plus",
			"url": "/brandguidelines/add/",
			"name": "Add Brand Guideline"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "BrandGuidelineList",
		"dataCollection": "brandguideline",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/brandguidelines/edit/?id=<%=id%>",
			"name": "Edit this Brand Guideline"
		}, {
			"icon": "remove",
			"name": "Delete this Brand Guideline",
			"url": "/edit/#/brandguidelines/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "brandguideline",
			"ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IBrandGuidelinesService, WalkerGreenbank.Modules",
			"ServiceMethod": "GetBrandGuidelinesForSite",
			"ServiceMethodParams": [
                {"Key": "siteId", "Value": 0 }
			]
		}]
	}
}
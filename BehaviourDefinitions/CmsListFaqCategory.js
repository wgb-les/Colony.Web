{
	"behaviourId": "CmsListFaqCategory",
	"messageHandlers": [{
	    "Name": "EditFaqCategory",
		"ServiceType": "Colony.Modules.FAQs.Services.IFAQCategoriesService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddFaqCategory",
		"ServiceType": "Colony.Modules.FAQs.Services.IFAQCategoriesService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteFaqCategory",
		"ServiceType": "Colony.Modules.FAQs.Services.IFAQCategoriesService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "ListFaqCategory",
	    "ServiceType": "Colony.Modules.FAQs.Services.IFAQCategoriesService, Colony.Modules",
	    "ServiceMethod": "GetAll"
	}],
	"page": {
		"label": "FAQ Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "FaqTabs",
		"actions": [{
			"icon": "plus",
			"url": "/faqcategories/add/",
			"name": "Add FAQ Category"
		}, {
		    "icon": "align-justify",
		    "url": "/faqs/index/?siteId=<%=App.Colony.currentSiteId%>&faqCategoryId=0",
		    "name": "List Root Level FAQs"
		}]
	}, {
		"label": "",
		"type": "treeview",
		"componentId": "FaqList",
		"dataCollection": "faqcategories",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/faqcategories/edit/?id=<%=id%>",
			"name": "Edit this FAQ Category"
		}, {
		    "icon": "align-justify",
		    "name": "View FAQs for this FAQ Category",
		    "url": "/edit/#/faqs/index/?siteId=<%=App.Colony.currentSiteId%>&faqCategoryId=<%=id%>"
		}, {
		    "icon": "plus",
		    "name": "Add a child FAQ Category beneath this FAQ Category",
		    "url": "/edit/#/faqcategories/add/?parentId=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this FAQ Category",
			"url": "/edit/#/faqcategories/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "faqcategories",
			"ServiceType": "Colony.Modules.FAQs.Services.IFAQCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
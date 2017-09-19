{
	"behaviourId": "CmsListJobCategory",
	"messageHandlers": [{
	    "Name": "EditJobCategory",
		"ServiceType": "Colony.Modules.Careers.Services.IJobCategoriesService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddJobCategory",
	    "ServiceType": "Colony.Modules.Careers.Services.IJobCategoriesService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteJobCategory",
	    "ServiceType": "Colony.Modules.Careers.Services.IJobCategoriesService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "ListJobCategory",
	    "ServiceType": "Colony.Modules.Careers.Services.IJobCategoriesService, Colony.Modules",
	    "ServiceMethod": "GetAll"
	}],
	"page": {
		"label": "Job Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "JobTabs",
		"actions": [{
			"icon": "plus",
			"url": "/jobcategories/add/",
			"name": "Add Job Category"
		}, {
		    "icon": "align-justify",
		    "url": "/jobs/index/?siteId=<%=App.Colony.currentSiteId%>&jobCategoryId=0",
		    "name": "List Root Level Jobs"
		}]
	}, {
		"label": "",
		"type": "treeview",
		"componentId": "JobList",
		"dataCollection": "jobcategories",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/jobcategories/edit/?id=<%=id%>",
			"name": "Edit this Job Category"
		}, {
		    "icon": "align-justify",
		    "name": "View Jobs for this Job Category",
		    "url": "/edit/#/jobs/index/?siteId=<%=App.Colony.currentSiteId%>&jobCategoryId=<%=id%>"
		}, {
		    "icon": "plus",
		    "name": "Add a child Job Category beneath this Job Category",
		    "url": "/edit/#/jobcategories/add/?parentId=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this Job Category",
			"url": "/edit/#/jobcategories/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "jobcategories",
			"ServiceType": "Colony.Modules.Careers.Services.IJobCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
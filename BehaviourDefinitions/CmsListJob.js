{
	"behaviourId": "CmsListJob",
	"messageHandlers": [{
		"Name": "EditJob",
		"ServiceType": "Colony.Modules.Careers.Services.IJobsService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddJob",
		"ServiceType": "Colony.Modules.Careers.Services.IJobsService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteJob",
		"ServiceType": "Colony.Modules.Careers.Services.IJobsService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}],
	"page": {
	    "label": "Jobs",
        "back": "/jobcategories/index/",
        "backdescription": "Job Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "BlogTabs",
		"actions": [{
			"icon": "plus",
			"url": "/jobs/add/?siteId=<%=App.Colony.currentSiteId%>&jobCategoryId=<%=App.QueryString['jobCategoryId']%>",
			"name": "Add Job"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "BlogList",
		"dataCollection": "job",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/jobs/edit/?id=<%=id%>",
			"name": "Edit this Job"
		}, {
		    "icon": "align-justify",
		    "url": "/edit/#/jobapplications/index/?siteId=<%=App.Colony.currentSiteId%>&jobId=<%=id%>",
		    "name": "View Job Applications for this Job"
		}, {
			"icon": "remove",
			"name": "Delete this Job",
			"url": "/edit/#/jobs/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "job",
			"ServiceType": "Colony.Modules.Careers.Services.IJobsService, Colony.Modules",
			"ServiceMethod": "GetForCms",
			"ServiceMethodParams": [
                {"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
                {"Key": "jobCategoryId", "Value": "<%=App.QueryString['jobCategoryId']%>" }
                
			],
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
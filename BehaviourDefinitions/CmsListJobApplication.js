{
	"behaviourId": "CmsListJobApplication",
	"messageHandlers": [{
		"Name": "EditJobApplication",
		"ServiceType": "Colony.Modules.Careers.Services.IJobApplicationService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteJobApplication",
		"ServiceType": "Colony.Modules.Careers.Services.IJobApplicationService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}],
	"page": {
		"label": "Job Applications",
		"back": "/jobs/edit/?id=<%=App.QueryString['jobId']%>",
		"backdescription": "Jobs"
	},
	"componentContainer": [{
		"label": "",
		"type": "datatable",
		"componentId": "BlogList",
		"dataCollection": "jobapplication",
		"map": [{
			"friendlyName": "Name",
			"source": "<%= title %> <%= firstName %> <%= lastName %>"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/jobapplications/edit/?id=<%=id%>",
			"name": "View this Job Application"
		}, {
			"icon": "remove",
			"name": "Delete this Job Application",
			"url": "/edit/#/jobapplications/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "jobapplication",
			"ServiceType": "Colony.Modules.Careers.Services.IJobApplicationService, Colony.Modules",
			"ServiceMethod": "GetForCms",
			"ServiceMethodParams": [
				{"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
				{"Key": "jobId", "Value": "<%=App.QueryString['jobId']%>" }
				
			],
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}
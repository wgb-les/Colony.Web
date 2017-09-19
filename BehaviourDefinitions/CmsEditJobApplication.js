{
	"behaviourId": "CmsEditJobApplication",
	"page": {
		"label": "View Job Application",
		"back": "jobapplications/index/?siteId=<%=App.Colony.currentSiteId%>&jobId=<%=App.data.jobapplication['jobId']%>",
        "backdescription": "Job Applications",
        "messages": [{
            "message": "DeleteJobApplication",
            "behaviourId": "CmsListJobApplication",
            "trigger": "submit",
            "success": "redirect:/jobapplications/index/?siteId=<%=App.Colony.currentSiteId%>&jobId=<%=App.data.jobapplication['jobId']%>"
        }]
	},    
	"componentContainer": [
		{
			"label": "",
			"type": "tablist",
			"componentId": "BlogTabs",
			"actions": [{
			    "icon": "align-justify",
				"url": "/jobapplications/index/?siteId=<%=App.Colony.currentSiteId%>&jobId=<%=App.data.job.id%>",
				"name": "View Applications for this job"
			}]
		}, {
		    "label": "",
		    "type": "fieldset",
		    "componentId": "BasicDetailsFieldset",
		    "className": "half",
		    "components": [
				{
				    "label": "Title",
				    "type": "display",
				    "componentId": "Name",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "jobapplication.title"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, 
                {
                    "label": "First Name",
                    "type": "display",
                    "componentId": "FirstName",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.firstName"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, 
                {
                    "label": "Last Name",
                    "type": "display",
                    "componentId": "LastName",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.lastName"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Email Address",
                    "type": "display",
                    "componentId": "EmailAddress",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.emailAddress"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Telephone Number",
                    "type": "display",
                    "componentId": "TelephoneNumber",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.telephoneNumber"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Mobile Number",
                    "type": "display",
                    "componentId": "Mobile",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.mobile"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }
		    ]},
            {
                "label": "AddressFieldset",
                "type": "fieldset",
                "className": "half",
                "components": [
                {
                    "label": "Address Line 1",
                    "type": "display",
                    "componentId": "Line1",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.line1"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, 
                {
                    "label": "Address Line 2",
                    "type": "display",
                    "componentId": "Line2",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.line2"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, 
                {
                    "label": "Town/City",
                    "type": "display",
                    "componentId": "Town",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.town"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, 
                {
                    "label": "County/State",
                    "type": "display",
                    "componentId": "County",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.county"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, 
                {
                    "label": "Postcode",
                    "type": "display",
                    "componentId": "Postcode",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.postcode"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, 
                {
                    "label": "Attached CV",
                    "type": "filepreview",
                    "componentId": "AttachedCV",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "jobapplication.attachedCVId"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, 
                {
				    "label": "Language ID",
				    "type": "hidden",
				    "componentId": "LanguageID",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "job.languageId",
				        "default": "1"
				    }]
                }, 
                {
				    "label": "Order",
				    "type": "hidden",
				    "componentId": "Order",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "job.order"
				    }]
                }, 
                {
				    "label": "Moderation Status ID",
				    "type": "hidden",
				    "componentId": "ModerationStatusID",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "job.moderationStatusId",
				        "default": "5"
				    }]
                }
                ]
            },
            {
                "label": "Comments",
                "type": "textarea",
                "componentId": "Comments",
                "map": [{
                    "friendlyName": "Value",
                    "source": "jobapplication.comments"
                }]
            }
	], 
    "data": {
        "execute": [{
            "name": "jobapplication",
            "ServiceType": "Colony.Modules.Careers.Services.IJobApplicationService, Colony.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "BlogID": "id"
            }
        }]
    }
}
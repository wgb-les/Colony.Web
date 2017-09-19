{
	"behaviourId": "CmsEditJob",
	"page": {
		"label": "Edit Job",
		"back": "/jobs/index/?siteId=<%=App.Colony.currentSiteId%>&jobCategoryId=<%=App.data.job.jobCategoryId || 0%>",
		"backdescription": "jobs",
		"messages": [{
			"Message": "EditJob",
			"BehaviourId": "CmsListJob",
			"Trigger": "submit",
			"success": "redirect:/jobs/index/?siteId=<%=App.Colony.currentSiteId%>&jobCategoryId=<%=App.data.job.jobCategoryId || 0%>"
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
					"type": "text",
					"componentId": "Name",
					"map": [{
						"friendlyName": "Value",
						"source": "job.name"
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
						"source": "job.shortDescription"
					}],
					"validation": {
						"maxlength": 255
					}
				}, {
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "job.imageAssetId"
					}]
				}, {
					"label": "Start Publishing",
					"type": "datetime",
					"componentId": "PublishStart",
					"map": [{
						"friendlyName": "Value",
						"source": "job.publishStart"
					}]
				}, {
					"label": "End Publishing",
					"type": "datetime",
					"componentId": "PublishEnd",
					"map": [{
						"friendlyName": "Value",
						"source": "job.publishEnd"
					}]
				}, {
					"label": "Are comments enabled for this post?",
					"type": "switch",
					"componentId": "CommentsEnabled",
					"map": [{
						"friendlyName": "Value",
						"source": "job.commentsEnabled",
						"default": "0"
					}]
				}, {
					"label": "Should this job be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "job.isVisible"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "job.uri"
					}]
				}, {
					"label": "Tags",
					"type": "tags",
					"componentId": "Tags",
					"map": [{
						"friendlyName": "Value",
						"source": "job.tags"
					}]
				}
			]
		},
		{
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset2",
		"className": "half",
		"components": [{
			"label": "Job Description",
			"type": "richtext",
			"componentId": "LongDescription",
			"map": [{
				"friendlyName": "Value",
				"source": "job.longDescription"
			}],
			"validation": {
				"required": true
			}
		}, {
			"label": "Salary",
			"type": "text",
			"componentId": "Salary",
			"map": [{
				"friendlyName": "Value",
				"source": "job.salary"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
			"label": "Location",
			"type": "text",
			"componentId": "Location",
			"map": [{
				"friendlyName": "Value",
				"source": "job.location"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
			"label": "Deadline",
			"type": "datetime",
			"componentId": "Deadline",
			"map": [{
				"friendlyName": "Value",
				"source": "job.deadline"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
			"label": "Window Title",
			"type": "text",
			"componentId": "WindowTitle",
			"map": [{
				"friendlyName": "Value",
				"source": "job.windowTitle"
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
				"source": "job.metaKeywords"
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
				"source": "job.metaDescription"
			}],
			"validation": {
				"maxlength": 512
			}
		}, {
			"label": "On which Sites should this job appear",
			"type": "checkboxlist",
			"componentId": "SiteIds",
			"dataCollection": "sites",
			"map": [{
				"friendlyName": "Value",
				"source": "job.siteIds",
				"default": "1"
			}],
			"validation": {
				"required": true
			}
		}, {
			"label": "Category",
			"type": "dropdown",
			"componentId": "JobCategoryId",
			"dataCollection": "jobcategories",
			"map": [{
				"friendlyName": "Value",
				"source": "job.jobCategoryId",
				"default": "querystring.jobCategoryId"
			}],
			"validation": {
				"required": true
			}
		}]
	}, {
		"label": "job ID",
		"type": "hidden",
		"componentId": "Id",
		"map": [{
			"friendlyName": "Value",
			"source": "job.id"
		}]
	}, {
		"label": "Language ID",
		"type": "hidden",
		"componentId": "LanguageID",
		"map": [{
			"friendlyName": "Value",
			"source": "job.languageId",
			"default": "1"
		}]
	}, {
		"label": "Order",
		"type": "hidden",
		"componentId": "Order",
		"map": [{
			"friendlyName": "Value",
			"source": "job.order"
		}]
	}, {
		"label": "Moderation Status ID",
		"type": "hidden",
		"componentId": "ModerationStatusID",
		"map": [{
			"friendlyName": "Value",
			"source": "job.moderationStatusId",
			"default": "5"
		}]
	}, {
		"label": "Save",
		"type": "button",
		"componentId": "SaveButton"
	}],
	"data": {
		"execute": [{
			"name": "job",
			"ServiceType": "Colony.Modules.Careers.Services.IJobsService, Colony.Modules",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}],
			"map": {
				"Name": "name",
				"JobID": "id"
			}
		}, {
			"name": "Languages",
			"ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
			"ServiceMethod": "GetAll"
		}, {
			"name": "Sites",
			"ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			"ServiceMethod": "GetAll"
		},
		{
			"name": "jobcategories",
			"ServiceType": "Colony.Modules.Careers.Services.IJobCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": {
				"Name": "name",
				"JobID": "id"
			}
		}]
	}
}
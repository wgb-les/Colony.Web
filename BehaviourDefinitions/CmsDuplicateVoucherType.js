{
	"behaviourId": "CmsDuplicateVoucherType",
	"page": {
		"label": "Duplicate Voucher Type",
		"back": "#/vouchertype/index/",
		"backdescription": "voucher types",
		"messages": [{
			"message": "AddVoucherType",
			"behaviourId": "CmsListVoucherType",
			"trigger": "submit",
			"success": "redirect:/vouchertypes/index/"
		}]
	},
	"componentContainer": [
		{
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
					    "required": true,
					    "maxlength": 512
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
					"label": "Should this job be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "job.isVisible",
						"default": "true"
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
					"label": "Language",
					"type": "dropdown",
					"componentId": "LanguageId",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "job.languageId",
						"default": 1
					}]
				}, {
					"label": "Tags",
					"type": "tags",
					"componentId": "Tags",
					"dataCollection": "languages",
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
				    "required": true,
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
				    "required": true,
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
				    "required": true
				}
			}, {
				"label": "Window Title",
				"type": "text",
				"componentId": "MetaTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "job.metaTitle"
				}]
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "job.metaKeywords"
				}]
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "job.metaDescription"
				}]
			}, {
				"label": "On which Sites should this job appear",
				"type": "checkboxlist",
				"componentId": "SiteIds",
				"dataCollection": "sites",
				"map": [{
					"friendlyName": "Value",
					"source": "job.siteIds",
					"default": "1"
				}]
			}, {
				"label": "Category",
				"type": "dropdown",
				"componentId": "JobCategoryId",
				"dataCollection": "jobcategories",
				"map": [{
					"friendlyName": "Value",
					"source": "querystring.jobCategoryId",
					"default": "querystring.jobCategoryId"
				}]
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
				"jobID": "id"
			}
		}]
	}
}
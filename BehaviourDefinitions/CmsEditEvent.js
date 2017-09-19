{
	"behaviourId": "CmsEditEvent",
		"page": {
			"label": "Edit Event",
			"back": "#/events/index/?siteId=<%=App.Colony.currentSiteId%>&eventCategoryId=<%=App.data.event['eventCategoryId'] || 0%>",
			"backdescription": "events",
			"messages": [{
				"message": "EditEvent",
				"behaviourId": "CmsListEvent",
				"trigger": "submit",
				"success": "redirect:/events/index/?siteId=<%=App.Colony.currentSiteId%>&eventCategoryId=<%=App.data.event['eventCategoryId'] || 0%>"
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
						"source": "event.name"
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
						"source": "event.shortDescription"
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
						"source": "event.imageAssetId"
					}]
				}, {
					"label": "Start Publishing",
					"type": "datetime",
					"componentId": "PublishStart",
					"map": [{
						"friendlyName": "Value",
						"source": "event.publishStart"
					}],
					"validation": {
					    "required": true
					}
				}, {
					"label": "End Publishing",
					"type": "datetime",
					"componentId": "PublishEnd",
					"map": [{
						"friendlyName": "Value",
						"source": "event.publishEnd"
					}]
				}, {
					"label": "Event Start",
					"type": "datetime",
					"componentId": "EventStart",
					"map": [{
						"friendlyName": "Value",
						"source": "event.eventStart"
					}]
				}, {
					"label": "Event End",
					"type": "datetime",
					"componentId": "EventEnd",
					"map": [{
						"friendlyName": "Value",
						"source": "event.eventEnd"
					}]
				}, {
					"label": "Are comments enabled for this event?",
					"type": "switch",
					"componentId": "CommentsEnabled",
					"map": [{
						"friendlyName": "Value",
						"source": "event.commentsEnabled",
						"default": "0"
					}]
				}, {
					"label": "Should this event be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "event.isVisible"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "event.uri"
					}]
				}, {
					"label": "Language",
					"type": "dropdown",
					"componentId": "LanguageId",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "event.languageId",
						"default": 1
					}],
					"validation": {
					    "required": true
					}
				}, {
					"label": "Tags",
					"type": "tags",
					"componentId": "Tags",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "event.tags"
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
				"label": "event Content",
				"type": "richtext",
				"componentId": "LongDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "event.longDescription"
				}],
				"validation": {
				    "required": true
				}
			}, {
				"label": "Window Title",
				"type": "text",
				"componentId": "WindowTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "event.windowTitle"
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
					"source": "event.metaKeywords"
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
					"source": "event.metaDescription"
				}],
				"validation": {
				    "maxlength": 255
				}
			}, {
				"label": "On which Sites should this event appear",
				"type": "checkboxlist",
				"componentId": "SiteIds",
				"dataCollection": "sites",
				"map": [{
					"friendlyName": "Value",
					"source": "event.siteIds",
					"default": "1"
				}]
			}, {
				"label": "Category",
				"type": "dropdown",
				"componentId": "EventCategoryId",
				"dataCollection": "eventcategories",
				"map": [{
					"friendlyName": "Value",
					"source": "event.eventCategoryId",
					"default": "querystring.eventCategoryId"
				}]
			}]
		}, {
			"label": "event ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "event.id"
			}]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "event.order"
			}]
		}, {
			"label": "Moderation Status ID",
			"type": "hidden",
			"componentId": "ModerationStatusID",
			"map": [{
				"friendlyName": "Value",
				"source": "event.moderationStatusId",
				"default": "5"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
			"name": "event",
			"ServiceType": "Colony.Modules.Events.Services.IEventsService, Colony.Modules",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}],
			"map": {
				"Name": "name",
				"EventID": "id"
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
			"name": "eventcategories",
			"ServiceType": "Colony.Modules.Events.Services.IEventCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": {
				"Name": "name",
				"BlogID": "id"
			}
		}]
	}
}
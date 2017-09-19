{
	"behaviourId": "CmsListEnquiry",
	"messageHandlers": [{
		"Name": "DeleteEnquiry",
		"ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryService, Colony.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{"Key": "id", "Value": "" }
		]
	}, {
		"Name": "SearchEnquiry",
		"ReturnName": "searchEnquiry",
		"ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryService, Colony.Services",
		"ServiceMethod": "CmsSearch",
		"ServiceMethodParams": [
			{"Key": "searchCriteria", "Value": "", "IsDynamic": true }
		]
	}],
	"page": {
		"label": "Online Enquiries" 
	},
	"componentContainer": [
		{
			"label": "",
			"type": "tablist",
			"componentId": "EnquiryTabs",
			"actions": [{
				"icon": "align-justify",
				"url": "/enquirytypes/index/",
				"name": "Manage Enquiry Types"
			}]
		}, {
		"label": "Search",
		"type": "searchform",
		"components": [
			{
				"label": "keywords",
				"type": "fieldset",
				"componentId": "keywordsFieldset",
				"className": "half",
				"components": [
					{
						"label": "Enter keywords",
						"componentId": "Keywords",
						"type": "text",
						"map": [
								{"friendlyName": "value", "source": "cache.keywords" }
						]
					},
                    {
                        "label": "Filter by Enquiry Type",
                        "componentId": "EnquiryTypeID",
                        "type": "dropdown",
                        "dataCollection": "enquiryType"
                    }
				]
			}
		],
		"messages": [
			{
				"message": "SearchEnquiry",
				"behaviourId": "CmsListEnquiry",
				"Trigger": "submitSearch"
			}
		]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "EnquiryList",
		"dataCollection": "searchEnquiry",
		"map": [{
			"friendlyName": "Subject",
			"source": "title"
		}, {
			"friendlyName": "Type",
			"source": "<a href='#/enquirytypes/edit/?id=<%=obj.enquiryTypeID%>'><%=_.find(App.data.enquiryType, function(item) { return item.id == obj.enquiryTypeID; }).name %></a>"
		}, {
			"friendlyName": "Date",
			"source": "<%= App.Colony.formatDate(obj.created) %>"
		}],
		"actions": [{
			"icon": "search",
			"name": "View this enquiry",
			"url": "/edit/#/enquiries/edit/?id=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this Enquiry",
			"url": "/edit/#/enquiries/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [
			{
				"name": "enquiryType",
				"ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryTypeService, Colony.Services",
				"ServiceMethod": "GetAll"
			}
		]
	}
}
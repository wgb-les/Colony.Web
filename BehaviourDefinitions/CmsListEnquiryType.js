{
    "behaviourId": "CmsListEnquiryType",
    "messageHandlers": [{
        "Name": "EditEnquiryType",
        "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryTypeService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddEnquiryType",
        "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryTypeService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteEnquiryType",
        "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryTypeService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    }, {
        "Name": "SearchEnquiry",
        "ReturnName": "searchEnquiry",
        "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryTypeService, Colony.Services",
        "ServiceMethod": "Search",
        "ServiceMethodParams": [
            {"Key": "searchParams", "Value": "", "IsDynamic": true }
        ]
    }],
    "page": {
        "label": "Enquiry Types",
		"back": "/enquiries/index/",
		"backdescription": "Online Enquiries"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "EnquiryTypeTabs",
        "actions": [{
            "icon": "plus",
            "url": "/enquirytypes/add/",
            "name": "Add Enquiry Type"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "EnquiryList",
        "dataCollection": "enquiryType",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }, {
            "friendlyName": "Dynamic Title",
            "source": "dynamicTitle"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Enquiry Type",
            "url": "/edit/#/enquirytypes/edit/?id=<%=id%>"
        }, {
            "icon": "group",
            "name": "Manage recipients for this Enquiry Type",
            "url": "/edit/#/enquiryrecipients/index/?id=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Enquiry Type",
            "url": "/edit/#/enquirytypes/delete/?id=<%=id%>"
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
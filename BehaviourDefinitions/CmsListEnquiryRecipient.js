{
    "behaviourId": "CmsListEnquiryRecipient",
    "messageHandlers": [{
        "Name": "AddEnquiryRecipient",
        "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryRecipientService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditEnquiryRecipient",
        "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryRecipientService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteEnquiryRecipient",
        "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryRecipientService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    }],
    "page": {
        "label": "Enquiry Recipients",
		"back": "/enquirytypes/index/",
		"backdescription": "Enquiry Types"
    },
    "componentContainer": [
        {
            "label": "",
            "type": "tablist",
            "componentId": "EnquiryTabs",
            "actions": [{
                "icon": "plus",
                "url": "/enquiryrecipients/add/?enquiryTypeId=<%=App.QueryString['id']%>",
                "name": "Add Enquiry Recipient"
            }]
        }, {
        "label": "",
        "type": "datatable",
        "componentId": "EnquiryList",
        "dataCollection": "enquiryRecipient",
        "map": [{
            "friendlyName": "EmailAddress",
            "source": "emailAddress"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Enquiry Recipient",
            "url": "/edit/#/enquiryrecipients/edit/?id=<%=id%>&enquiryTypeId=<%=App.QueryString['id']%>"
        }, {
            "icon": "remove",
            "name": "Delete this Enquiry Recipient",
            "url": "/edit/#/enquiryrecipients/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [
            {
                "name": "enquiryRecipient",
                "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryRecipientService, Colony.Services",
                "ServiceMethod": "GetEnquiryRecipientsForEnquiryType",
                "ServiceMethodParams": [
                    {"Key": "id", "Value": 1 }
                ]
            }
        ]
    }
}
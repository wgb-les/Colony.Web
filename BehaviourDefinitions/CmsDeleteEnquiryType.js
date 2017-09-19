{
    "behaviourId": "CmsDeleteEnquiryType",
    "page": {
        "label": "Delete EnquiryType",
        "back": "enquirytypes/index/",
        "backdescription": "Enquiry Types",
        "messages": [{
            "message": "DeleteEnquiryType",
            "behaviourId": "CmsListEnquiryType",
            "trigger": "submit",
            "success": "redirect:/enquirytypes/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the enquiry type <strong><%=App.data.enquirytype.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "enquirytype.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "enquirytype",
            "ServiceType": "Colony.Services.Core.Abstract.Enquiries.IEnquiryTypeService, Colony.Services",
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
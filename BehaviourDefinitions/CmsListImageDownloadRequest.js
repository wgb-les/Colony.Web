{
    "behaviourId": "CmsListImageDownloadRequest",
	"messageHandlers": [{
	    "Name": "ApproveRequest",
	    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
	    "ServiceMethod": "Approve",
	    "ServiceMethodParams": [
			{ "Key": "id", "Value": 1 }
	    ]
	}, {
	    "Name": "ApproveRequestWithGuidelines",
	    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
	    "ServiceMethod": "ApproveWithGuidelines",
	    "ServiceMethodParams": [
			{ "Key": "id", "Value": 1 }
	    ]
	}, {
	    "Name": "RejectRequest",
	    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
	    "ServiceMethod": "Reject",
	    "ServiceMethodParams": [
			{ "Key": "id", "Value": 1 }
	    ]
	}, {
	    "Name": "DeleteRequest",
	    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
	    "ServiceMethod": "DeleteById",
	    "ServiceMethodParams": [
			{ "Key": "id", "Value": 1 }
	    ]
	}, {
	    "Name": "SearchImageDownloadRequest",
	    "ReturnName": "imagedownloadrequest",
	    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
	    "ServiceMethod": "CmsSearch",
	    "ServiceMethodParams": [
			{"Key": "searchCriteria", "Value": "", "IsDynamic": true }
	    ]
	}],
	"page": {
	    "label": "Press Image Download Requests"
	},
	"componentContainer": [{
	    "label": "",
	    "type": "tablist",
	    "componentId": "ImageDownloadTabs",
	    "componentId": "FeaturedTabs",
	    "actions": [
        {
            "icon": "file-alt",
            "url": "/brandguidelines/index/?siteId=<%=App.Colony.currentSiteId%>",
            "name": "Manage Brand Guidelines"
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
					    "label": "Filter by Site",
					    "componentId": "SiteID",
					    "type": "dropdown",
					    "dataCollection": "site"
					}
			    ]
			},
            {
                "label": "status",
                "type": "fieldset",
                "componentId": "statusFieldset",
                "className": "half",
                "components": [
                    {
                        "label": "Filter by Status",
                        "componentId": "DownloadRequestApprovalStatusId",
                        "type": "dropdown",
                        "items": [
                           {"id": "0", "name": "Awaiting approval" },
                           {"id": "1", "name": "Approved" },
                           {"id": "2", "name": "Rejected" }
                        ]
                    }
                ]
            }
	    ],
	    "messages": [
			{
			    "message": "SearchImageDownloadRequest",
			    "behaviourId": "CmsListImageDownloadRequest",
			    "Trigger": "submitSearch"
			}
	    ]
	}, 
    {
        "label": "",
        "type": "datatable",
        "componentId": "StateList",
        "dataCollection": "imagedownloadrequest",
        "map": [{
            "friendlyName": "Usage",
            "source": "usage"
        }, {
            "friendlyName": "Publication Name",
            "source": "publicationName"
        }, {
            "friendlyName": "Publication Date",
            "source": "publicationDate"
        }, {
            "friendlyName": "Status",
            "source": "<% if (downloadRequestApprovalStatusId == 0) print('Awaiting approval'); else if (downloadRequestApprovalStatusId == 1) print('Approved'); else if (downloadRequestApprovalStatusId == 2) print('Rejected');%>"
        }
        ],
        "csvMap": [
             {
                "friendlyName": "Created",
                "source": "created"
             }, {
                 "friendlyName": "Publication Name",
                 "source": "publicationName"
             },
              {
                 "friendlyName": "Contact Name",
                 "source": "contactName"
              },
             {
                 "friendlyName": "Email",
                 "source": "email"
             },
            {
            "friendlyName": "Image",
            "source": "imageName"
            },
        {
            "friendlyName": "Brand",
            "source": "<% if (siteId == 1) print('Harlequin'); else if (siteId == 3) print('Sanderson'); else if (siteId == 4) print('Morris');else if (siteId == 5) print('Zoffany');else if (siteId == 17) print('Scion'); else if (siteId == 19) print('StyleLibrary'); else if (siteId == 24) print('Contract'); else if (siteId == 26) print('Anthology');%>"
        }, {
            "friendlyName": "Publication Date",
            "source": "publicationDate"
        }, {
            "friendlyName": "Status",
            "source": "<% if (downloadRequestApprovalStatusId == 0) print('Awaiting approval'); else if (downloadRequestApprovalStatusId == 1) print('Approved'); else if (downloadRequestApprovalStatusId == 2) print('Rejected');%>"
        }, {
            "friendlyName": "Reason",
            "source": "reason"
        }
        ],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/pressimagedownloads/edit/?id=<%=id%>",
            "name": "Edit this State"
        }, {
            "icon": "remove",
            "name": "Delete this State",
            "url": "/edit/#/pressimagedownloads/delete/?id=<%=id%>"
        }]
    }],
	"data": {
	    "execute": [{
	        "name": "imagedownloadrequest",
	        "ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
	        "ServiceMethod": "CmsSearch",
	        "ServiceMethodParams": [
			    {"Key": "searchCriteria", "Value": "DownloadRequestApprovalStatusId=0" }
	        ]

	    },
        {
            "name": "Site",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll",
            "map": [{
                "Name": "name",
                "PageID": "id"
            }]
        }
	    ]
	}
}
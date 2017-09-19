{
    "behaviourId": "CmsListPageSection",
    "messageHandlers": [{
        "Name": "AddPageSection",
        "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageSectionService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditPageSection",
        "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageSectionService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeletePageSection",
        "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageSectionService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "UpdateOrder",
        "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageSectionService, Colony.Services",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
        ]
    },
    {
        "Name": "AddReviewSchedule",
        "ServiceType": "LQ.Services.Revisions.IRevisionScheduleService, LQ.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }
    ],
    "page": {
        "label": "Page Content Sections",
        "back": "/pages/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "Site Structure"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "PageSectionTabs",
        "actions": [{
            "icon": "pencil",
            "url": "/pages/edit/?id=<%=App.QueryString['pageId']%>",
            "name": "Edit Page Details"
        }, {
            "icon": "plus-sign",
            "url": "/pagesections/add/?pageId=<%=App.QueryString['pageId']%>",
            "name": "Add Page Section"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "RedirectList",
        "dataCollection": "pagesection",
        "map": [{
            "friendlyName": "Content",
            "source": "<% if (typeof(moduleActionUri) != 'undefined') { %><iframe src='/moduleactionuri/getactionuri/?ActionUri=<%= moduleActionUri %>' width='80%' height='400px' /><% } else { %><div class='wysiwygContentContainer'><%= htmlContent%></div><% } %>"
        }],
        "actions": [{
            "icon": "edit",
            "name": "Edit this page content section",
            "url": "/edit/#/pagesections/edit/?id=<%=id%>&pageId=<%=App.QueryString['pageId']%>"
        }, {
            "icon": "remove",
            "name": "Delete this page content section",
            "url": "/edit/#/pagesections/delete/?id=<%=id%>"
        }],
        "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListPageSection",
                "trigger": "UpdateOrder"
            }
        ]
    }],
    "data": {
        "execute": [{
            "name": "Pagesection",
            "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageSectionService, Colony.Services",
            "ServiceMethod": "GetForPageByPageId",
            "ServiceMethodParams": [{
                "Key": "pageId",
                "Value": 1
            }],
            "map": [{
                "Name": "name",
                "PageID": "id"
            }]
        },
        {
            "name": "Page",
            "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": [{
                "Name": "name",
                "PageID": "id"
            }]
        }]
    }
}
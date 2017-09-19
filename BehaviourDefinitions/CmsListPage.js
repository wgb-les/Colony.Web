{
    "behaviourId": "CmsListPage",
    "messageHandlers": [{
        "Name": "EditPage",
        "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddPage",
        "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeletePage",
        "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [{
            "Value": "<%=App.QueryString['id']%>",
            "Key": "id"
        }]
    }, {
        "Name": "UpdateOrder",
        "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageService, Colony.Services",
        "ServiceMethod": "UpdateOrder",
        "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
        ]
    }],
    "page": {
        "label": "Site Structure",
        "back": "/sites/index/",
        "backdescription": "Sites"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "PageTabs",
        "actions": [{
            "icon": "plus",
            "url": "/pages/add/?siteId=<%=App.QueryString['siteId']%>",
            "name": "Add Page"
        }]
    }, {
        "label": "",
        "sortable": true,
        "type": "treeview",
        "componentId": "PageList",
        "dataCollection": "page",
        "map": [{
            "friendlyName": "Page name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Page",
            "url": "/edit/#/pages/edit/?id=<%=id%>"
        }, {
            "icon": "link",
            "name": "Preview this Page",
            "url": "<%=fullUri%>"
        }, {
            "icon": "align-justify",
            "name": "Edit Page Content Sections for this page",
            "url": "/edit/#/pagesections/index/?pageId=<%=id%>"
        }, {
            "icon": "plus",
            "name": "Add a child Page beneath this Page",
            "url": "/edit/#/pages/add/?siteId=<%=App.QueryString['siteId']%>&parentId=<%=id%>"
        }, {
            "icon": "remove",
            "Name": "Delete this Page",
            "url": "/edit/#/pages/delete/?id=<%=id%>"
        }],
        "messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListPage",
                "trigger": "UpdateOrder"
            }
        ]
    }],
    "data": {
        "execute": [{
            "name": "Page",
            "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageService, Colony.Services",
            "ServiceMethod": "GetPagesForSite",
            "ServiceMethodParams": [{
                "Key": "siteId",
                "Value": 1
            }],
            "map": [{
                "Name": "name",
                "PageID": "id"
            }]
        }]
    }
}
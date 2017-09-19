{
    "behaviourId": "CmsListSite",
    "messageHandlers": [{
        "Name": "EditSite",
        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteSite",
        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [{
            "Key": "Id",
            "Value": 1
        }]
    }, {
        "name": "ListSites",
        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
        "ServiceMethod": "GetAll",
        "map": [{
            "Name": "name",
            "PageID": "id"
        }]
    }, {
        "name": "ListLanguages",
        "ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
        "ServiceMethod": "GetAll",
        "map": [{
            "Name": "name",
            "PageID": "id"
        }]
    }, {
        "Name": "AddSite",
        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }],
    "page": {
        "label": "Sites"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "SitesTabs",
        "actions": [{
            "icon": "plus",
            "url": "/sites/add/",
            "name": "Add Site"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "SiteList",
        "dataCollection": "site",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }, {
            "friendlyName": "Default Language",
            "source": "<%=_.where(App.data.languages, { id: languageId })[0].name%>"
        }, {
            "friendlyName": "Type",
            "source": "<% if (isMobile) { %>Mobile Website<% } else { %>Desktop Website<% } %>"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/sites/edit/?id=<%=id%>",
            "name": "Edit this Site"
        }, {
            "icon": "sitemap",
            "url": "/edit/#/pages/index/?siteId=<%=id%>",
            "name": "View Site Structure for this Site"
        }, {
            "icon": "globe",
            "url": "/edit/#/sitedomains/index/?siteId=<%=id%>",
            "name": "View Site Domains for this Site"
        }, {
            "icon": "share-alt",
            "url": "/edit/#/redirects/index/?siteId=<%=id%>",
            "name": "View Redirects for this Site"
        }, {
            "icon": "remove",
            "name": "Delete this Site",
            "url": "/edit/#/sites/delete/?id=<%=id%>"    
        }, {
            "icon": "list",
            "name": "Edit Menus for this site",
            "url": "/edit/#/menus/index/?siteid=<%=id%>"    
        }]
    }],
    "data": {
        "execute": [{
            "name": "Site",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll",
            "map": [{
                "Name": "name",
                "PageID": "id"
            }]
        }, {
            "name": "Languages",
            "ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
            "ServiceMethod": "GetAll",
            "map": [{
                "Name": "name",
                "PageID": "id"
            }]
        }]
    }
}
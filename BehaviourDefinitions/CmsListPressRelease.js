{
    "behaviourId": "CmsListPressRelease",
	"messageHandlers": [{
	    "Name": "EditPressRelease",
	    "ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
	    "ServiceMethod": "Update",
	    "BindEntityFromParameters": "true"
	}, {
	    "Name": "AddPressRelease",
	    "ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
	    "ServiceMethod": "Create",
	    "BindEntityFromParameters": "true"
	}, {
	    "Name": "DeletePressRelease",
	    "ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
	    "ServiceMethod": "DeleteById",
	    "ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
	    ]
	}, {
	    "Name": "SearchPressReleases",
	    "ReturnName": "pressRelease",
	    "ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
	    "ServiceMethod": "CmsSearch",
	    "ServiceMethodParams": [
            {"Key": "searchCriteria", "Value": "", "IsDynamic": true }
	    ]

	}],
	"page": {
	    "label": "Press Releases",
		"back": "/pressreleasecategories/index/",
		"backdescription": "press release categories"
	},
	"componentContainer": [{
	    "label": "",
	    "type": "tablist",
	    "componentId": "PressReleaseTabs",
	    "actions": [{
	        "icon": "plus",
	        "url": "/pressreleases/add/?siteId=<%=App.Colony.currentSiteId%>&pressReleaseCategoryId=<%=App.QueryString['pressReleaseCategoryId']%>",
	        "name": "Add Press Release"
	    }]
	},
     {
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
             }
         ]
         ,
         "messages": [
             {
                 "message": "SearchPressReleases",
                 "behaviourId": "CmsListPressRelease",
                 "Trigger": "submitSearch"
             }
         ]
     },
    
        {
            "label": "",
            "type": "datatable",
            "componentId": "PressReleaseList",
            "dataCollection": "pressRelease",
            "map": [{
                "friendlyName": "Name",
                "source": "name"
            }],
            "actions": [{
                "icon": "pencil",
                "url": "/edit/#/pressreleases/edit/?id=<%=id%>",
                "name": "Edit this Press Release"
            }, {
                "icon": "remove",
                "name": "Delete this Press Release",
                "url": "/edit/#/pressreleases/delete/?id=<%=id%>"
            }]
        }],
         "data": {
             "execute": [{
                 "name": "pressRelease",
                 "ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
                 "ServiceMethod": "GetForCms",
                 "ServiceMethodParams": [
                     {"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
                     {"Key": "pressReleaseCategoryId", "Value": "<%=App.QueryString['pressReleaseCategoryId']%>" }				
                 ],
                 "map": [{
                     "Name": "name",
                     "BlogID": "id"
                 }]
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
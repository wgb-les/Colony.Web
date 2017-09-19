{
	"behaviourId": "CmsListPressReleaseFile",
	"messageHandlers": [{
		"Name": "EditPressReleaseFile",
		"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddPressReleaseFile",
		"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeletePressReleaseFile",
		"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}],
	"page": {
		"label": "Press Release Files",
		"back": "/pressreleases/edit/?id=<%=App.QueryString['pressReleaseId']%>",
		"backdescription": "press release details"
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
	}, {
	    "label": "Upload Files",
	    "type": "file",
	    "componentId": "Files",
	    "map": [{
	        "friendlyName": "Value",
	        "source": "blog.author"
	    }]
	}, {
	    "label": "",
	    "type": "datatable",
	    "componentId": "FileList",
	    "dataCollection": "file",
	    "map": [{
	        "friendlyName": "Name",
	        "source": "name"
	    }, {
	        "friendlyName": "File Name",
	        "source": "filename"
	    }, {
	        "friendlyName": "File Size (Bytes)",
	        "source": "fileSize"
	    }, {
	        "friendlyName": "MIME Type",
	        "source": "type"
	    }],
	    "actions": [{
	        "icon": "ok",
	        "url": "/edit/#/files/edit/?id=<%=id%>",
	        "name": "Use this File"
	    }]
	}],
    "data": {
        "execute": [{
            "name": "file",
            "ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IFileAssetService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}
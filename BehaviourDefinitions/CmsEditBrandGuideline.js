{
	"behaviourId": "CmsEditBrandGuideline",
	"page": {
		"label": "Edit Brand Guideline",
		"back": "#/brandguidelines/index/?siteId=<%=App.Colony.currentSiteId%>",
		"backdescription": "brand guidelines",
		"messages": [{
            "name": "Edit",
            "message": "EditBrandGuideline",
			"behaviourId": "CmsListBrandGuideline",
			"trigger": "submit",
			"success": "redirect:/brandguidelines/index/?siteId=<%=App.Colony.currentSiteId%>"
		}]
	},
	"componentContainer": [
		{
			"label": "Site",
			"type": "dropdown",
			"componentId": "SiteId",
            "dataCollection": "sites",
			"map": [{
				"friendlyName": "Value",
				"source": "brandguideline.siteId"
			}]
		}, {
            "label": "ZIP File",
            "type": "filelibrary",
            "componentId": "FileAssetID",
            "map": [{
                "friendlyName": "Value",
                "source": "brandguideline.fileAssetID"
            }]
		}, {
		    "label": "ID",
		    "type": "hidden",
		    "componentId": "Id",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "brandguideline.id"
		    }]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
    "data": {
        "execute": [
            {
                "Name": "brandguideline",
                "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IBrandGuidelinesService, WalkerGreenbank.Modules",
                "ServiceMethod": "GetById",
                "ServiceMethodParams": [
                    { "Key": "id", "Value": 0 }
                ]
            }, {
                "name": "Sites",
                "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
                "ServiceMethod": "GetAll"
            }
        ]
    }
    
}
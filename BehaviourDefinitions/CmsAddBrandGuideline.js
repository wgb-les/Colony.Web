{
    "behaviourId": "CmsAddBrandGuideline",
	"page": {
	    "label": "Add Brand Guideline",
		"back": "#/brandguidelines/index/?siteId=<%=App.Colony.currentSiteId%>",
		"backdescription": "brand guidelines",
		"messages": [{
		    "name": "Add",
		    "message": "AddBrandGuideline",
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
		    "label": "Save",
		    "type": "button",
		    "componentId": "SaveButton"
		}],
    "data": {
        "execute": [
            {
                "name": "Sites",
                "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
                "ServiceMethod": "GetAll"
            }
        ]
    }
    
}
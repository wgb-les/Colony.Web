{
	"behaviourId": "CmsAddPod",
	"page": {
		"label": "Add Pod",
		"back": "#/pods/index/",
		"backdescription": "pods"
	},
	"componentContainer": [
        {
            "label": "",
            "type": "tablist",
            "componentId": "PodTabs",
            "actions": [{
                "icon": "code",
                "url": "/pods/addhtmlpod",
                "name": "HTML Pod"
            }, {
                "icon": "picture",
                "url": "/pods/addimagepod",
                "name": "Image Pod"
            }, {
                "icon": "cogs",
                "url": "/pods/adddynamicpod",
                "name": "Dynamic Pod"
            }]
        }
	]
}
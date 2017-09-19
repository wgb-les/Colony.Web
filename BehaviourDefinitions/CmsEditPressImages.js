{
    "behaviourId": "CmsEditPressImages",
    "page": {
        "label": "Upload Press Images",
        "messages": [{
            "message": "UploadPressImages",
            "behaviourId": "CmsAddPressImages",
            "trigger": "submit",
            "success": "redirect:/pressimages/add/?siteId=<%=App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset",
            "className": "half",
            "components": [
                {
                    "label": "File to upload",
                    "helptext": "Must be a csv file",
                    "type": "singlefile",
                    "componentId": "PressImageFile",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "<%=''%>"
                    }],
                    "validation": {
                        "required": true,
                        "extension" : "csv"
                    }
                }
            ]
        }
    ]
}
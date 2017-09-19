{
    "behaviourId": "CmsDeleteJobApplication",
    "page": {
        "label": "Delete Job Application",
        "back": "jobapplications/index/?siteId=<%=App.Colony.currentSiteId%>&jobId=<%=App.data.jobapplication['jobId']%>",
        "backdescription": "Job Applications",
        "messages": [{
            "message": "DeleteJobApplication",
            "behaviourId": "CmsListJobApplication",
            "trigger": "submit",
            "success": "redirect:/jobapplications/index/?siteId=<%=App.Colony.currentSiteId%>&jobId=<%=App.data.jobapplication['jobId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the job application for <strong><%=App.data.jobapplication.title%> <%=App.data.jobapplication.firstName%> <%=App.data.jobapplication.lastName%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "jobapplication.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "jobapplication",
            "ServiceType": "Colony.Modules.Careers.Services.IJobApplicationService, Colony.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "BlogID": "id"
            }
        }]
    }
}
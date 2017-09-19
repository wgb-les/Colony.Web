{
    "behaviourId": "CmsActivateVoucherType",
    "page": {
        "label": "Change Active Status",
        "back": "/vouchertypes/index/",
        "backdescription": "Voucher Types",
        "messages": [{
            "message": "ActivateVoucherType",
            "behaviourId": "CmsListVoucherType",
            "trigger": "submit",
            "success": "redirect:/vouchertypes/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "ArchiveContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to change the status of voucher type <strong><%=App.data.vouchertype.name%></strong>?</p>"
            }]
        }, {
            "label": "ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "vouchertype.id"
            }]
        }, {
            "label": "Change",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute":[{
            "name": "vouchertype",
            "ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherTypeService, Colony.Commerce.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [
                {"Key": "id", "Value": 1 }
            ]
        }]
    }
}
{
    "behaviourId": "CmsArchiveVoucherType",
    "page": {
        "label": "Archive Voucher Type",
        "back": "/vouchertypes/index/",
        "backdescription": "Voucher Types",
        "messages": [{
            "message": "ArchiveVoucherType",
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
                "source": "<p>Are you sure you want to archive the voucher type <strong><%=App.data.vouchertype.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Archive",
            "type": "button",
            "componentId": "ArchiveButton"
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
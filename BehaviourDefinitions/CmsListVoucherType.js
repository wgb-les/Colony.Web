{
	"behaviourId": "CmsListVoucherType",
	"messageHandlers": [{
		"Name": "AddVoucherType",
        "ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherTypeService, Colony.Commerce.Services",
		"ServiceMethod": "CreateVoucherTypeAndVouchers",
		"BindEntityFromParameters": "true",
        "EntityOverride": "MapFormToVoucherTypeAndVoucher"
	},{
        "Name": "ArchiveVoucherType",
        "ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherTypeService, Colony.Commerce.Services",
        "ServiceMethod": "ArchiveById",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    },{
        "Name": "ActivateVoucherType",
        "ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherTypeService, Colony.Commerce.Services",
        "ServiceMethod": "ToggleActiveStatus",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    }],
	"page": { 
		"label": "Voucher Types"
	},
	"componentContainer": [{ 
		"label": "",
		"type": "tablist",
		"componentId": "PressReleaseTabs",
		"actions": [{
			"icon": "plus",
			"url": "/vouchertypes/add/?siteId=<%=App.Colony.currentSiteId%>",
			"name": "Add Voucher Type"
		}]
	},{
        "label": "",
        "type": "datatable",
        "componentId": "CmsListVoucherType",
        "dataCollection": "vouchertypes",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }, {
            "friendlyName": "Discount Type",
            "source": "<% if (discountTypeID == 1) print('Cash'); else if (discountTypeID == 2) print('Percentage'); else if (discountTypeID == 3) print('Postage'); %>"
        }, {
            "friendlyName": "Value",
            "source": "discountValue"
        }, {
			"friendlyName": "Status",
			"source": "<% if (isActive == 1) print('Active'); else if (isActive == 0) print('Inactive'); %>"
		}],
        "actions": [{
		    "icon": "align-justify",
			"name": "View Vouchers of this Type",
			"url": "/edit/#/vouchers/index/?voucherTypeId=<%=id%>"
        },{
			"icon": "cogs",
			"name": "View Usage Statistics",
			"url": "/edit/#/vouchertypes/stats/?id=<%=id%>"
		},{
            "icon": "ok",
            "name": "Archive this Voucher Type",
			"url": "/edit/#/vouchertypes/archive/?id=<%=id%>"
		},{
            "icon": "pencil",
            "name": "Toggle Active status",
			"url": "/edit/#/vouchertypes/activate/?id=<%=id%>"
		},{
            "icon": "plus",
            "name": "Duplicate VoucherType",
			"url": "/edit/#/vouchertypes/add/?id=<%=id%>"
		}]
    }],
	"data": {
		"execute": [{
			"name": "vouchertypes",
            "ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherTypeService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}
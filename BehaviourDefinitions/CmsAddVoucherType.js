{
	"behaviourId": "CmsAddVoucherType",
	"page": {
		"label": "Add Voucher Type",
		"back": "#/vouchertypes/index/",
		"backdescription": "voucher types",
		"messages": [{
			"message": "AddVoucherType",
			"behaviourId": "CmsListVoucherType",
			"trigger": "submit",
			"success": "redirect:/vouchertypes/index/"
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
					"label": "Name",
					"type": "text",
					"componentId": "Name",
					"map": [{
						"friendlyName": "Value",
						"source": "voucherTypeAndVoucher.name"
					}],
					"validation": {
					    "required": true,
					    "maxlength": 255
					}
				},{
				    "label": "Prefix or Code",
				    "type": "text",
				    "componentId": "Prefix",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "voucherTypeAndVoucher.prefix"
				    }],
				    "validation": {
				        "required": true,
				        "maxlength": 20
				    }
				},{
				    "label": "Currency",
				    "type": "dropdown",
				    "dataCollection": "currencies",
				    "componentId": "CurrencyId",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "voucherTypeAndVoucher.currencyID"
				    }],
				    "validation": {
				        "required": true
				    }
				},{
				    "label": "Discount Type",
				    "componentId": "DiscountTypeId",
				    "type": "dropdown",
				    "items": [
                        {"id": "1", "name": "Cash" },
                        {"id": "2", "name": "Percentage" },
                        {"id": "3", "name": "Postage Discount" }
				    ],
				    "map": [{
				        "friendlyName": "Value",
				        "source": "voucherTypeAndVoucher.discountTypeID"
				    }]
				},{
				    "label": "Discount Value",
				    "type": "text",
				    "componentId": "DiscountValue",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "voucherTypeAndVoucher.discountValue"
				    }]
				},{
				    "label": "Minimum Spend",
				    "type": "text",
				    "componentId": "MinimumSpend",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "voucherTypeAndVoucher.minimumSpend"
				    }]
				}, {
				    "label": "Is Active",
				    "type": "switch",
				    "componentId": "IsActive",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "voucherTypeAndVoucher.isActive",
				        "default": "true"
				    }]
				}, {
				    "label": "Is Single Use",
				    "type": "switch",
				    "componentId": "IsSingleUse",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "voucherTypeAndVoucher.isSingleUse",
				        "default": "true"
				    }]
				}
			]
		},
		{
		    "label": "",
		    "type": "fieldset",
		    "componentId": "BasicDetailsFieldset2",
		    "className": "half",
		    "components": [
                {
                    "label": "Start Time",
                    "type": "datetime",
                    "componentId": "StartTime",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "voucherTypeAndVoucher.startTime"
                    }]
                }, {
                    "label": "End Time",
                    "type": "datetime",
                    "componentId": "EndTime",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "voucherTypeAndVoucher.endTime"
                    }]
                }, {
                    "label": "How many vouchers",
                    "type": "text",
                    "componentId": "HowManyVouchers",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "voucherTypeAndVoucher.howManyVouchers"
                    }]
                }, {
                    "label": "ID",
                    "type": "hidden",
                    "componentId": "Id",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "VoucherTypeAndVoucher.id"
                    }]
                }, {
                    "label": "Save",
                    "type": "button",
                    "componentId": "SaveButton"
                }]
		}],
	"data": {
	    "execute": [{
	        "name": "Currencies",
	        "ServiceType": "Colony.Commerce.Services.Currencies.Abstract.ICurrencyService, Colony.Commerce.Services",
	        "ServiceMethod": "GetAll"
	    },{
			"name": "VoucherTypeAndVoucher",
            "ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherTypeService, Colony.Commerce.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [
                {"Key": "id", "Value": "0" }
            ]
		}]
	}
}
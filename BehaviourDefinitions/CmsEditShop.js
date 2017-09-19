{
	"behaviourId": "CmsEditShop",
	"page": {
		"label": "Edit Shop",
		"back": "/shops/index/",
		"backdescription": "shops",
		"messages": [{
			"Message": "EditShop",
			"BehaviourId": "CmsListShop",
			"Trigger": "submit",
			"success": "redirect:/shops/index/"
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
					"label": "Title",
					"type": "text",
					"componentId": "Name",
					"map": [{
						"friendlyName": "Value",
						"source": "shop.name"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				},
				{
					"label": "Currency",
					"type": "dropdown",
					"dataCollection": "currencies",
					"componentId": "CurrencyId",
					"map": [{
						"friendlyName": "Value",
						"source": "shop.currencyId"
					}],
					"validation": {
						"required": true
					}
				},
				{
					"label": "Does this shop allow the sale of Variant Products",
					"type": "switch",
					"componentId": "AllowVariants",
					"map": [{
						"friendlyName": "Value",
						"source": "shop.allowVariants"
					}]
				},
				{
					"label": "Is this the default shop",
					"type": "switch",
					"componentId": "IsDefault",
					"map": [{
						"friendlyName": "Value",
						"source": "shop.isDefault"
					}]
				},
                {
                    "label": "Allow Free Samples",
                    "type": "switch",
                    "componentId": "FreeSamples",
                    "map": [
                        {"friendlyName": "Value", "source": "shop.freeSamples", "default": "false" }
                    ]
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
					"label": "Absolute URL for the shop",
					"type": "text",
					"componentId": "AbsoluteUrl",
					"map": [{
						"friendlyName": "Value",
						"source": "shop.absoluteUrl"
					}],
					"validation": {
						"required": true,
						"url": true,
						"maxlength": 255
					}
				},
				{
					"label": "Key Identifier for this shop (e.g. SHOP01)",
					"type": "text",
					"componentId": "ShopKey",
					"map": [{
						"friendlyName": "Value",
						"source": "shop.shopKey"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				},
				{
					"label": "Order Number Prefix", 
					"type": "text",
					"componentId": "OrderNumberPrefix",
					"map": [{ 
						"friendlyName": "Value",
						"source": "shop.orderNumberPrefix"
					}],
					"validation": {
						"required": true,
						"maxlength": 10
					}
				},
				{
					"label": "Order Number Minimum Length",
					"type": "number",
					"componentId": "OrderNumberMinLength",
					"map": [{
						"friendlyName": "Value",
						"source": "shop.orderNumberMinLength"
					}],
					"validation": {
						"required": true
					}
				},
				{
					"label": "Site",
					"type": "dropdown",
					"componentId": "SiteId",
					"dataCollection": "sites",
					"map": [{
						"friendlyName": "Value",
						"source": "shop.siteId"
					}],
					"validation": {
						"required": true
					}
				}
			]
		},
		{
			"label": "Shop ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "shop.id"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}
	],
	"data": {
		"execute": [{
			"name": "shop",
			"ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}]
		}, {
			"name": "Currencies",
			"ServiceType": "Colony.Commerce.Services.Currencies.Abstract.ICurrencyService, Colony.Commerce.Services",
			"ServiceMethod": "GetAll"
		}, {
			"name": "sites",
			"ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			"ServiceMethod": "GetAll"
		}
	]
	}
}
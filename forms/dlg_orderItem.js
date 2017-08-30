/**
 * @properties={typeid:24,uuid:"0a15c93e-0c98-40ef-a507-4817a4dd50e8"}
 */
function evt_changeItem()
{
	description = order_items_to_products.order_description
	price_each = order_items_to_products.price_each
	cost_each = order_items_to_products.cost_each
	
	if(!quantity) quantity = 1
}

/**
 * @properties={typeid:24,uuid:"0ae15143-4959-44be-8264-df577baec013"}
 */
function onShow()
{
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT)
	{
		elements.btn_getInfo.visible = true
	}
	else
	{
		elements.btn_getInfo.visible = false
	}
}

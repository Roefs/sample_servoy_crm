/**
 * @properties={type:6,typeid:36,uuid:"5ea2d9a0-302b-4e83-a20f-8cc11bef9c1a"}
 */
function amt_discount()
{
if(orders_to_order_items && pct_discount)
{
	return orders_to_order_items.sum_extended * pct_discount
}
else
{
	return 0
}
}

/**
 * @properties={type:6,typeid:36,uuid:"e3455500-e2b3-4534-93dc-7e18d63f88f8"}
 */
function amt_tax()
{
if(orders_to_order_items && pct_tax)
{
	return orders_to_order_items.sum_extended * pct_tax
}
else
{
	return 0
}
}

/**
 * @properties={type:12,typeid:36,uuid:"1bc367b0-e120-4ca4-9bde-ad3eabf09627"}
 */
function bill_address_html()
{
var str = '<html>'
if(company_id) str += '<b>' + orders_to_companies.company_name + '</b>'
if(contact_id) str += '\n' + orders_to_contacts.name_fl

if(orders_billaddr_to_addresses)
{
	str += '\n' + orders_billaddr_to_addresses.address_display_calc
}

str = utils.stringReplace(str, '\n', '<br>')
return str + '</html>'
}

/**
 * @properties={type:12,typeid:36,uuid:"aa73e81c-881b-4fd1-a0ae-a86d42dbb396"}
 */
function delete_text()
{
return 'Are you sure you want to delete the invoice record "' +
	order_number + '" and ALL related order items? ' +
	'\n\nYou CANNOT UNDO this action!'
}

/**
 * @properties={type:12,typeid:36,uuid:"97785727-1c91-4cb8-bf08-23fb40c922e6"}
 */
function icon_display()
{
var top = '<html><img border=0 src="media:///'

if(order_id == globals.curID_order)
{
	return top + 'nav_right_red_whiteBg.gif"></html>'
}
else
{
	return top + 'greyNav_right.gif"></html>'
}
}

/**
 * @properties={type:12,typeid:36,uuid:"87ce91bb-13d6-4617-b8c1-9855e7bcfa72"}
 */
function list_display()
{
var str = ''

if(order_number)
{
	str = order_number + ''
}
else
{
	str = "ID: " + order_id
}

if(orders_to_companies && orders_to_companies.company_name)
{
	str += ' - ' + orders_to_companies.company_name
}


if(str.length > 24)
{
	return str.substr(0,22) + '...'
}
else
{
	return str
}

}

/**
 * @properties={type:12,typeid:36,uuid:"e331531e-0347-4d10-80c2-e0484db974bf"}
 */
function order_month_year_display()
{
var monthNames = new Array('January','February','March','April','May','June','July','August','September','October','November','December')
var year = order_date.getFullYear();

return monthNames[order_date.getMonth()] + ' ' + year
}

/**
 * @properties={type:6,typeid:36,uuid:"0966b46a-e6cc-49c2-a152-89fa7ed6bca3"}
 */
function order_subtotal()
{
if(orders_to_order_items)
{
	return orders_to_order_items.sum_extended
}
else
{
	return 0
}
}

/**
 * @properties={type:6,typeid:36,uuid:"fab95b71-ea94-4dd6-aa26-68b38396ae40"}
 */
function order_total()
{
if(orders_to_order_items)
{
	return (orders_to_order_items.sum_extended - amt_discount) + amt_shipping + amt_tax
}
else
{
	return 0
}
}

/**
 * @properties={type:12,typeid:36,uuid:"729a3102-369e-4bb5-85ad-7b425eec89af"}
 */
function paid_display()
{
if(is_paid == 1)
{
	return "<HTML><font color='#009900'>&nbsp;&nbsp;PAID</font></HTML>"
}
else
{
	return "<HTML><font color='#cc0000'>&nbsp;&nbsp;PENDING</font></HTML>"
}
}

/**
 * @properties={type:12,typeid:36,uuid:"f14f952f-1978-4a24-84a7-c54869c639df"}
 */
function ship_address_html()
{
var str = '<html>'
if(company_id) str += '<b>' + orders_to_companies.company_name + '</b>'
if(contact_id) str += '\n' + orders_to_contacts.name_fl

if(orders_shipaddr_to_addresses)
{
	str += '\n' + orders_shipaddr_to_addresses.address_display_calc
}

str = utils.stringReplace(str, '\n', '<br>')
return str + '</html>'
}

/**
 * @properties={type:6,typeid:36,uuid:"98298316-600a-49d5-977e-959ac076e495"}
 */
function subtotal_after_discount()
{
if(amt_discount > 0)
{
	return order_subtotal - amt_discount
}
else
{
	return order_subtotal
}
}

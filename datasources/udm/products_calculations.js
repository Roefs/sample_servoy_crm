/**
 * @properties={type:12,typeid:36,uuid:"580035a9-e25c-4da3-80ba-ec7fbe53e894"}
 */
function delete_text()
{
return 'Are you sure you want to delete the product record "' +
	product_number + ' - ' + product_name + '? ' +
	'\n\nYou CANNOT UNDO this action!'
}

/**
 * @properties={type:12,typeid:36,uuid:"f1242782-2d13-4750-ad98-762901328c5e"}
 */
function icon_display()
{
var top = '<html><img border=0 src="media:///'

if(product_id == globals.curID_product)
{
	return top + 'nav_right_red_whiteBg.gif"></html>'
}
else
{
	return top + 'greyNav_right.gif"></html>'
}
}

/**
 * @properties={type:12,typeid:36,uuid:"00c84f5c-d300-41ae-9136-9e7a92639aed"}
 */
function list_display() {
	var txt;
	if(product_number && product_name)
	{
		txt = product_number + ' - ' + product_name
	}
	else if(product_number)
	{
		return product_number
	}
	else if(product_name)
	{
		txt = product_name
	}
	
	if(txt.length > 24)
	{
		return txt.substr(0,22) + '...'
	}
	else
	{
		return txt
	}
}

/**
 * @properties={type:6,typeid:36,uuid:"61226d01-8fc9-4454-881d-084cee90b7ba"}
 */
function margin()
{
if(cost_each && price_each)
{
	return price_each - cost_each
}
else
{
	return null
}
}

/**
 * @properties={type:6,typeid:36,uuid:"a322fa27-1cbc-455e-83fe-bd7794b48562"}
 */
function margin_pct()
{
if(margin)
{
	return (margin/price_each)
}
else
{
	return null
}
}

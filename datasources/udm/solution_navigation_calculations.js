/**
 * @properties={type:12,typeid:36,uuid:"e0183126-e8d1-4799-9669-5319ca5d9420"}
 */
function display_icon() {
	if(icon_name)
	{
		return '<html><div align="center"><img src="media:///' + icon_name + '" border=0></div></html>'
	}
	else
	{
		return '<html>&nbsp;</html>'
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"d2a7de2f-dc31-48d4-b7d8-5091e283ffb5"}
 */
function display_row() {
	var HTML = '<html><table border="0" cellpadding="0" cellspacing="0" with="195">'
	
	if(globals.nav_itemName != '' && globals.nav_itemName != null && item_name == globals.nav_itemName)
	{
		HTML += '<tr bgcolor="#f0f0f0" width="195" height="25">'
	}
	else
	{
		HTML += '<tr bgcolor="#ffffff" width="195" height="25">'
	}
	
	var icon = '&nbsp;&nbsp;'
	
	/*
	if(icon_name) icon += '<img src="media:///' + icon_name + '" border=0>&nbsp;'
	*/
	
	if(globals.nav_itemName != '' && globals.nav_itemName != null && item_name == globals.nav_itemName)
	{
		HTML += '<td width="175" height="25" valign="bottom">' + icon + '<b>&nbsp;' + item_name + '</b>'
	}
	else if(item_name)
	{
		HTML += '<td width="175" height="25" valign="bottom">' + icon + '&nbsp;'  + item_name 
	}
	
	return HTML + '</td></tr></table></html>'
}

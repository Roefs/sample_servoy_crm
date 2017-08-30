/**
 * @properties={type:12,typeid:36,uuid:"ddc27687-dfc5-4070-bd08-6507fa588db7"}
 */
function delete_text()
{
return 'Are you sure you want to delete the company record for\n"' +
	company_name + '" and ALL related contacts, orders, etc.? ' +
	'\n\nYou CANNOT UNDO this action!'
}

/**
 * @properties={type:12,typeid:36,uuid:"af6e7b3d-1432-4caf-af38-1cdc07f7e9fa"}
 */
function icon_display()
{
var top = '<html><img border=0 src="media:///'

if(company_id == globals.curID_company)
{
	return top + 'nav_right_red_whiteBg.gif"></html>'
}
else
{
	return top + 'greyNav_right.gif"></html>'
}
}

/**
 * @properties={type:12,typeid:36,uuid:"d5d8f7d6-2c5e-4c58-88be-5c0592dc3df1"}
 */
function list_display()
{
if(company_name)
{
	if(company_name.length > 24)
	{
		return company_name.substr(0,22) + '...'
	}
	else
	{
		return company_name
	}
}
else
{
	return "UNKNOWN"
}
}

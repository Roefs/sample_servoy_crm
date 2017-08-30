/**
 * @properties={type:12,typeid:36,uuid:"0b7b6f22-21c8-46dd-bc6c-90bfe5c4ecff"}
 */
function delete_text()
{
return 'Are you sure you want to delete the contact record for\n"' +
	name_first + ' ' + name_last + '" and ALL their related data? ' +
	'\n\nYou CANNOT UNDO this action!'
}

/**
 * @properties={type:12,typeid:36,uuid:"c3779d5b-b742-41e2-918c-cf6116ab0e7d"}
 */
function email_link()
{
if(email)
{
	return '<html><a href="mailto:' + email + '">Email</a></html>'
}
else
{
	return "No Email"
}
}

/**
 * @properties={type:12,typeid:36,uuid:"141ada9f-9f5e-4d7e-aa40-2a38fb65853e"}
 */
function icon_display()
{
var top = '<html><img border=0 src="media:///'

if(contact_id == globals.curID_contact)
{
	return top + 'nav_right_red_whiteBg.gif"></html>'
}
else
{
	return top + 'greyNav_right.gif"></html>'
}
}

/**
 * @properties={type:12,typeid:36,uuid:"bddc2b4f-0b6d-4bd4-86a2-5c01a7a2ad75"}
 */
function list_display()
{
if(name_lf)
{
	if(name_lf.length > 24)
	{
		return name_lf.substr(0,22) + "..."
	}
	else
	{
		return name_lf
	}
}
else
{
	return "UNKNOWN"
}
}

/**
 * @properties={type:12,typeid:36,uuid:"0292a650-ad79-4049-b44c-c3c84a335a7c"}
 */
function mail_label()
{
if(mail_address_id)
{
	var address = null
	if(contacts_to_companies && contacts_to_companies.company_name && mail_use_company == 1) address = contacts_to_companies.company_name
	
	if(address)
	{
		address += '\n' + name_fl
	}
	else
	{
		address = name_fl
	}
	
	if(contacts_to_addresses)
	{
		address += '\n' + contacts_to_addresses.address_display_calc
		
		if(contacts_to_addresses.country && mail_use_country == 1) address += '\n' + contacts_to_addresses.country
	}
	
	
	return address
}
else
{
	return ''
}
}

/**
 * @properties={type:12,typeid:36,uuid:"b117df36-1fef-4508-a72c-f36b0eb7ad8d"}
 */
function name_fl() {
	if(name_first && name_last)
	{
		return name_first + " " + name_last
	}
	else if(name_last)
	{
		return name_last
	}
	else if(name_first)
	{
		return name_first
	}
	return null;
}

/**
 * @properties={type:12,typeid:36,uuid:"761abc3d-bd81-489d-8930-528c524a881d"}
 */
function name_lf()
{
if(name_first && name_last)
{
	return name_last + ", " + name_first
}
else if(name_last & !name_first)
{
	return name_last
}
else
{
	return "?, " + name_first
}
}

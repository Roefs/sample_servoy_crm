/**
 * @properties={typeid:24,uuid:"4af23792-373f-4cc0-b166-457e4ba7e437"}
 */
function sub_buildReport()
{
	//setup the report HTML when needed
	var html = '<html><body>'
	var i;
	var record = ''

	//build top table
	html += '<table width=100% cellpadding=1 cellspacing=0>'

	//add header line
	html += '<tr bgcolor="#cccccc"><td colspan="6" height=20><b>&nbsp;&nbsp;General Info</b></td></tr>'
	html += '<tr><td><b>ID</b></td><td><b>Company Type</b></td><td><b>Industry</b></td>' +
	'<td><b>Category</b></td></tr>'

	html += '<tr>'
	html += '<td valign="top">' + company_id + '</td>'
	html += '<td valign="top">' + application.getValueListDisplayValue('company_types', company_type_id) + '</td>'
	html += '<td valign="top">' + company_industry + '</td>'
	html += '<td valign="top">' + company_category + '</td>'
	html += '</tr>'

	html += '<tr><td colspan="2"><b>Company URL</b></td><td colspan="2"><b>Company Email</b></td></tr>'

	html += '<tr>'
	html += '<td valign="top" colspan="2">' + company_url + '</td>'
	html += '<td valign="top" colspan="2">' + company_email + '</td>'
	html += '</tr>'

	html += '<tr><td colspan="2"><b>Description</b></td><td colspan="2"><b>Notes</b></td></tr>'

	html += '<tr>'
	html += '<td valign="top" colspan="2">' + company_description + '</td>'
	html += '<td valign="top" colspan="2">' + company_notes + '</td>'
	html += '</tr></table><p>'


	var max = companies_to_addresses.getSize()
	if(max > 0)
	{
		//build a table for the addresses
		html += '<table width=100% cellpadding=1 cellspacing=0>'
		//add header line
		html += '<tr bgcolor="#cccccc"><td colspan="6" height=20><b>&nbsp;&nbsp;Addresses</b></td></tr>'
		html += '<tr><td><b>Type</b></td><td><b>Address Line 1</b></td><td><b>Address Line 2</b></td>' +
		'<td><b>City</b></td><td><b>State</b></td><td><b>Post Code</b></td></tr>'

		for ( i = 1 ; i <=max ; i++ )
		{
			record = companies_to_addresses.getRecord(i)
			html += '<tr>'
			html += '<td valign="top">' + application.getValueListDisplayValue('address_types', record.address_type_id) + '</td>'
			html += '<td valign="top">' + record.line_1 + '</td>'
			html += '<td valign="top">' + record.line_2 + '</td>'
			html += '<td valign="top">' + record.city + '</td>'
			html += '<td valign="top">' + record.state + '</td>'
			html += '<td valign="top">' + record.zipcode + '</td>'
			html += '</tr>'
		}
		html += '</table><p>'
	}

	//build a table for the contacts

	max = companies_to_contacts.getSize()
	if(max > 0)
	{
		//build a table for the addresses
		html += '<table width=100% cellpadding=1 cellspacing=0>'
		//add header line
		html += '<tr bgcolor="#cccccc"><td colspan="4" height=20><b>&nbsp;&nbsp;Contacts</b></td></tr>'
		html += '<tr><td><b>Name</b></td><td><b>Title</b></td><td><b>Direct Phone</b></td>' +
		'<td><b>Email</b></td></tr>'

		for ( i = 1 ; i <=max ; i++ )
		{
			record = companies_to_contacts.getRecord(i)
			html += '<tr>'
			html += '<td valign="top">' + record.name_lf + '</td>'
			html += '<td valign="top">' + record.job_title + '</td>'
			html += '<td valign="top">' + record.phone_direct + '</td>'
			html += '<td valign="top">' + record.email + '</td>'
			html += '</tr>'
		}
		html += '</table><p>'
	}

	//build a table for the orders if any

	max = companies_to_orders.getSize()
	if(max > 0)
	{
		//build a table for the addresses
		html += '<table width=100% cellpadding=1 cellspacing=0>'
		//add header line
		html += '<tr bgcolor="#cccccc"><td colspan="4" height=20><b>&nbsp;&nbsp;Orders</b></td></tr>'
		html += '<tr><td><b>Order Num</b></td><td><b>Date</b></td><td><b>Amount</b></td>' +
		'<td><b>Status</b></td></tr>'

		for ( i = 1 ; i <=max ; i++ )
		{
			record = companies_to_orders.getRecord(i)
			html += '<tr>'
			html += '<td valign="top">' + record.order_number + '</td>'
			html += '<td valign="top">' + utils.dateFormat(record.order_date, 'MMM d, yyyy') + '</td>'
			html += '<td valign="top">' + utils.numberFormat(record.order_total, '¤###,###,###.00') + '</td>'
			html += '<td valign="top">' + record.paid_display + '</td>'
			html += '</tr>'
		}

		html += '</table>'
	}

	html += '<p>' + html_sales

	globals.tempHTML = html
}

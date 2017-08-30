/**
 * @properties={typeid:24,uuid:"a0c21699-fea8-4445-81e4-8494edb62c56"}
 * @AllowToRunInFind
 */
function btn_search()
{
	/** @type String */
	var frm = currentcontroller.getName();
	/** @type String */
	var search = globals.nav_search

	if(search)
	{
		var dataType = 'str'
		var searchStr = '%' + search + '%'
		var op = ""

		//see if there are any operators (< > = !=) entered
		if(search.indexOf('!=') != -1)
		{
			op = '!='
		}
		else if(search.indexOf('>=') != -1)
		{
			op = '>='
		}
		else if(search.indexOf('>') != -1)
		{
			op = '>'
		}
		else if(search.indexOf('<=') != -1)
		{
			op = '<='
		}
		else if(search.indexOf('<') != -1)
		{
			op = '<'
		}
		else if(search.indexOf('=') != -1)
		{
			op = '='
		}

		if(op) search = utils.stringReplace(search, op, '') //take off the operator to see if date or num

		//try to guess what type of data is entered in the search
		if(search.indexOf('/') != -1 || search.indexOf('-') != -1)
		{
			dataType = 'date' //probably a date
			search = new Date(search)
			searchStr = op + search
		}
		else if(search.indexOf('.') != -1 && !isNaN(parseFloat(search)))
		{
			dataType = 'number' //probably a number
			search = parseFloat(search);
			searchStr = op + search
		}
		else if(!isNaN(parseInt(search)) && search.indexOf('.') == -1)
		{
			dataType = 'int' //probably an integer
			search = parseInt(search, 10);
			searchStr = op + search
		}

		//COMPANY FIND
		if(frm.indexOf('company') >= 0)
		{
			//there is no numeric or date data - so show dialog
			if(dataType != 'str')
			{
				globals.showErrorDialog('There is no numeric or date data to find in customers.', null, 'OK', null, null, null);
				elements.fld_search.selectAll()
				return
			}
			else
			{
				if (!forms[frm].controller.find()) return; //cannot enter find, previous edits can't be saved?
			}

			//on the companies form
			forms[frm]['company_name'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_industry'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_email'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_description'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_category'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_id'] = search
		}
		//CONTACTS FIND
		else if(frm.indexOf('contacts') >= 0)
		{
			//there is no numeric or date data - so show dialog
			if(dataType != 'str')
			{
				globals.showErrorDialog('There is no numeric or date data to find in contacts.', null, 'OK', null, null, null);
				elements.fld_search.selectAll()
				return
			}
			else
			{
				if (!forms[frm].controller.find()) return; //cannot enter find, previous edits can't be saved?
			}

			forms[frm]['name_first'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['name_last'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['name_middle'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['phone_cell'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['phone_direct'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['fax_direct'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['job_title'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['contacts_to_companies'].company_name = searchStr

		}
		//ORDERS FIND
		else if(frm.indexOf('orders') >= 0)
		{
			if (!forms[frm].controller.find()) return; //cannot enter find, previous edits can't be saved?

			if(dataType == 'int')
			{
				forms[frm]['order_number'] = searchStr
			}
			else if(dataType == 'number')
			{
				forms[frm]['order_total'] = searchStr
			}
			else if(dataType == 'date')
			{
				forms[frm]['order_date'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['shippeddate'] = searchStr
			}
			else //string
			{
				forms[frm].controller.newRecord()
				forms[frm]['notes'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['notes_internal'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['paid_number'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['terms'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['orders_to_companies'].company_name = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['po_number'] = searchStr
			}
		}
		//PRODUCTS FIND
		if(frm.indexOf('products') >= 0)
		{
			if (!forms[frm].controller.find()) return; //cannot enter find, previous edits can't be saved?

			if(dataType == 'int')
			{
				forms[frm]['product_id'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['product_number'] = searchStr
			}
			else if(dataType == 'number' && (search.indexOf("cost ") != -1 || search.indexOf("cost ea") != -1))
			{
				forms[frm]['cost_each'] = search
			}
			else if(dataType == 'number' && (search.indexOf("price ") != -1 || search.indexOf("price ea") != -1))
			{
				forms[frm]['price_each'] = search
			}
			else if(dataType == 'number')
			{
				forms[frm]['cost_each'] = search
				forms[frm].controller.newRecord()
				forms[frm]['price_each'] = search
			}
			else
			{
				forms[frm]['product_name'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['description'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['order_description'] = searchStr
			}
		}

		//perform the search
		var found = forms[frm].controller.search()

		//see if anything was found
		if(found == 0)
		{
			forms[frm].controller.loadAllRecords()
			globals.showErrorDialog('No records were found matching your search request.', null, null, null, null, null)
		}
		else
		{
			//show the "show all" button
			forms.frm_nav_buttons.sub_showShowAll()
		}
	}
	else
	{
		//empty search - so show all
		forms.frm_nav_buttons.btn_showAll()
		elements.fld_search.requestFocus(false)
	}
}

/**
 * @properties={typeid:24,uuid:"683fc232-dd5d-499c-99c2-3bbdbe92300a"}
 * @SuppressWarnings(unused)
 */
function sub_toggleRecList()
{
	//make the rec list bigger or smaller
	var lh = elements.tabs_recList.getHeight()
	var lw = elements.tabs_recList.getWidth()

	var nx = elements.tabs_solNav.getLocationX()
	var ny = elements.tabs_solNav.getLocationY()

	if(lh > 23)
	{
		//records currently showing - so hide
		elements.tabs_recList.setSize(lw, 23)
	}
	else
	{
		//records not showing - so show list
		elements.tabs_recList.setSize(lw, 346)
	}

	elements.tabs_solNav.setLocation(nx, elements.tabs_recList.getHeight()+ 2)
}

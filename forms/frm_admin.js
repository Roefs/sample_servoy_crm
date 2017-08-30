/**
 * @properties={typeid:24,uuid:"1251746d-f682-4c1f-9b48-7dcf18c6480d"}
 */
function btn_performSQL()
{
	if(! globals.core_sql_sqlQuery)
	{
		//no query entered
		globals.showErrorDialog('No SQL query entered.',null,'OK', null, null, null);
		return
	}

	//set the variable to the entered query
	var query = globals.core_sql_sqlQuery;

	//if only a part of the query is hilighted - then use that
//	if(elements.sqlQuery.getSelectedText()) query = elements.sqlQuery.getSelectedText();  
	//Commented out because getSelectedText on TextArea in WebClient doens't work properly - See Cases SVY-283 and SVY-1257
	
	//there is a query - so try to run it
	//Get a dataset based on query
	var maxReturnedRows = 1000;//useful to limit number of rows
	var sname = controller.getDataSource();
	var srvname = sname.split('/');
	var dataset = databaseManager.getDataSetByQuery(srvname[1], query, null, maxReturnedRows);
	var err = dataset.getException()

	if(err != null && err.getMessage() != undefined)
	{
		globals.showErrorDialog('An error occurred with your query:\n\n' + err.getMessage(),null,'OK', null, null, null)
		return
	}

	//setup the top HTML
	var myHTML = globals.getTopHTML()
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) myHTML = '<html>'

	globals.core_sql_sqlResult = myHTML + '<b>QUERY: </b>' + query + '<br><br>' + dataset.getAsHTML() + '</html>';
}

/**
 * @properties={typeid:24,uuid:"8d9a59ef-b880-4e5b-a287-563a107c285d"}
 */
function doEdit()
{
	_super.doEdit()
	
	forms.lst_admin_solutionPrefs.controller.readOnly = false
	forms.frm_admin_vl_choice.controller.readOnly = false

	//show add & delete buttons on the value list
	forms.frm_admin_vl_choice.elements.btn_add.visible = true
	forms.frm_admin_vl_choice.elements.btn_delete.visible = true
}

/**
 * @properties={typeid:24,uuid:"9e49caec-dd04-4386-8c98-60d96c32b3c0"}
 */
function hide_btn_reset_fields()
{
	_super.hide_btn_reset_fields()

	elements.tabs_prefs.readOnly = true
	elements.tabs_valueLists.readOnly = true

	//hide add & delete buttons on the value list
	forms.frm_admin_vl_choice.elements.btn_add.visible = false
	forms.frm_admin_vl_choice.elements.btn_delete.visible = false
}

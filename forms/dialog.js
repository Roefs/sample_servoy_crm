/**
 * @properties={typeid:24,uuid:"23227f7a-7b96-4576-8bbb-aa44c910fa64"}
 */
function btn_3rdBtn()
{
	//set a global to the text of the button pressed
	globals.dialog_buttonPressed = elements.btn_3.text
	
	if(globals.okToCommit == 1)
	{
		if(globals.isEditing()) globals.saveEdits()
	}
	application.getWindow('Dialog').hide();
	globals.enableBgElements();
	
	if(globals.dialog_performMethod)
	{
		//perform whatever method is in the global
		eval(globals.dialog_performMethod)
		globals.dialog_performMethod = null
	}
}

/**
 * @properties={typeid:24,uuid:"833d01cf-3cc7-4a1c-b50d-4c6c9d46b368"}
 */
function btn_cancel()
{
	//set a global to the text of the button pressed
	globals.dialog_buttonPressed = elements.btn_cancel.text
	
	if(globals.okToCommit == 1)
	{
		if(globals.isEditing()) globals.cancelEditing()
	}
	application.getWindow('Dialog').hide();
	globals.enableBgElements();
}

/**
 * @properties={typeid:24,uuid:"ab4ea82f-114b-4d88-9627-72bc01cb9c32"}
 */
function btn_ok()
{
	//set a global to the text of the button pressed
	globals.dialog_buttonPressed = elements.btn_ok.text
	
	if(globals.okToCommit == 1)
	{
		if(globals.isEditing()) globals.saveEdits()
	}
	
	databaseManager.saveData();
	
	application.getWindow('Dialog').hide();
	globals.enableBgElements();
}

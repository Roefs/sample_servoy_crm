/**
 * @properties={typeid:24,uuid:"4917c9b1-8759-48e8-b848-5d63b81ad360"}
 */
function btn_addImage()
{
	databaseManager.setAutoSave(false);
	
	//Shows a file open dialog, by default files and folders can be selected
	var file = plugins.file.showFileOpenDialog(0,globals.default_image_directory);
	
	//if they didn't "cancel" this dialog
	if(file)
	{
		//read in the file
		var rawData = plugins.file.readFile(file.getAbsolutePath());

		if(rawData)
		{
			var fileName = file.getName();
			var ext = utils.stringRight(fileName, 3);
			var type = plugins.images.getImage(rawData);
			var contentType = type.getContentType();
	
			if(utils.stringPatternCount(contentType, 'image') > 0)
			{
				//it's an image we can display
//				image_thumbnail = application.createJPGImage(rawData, 90, 90);
				
				var img_raw = plugins.images.getImage(rawData);
				image_thumbnail = img_raw.resize(90,90);
				globals.smart_chg = 1;
			}
			else
			{
				//there will be no display
				image_thumbnail = null;
				//show error message!
//				globals.svyCore_dlg_warning('<html>This is<b> NOT an image file!</b><br>Please select a different file.</html>','','OK') - the method is not defined
				return;
			}

			image_name = fileName;
			image_type = ext;
			image_mime_type = contentType;
			product_image = rawData;

			sub_setPreviewLabels();
		}
	}
}

/**
 * @properties={typeid:24,uuid:"64FA3E0F-0CEA-4904-AC11-44307F40DC74"}
 */
function product_image_dataChange() {
	databaseManager.setAutoSave(false);
	
	if (globals.smart_chg == 0) {
		var rawData = product_image;

		if(rawData)
		{
			var fileName = product_image_filename;
			var ext = utils.stringRight(fileName, 3);
			var type = plugins.images.getImage(rawData);
			var contentType = type.getContentType();

			if(utils.stringPatternCount(contentType, 'image') > 0)
			{
				//it's an image we can display
				//image_thumbnail = application.createJPGImage(rawData, 90, 90);  - depricated method

				var img_raw = plugins.images.getImage(rawData);
				image_thumbnail = img_raw.resize(90,90);
			}
			else
			{
				//there will be no display
				image_thumbnail = null;
				//show error message!
//				globals.svyCore_dlg_warning('<html>This is<b> NOT an image file!</b><br>Please select a different file.</html>','','OK') - the method is not defined
				return;
			}
			image_type = ext;
			image_name = product_image_filename;
			image_mime_type = product_image_mimetype;

			sub_setPreviewLabels();
		}
	}
	else {
		globals.smart_chg = 0;
	}
	if (product_image_mimetype == null)
	{
		image_mime_type = null
		image_name = null
		image_thumbnail = null
		image_type = null
		product_image = null;
		product_image_filename = null;
		product_image_mimetype = null;
		sub_setPreviewLabels();
	}
}

/**
 * @properties={typeid:24,uuid:"65b500da-e795-4529-9dcd-a18569e2a647"}
 */
function btn_deleteImage()
{
	if(product_image)
	{
		//show a warning dialog
		globals.showWarningDialog('Are you sure you want to delete this image?', 'forms.frm_products.sub_clearImage()','Cancel','Delete', null, null)
	}
}

/**
 * @properties={typeid:24,uuid:"358f066f-a0d8-45fc-bdeb-7cda4fd22d70"}
 */
function btn_save()
{
	//check to make sure all the fields are filled out
	/*
if(!bill_address_id){globals.showErrorDialog('You must choose a billing address.'); return;}
	 */

	_super.btn_save()

	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT || application.getApplicationType() == APPLICATION_TYPES.NG_CLIENT) onRecordSelect(); //for web client - to refresh buttons
}

/**
 * @properties={typeid:24,uuid:"b7511ef6-7e46-4f7e-831e-65d4a988557e"}
 */
function doEdit()
{
	_super.doEdit();

	//don't need image buttons for webclient - at all
	if((application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT) && (application.getApplicationType() != APPLICATION_TYPES.NG_CLIENT))
	{
		elements.btn_addImage.visible = true

		if(product_image)
		{
			elements.btn_deleteImage.visible = true
		}
	}

	//hide the non combobox fields
	elements.fld_status.visible = false

	//show the comboboxes
	elements.fld_statusc.visible = true
}

/**
 * @properties={typeid:24,uuid:"013f40dc-335f-4158-aad8-b7741635bcc2"}
 */
function hide_btn_reset_fields()
{
	_super.hide_btn_reset_fields()

	//hide the image buttons
	elements.btn_addImage.visible = false
	elements.btn_deleteImage.visible = false


	//hide the comboboxes
	elements.fld_statusc.visible = false

	//show the non combobox fields
	elements.fld_status.visible = true
}

/**
 * @properties={typeid:24,uuid:"b1503288-818c-4efd-8c03-ba6f95204894"}
 */
function onRecordSelect()
{
	globals.curID_product = product_id

	//setup the record status
	globals.setupRecordStatus();

	//show image status
	sub_setPreviewLabels();
}

/**
 * @properties={typeid:24,uuid:"6abfeeda-43d2-4ffe-af76-c690d96ddb34"}
 */
function onShow()
{
	//make read only
	controller.readOnly = true

	//hide save/cancel btsn
	elements.btn_save.visible = false
	elements.btn_cancel.visible = false

	//hide the image add/delete buttons
	elements.btn_addImage.visible = false
	elements.btn_deleteImage.visible = false

	//if web client - then hide the thumbnail and show the underlying image
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT || application.getApplicationType() == APPLICATION_TYPES.NG_CLIENT)
	{
		elements.image_thumbnail.visible = false
		elements.fld_image_product.visible = true
	}
	else
	{
		elements.image_thumbnail.visible = true
		elements.fld_image_product.visible = false
	}

	//hide the comboboxes
	elements.fld_statusc.visible = false
}

/**
 * @properties={typeid:24,uuid:"f38670d4-151c-41e7-ae8b-537fbad4b81d"}
 * @AllowToRunInFind
 */
function print_default()
{
	//load all product records
	forms.rpt_products_list.controller.loadAllRecords()

	//sort for the subsummary report
	forms.rpt_products_list.controller.sort('description asc')
	globals.printRoutine('rpt_products_list', null);
}

/**
 * @properties={typeid:24,uuid:"620d7611-b231-4bea-8c0f-74764df2626c"}
 */
function sub_clearImage()
{
	if(globals.core_dlg_buttonPressed == 'Delete')
	{
		image_mime_type = null
		image_name = null
		image_thumbnail = null
		image_type = null
		product_image = null;
		product_image_filename = null;
		product_image_mimetype = null;
	}
}

/**
 * @properties={typeid:24,uuid:"590b71f5-882e-4aab-b729-5848b47efcf7"}
 */
function sub_setPreviewLabels()
{
	if(product_image && (utils.stringPatternCount(image_mime_type, 'image') == 0 || !image_mime_type))
	{
		//show that there is no preview for this item
		elements.lbl_imagePreview.text = '<html><body><center>No Preview for .' + image_type + ' files</center></body></html>';
		elements.lbl_imagePreview.visible = true;
		application.updateUI(100);
	}
	else if(!product_image)
	{
		elements.lbl_imagePreview.text = 'No Image';
		elements.lbl_imagePreview.visible = true;
		application.updateUI(100);
	}
	else
	{
		elements.lbl_imagePreview.text = '';
		elements.lbl_imagePreview.visible = false;
		application.updateUI(100);
	}
}

/**
 * @properties={typeid:24,uuid:"af090a02-a3bc-46f6-ae1a-44c5f77a8943"}
 */
function sub_showProductOrders()
{
	//go to related order records with this contact on it

	//write a query to find all the unique orders that have this product on it
	var query = 'select distinct order_id from order_items where product_id = ' + product_id +
	' order by order_id'

	//Get a dataset based on query
	var maxReturnedRows = 500;//useful to limit number of rows
	var ds = controller.getDataSource().split('/');
	var dataset = databaseManager.getDataSetByQuery(ds[1], query, null, maxReturnedRows);

	if(dataset.getMaxRowIndex() > 0)
	{
		forms.lst_orders.controller.loadRecords(dataset)

		//navigate to the orders tab
		forms.lst_solution_navigation.controller.setSelectedIndex(3) //orders is 3

		//change tabs
		forms.lst_solution_navigation.btn_goForm()
	}
}

/**
 * @properties={typeid:24,uuid:"af3c7517-06fb-45e5-ae67-ce0d12bf4178"}
 */
function validate_beforeDelete()
{
	//see if it's used on any orders
	var cnt = products_to_order_items.getSize()

	if(cnt > 0)
	{
		//there are orders that use this item - so don't allow the delete
		//show dialog and return 1
		//show the tabpanel "dialog"
		globals.showErrorDialog("You can't delete a product that has orders.\n\nDelete all the order items on the orders first.", 'forms.frm_products.sub_showProductOrders()','OK', null, null, null);
		return 1
	}
	else
	{
		return 0
	}
}

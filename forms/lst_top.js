/**
 * @properties={typeid:24,uuid:"30F48217-2D7D-4F43-ABED-F99F074CD12A"}
 */
function btn_sortAsc()
{
	elements.btn_sortAsc.imageURL = 'media:///sort_asc_blk.gif';
	elements.btn_sortDesc.imageURL = 'media:///sort_desc_grey.gif';
}

/**
 * @properties={typeid:24,uuid:"881761B0-6FA3-4068-A52D-47A8AB74051E"}
 */
function btn_sortDesc()
{
	elements.btn_sortAsc.imageURL = 'media:///sort_asc_grey.gif';
	elements.btn_sortDesc.imageURL = 'media:///sort_desc_blk.gif';
}

/**
 * @properties={typeid:24,uuid:"86D6FC1B-D102-44F2-998E-4B3FF0950174"}
 */
function btn_toggleList()
{
	//zoom the record list open and closed
	//make the rec list bigger or smaller
	var lh = forms.frm_nav_main.elements.tabs_recList.getHeight()
	if(lh > 23)
	{
		//expanded - so make smaller
//		elements.btn_triangle.setImageURL('media:///arrow_closed.gif')
	}
	else
	{
		//not expanded - so make bigger
//		elements.btn_triangle.setImageURL('media:///arrow_open.gif')
	}
	
	forms.frm_nav_main.sub_toggleRecList();
}

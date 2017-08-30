/**
 * @properties={typeid:24,uuid:"b8898e73-56ca-4e07-be8b-3d31eab817e7"}
 */
function btn_setContactMailingAddress()
{
	gcurcontactid_to_contacts.mail_address_id = address_id;
	databaseManager.saveData();
}

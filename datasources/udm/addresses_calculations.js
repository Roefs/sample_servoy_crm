/**
 * @properties={type:12,typeid:36,uuid:"6a3b42e9-4887-45c8-8a57-e11db25c04e7"}
 */
function address_csz()
{
var address = ''

if(city || state || zipcode)
{
	if(city && state)
	{
		address += city + ', ' + state
	}
	else if(city && !state)
	{
		address += city
	}
	else if(state && !city)
	{
		address += state
	}
	
	if(zipcode) address += ' ' + zipcode
}

return address
}

/**
 * @properties={type:12,typeid:36,uuid:"11e90526-739b-413f-bae9-b9430d37431b"}
 */
function address_display_calc()
{
var address = null

if(line_1) address = line_1

if(line_2 && address)
{
	address += '\n' + line_2
}
else if(line_2 && !address)
{
	address = line_2
}

if(line_3 && address)
{
	address += '\n' + line_3
}
else if(line_3 && !address)
{
	address = line_3
}

if(line_4 && address)
{
	address += '\n' + line_4
}
else if(line_4 && !address)
{
	address = line_4
}

if(line_5 && address)
{
	address += '\n' + line_5
}
else if(line_5 && !address)
{
	address = line_5
}

if(city || state || zipcode) address += '\n' + address_csz

return address
}

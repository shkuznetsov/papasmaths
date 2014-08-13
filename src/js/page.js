var PapasPage =
{
	init: function ( )
	{
		var $header = $('.header');

		$header.after($header.clone().addClass('shadow'));
	}
};
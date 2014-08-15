var PapasPage =
{
	init: function ( )
	{
		this.$header = $('.header');

		this.addShadowHeader();
	},

	addShadowHeader: function ( )
	{
		this.$header.after(this.$header.clone().addClass('shadow'));
	}
};
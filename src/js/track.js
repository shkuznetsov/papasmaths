var PapasTrack =
{
	init: function ( tracking_id )
	{
		// GA snippet
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', tracking_id, 'auto');
		ga('send', 'pageview');

		this.bindPrintEvents();
	},

	bindPrintEvents: function ( )
	{
		if (window.matchMedia)
		{
			window.matchMedia('print').addListener((function ( mql )
			{
				if (!mql.matches) this.sheetPrinted();
			})
			.bind(this));
		}

		window.onafterprint = this.sheetPrinted.bind(this);
	},

	sheetPrinted: function ( )
	{
		// De-duplicate print events
		if (!this._print_tracked)
		{
			ga('send', 'event', 'Sheet', 'Printed');

			this._print_tracked = true;

			window.setTimeout(function ( ) { PapasTrack._print_tracked = false; }, 1000);
		}
	},

	taskAddInitiated: function ( )
	{
		ga('send', 'event', 'Task', 'Add Initiated');
	},

	taskAddFinalised: function ( spec )
	{
		ga('send', 'event', 'Task', 'Add Finalised', spec);
	},

	taskAddCanceled: function ( )
	{
		ga('send', 'event', 'Task', 'Add Canceled');
	},

	taskEditInitiated: function ( )
	{
		ga('send', 'event', 'Task', 'Edit Initiated');
	},

	taskEditFinalised: function ( spec )
	{
		ga('send', 'event', 'Task', 'Edit Finalised', spec);
	},

	taskEditCanceled: function ( )
	{
		ga('send', 'event', 'Task', 'Edit Canceled');
	},

	taskDeleted: function ( )
	{
		ga('send', 'event', 'Task', 'Deleted');
	}
};
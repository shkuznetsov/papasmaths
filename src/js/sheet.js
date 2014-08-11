var PapasSheet =
{
	tasks: [],

	$tasks_container: null,

	init: function ( )
	{
		$.fx.speeds._default = 100;

		this.$tasks_container = $('#tasks-container');
		this.parseUrl();
		this.registerHashListener();

		this.$add_new_button = $('#add-new-button').on('click', this.onAddNewClicked.bind(this));
		this.$print_button = $('#print-button').on('click', this.onPrintClicked.bind(this));
	},

	registerHashListener: function ( )
	{
		$(window).on('hashchange', (function ( )
		{
			if (!this.ignore_hash_change)
			{
				this.$tasks_container.empty();

				this.tasks = [];

				this.parseUrl();
			}
			else
			{
				this.ignore_hash_change = false;
			}
		})
		.bind(this));
	},

	parseUrl: function ( )
	{
		if (window.location.hash)
		{
			var specs = window.location.hash.substr(1).split(',');

			for (var i in specs)
			{
				this.appendTask(specs[i]);
			}
		}
	},

	onPrintClicked: function ( )
	{
		window.print();

		PapasTrack.sheetPrintClicked();
	},

	onAddNewClicked: function ( )
	{
		this.$add_new_button.fadeOut(function ( )
		{
			this.$add_new_button.before((new PapasEditor()).build());
		}
		.bind(this));

		PapasTrack.taskAddInitiated();
	},

	onAddNewDone: function ( spec )
	{
		if (spec)
		{
			this.appendTask(spec);

			PapasTrack.taskAddFinalised(spec);
		}
		else
		{
			PapasTrack.taskAddCanceled();
		}

		this.$add_new_button.fadeIn(this.rebuildUrl.bind(this));
	},

	appendTask: function ( spec )
	{
		var task = new PapasTask(spec);

		this.$tasks_container.append(task.build());

		this.tasks.push(task);

		return task;
	},

	deleteTask: function ( task )
	{
		var i = this.tasks.indexOf(task);

		if (i != -1)
		{
			delete this.tasks[i];

			this.rebuildUrl();
		}
	},

	rebuildUrl: function ( )
	{
		var fragment = '';

		for (var i in this.tasks) fragment += (fragment ? ',' : '') + this.tasks[i].spec;

		this.ignore_hash_change = true;

		window.location.hash = fragment;
	}
}
var PapasSheet =
{
	TASKS_PER_PAGE: 5,

	tasks: [],

	$pages: [],

	$pages_container: null,

	init: function ( )
	{
		$.fx.speeds._default = 150;

		this.$pages_container = $('#pages-container');
		this.parseUrl();
		this.registerHashListener();

		this.$add_new_button = $('#add-new-button').on('click', this.onAddNewClicked.bind(this));
		this.$print_button = $('#print-button').on('click', this.onPrintClicked.bind(this));

		PapasTrack.bindPrintHandler();
	},

	registerHashListener: function ( )
	{
		$(window).on('hashchange', (function ( )
		{
			if (!this.ignore_hash_change)
			{
				this.$pages = [];

				this.tasks = [];

				this.$pages_container.empty();

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
				this.addTask(specs[i]);
			}

			this.arrangeTaskByPages();
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
			this.addTask(spec);

			this.arrangeTaskByPages();

			PapasTrack.taskAddFinalised(spec);
		}
		else
		{
			PapasTrack.taskAddCanceled();
		}

		this.$add_new_button.fadeIn(this.rebuildUrl.bind(this));
	},

	addTask: function ( spec )
	{
		this.tasks.push(new PapasTask(spec));
	},

	deleteTask: function ( task )
	{
		var i = this.tasks.indexOf(task);

		if (i != -1)
		{
			delete this.tasks[i];

			this.rebuildUrl();

			this.arrangeTaskByPages();
		}
	},

	rebuildUrl: function ( )
	{
		var fragment = '';

		for (var i in this.tasks) fragment += (fragment ? ',' : '') + this.tasks[i].spec;

		this.ignore_hash_change = true;

		window.location.hash = fragment;
	},

	arrangeTaskByPages: function ( )
	{
		for (var i in this.tasks)
		{
			// Shortcuts
			var page_no = Math.floor(i / this.TASKS_PER_PAGE),
				task_no = i % this.TASKS_PER_PAGE,
				$task = this.tasks[i].getElement();

			// Create a page if it doesn't exist
			if (!this.$pages[page_no])
			{
				this.$pages[page_no] = $('<div>').attr('class', 'page').appendTo(this.$pages_container);
			}

			// Page element shortcut
			var $page = this.$pages[page_no];

			// Check if the task is already on the place it belongs
			if (!$task.is($page.children('.task').eq(task_no)))
			{
				if (task_no)
				{
					// Add the task after its predecessor
					this.tasks[i-1].getElement().after($task);
				}
				else
				{
					// Add the task to the page
					$page.append($task);
				}
			}
		}

		// Remove extra pages
		while (this.$pages.length > (page_no + 1))
		{
			this.$pages.pop().remove();
		}
	}
}
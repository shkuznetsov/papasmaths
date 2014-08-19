var PapasSheet =
{
	TASKS_PER_PAGE: 5,

	tasks: [],

	$pages: [],

	$pages_container: null,

	init: function ( )
	{
		$.fx.speeds._default = 150;

		this.$add_button = $('#add-task-button').on('click', this.onAddNewClicked.bind(this));
		this.$print_button = $('.print-button').hide().on('click', this.onPrintClicked.bind(this));
		this.$pages_container = $('#pages-container');

		PapasTitleEditor.init();

		this.parseUrl();

		this.registerHashListener();

		PapasTrack.bindPrintHandler();
	},

	registerHashListener: function ( )
	{
		$(window).on('hashchange', (function ( )
		{
			if (!this.ignore_hash_change)
			{
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
			var hash = window.location.hash.substr(1);
				title_pos = hash.lastIndexOf(':');

			if (title_pos != -1)
			{
				this.title = hash.substr(0, title_pos);

				hash = hash.substr(title_pos + 1);
			}
			else
			{
				this.title = '';
			}

			if (this.specs != hash)
			{
				this.specs = hash.trim();

				this.$pages = [];

				this.tasks = [];

				this.$pages_container.empty();

				if (this.specs)
				{
					var specs = hash.split(',');

					for (var i in specs)
					{
						this.addTask(specs[i]);
					}
				}
			}
		}
		else
		{
			this.title = '';

			this.specs = '';

			this.$pages = [];

			this.tasks = [];

			this.$pages_container.empty();
		}

		PapasTitleEditor.toggleUI(this.title);

		this.updateBrowserTitle();

		this.arrangeTaskByPages();

		this.togglePrintButton();
	},

	isObjectUsed: function ( obj_id, exclude_task )
	{
		for (var i in this.tasks)
		{
			if (this.tasks[i].getObjectId() == obj_id && this.tasks[i] != exclude_task) return true;
		}

		return false;
	},

	togglePrintButton: function ( )
	{
		if (this.tasks.length) this.$print_button.fadeIn();
		else this.$print_button.fadeOut();
	},

	onPrintClicked: function ( )
	{
		window.print();

		PapasTrack.sheetPrintClicked();
	},

	onAddNewClicked: function ( )
	{
		this.$add_button.fadeOut(function ( )
		{
			this.$add_button.before((new PapasEditor()).build());
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

			this.togglePrintButton();

			PapasTrack.taskAddFinalised(spec);
		}
		else
		{
			PapasTrack.taskAddCanceled();
		}

		this.$add_button.fadeIn(this.rebuildUrl.bind(this));
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
			this.tasks.splice(i, 1);

			this.rebuildUrl();

			this.arrangeTaskByPages();

			this.togglePrintButton();
		}
	},

	updateTitle: function ( title )
	{
		this.title = title;

		this.updateBrowserTitle();

		this.rebuildUrl();
	},

	updateBrowserTitle: function ( )
	{
		window.document.title = "Papa's Maths" + (this.title ? (': ' + this.title) : '');
	},

	rebuildUrl: function ( )
	{
		this.specs = '';

		for (var i in this.tasks) this.specs += (this.specs ? ',' : '') + this.tasks[i].spec;

		this.ignore_hash_change = true;

		window.location.hash = (this.title ? (this.title + ':') : '') + this.specs;
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
var PapasTitleEditor =
{
	PLACEHOLDER_TEXT: 'Click here to start entering title text...',

	visible: false, // Nothing displayed

	title: '',

	init: function ( )
	{
		this.$button = $('#add-title-button').on('click', this.onAddClicked.bind(this));
		this.$editor = $('#title-editor');
		this.$input = $('#title-input')
			.on('input keyup change', this.onChanged.bind(this))
			.on('focus', this.hidePlaceholder.bind(this))
			.on('blur', this.showPlaceholder.bind(this));

		this.showPlaceholder();

		$('#title-close').on('click', this.onDeleteClicked.bind(this));
	},

	toggleUI: function ( title )
	{
		this.title = title;

		if (title)
		{
			this.showEditor();
		}
		else
		{
			this.showButton();
		}
	},

	showButton: function ( )
	{
		if (this.visible == 'editor')
		{
			this.$editor.slideUp(this.$button.slideDown.bind(this.$button));
		}
		else if (!this.visible)
		{
			this.$button.show();
		}

		this.visible = 'button';
	},

	showEditor: function ( )
	{
		this.$input.val(this.title);

		if (this.visible == 'button')
		{
			this.$button.slideUp(this.$editor.slideDown.bind(this.$editor));
		}
		else if (!this.visible)
		{
			this.$editor.show();
		}

		this.visible = 'editor';
	},

	onAddClicked: function ( )
	{
		PapasSheet.updateTitle(this.title);

		this.showEditor();
	},

	onDeleteClicked: function ( )
	{
		PapasSheet.updateTitle('');

		this.showButton();
	},

	onChanged: function ( )
	{
		if (this.title != this.$input.val())
		{
			this.title = this.$input.val();

			PapasSheet.updateTitle(this.title);
		}
	},

	hidePlaceholder: function ( )
	{
		this.$input.prop('placeholder', '');
	},

	showPlaceholder: function ( )
	{
		this.$input.prop('placeholder', this.PLACEHOLDER_TEXT);
	}
}
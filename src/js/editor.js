var PapasEditor = function ( task )
{
	if (task)
	{
		this.task = task;

		this.operands = this.task.operands;
		this.operator = this.task.operator;
	}
	else
	{
		this.operands = [[], []];
		this.operator = null;
	}
};

PapasEditor.prototype.build = function ( )
{
	this.$element = $('<div>').attr('class', 'box editor')
		.append(this.buildOperand(0))
		.append(this.buildOperator())
		.append(this.buildOperand(1))
		.append(this.buildControls());

	return this.$element;
};

PapasEditor.prototype.buildOperand = function ( operand_no )
{
	var $element = $('<div>').attr('class', 'square operand'),
		operand = this.operands[operand_no];

	operand.$selectors = [];

	for (var i = 1; i <= 9; ++i)
	{
		operand.$selectors[i] = $('<div>')
			.attr('class', 'objects selector' + ((operand[0] == 'obj' && operand[1] == i) ? ' selected' : ''))
			.append($('<div>').attr('class', 'cnt-' + i))
			.on('click', this.updateOperand.bind(this, operand_no, 'obj', i))
			.appendTo($element);
	}

	operand.$selectors.num = $('<input>')
		.attr('class', 'number selector' + (operand[0] == 'num' ? ' selected' : ''))
		.val(operand[0] == 'num' ? operand[1] : 10)
		.on('click', this.updateOperand.bind(this, operand_no, 'num'))
		.appendTo($element);

	return $element;
};

PapasEditor.prototype.buildOperator = function ( )
{
	var $element = $('<div>').attr('class', 'square operator');

	this.$operator_selectors = {};

	for (var i in PapasTask.OPERATORS)
	{
		var operator = PapasTask.OPERATORS[i];

		this.$operator_selectors[operator] = $('<div>')
			.attr('class', 'selector' + (this.operator == operator ? ' selected' : ''))
			.on('click', this.updateOperator.bind(this, operator))
			.html(PapasTask.OPERATOR_LABELS[i])
			.appendTo($element);
	}

	return $element;
};

PapasEditor.prototype.buildControls = function ( )
{
	this.$save = $('<div>').text('save').on('click', this.done.bind(this, true));

	if (!this.isSpecReady()) this.$save.hide();

	return $('<div>').attr('class', 'controls')
		.append($('<div>').attr('class', 'red').text('cancel').on('click', this.done.bind(this, false)))
		.append(this.$save);
};

PapasEditor.prototype.updateOperand = function ( operand_no, type, value )
{
	// Shorthand
	var operand = this.operands[operand_no];

	// Switch previous one off
	if (operand[0] == 'obj') operand.$selectors[operand[1]].toggleClass('selected', false);
	else if (operand[0] == 'num') operand.$selectors.num.toggleClass('selected', false);

	// Switch the current one on
	operand.$selectors[type == 'num' ? 'num' : value].toggleClass('selected', true).select();

	// Set the value
	operand[0] = type;
	operand[1] = value;

	// Possibly show "save"
	this.checkSpecReady();
};

PapasEditor.prototype.getOperandSpec = function ( operand_no )
{
	if (this.operands[operand_no][0] == 'obj') return PapasTask.OBJECT_NUMS[this.operands[operand_no][1] - 1];
	else if (this.operands[operand_no][0] == 'num') return parseInt(this.operands[operand_no].$selectors.num.val()) || 0;
	else return false;
};

PapasEditor.prototype.updateOperator = function ( operator )
{
	// Switch previous one off
	if (this.operator) this.$operator_selectors[this.operator].toggleClass('selected', false);

	// Switch the current one on
	this.$operator_selectors[operator].toggleClass('selected', true);

	// Set the value
	this.operator = operator;

	// Possibly show "save"
	this.checkSpecReady();
};

PapasEditor.prototype.checkSpecReady = function ( )
{
	if (this.isSpecReady()) this.$save.fadeIn();
};

PapasEditor.prototype.isSpecReady = function ( )
{
	return (this.getOperandSpec(0) !== false) && !!this.operator && (this.getOperandSpec(1) !== false);
};

PapasEditor.prototype.done = function ( save )
{
	this.$element.fadeOut((function ( )
	{
		if (this.task)
		{
			this.task.onEdited(save ? this.toSpec() : false);
		}
		else
		{
			PapasSheet.onAddNewDone(save ? this.toSpec() : false);
		}
	})
	.bind(this));
};

PapasEditor.prototype.toSpec = function ( )
{
	return this.getOperandSpec(0) + this.operator + this.getOperandSpec(1);
};

PapasEditor.prototype.fadeIn = function ( )
{
	this.$element.fadeIn();
};
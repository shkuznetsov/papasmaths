var PapasTask = function ( spec )
{
	this.spec = spec;
};

PapasTask.OPERATORS = ['+', '-', '*', '/', '?'];
PapasTask.OPERATOR_LABELS = ['+', '&minus;', '&times;', '/', '&lt;&gt;'];
PapasTask.OBJECT_NUMS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

PapasTask.prototype.parse = function ( )
{
	var i, opPos, operators = PapasTask.OPERATORS.slice(0);

	operators.unshift(' ');

	this.spec = this.spec.trim();

	for (i in operators) if ((opPos = this.spec.indexOf(operators[i])) > 0)
	{
		this.operator = i ? operators[i] : '+';
		break;
	}

	if (!this.operator) throw 'Operator not found';

	this.operands = [this.parseOperand(this.spec.substr(0, opPos)), this.parseOperand(this.spec.substr(opPos + 1))];
};

PapasTask.prototype.parseOperand = function ( operand )
{
	operand = operand.trim();

	if (operand == parseInt(operand))
	{
		return ['num', parseInt(operand)];
	}

	for (var i in PapasTask.OBJECT_NUMS) if (operand == PapasTask.OBJECT_NUMS[i])
	{
		return ['obj', ++i];
	}

	throw 'Operand "' + operand + '" wasn\'t recognised';
};

PapasTask.prototype.build = function ( )
{
	try
	{
		this.parse();

		if (!this.$element)
		{
			this.$element = $('<div>').attr('class', 'task');
		}
		else
		{
			this.$element.empty();
		}

		if (this.operator == '?')
		{
			this.$element
				.append(this.buildOperand(this.operands[0]))
				.append(this.buildAnswerCell(true))
				.append(this.buildOperand(this.operands[1]));
		}
		else
		{
			this.$element
				.append(this.buildOperand(this.operands[0]))
				.append(this.buildOperator(this.operator))
				.append(this.buildOperand(this.operands[1]))
				.append(this.buildOperator('='))
				.append(this.buildAnswerCell());
		}

		this.$element.append(this.buildControls());
	}
	catch (e)
	{
		this.$element = $('<div>').attr('class', 'error noprint')
			.append($('<div class="header">').text("Erm, this is embarassing, but papa didn't understand this: " + this.spec))
			.append($('<div class="message">').text(e))
			.append($('<div class="close red">').text('delete')
				.on('click', this.onDeleteClicked.bind(this)));
	}

	return this.$element.fadeIn();
};

PapasTask.prototype.buildControls = function ( )
{
	return $('<div>').attr('class', 'controls noprint')
		.append($('<div>').attr('class', 'red').text('delete').click(this.onDeleteClicked.bind(this)))
		.append($('<div>').text('edit').click(this.onEditClicked.bind(this)));

};

PapasTask.prototype.onDeleteClicked = function ( )
{
	this.removeElement(PapasSheet.deleteTask.bind(PapasSheet, this));
};

PapasTask.prototype.onEditClicked = function ( )
{
	this.$element.fadeOut(function ( )
	{
		if (!this.editor)
		{
			this.editor = new PapasEditor(this);

			this.$element.after(this.editor.build());
		}
		else
		{
			this.editor.fadeIn();
		}
	}
	.bind(this));
};

PapasTask.prototype.onEdited = function ( spec )
{
	if (spec)
	{
		this.spec = spec;

		this.build().fadeIn(PapasSheet.rebuildUrl.bind(PapasSheet));
	}
	else
	{
		this.$element.fadeIn();
	}
};

PapasTask.prototype.buildOperand = function ( operand )
{
	var $operand = $('<div>');

	if (operand[0] == 'num')
	{
		$operand.attr('class', 'square text').text(operand[1]);
	}
	else
	{
		if (!this.object)
		{
			this.object = Math.ceil(Math.random() * 50) || 1;

			if (this.object < 10) this.object = '0' + this.object;
		}

		$operand.attr('class', 'square objects count-' + operand[1]);

		for (var i = 1; i <= operand[1]; ++i) $operand.append($('<img>').attr('src', 'img/objects/' + this.object + '.png'));
	}

	return $operand;
};

PapasTask.prototype.buildOperator = function ( operator )
{
	var char = operator == '-' ? '&minus;' : (operator == '*' ? '&times;' : operator);

	return $('<div>').attr('class', 'square text operator').html(char);
};

PapasTask.prototype.buildAnswerCell = function ( moreless )
{
	return $('<div>').attr('class', 'square answer' + (moreless ? ' moreless' : ''));
};

PapasTask.prototype.removeElement = function ( cb )
{
	if (cb)
	{
		this.$element.fadeOut(function ( )
		{
			cb();

			$(this).remove();
		});
	}
	else
	{
		this.$element.remove();
	}
};
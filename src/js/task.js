var PapasTask = function ( spec )
{
	this.spec = spec;
};

PapasTask.OPERATORS = ['+', '-', '*', '/', '?'];
PapasTask.OPERATOR_LABELS = ['+', '&minus;', '&times;', '/', '&lt;&gt;'];
PapasTask.OBJECT_NUMS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
PapasTask.OBJECT_ICONS = 80;
PapasTask.OBJECT_ICON_RANDOMS = 5;

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

PapasTask.prototype.getElement = function ( )
{
	return this.$element || this.build();
};

PapasTask.prototype.build = function ( )
{
	try
	{
		this.parse();

		if (!this.$element)
		{
			this.$element = $('<div>').attr('class', 'box task');
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
		this.$element = $('<div>').attr('class', 'box error noprint')
			.append($('<h1>').text("Erm, this is embarassing, but papa didn't understand this: " + this.spec))
			.append($('<h2>').text(e))
			.append($('<div>').attr('class', 'controls')
				.append($('<div>').attr('class', 'red').text('Delete')
					.on('click', this.onDeleteClicked.bind(this))));
	}

	return this.$element.fadeIn();
};

PapasTask.prototype.buildControls = function ( )
{
	return $('<div>').attr('class', 'controls noprint')
		.append($('<div>').attr('class', 'red').text('Delete').click(this.onDeleteClicked.bind(this)))
		.append($('<div>').text('Edit').click(this.onEditClicked.bind(this)));

};

PapasTask.prototype.onDeleteClicked = function ( )
{
	this.removeElement(PapasSheet.deleteTask.bind(PapasSheet, this));

	PapasTrack.taskDeleted();
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
			this.$element.after(this.editor.fadeIn());
		}

		this.$element.detach();
	}
	.bind(this));

	PapasTrack.taskEditInitiated();
};

PapasTask.prototype.onEdited = function ( spec )
{
	if (spec)
	{
		this.spec = spec;

		this.build().fadeIn(PapasSheet.rebuildUrl.bind(PapasSheet));

		PapasTrack.taskEditFinalised(spec);
	}
	else
	{
		this.$element.fadeIn();

		PapasTrack.taskEditCanceled();
	}

	return this.$element;
};

PapasTask.prototype.getRandomObjectId = function ( )
{
	var randoms = 0;

	while (PapasSheet.isObjectUsed(this.object_id = Math.ceil(Math.random() * PapasTask.OBJECT_ICONS) || 1, this) && (++randoms < PapasTask.OBJECT_ICON_RANDOMS));

	return this.object_id;
};

PapasTask.prototype.getObjectId = function ( )
{
	return this.object_id;
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
			this.object = this.getRandomObjectId();

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
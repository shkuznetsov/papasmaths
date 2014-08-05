var Task = function ( spec )
{
	this.spec = spec;
};

Task.prototype.parse = function ( )
{
	var i, opPos, operators = [' ', '+', '-', '*', '/', '?'];

	this.spec = this.spec.trim();

	for (i in operators) if ((opPos = this.spec.indexOf(operators[i])) > 0)
	{
		this.operator = i ? operators[i] : '+';
		break;
	}

	if (!this.operator) throw 'Operator not found';

	this.operands = [this.parseOperand(this.spec.substr(0, opPos)), this.parseOperand(this.spec.substr(opPos + 1))];

	this.parsed = true;
};

Task.prototype.parseOperand = function ( operand )
{
	var objectNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

	operand = operand.trim();

	if (operand == parseInt(operand))
	{
		return ['num', parseInt(operand)];
	}

	for (var i in objectNums) if (operand == objectNums[i])
	{
		return ['obj', ++i];
	}

	throw 'Operand "' + operand + '" wasn\'t recognised';
};

Task.prototype.build = function ( )
{
	if (!this.parsed)
	{
		try
		{
			this.parse();
		}
		catch (e)
		{
			return $('<div>').attr('class', 'error')
				.append($('<div>').text("Erm, this is embarassing, but papa didn't understand this: " + this.spec))
				.append($('<div>').text(e));
		}
	}

	var $task = $('<div>').attr('class', 'task');

	if (this.operator == '?')
	{
		$task
			.append(this.buildOperand(this.operands[0]))
			.append(this.buildAnswerCell())
			.append(this.buildOperand(this.operands[1]));
	}
	else
	{
		$task
			.append(this.buildOperand(this.operands[0]))
			.append(this.buildOperator(this.operator))
			.append(this.buildOperand(this.operands[1]))
			.append(this.buildOperator('='))
			.append(this.buildAnswerCell());
	}

	return $task;
};

Task.prototype.buildOperand = function ( operand )
{
	var $operand = $('<div>');

	if (operand[0] == 'num')
	{
		$operand.attr('class', 'text').text(operand[1]);
	}
	else
	{
		if (!this.object)
		{
			this.object = Math.ceil(Math.random() * 50) || 1;

			if (this.object < 10) this.object = '0' + this.object;
		}

		$operand.attr('class', 'objects count-' + operand[1]);

		for (var i = 1; i <= operand[1]; ++i) $operand.append($('<img>').attr('src', 'img/objects/' + this.object + '.png'));
	}

	return $operand;
};

Task.prototype.buildOperator = function ( operator )
{
	var char = operator == '-' ? '&minus;' : (operator == '*' ? '&times;' : operator);

	return $('<div>').attr('class', 'text operator').html(char);
};

Task.prototype.buildAnswerCell = function ( )
{
	return $('<div>').attr('class', 'answer');
};
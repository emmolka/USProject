//workers data
const workers = [
	{
		name: 'jan nowak',
		id: 0,
		img: 'man.jpeg',
		tasks: [
			{
				PLN: 6,
				id: 0,
				task: 'Jan'
			},
			{
				PLN: 2,
				id: 1,
				task: 'Do it now'
			},
			{
				PLN: 1,
				id: 2,
				task: 'Zadanie 3'
			}
		]
	},
	{
		name: 'joanna kowalska',
		id: 1,
		img: 'woman.jpg',
		tasks: [
			{
				PLN: 2000,
				id: 0,
				task: 'Kowalska'
			},
			{
				PLN: 211,
				id: 1,
				task: 'task'
			},
			{
				PLN: 2121,
				id: 2,
				task: 'add more items'
			}
		]
	},
	{
		name: 'adam kowalski',
		id: 2,
		img: 'man.jpeg',
		tasks: [
			{
				PLN: 2121,
				id: 0,
				task: 'kowal'
			},
			{
				PLN: 2121,
				id: 1,
				task: 'Zadanie 2'
			},
			{
				PLN: 2121,
				id: 2,
				task: 'Zadanie 3'
			}
		]
	}
];

const debounce = (func, delay) => {
	let debounceTimer;
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
};
// global variables
let currentWorker;
let taskName;
let amount;
const button = $('.button');
const tasks = $('.tasks-grid');

const addElements = (id) => {
	const workerTasks = workers.find((el) => id == el.id).tasks;
	currentWorker = workers.find((el) => id == el.id);

	let sum = 0;
	currentWorker.tasks.map((el) => (sum += el.PLN));

	$('.tasks-row').remove();
	$('.sum-label').remove();

	workerTasks.map((element, index) => {
		let label = '';
		if (index === workerTasks.length - 1) {
			label = `<div class="sum-label"><p>Suma: ${sum} PLN (${Math.round(sum / 4.2) * 100 / 100} EURO)</p></div>`;
		}
		const html = `<div class="tasks-row" id="${element.id}"><div>${element.task}</div><div>${element.PLN} PLN</div><div>${Math.round(
			parseInt(element.PLN) / 4.2 * 100
		) /
			100} EUR</div><div class="trash-icon-div"><ion-icon name="trash" class="trash-icon"></ion-icon>Usuń</div></div>${label}`;
		tasks.append(html);
	});

	const deleteIcon = $('.trash-icon-div');
	deleteIcon.on('click', function() {
		const element = workerTasks.find((el) => el.id == $(this).parent()[0].id);
		workerTasks.splice(workerTasks.indexOf(element), 1);
		addElements(id);
	});
};

const renderWorkers = (workers) => {
	$('#workers-list').empty();
	workers.map((el) => {
		const workersNameArray = el.name.split(' ');
		const workersName = toHigherCase(workersNameArray);
		const html = `<div id=${el.id} class="worker"><img src="./${el.img}" id="${el.id}" class="worker-img"></img><p id="${el.id}"> ${workersName} </p></div>`;
		$('#workers-list').append(html);
	});
};

//event listeners

$('#worker-input').on('keydown', function(e) {
	e.preventDefault();
});

button.on('click', function() {
	if (!currentWorker) {
		return;
	}

	if (taskName && taskName.length > 5 && amount) {
		$('.task-input').removeClass('error-input');
		$('.amount-input').removeClass('error-input');
		amount = parseFloat(amount);
		workers.map((el) => {
			if (el === currentWorker) {
				const newTasks = [
					...currentWorker.tasks,
					{ task: taskName, PLN: amount, id: currentWorker.tasks.length }
				];
				currentWorker.tasks = newTasks;
				el.tasks = newTasks;
			}
		});
		addElements(currentWorker.id);
	} else {
		$('.task-input').addClass('error-input');
		$('.amount-input').addClass('error-input');
	}
});

$('.arrow-icons').on('click', (e) => {
	if (!currentWorker) return;
	if (e.target.id === 'tasks-title') {
		sortByName();
	} else if (e.target.id === 'tasks-amount') {
		sortByAmount();
	}
});

$('#search-users-input').on(
	'input',
	debounce((event) => {
		const searchText = event.target.value.toLowerCase();
		const output = searchText ? workers.filter((item) => item.name.indexOf(searchText) != -1) : workers;
		renderWorkers(output);
	}, 500)
);

$('#search-users-input').on(
	'focus',
	debounce((event) => {
		const searchText = event.target.value;
		const output = searchText ? workers.filter((item) => item.name.indexOf(searchText) != -1) : workers;
		renderWorkers(output);
	}, 500)
);

$('#workers-list').on('click', (e) => {
	const id = e.target.id;
	if (!$('#search-input').hasClass('remove')) {
		$('#workers-list').addClass('remove');
		$('#search-input').addClass('remove');
	} else {
		$('#workers-list').removeClass('remove');
		$('#search-input').removeClass('remove');
	}

	const workerName = workers.find((el) => id == el.id);
	addWorkerLabel(workerName.name);
	addElements(id);
});

$('#worker-input').on('focus', () => {
	$('#search-input').removeClass('remove');
	$('#workers-list').removeClass('remove');
});

$('#search-users-input').on('focus', () => {
	$('#search-input').removeClass('remove');
	$('#workers-list').removeClass('remove');
});

$('body').on('click', () => {
	$('#search-input').addClass('remove');
	$('#workers-list').addClass('remove');
});

$('#worker-input,#search-users-input,.workers-list').on('click', (e) => {
	e.stopPropagation();
});

//function helpers
const taskNameInput = $('.task-input').on('input', (e) => {
	taskName = e.target.value;
});

const amountInput = $('.amount-input').on('input', (e) => {
	amount = e.target.value;
});

const sortByName = () => {
	const sortedTasks = currentWorker.tasks.sort(compareStrings);
	workers.map((element) => {
		if (element.id === currentWorker.id) {
			element.tasks = sortedTasks;
		}
	});
	addElements(currentWorker.id);
};

const sortByAmount = () => {
	const sortedTasks = currentWorker.tasks.sort(compareNumbers);
	workers.map((element) => {
		if (element.id === currentWorker.id) {
			element.tasks = sortedTasks;
		}
	});
	addElements(currentWorker.id);
};

const compareStrings = (a, b) => {
	const wordA = a.task.toUpperCase();
	const wordB = b.task.toUpperCase();

	let comparison = 0;
	if (wordA > wordB) {
		comparison = 1;
	} else if (wordA < wordB) {
		comparison = -1;
	}
	return comparison;
};

const addWorkerLabel = (name) => {
	const nameArray = name.split(' ');
	const newName = toHigherCase(nameArray);
	$('#worker-input').val(newName);
};

const toHigherCase = (array) => {
	return (
		array[0].charAt(0).toUpperCase() +
		array[0].toLowerCase().slice(1) +
		' ' +
		array[1].charAt(0).toUpperCase() +
		array[1].toLowerCase().slice(1)
	);
};

const compareNumbers = (b, a) => {
	const numberA = a.PLN;
	const numberB = b.PLN;
	let comparison = 0;
	if (numberA > numberB) {
		comparison = 1;
	} else if (numberA < numberB) {
		comparison = -1;
	}
	return comparison;
};

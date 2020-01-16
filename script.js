const debounce = (func, delay) => {
	let debounceTimer;
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
};

const tasks = $('.tasks-grid');
const workers = [
	{
		name: 'Jan Nowak',
		id: 0,
		tasks: [
			{
				PLN: '2121',
				id: 0,
				task: 'Zadanie 1'
			},
			{
				PLN: '2121',
				id: 1,
				task: 'Zadanie 2'
			},
			{
				PLN: '2121',
				id: 2,
				task: 'Zadanie 3'
			}
		]
	},
	{
		name: 'Joanna Kowalska',
		id: 1,
		tasks: [
			{
				PLN: '2121',
				id: 0,
				task: 'Zadanie 1'
			},
			{
				PLN: '2121',
				id: 1,
				task: 'Zadanie 2'
			},
			{
				PLN: '2121',
				id: 2,
				task: 'Zadanie 3'
			}
		]
	},
	{
		name: 'Adam Nowak',
		id: 2,
		tasks: [
			{
				PLN: '2121',
				id: 0,
				task: 'Zadanie 1'
			},
			{
				PLN: '2121',
				id: 1,
				task: 'Zadanie 2'
			},
			{
				PLN: '2121',
				id: 2,
				task: 'Zadanie 3'
			}
		]
	}
];

const array = [
	{
		PLN: '2121',
		id: 0,
		task: 'Zadanie 1'
	},
	{
		PLN: '2121',
		id: 1,
		task: 'Zadanie 2'
	},
	{
		PLN: '2121',
		id: 2,
		task: 'Zadanie 3'
	}
];
//function addElements(worker){
//    $('.tasks-row').remove();
//
//    worker.tasks.map(element=>{
//        const html = `<div class="tasks-row" id="${element.id}"><div>${element.task}</div><div>${element.PLN} PLN</div><div>${parseInt(element.PLN)/4} EUR</div><div><ion-icon name="trash" class="trash-icon"></ion-icon>Usuń</div></div>`;
//        console.log(element)
//        tasks.append(html);
//    })
//    const deleteIcon = $('.trash-icon');
//        deleteIcon.on('click',function(){
//        const element = array.find(el=>el.id==$(this).parents()[1].id)
//        array.splice(array.indexOf(element),1);
//        addElements();
//    })
//}
let taskName;
const taskNameInput = $('.task-input').on('input', (e) => {
	taskName = e.target.value;
});
let amount;
const amountInput = $('.amount-input').on('input', (e) => {
	amount = e.target.value;
});
const button = $('.button');
button.on('click', function() {
	if (taskName && taskName.length > 5 && amount) {
		$('.task-input').removeClass('error-input');
		$('.amount-input').removeClass('error-input');
		array.push({ task: taskName, PLN: amount, id: array.length });
		//        addElements();
	} else {
		$('.task-input').addClass('error-input');
		$('.amount-input').addClass('error-input');
	}
});

function renderWorkers(workers) {
	$('#workers-list').empty();
	workers.map((el) => {
		const html = `<div userId=${el.id} class="worker"><img src="women.jpg" class="worker-img"></img><p> ${el.name} </p></div>`;
		$('#workers-list').append(html);
	});
}

$('.worker').on('click', (e) => {
	console.log(e.target);
});

$('#search-users-input').on(
	'input',
	debounce((event) => {
		const searchText = event.target.value;

		const output = searchText ? workers.filter((item) => item.name.indexOf(searchText) != -1) : workers;
		renderWorkers(output);
		//    addElements(output)

		//    return output;
	}, 500)
);

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

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
// 	{ id: 1, text: 'Flower', amount: -20 },
// 	{ id: 2, text: 'Salary', amount: 300 },
// 	{ id: 3, text: 'Book', amount: -10 },
// 	{ id: 4, text: 'Camera', amount: 150 },
// ];
const localStorageTransactions = JSON.parse(
	localStorage.getItem('transection')
);

let transactions =
	localStorage.getItem('transection') !== null ? localStorageTransactions : [];
//Add transection
function addTransaction(e) {
	e.preventDefault();
	if (text.value.trim() === '' && amount.value.trim() === '') {
		alert('Please add a text and amount');
	} else {
		const transection = {
			id: generateID(),
			text: text.value,
			amount: +amount.value,
		};
		transactions.push(transection);

		addTransactionToDOM(transection);
		updateValues();
		updateLocalStorage();

		text.value = '';
		amount.value = '';
	}
}
//Random id generate
function generateID() {
	return Math.floor(Math.random() * 100);
}

//Add transactions to DOM list
function addTransactionToDOM(transection) {
	//Get sign
	const sign = transection.amount < 0 ? '-' : '+';

	const item = document.createElement('li');
	//Add class based on value
	item.classList.add(transection.amount < 0 ? 'minus' : 'plus');

	item.innerHTML = `
    ${transection.text}<span>${sign}${Math.abs(
		transection.amount
	)}<button class='delete-btn' onclick='removeTransection(${
		transection.id
	})'>x</button></span>
    `;
	list.appendChild(item);
}
//Update the balance,income & expense
function updateValues() {
	const amounts = transactions.map((transaction) => transaction.amount);
	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
	const income = amounts
		.filter((item) => item > 0)
		.reduce((acc, prev) => (acc += prev), 0)
		.toFixed(2);
	const expense = (
		amounts.filter((item) => item < 0).reduce((acc, prev) => (acc += prev), 0) *
		-1
	).toFixed(2);
	balance.innerText = `$${total}`;
	money_plus.innerText = `$${income}`;
	money_minus.innerText = `$${expense}`;
}
//remove transection by id
function removeTransection(id) {
	transactions = transactions.filter((transection) => transection.id !== id);
	init();
}
//Update locale storage
function updateLocalStorage() {
	localStorage.setItem('transection', JSON.stringify(transactions));
}
//Delete locale storage
function updateLocalStorage() {
	localStorage.setItem('transection', JSON.stringify(transactions));
}
//Init app
function init() {
	list.innerHTML = '';

	transactions.forEach(addTransactionToDOM);

	updateValues();
}
form.addEventListener('submit', addTransaction);
init();

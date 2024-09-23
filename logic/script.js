const transactionForm = document.getElementById('transactionForm');
const userForm = document.getElementById('userForm');
const transactionList = document.getElementById('transactionList');
const totalBalance = document.getElementById('totalBalance');

let currentUser = '';

// Add a new user
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });

    const result = await response.json();
    if (result.success) {
        currentUser = username;
        alert('User saved successfully!');
    }
});

// Add a new transaction
transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const transaction = { username: currentUser, description, amount, type };

    const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });

    const result = await response.json();
    if (result.success) {
        updateTransactions();
        updateBalance();
        transactionForm.reset();
    }
});

// Update the displayed transactions
async function updateTransactions() {
    const response = await fetch(`/api/transactions?username=${currentUser}`);
    const transactions = await response.json();

    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.innerHTML = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
        transactionList.appendChild(li);
    });
}

// Update the total balance
async function updateBalance() {
    const response = await fetch(`/api/balance?username=${currentUser}`);
    const balance = await response.json();

    totalBalance.innerText = balance.toFixed(2);
}

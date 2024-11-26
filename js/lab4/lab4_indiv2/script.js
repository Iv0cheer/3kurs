let balance = 10000;
let stocks = {
    'Apple': { price: 300, quantity: 0 },
    'Tesla': { price: 700, quantity: 0 },
    'Google': { price: 2800, quantity: 0 },
};

function updateBalance() {
    document.getElementById('balance').innerText = balance;
}

    function updateStocksTable() {
        const stocksTable = document.getElementById('stocks-table');
        stocksTable.innerHTML = `
        <tr>
            <th>Акция</th>
            <th>Цена</th>
            <th>Количество у тебя</th>
        </tr>
    `;

    for (let stock in stocks) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${stock}</td>
        <td>${stocks[stock].price} руб.</td>
        <td>${stocks[stock].quantity} шт.</td>
        `;
        stocksTable.appendChild(row)
    }
    }

function buyStock() {
    const stockName = document.getElementById('stock-name').value;
    const quantity = parseInt(document.getElementById('stock-quantity').value);

    if (stocks[stockName] && quantity > 0) {
        const totalCost = stocks[stockName].price * quantity;
        if (balance >= totalCost) {
            balance -= totalCost;
            stocks[stockName].quantity += quantity;
            updateBalance();
            updateStocksTable();
            alert(`Вы купили ${quantity} акций ${stockName}.`);
        } else {
            alert('Недостаточно средств для покупки.');
        }
    } else {
        alert('Введите корректное название акции и количество');
    }
}

function sellStock() {
    const stockName = document.getElementById('stock-name').value;
    const quantity = parseInt(document.getElementById('stock-quantity').value);
    if (stocks[stockName] && quantity > 0) {
        if (stocks[stockName].quantity >= quantity) {
            const totalEarnings = stocks[stockName].price * quantity;
            balance += totalEarnings;
            stocks[stockName].quantity -= quantity;
            updateBalance();
            updateStocksTable();
            alert(`Вы продали ${quantity} акций ${stockName}.`);
        } else {
            alert('У тебя нет столько таких акций для продажи.');
        }
    } else {
        alert('Введите корректное название акции и количество');
    }
}

document.getElementById('buy-btn').addEventListener('click', buyStock);
document.getElementById('sell-btn').addEventListener('click', sellStock);

updateBalance();
updateStocksTable();

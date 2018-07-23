const types = require('./SupportTypes');
var transactions = [];
var accounts = [];
var accountNames = [];
var numOfTransactions = 0;

function createAccount(name) {
    if (accountNames.indexOf(name) === -1) {
        accounts.push(new types.Account(name, 0));
        accountNames.push(name);
    }
}

function progressTransaction(transactionArray) {
    transaction = new types.Transaction(transactionArray[0],transactionArray[1],transactionArray[2],transactionArray[3],transactionArray[4])
    transactions.push(transaction);
    numOfTransactions++;
    createAccount(transaction.from);
    createAccount(transaction.to);
    accounts[accountNames.indexOf(transaction.from)].send(transaction);
    accounts[accountNames.indexOf(transaction.to)].receive(transaction);
}

module.exports = {progressTransaction, accounts, transactions, accountNames, numOfTransactions};
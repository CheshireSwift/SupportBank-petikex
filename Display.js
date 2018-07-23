const data = require('./Data')

function displayAll () {
    console.log('test');
    for (var i = 0; i<data.accountNames.length; i++) {
        console.log('Account name: ',data.accountNames[i],'\nAvailable amount: ',data.accounts[i].credit);
    }
}

function displayAccount(accountName) {
    var indexOfCAccount = data.accountNames.indexOf(accountName);
    if (indexOfCAccount!== -1) {
        cAccount = data.accounts[indexOfCAccount];
        console.log('Account name: ',cAccount.name, ' credit available: ', cAccount.credit);
        console.log('Transaction history: ');
        console.log('incoming transactions:');
        for (var i = 0; i<cAccount.transactionReceive.length; i++) {
             displayTransaction(cAccount.transactionReceive[i]);
        }
        console.log('outgoing transactions:');
        for (var i = 0; i<cAccount.transactionSend.length; i++) {
             displayTransaction(cAccount.transactionSend[i]);
        }
    }
}

function displayTransaction(transaction) {
    console.log('From : ',transaction.from, ' To: ',transaction.to, 'Amount: ', transaction.amount, 'Comment: ',transaction.narative);
}

module.exports = {displayAll, displayAccount}
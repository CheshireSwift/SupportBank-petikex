class Account {
    constructor(name,credit) {
        this.name = name;
        this.credit = credit;
        this.transactionReceive = [];
        this.transactionSend = [];
    }
    send(transaction) {
        this.transactionSend.push(transaction);
        if ((transaction.amount !== undefined) && (isValidCredit(transaction.amount))) {
            this.credit = this.credit - parseInt(transaction.amount);
        } else { logger.warn('Uncrecognised transaction value at: \n',transaction);}
    }
    receive(transaction) {
        this.transactionReceive.push(transaction);
        if ((transaction.amount !== undefined) && (isValidCredit(transaction.amount))) {
            this.credit = this.credit + parseInt(transaction.amount);
        }
    }
}

class Transaction {
    constructor(date,from,to,narative,amount) {
        this.date = date;
        this.from = from;
        this.to = to;
        this.narative = narative;
        this.amount = amount;
    }
}

function isValidCredit(credit) {
    var result = true;
    var validValues = ['0','1','2','3','4','5','6','7','8','9','.'];
    for (var j = 0; j<credit.length; j++) {
        if (validValues.indexOf(credit[j]) === -1) {
            result = false;
        }
    }
    return result;
}

module.exports = { Account, Transaction}
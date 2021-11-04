const transactionForm = document.querySelector('#addform');

function toggle(){
    // we are calling the div that will open
    const form = document.querySelector(".form-popup")
    // we are setting it to be active
    form.classList.toggle("active")
}
// add event listener on form submit
transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(validateTransaction()) {
        let amount = Number(transactionForm.amount.value);
        if(transactionForm.type.value == 'expense') {
            amount = amount * -1; // we make the amount negativve for expenses
        }

        const transaction = {
            type: transactionForm.type.value,
            category: transactionForm.category.value,
            amount: amount
        };

        saveTransaction(transaction);
        balanceElement.innerText = account.balance;
        success.innerText = 'Transaction saved!';
        updateChart();
    }
})

// TODO FOR EVA VALIDATION
const error = document.getElementById('errormessage');
const success = document.getElementById('successmessage');
const form = document.getElementById('addform');

function validateTransaction() {
    error.innerText = '';
    if (type.value == "") {
        error.innerText = 'Please choose type';
        return false;
    }
    if(form.category.value == "" ){
        error.innerText = 'Please enter category';
        return false;
    }
    if(form.amount.value == ""){
        error.innerText = 'Please enter amount';
        return false;
    }
    return true;
}

function saveTransaction(transaction){
    //we are pushing the object to the transaction list
    account.transactions.push(transaction);
    //we update our balance
    account.balance += transaction.amount;
    //if the transaction is in expense type than it is - negative, or else it\s income
    if(transaction.type == 'expense'){
        account.expenses += transaction.amount;
    } else {
        account.income += transaction.amount;
    }
    
    const accounts = getAllAccounts();
    accounts[account.email] = account;
    localStorage.setItem('accounts', JSON.stringify(accounts))
    renderTransaction(transaction);
    transactionForm.reset();

    return true;
}


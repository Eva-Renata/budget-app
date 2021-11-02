const transactionForm = document.querySelector('#myForm form');

function toggle(){
    // we are calling the div that will open
    const form = document.querySelector(".form-popup")
    // we are setting it to be active
    form.classList.toggle("active")
}
// add event listener on form submit
transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(!validateTransaction(transactionForm)){
    //     document.getElementById('errormessage').innerHTML = "Succesfully added!";
    // }else 
    // {
    //     document.getElementById('errormessage').innerHTML = "Please fill up the form";
     }
    const transaction = {
        type: transactionForm.type.value,
        category: transactionForm.category.value,
        amount: Number(transactionForm.type.value == 'expense' ? 
        -transactionForm.amount.value : transactionForm.amount.value)
    }
    // if(transactionForm.type.value == 'expense') {
    //     // i do 
    // } else {
    //     //else
    // }
    // transactionForm.type.value == 'expense' ? "something" : "somethng else"

    saveTransaction(transaction);
    balanceElement.innerText = account.balance;
})

// TODO FOR EVA VALIDATION
// function validateTransaction() {
//     if (category.value === '' || category.value == null)
// }

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
    // TODO EVI Success notification
    return true;
}


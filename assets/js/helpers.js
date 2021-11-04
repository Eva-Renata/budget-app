// get logged in user information
const loggedIn = getLoggedInUser();

//VALIDATION TEMPLATE
// Herunder kommer den kode der måler mønstre. fx @, tal mm (SIDE FUNKTIONER)
//Tjekker om værdi er et nummer
function isValidNumber(value) {
    let pattern = /^[0-9]+$/;
    return pattern.test(value);
}

//Tjekker om værdi er alfabet
function isValidAlpha(value) {
    let pattern = /^[A-ZÆØÅa-zæøå ]+$/;
    return pattern.test(value);
}

//Tjekker om værdi har en gyldig email syntaks
function isValidEmail(value) {
    let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return pattern.test(value);
}

//Tjekker at værdi har en gyldig længde
function isValidLength(value, min, max) {
    let pattern = RegExp('^[0-9A-Za-z@#$%]{' + min + ',' + max + '}$');
    return pattern.test(value);
}

function getLoggedInUser(){
    //parse - turning your JSON string back to original value
    return JSON.parse(localStorage.getItem('loggedIn'));
}

function loginUser(email,name){
    const user = {
        name: name,
        email: email
    }
    // we save in local storage as JSON string
    // we cannot save objects in local storage, only strings
    localStorage.setItem('loggedIn', JSON.stringify(user));

    // check if we have user account with that email
    // and if we don't, we will create it
    if(!getUserAccount(user.email)){
        createUserAccount(user);
    }
    window.location = 'index.html';
}

function logout() {
    localStorage.removeItem('loggedIn');
    window.location = 'login.html';
}

// find user account by email
function getUserAccount(email){
    const accounts = getAllAccounts();
    return accounts[email];
}

//here we are specifying how the account should look
function createUserAccount(userData){
    // new account account template
    const newAccount = {
        email : userData.email,
        name: userData.name,
        balance: 0,
        income: 0,
        expenses: 0,
        transactions: []
    }
    const accounts = getAllAccounts();
    //we want to add the e-mail from the userData, into the new object we created *newAccount
    accounts[userData.email] = newAccount;
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// return all user accounts
function getAllAccounts() {
    // get all acocunts
    const accounts = JSON.parse(localStorage.getItem('accounts'))
    // if we don't have any accounts, initalize them
    if(!accounts) {
        initalizeAccounts();
        // we return empty object, because we know that we didn't any accounts here
        return {};
    } else {
        // return all accounts
        return accounts;
    }
}
//we transform the account object into a string, to save it in localstorage
function initalizeAccounts(){
    localStorage.setItem('accounts', JSON.stringify({}))
}

function getAllTransactions(){
    return account.transactions;
}
//we are displaying all transactions
function renderTransaction(transaction, index) {
    // const transEleemnt = document.createElement('div');
    // transEleemnt.classList = 'transaction';
    
    //creating a template how they should be shown
    const element = document.createElement('template');
    element.innerHTML =  `<div class="transaction">
        <span>${transaction.category}</span>
        <span style="float:right">${transaction.type}</span>
        <br>
        <span>${transaction.amount} dkk</span>
        <span class='deleteBtn' onclick="deletetransaction(event, ${index})" >delete</span>
        </div>
       `;
    allTransactions.insertAdjacentElement('afterbegin', element.content.firstChild)
}

function renderAllTransactions(transactions, type = 'all') {
    allTransactions.innerHTML = '';
    transactions.forEach( (transaction, index) => {
        if(transaction.type === type || type === 'all') {
            renderTransaction(transaction, index);
        }
    });
}
// make deleteTransaction function
// put it onclick on the delete button
// send the transaction index to the function

function deletetransaction(event , index) {
    const clickedBtn = event.currentTarget;
    const parent = clickedBtn.closest('.transaction');
    parent.remove();

    //splice -> we name first where the deleting begins (from index) and how many should be deleted 
    const transaction = account.transactions.splice(index,1)[0];
    //we update our balance
    account.balance -= transaction.amount;
    //if the transaction is in expense type than it is - negative, or else it\s income
    if(transaction.type == 'expense'){
        account.expenses -= transaction.amount;
    } else {
        account.income -= transaction.amount;
    }
    //we update our balance (interface)
    balanceElement.innerText = account.balance;

    //we save our account in database
    const accounts = getAllAccounts();
    accounts[account.email] = account;
    localStorage.setItem('accounts', JSON.stringify(accounts))
    transactionForm.reset();
    updateChart();
}
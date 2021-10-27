// get logged in user information
const loggedIn = getLoggedInUser();
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
    return localStorage.getItem('loggedIn');
}

function loginUser(email,name){
    const user = {
        name: name,
        email: email
    }
    // we save in local storage as JSON string
    // we cannot save objects in local storage
    // only strings
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

// find user accoutn by email
function getUserAccount(email){
    const accounts = getAllAccounts();
    return accounts[email];
}

function createUserAccount(userData){
    // new user account template
    const account = {
        email : userData.email,
        name: userData.name,
        balance: 0,
        income: 0,
        expenses: 0,
        transactions: {}
    }
    const accounts = getAllAccounts();
    accounts[userData.email] = account;
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

function initalizeAccounts(){
    localStorage.setItem('accounts', JSON.stringify({}))
}


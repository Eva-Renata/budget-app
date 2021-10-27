const userNameElement = document.getElementById('userName');
const mainSection = document.getElementById('main');
if(!loggedIn) {
    window.location = 'login.html';
}
const userData = JSON.parse(loggedIn);
const account = getUserAccount(userData.email);

userNameElement.innerHTML= 'Hello, '+userData.name  +
    "<button onclick='logout()'>Logout</button>";

mainSection.innerText = "Your balance is : " + account.balance;
const userNameElement = document.getElementById('userName');
const mainSection = document.getElementById('main');
const allTransactions = document.getElementById('allTransactions');
const incomeTransactions = document.getElementById('Income');
const expensesTransactions = document.getElementById('Expenses');
const balanceElement = document.getElementById('balance');

//if we are not logged in, we are redirected to login.html
if(!loggedIn) {
    window.location = 'login.html';
}
const account = getUserAccount(loggedIn.email);
userNameElement.innerHTML= 'Hello, '+loggedIn.name;

balanceElement.innerText = account.balance;
renderAllTransactions(account.transactions);

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// const transactions = {
//    0 : { 
//        type: "Expense",
//        category: "Groceries",
//        amount : -666
//    },
//    1: {
//        type: "Income",
//        category: "Salary",
//        amount: 10000
//    }
// }

// for(let transaction in transactions){
//     let temp = transactions[transaction];
//     allTransactions.innerHTML += `  <div class="transaction">
//     <span>${temp.category}</span>
//     <span style="float:right">${temp.type}</span>
//     <br>
//     <span>${temp.amount} dkk</span>
// </div>`;
//     if(temp.type === 'Expense') {
//         expensesTransactions.innerHTML += `  <div class="transaction">
//         <span>${transactions[transaction].category}</span>
//         <span style="float:right">${transactions[transaction].type}</span>
//         <br>
//         <span>${transactions[transaction].amount} dkk</span>
//     </div>`
//     }else{ 
//         inicomeTransactions.innerHTML += `  <div class="transaction">
//         <span>${transactions[transaction].category}</span>
//         <span style="float:right">${transactions[transaction].type}</span>
//         <br>
//         <span>${transactions[transaction].amount} dkk</span>
//         </div>`
//     }
    
    
//}
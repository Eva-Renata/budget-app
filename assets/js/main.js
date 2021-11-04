const userNameElement = document.getElementById('userName');
const mainSection = document.getElementById('main');
const balanceElement = document.getElementById('balance');
const filterButtons = document.querySelectorAll('.tablinks');
//if we are not logged in, we are redirected to login.html
if(!loggedIn) {
    window.location = 'login.html';
}
//in the header we show the account name that is logged in 
const account = getUserAccount(loggedIn.email);
userNameElement.innerHTML= 'Hello, '+loggedIn.name;

//showing the balance
balanceElement.innerText = account.balance;
renderAllTransactions(account.transactions);

// add click listener to the filter buttons
filterButtons.forEach(buttonElement => {
  buttonElement.addEventListener('click', (event) => {

    // remove the active button class
    document.querySelector('.active').classList.toggle('active');
    const button = event.currentTarget;
    button.classList.toggle('active');
    const filter = button.getAttribute('filter');
    const transactions = getAllTransactions();
    renderAllTransactions(transactions , filter)
  })
});


// Load the balance chart
const data = {
  labels: [
    'Expenses',
    'Income',
  ],
  datasets: [{
    label: 'My account balance',
    data: [account.expenses, account.income],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
    ],
    hoverOffset: 4
  }]
};
const config = {
  type: 'pie',
  data: data
};
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

//updating the chart
function updateChart(){
  myChart.data.datasets[0].data = [account.expenses, account.income];
  myChart.update();
}
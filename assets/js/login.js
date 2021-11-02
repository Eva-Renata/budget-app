if(loggedIn) {
    //redirect to homepage
    document.location = '/index.html';
} 
const form = document.querySelector('form');
const formFeedback = document.querySelector('.form-feedback');


function validate(event){
    clearFeedback();
    // The default functionality will submit the form
    // here we are preventing that, because we have custom 
    // logic to implement
    event.preventDefault();
    // if we have valid form, we will login our user
    if(validateForm(form)){
        loginUser(form.email.value, form.name.value)
    }
}

function validateForm(form) {

    if(!form.name.value && !isValidAlpha(form.name.value)){
        formFeedback.innerText = 'Please enter valid name';
        return false;
    }

    if(!form.email.value && !isValidEmail(form.email.value)){
        formFeedback.innerText = 'Please enter valid email';
        return false;
    }

    return true;
}

function clearFeedback(){
    formFeedback.innerText = '';
}

const size = 5;
const array = [];

// start from i = 0, repeat until i is less than the size.
// increase i with 1 every cycle
for(let i = 0; i < size; i++) {
    array.push(i*3);
}
const colors = [];

// For each element in my array
// do something with every single elememt
array.forEach( (element, index) => {
    // if(element == 'blue'){
    //     console.log('we have blue');
    // } else {
    //     console.log('this is not blue');
    // }
});

const person = {
    name: "Dimitar",
    age: 33,
    nationality : "BG"
};
// for every key in the person object
// loop and log the key and the value to that key
for (const key in person) {
    //console.log(key, person[key]);
}


let list = [5 , 30 , 55 , 20, 'dog'];

// make an object with keys 1,2,3,4,5 and the values 
const numbersObject = {};
for(let i = 0; i < list.length; i++){
    numbersObject[i+1] = list[i];
}

const books = [ 'bible', 'cookbook','don quixote'];

const bookPages = [3000, 100, 450];

const booksInformations = [] ;

for(let i = 0; i < bookPages.length; i++){
   
    booksInformations.push(
        {
            title:  books[i],
            pages: bookPages[i]
        }
    )
}

books.forEach( (book, index) => {

    booksInformations.push(
        {
            title: book,
            pages: bookPages[index]
        }
    )
})

const services = {
    'gellak' : 400,
    'cutting off finger' : 150
};

const clients = [
    {
        name: "Line",
        service: 'gellak',
        units: 1
    },
    {
        name: "alina",
        service: "cutting off finger",
        units: 10
    }
]

// loop through the clients  DONE
// and check the price of that service
// and calculate the total price

let totalPrice = 0;

clients.forEach( (client) => {
    totalPrice += services[client.service] * client.units
} ); 
console.log(totalPrice)
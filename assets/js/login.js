if(loggedIn) {
    //redirect to homepage
    document.location = '/index.html';
} 
const form = document.querySelector('form');
const formFeedback = document.querySelector('.form-feedback');

function validate(event){
    clearFeedback();
    // The default functionality will submit the form
    // here we are preventing that, because we have custom logic to implement
    event.preventDefault();
    //prevent default is preventing th page from re-loading
    // if we have valid form, we will login our user
    if(validateForm(form)){
        loginUser(form.email.value, form.name.value)
    }
}

//validating our login form, for valid email, and name(alpha)
function validateForm(form) {
    if(!form.email.value && !isValidEmail(form.email.value)){
        formFeedback.innerText = 'Please enter valid email';
        return false;
    }

    if(!form.name.value && !isValidAlpha(form.name.value)){
        formFeedback.innerText = 'Please enter valid name';
        return false;
    }

    return true;
}
function clearFeedback(){
    formFeedback.innerText = '';
}

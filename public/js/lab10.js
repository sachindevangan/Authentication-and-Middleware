
let registrationForm = document.getElementById('registration-form');
let loginForm = document.getElementById('login-form');

if(registrationForm) {
  registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    validateRegistrationForm();
  });
}

if(loginForm) {
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    validateLoginForm();
  });
}

function validateRegistrationForm() {
  let firstName = document.getElementById('firstNameInput');
  let firstNameValue = firstName.value;
  let lastName = document.getElementById('lastNameInput');
  let lastNameValue = lastName.value;
  let email = document.getElementById('emailAddressInput');
  let emailValue = email.value;
  let password = document.getElementById('passwordInput');
  let passwordValue = password.value;
  let confirmPassword = document.getElementById('confirmPasswordInput');
  let confirmPasswordValue = confirmPassword.value;
  let role = document.getElementById('roleInput');
  let roleValue = role.value;

  let error;
  if (firstNameValue.length < 2 || firstNameValue.length > 25 || /\d/.test(firstNameValue) || /\s/.test(firstNameValue)) {
    
    error = document.getElementById('firstNameError');
    error.textContent = 'The first name field should be a valid string, at least 2 characters long and no spaces or numbers are allowed.';
    firstName.classList.add('is-invalid');
    
    return false;
  }

  error = document.getElementById('error');
  error.textContent = '';
  firstName.classList.remove('is-invalid');


  if (lastNameValue.length < 2 || lastNameValue.length > 25 || /\d/.test(lastNameValue) || /\s/.test(lastNameValue)) {
   
    error = document.getElementById('error');
    error.textContent = 'The last name field should be a valid string, at least 2 characters long and no spaces or numbers are allowed.';
    lastName.classList.add('is-invalid');
    
    return false;
  }

  error = document.getElementById('error');
  error.textContent = '';
  lastName.classList.remove('is-invalid');

  // Check email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    
    error = document.getElementById('error');
    error.textContent = 'The email field should be a valid email address.';
    email.classList.add('is-invalid');
    
    return false;
  }
 
  error = document.getElementById('error');
  error.textContent = '';
  email.classList.remove('is-invalid');

  
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s:]).{8,}$/;
  if (!passwordRegex.test(passwordValue)) {
    
    error = document.getElementById('error');
    error.textContent = 'The password field should contain at least 8 characters, including at least one digit, one uppercase letter, one lowercase letter, and one special character.';
    password.classList.add('is-invalid');
    
    return false;
  }
  
  error = document.getElementById('error');
  error.textContent = '';
  password.classList.remove('is-invalid');

 
  if (passwordValue !== confirmPasswordValue) {
    
    error = document.getElementById('error');
    error.textContent = 'The confirm password field should match the password field.';
    confirmPassword.classList.add('is-invalid');
    
    return false;
    }
   
    error = document.getElementById('error');
    error.textContent = '';
    confirmPassword.classList.remove('is-invalid');
    
    
    if (roleValue === '') {
    
    error = document.getElementById('error');
    error.textContent = 'Please select a role.';
    role.classList.add('is-invalid');
    
    return false;
    }
    
    error = document.getElementById('error');
    error.textContent = '';
    role.classList.remove('is-invalid');
    
    registrationForm.submit();
    }
    
    function validateLoginForm() {
    
    let Loginemail = document.getElementById('emailAddressInput');
    let LoginEmailValue = Loginemail.value;
    let Loginpassword = document.getElementById('passwordInput');
    let loginPasswordValue  = Loginpassword.value;

    
    let error;
  
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(LoginEmailValue)) {
    
    error = document.getElementById('error');
    error.textContent = 'The email field should be a valid email address.';
    Loginemail.classList.add('is-invalid');
    
    return false;
    }
    
    error = document.getElementById('error');
    error.textContent = '';
    Loginemail.classList.remove('is-invalid');
    
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-={}[\]:;\"'<>,.?\\/]).{8,}$/;
    if (!passwordRegex.test(loginPasswordValue)) {
    
    error = document.getElementById('error');
    error.textContent = 'The password field should contain at least 8 characters, including at least one digit, one uppercase letter, one lowercase letter, and one special character.';
    Loginpassword.classList.add('is-invalid');
    
    return false;
    }
    
    error = document.getElementById('error');
    error.textContent = '';
    Loginpassword.classList.remove('is-invalid');

    loginForm.submit();
    } 
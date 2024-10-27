//import express, express router as shown in lecture code

import { Router } from "express";
const router = Router();
import * as userData from "../data/users.js"

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    if (req.user) {
      return res.redirect('/'); 
    }
    res.render('register', { title: 'Register', loginLink: '/login' });
  })
  .post(async (req, res) => {
    try {
      const { firstNameInput, lastNameInput, emailAddressInput, passwordInput,confirmPasswordInput, roleInput } = req.body;

     
      if (!firstNameInput || !lastNameInput || !emailAddressInput || !passwordInput ||!confirmPasswordInput ||!roleInput) {
        return res.status(400).render('register', { title: 'Register', error: 'Please provide all required fields', loginLink: '/login' });
      }

     
      if (!/^[A-Za-z]{2,25}$/.test(firstNameInput)) {
        return res.status(400).render('register', { title: 'Register', error: 'First name must be a valid string (2-25 characters, no numbers)', loginLink: '/login' });
      }

     
      if (!/^[A-Za-z]{2,25}$/.test(lastNameInput)) {
        return res.status(400).render('register', { title: 'Register', error: 'Last name must be a valid string (2-25 characters, no numbers)', loginLink: '/login' });
      }

      
      if (!/\S+@\S+\.\S+/.test(emailAddressInput)) {
        return res.status(400).render('register', { title: 'Register', error: 'Please provide a valid email address', loginLink: '/login' });
      }

      
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-={}[\]:;\"'<>,.?\\/]).{8,}$/.test(passwordInput)) {
        return res.status(400).render('register', { title: 'Register', error: 'Password must be at least 8 characters long and contain at least one uppercase character, one number, and one special character', loginLink: '/login' });
      }

      
      if (confirmPasswordInput !== passwordInput) {
        return res.status(400).render('register', { title: 'Register', error: 'Passwords do not match', loginLink: '/login' });
      }

      
      if (roleInput !== 'admin' && roleInput !== 'user') {
        return res.status(400).render('register', { title: 'Register', error: 'Please select a valid role', loginLink: '/login' });
      }

      const firstName = req.body.firstNameInput;
      const lastName = req.body.lastNameInput;
      const emailAddress = req.body.emailAddressInput;
      const password = req.body.passwordInput;
      const role = req.body.roleInput;


      const result = await userData.createUser(firstName, lastName, emailAddress, password, role);

      if (result.insertedUser) {
  
        return res.redirect('/login');
      }
      
  return res.status(500).send('Internal Server Error');
} catch (err) {
  return res.status(400).render('register', { title: 'Register', error: err.message, loginLink: '/login' });
}
  });

router
  .route('/login')
  .get(async (req, res) => {
    if (req.user) {
      return res.redirect('/'); 
    }
    res.render('login', { title: 'Login', registerLink: '/register' });
  })
  .post(async (req, res) => {
    try{
    const { emailAddressInput, passwordInput } = req.body;
  
if (!emailAddressInput || !passwordInput) {
  return res.status(400).render('login', { title: 'Login', errorMessage: 'Please enter your email and password' });
}


if (!/\S+@\S+\.\S+/.test(emailAddressInput))  {
  return res.status(400).render('login', { title: 'Login', errorMessage: 'Please enter a valid email address' });
}


const email = emailAddressInput.toLowerCase();


const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
if (!passwordRegex.test(passwordInput)) {
  return res.status(400).render('login', { title: 'Login', errorMessage: 'Please enter a valid password (at least 8 characters, at least one uppercase letter, one number, and one special character)' });
}

const emailAddress = req.body.emailAddressInput;
const password = req.body.passwordInput;

 
  const user = await userData.checkUser(emailAddress, password);
  if (!user) {
    return res.status(400).render('login', { title: 'Login', errorMessage: 'Invalid email address or password' });
  }

 
  req.session.user = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    role: user.role
  }


  if (user.role === 'admin') {
    return res.redirect('/admin');
  } else {
    return res.redirect('/protected');
  }
} catch (err) {
 
  return res.status(400).render('login', { title: 'Login', errorMessage: 'There was an error with your login. Please try again later.' });
}
 });

router.route('/protected').get(async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const currentTime = new Date().toLocaleTimeString();
  const { firstName, role } = req.session.user;
  const isAdmin = role === 'admin';

  res.render('protected', {
    firstName,
    role,
    currentTime,
    isAdmin
  });
});

router.route('/admin').get(async (req, res) => {
  const firstName = req.session.user.firstName;
  const currentTime = new Date().toUTCString();
  res.render('admin', { firstName, currentTime });
});

router.route('/error').get(async (req, res) => {
res.status(403).render('error',{keywords: "error,  the user does not have permission to view the page"});
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  res.clearCookie('AuthCookie');
  res.redirect('/');
});


export default router;




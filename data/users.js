//import mongo collections, bcrypt and implement the following data functions

import bcrypt from 'bcrypt'
import { users } from "../config/mongoCollections.js"; 

export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  if (!firstName || !lastName || !emailAddress || !password || !role) {
    throw new Error("All fields are required.");
  }

if (typeof firstName !== 'string' || firstName.trim().length < 2 || firstName.trim().length > 25 || !isNaN(Number(firstName)) || firstName.includes(' ')) {
  throw new Error("The 'firstName' field should be a valid string, at least 2 characters long and no spaces or numbers are allowed.");
}

if (typeof lastName !== 'string' || lastName.trim().length < 2 || lastName.trim().length > 25 || !isNaN(Number(lastName)) || lastName.includes(' ')) {
  throw new Error("The 'lastName' field should be a valid string, at least 2 characters long and no spaces or numbers are allowed.");
}

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
    throw new Error("The 'emailAddress' field should be a valid email address.");
  }

  emailAddress = emailAddress.toLowerCase();

  const userdb = await users();
  const user = await userdb.findOne({emailAddress});
  if (user) {
    throw new Error("There is already a user with that email address.");
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s:]).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error("The 'password' field must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.");
  }

role = role.toLowerCase();

if (role !== "admin" && role !== "user") {
  throw new Error("The 'role' field must be either 'admin' or 'user'.");
}

  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser ={
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    emailAddress,
    hashedPassword,
    role,
  };

  const insertResult = await userdb.insertOne(createUser);

  return {insertedUser: true};
}


export const checkUser = async (emailAddress, password) => {

    if (!emailAddress || !password) {
      throw new Error('Both emailAddress and password must be supplied');
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      throw new Error('Invalid email address format');
    }
  
    emailAddress = emailAddress.toLowerCase();
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error('Invalid password');
    }
  
    const userdb = await users();
    const user = await userdb.findOne({ emailAddress });
    if (!user) {
      throw new Error('Either the email address or password is invalid');
    }
  
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      throw new Error('Either the email address or password is invalid');
    }
  
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      role: user.role,
    };
  };
    

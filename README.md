
---

### Authentication and Middleware

#### Description
This project provides a basic server application that manages user sign-up and login functionalities with role-based access and secure password handling. The application uses bcrypt for password hashing and express-session for session management. It also includes middleware for request logging and authentication control.

#### Features
- **User Authentication**:
  - Secure sign-up with password hashing.
  - Login with role-based redirection (`admin` or `user`).
  - Middleware-protected routes accessible only to authenticated users.

- **User Roles**:
  - Admin users have access to an additional `/admin` route with role-specific privileges.
  - User role (`admin` or `user`) determines redirect paths and access to routes.

- **Session Management**:
  - Sessions handled via express-session, using a cookie to track user authentication.

- **Request Logging**:
  - Middleware logs each request with a timestamp, request method, route, and authentication status.

#### Tech Stack
- Node.js
- Express.js
- bcrypt
- express-session

#### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/sachindevangan/Authentication-and-Middleware && cd auth-middleware
   ```
2. Create and configure `package.json` with `app.js` as the entry point.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

#### Usage
Visit the root route to be redirected based on user authentication status. Non-authenticated users are directed to the login page, while authenticated users are routed according to their role.

#### License
This project is licensed under the MIT License.

---

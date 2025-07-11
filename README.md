# Authentication Page Project

This project is a full-featured authentication page built with modern web technologies. It provides user registration, login, email verification, and secure session management.

---

## Technologies Used

- **PostgreSQL**: Reliable relational database to store users and sessions.
- **Drizzle ORM**: Type-safe ORM for interacting with the PostgreSQL database.
- **Better-Auth**: Handles authentication flows and session management securely.
- **Zod**: Schema validation library to ensure input data correctness and type safety.
- **Shade-CN**: UI component library for building clean, responsive user interfaces.
- **React Hook Form**: Efficient and flexible form management and validation in React.
- **Resend**: Email API service to send transactional emails such as email verification.

---

## Features

- User Registration with validation using Zod and React Hook Form.
- Secure Password storage and session management via Better-Auth.
- Email verification workflow powered by Resend to confirm user emails.
- Responsive UI components styled with Shade-CN.
- PostgreSQL as a robust backend data store accessed through Drizzle ORM.
- API routes handling auth-related requests (signup, login, verify).
- Validation on both frontend and backend to ensure data integrity.

---

## How It Works

1. **User Signup**:  
   The signup form uses React Hook Form combined with Zod schemas to validate user input in real-time. On submission, the backend creates a user record in the PostgreSQL database through Drizzle ORM, hashes the password securely, and triggers an email verification message via Resend.

2. **Email Verification**:  
   New users receive a verification email with a unique token. When they confirm their email, their account is activated.

3. **User Login**:  
   Users log in using their email and password. Better-Auth manages sessions securely, creating encrypted cookies and handling session expiration.

4. **UI and UX**:  
   The interface is built with Shade-CN components to provide a polished, responsive, and accessible design.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/daniel2mush/auth-with-postgress-drizzle-better-auth-with-admin-function.git
   cd auth-with-postgress-drizzle-better-auth-with-admin-function.
   ```

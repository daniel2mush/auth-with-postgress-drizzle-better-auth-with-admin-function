# Authentication Page Project

This project delivers a **full-featured authentication page** built with modern web technologies. It offers user registration, login (via email or Google), email verification, and secure session management, all powered by **Next.js** and a robust developer stack.

---

## Technologies Used

- **Next.js**: A full-stack React framework for building fast and scalable web applications, handling both frontend and backend routing.
- **PostgreSQL**: A powerful and reliable open-source relational database used for storing user information and session data.
- **Drizzle ORM**: A type-safe Object-Relational Mapper (ORM) that provides an intuitive way to interact with your PostgreSQL database.
- **Better-Auth**: A library designed to handle authentication flows and session management securely, supporting both email/password and social logins.
- **Zod**: A schema declaration and validation library, ensuring input data correctness and type safety across your application.
- **Shadcn/UI**: A collection of reusable UI components for building clean, responsive, and accessible user interfaces.
- **React Hook Form**: An efficient and flexible library for managing forms and handling validation in React applications.
- **Resend**: An email API service used for sending transactional emails, such as email verification links.
- **Google OAuth**: Enables social login functionality, allowing users to sign in using their Google (Gmail) accounts via the Google API.

---

## Features

- ✅ **User Registration**: Users can sign up with their email and a secure password.
- ✅ **Email/Password Login**: Standard login functionality for registered users.
- ✅ **Google OAuth Login**: Seamless login experience using Google (Gmail) accounts.
- ✅ **Secure Authentication**: Implements strong password hashing and secure session storage to protect user data.
- ✅ **Email Verification**: A necessary step after signup, ensuring account authenticity via Resend.
- ✅ **Modern UI**: Built with Shadcn/UI components for a clean and responsive user interface.
- ✅ **Robust Form Handling**: Forms are powered by React Hook Form, with validation handled by Zod for data integrity.
- ✅ **Authentication API Routes**: Dedicated API endpoints for registration, login, and email verification.
- ✅ **Database Management**: PostgreSQL schema is efficiently managed using Drizzle ORM.

---

## How It Works

1.  ### User Signup

    The signup form utilizes React Hook Form and Zod for comprehensive input validation. Upon submission, user data is securely saved to PostgreSQL via Drizzle ORM, with passwords being securely hashed before storage. Resend is then used to trigger an email containing a verification link.

2.  ### Email Verification

    A unique, tokenized link is sent to the user's registered email address through Resend. When the user clicks this link, the backend verifies the token and activates their account, preventing fake or spam registrations.

3.  ### User Login

    Users can log in using either their email/password combination or their Google account. Sessions are securely managed by Better-Auth and stored via encrypted HTTP-only cookies, enhancing security.

4.  ### Social Login with Google

    Integrated seamlessly using Google OAuth and Better-Auth, this feature allows users to sign in with their Google account. If it's their first time logging in with Google, a new user account is automatically created.

5.  ### UI and User Experience
    Shadcn/UI is employed to build a responsive and clean interface. Form validation errors and authentication states are clearly displayed to provide an intuitive user experience.

---

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/daniel2mush/auth-with-postgress-drizzle-better-auth-with-admin-function.git](https://github.com/daniel2mush/auth-with-postgress-drizzle-better-auth-with-admin-function.git)
    cd auth-with-postgress-drizzle-better-auth-with-admin-function
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the root of your project, create a file named `.env` and add the following environment variables. Replace the placeholder values with your actual credentials.

    ```ini
    DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name"
    NEXTAUTH_SECRET="your_secret_key" # Generate a strong random string for this

    # Resend
    RESEND_API_KEY="your_resend_api_key"
    NEXT_PUBLIC_APP_URL="http://localhost:3000" # Or your deployed app URL

    # Google OAuth
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    ```

4.  **Run Drizzle migrations:**
    Synchronize your database schema with your Drizzle ORM definitions.

    ```bash
    npx drizzle-kit push
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```

---

## Folder Structure

```bash
/app or /pages          # Next.js routes (authentication UI, API routes)
/db                     # Drizzle schema and database migrations
/components             # Reusable UI components using Shadcn/UI
/schemas                # Zod validation schemas for data input
/lib                    # Core logic (authentication, email helpers, database connections)
.env                    # Environment variables for sensitive data

```

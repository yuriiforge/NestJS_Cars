# NestJS Cars

NestJS Cars is a backend application for managing car reports and user authentication. It provides a full CRUD system for users and car reports, along with secure authentication and authorization.

## Features

- **User Authentication**
  - Sign up, sign in, and sign out with session-based cookies.
  - Authenticated routes protected by guards.
  - Current user information is accessible via a custom interceptor.

- **Car Reports Management**
  - Create, read, update, and delete car reports.
  - Reports include make, model, year, mileage, location, and price.

- **Price Estimation**
  - Estimate car prices based on similar entries.
  - Queries consider location, year range, and mileage proximity.

- **Database & ORM**
  - PostgreSQL | SQLite database with TypeORM.
  - Proper entity relationships and query building.

- **Validation & Serialization**
  - DTOs for input validation and response serialization.

- **Session Management**
  - `cookie-session` based authentication.
  - Current authenticated user loaded via an interceptor.

- **Guards & Interceptors**
  - `AuthGuard` protects routes.
  - `CurrentUserInterceptor` retrieves user from session.

- **Testing**
  - Unit and integration tests for services, controllers, and guards.

## API Overview

- `POST /auth/signup` – Create a new user.
- `POST /auth/signin` – Sign in an existing user.
- `POST /auth/signout` – Sign out the current user.
- `GET /auth/whoami` – Get the currently authenticated user.
- `POST /reports` – Submit a new car report.
- `POST /reports/estimate` – Get an estimated price for a car based on existing reports.

## Tech Stack

- **Backend:** NestJS, TypeScript
- **Database:** PostgreSQL, TypeORM
- **Authentication:** Session-based cookies
- **Testing:** Unit and integration tests

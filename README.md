# Silk Road Backend APIs

**Silk Road** is an AI-driven mobile application designed to guide developers and software engineers through personalized learning paths. The backend API, built with Node.js and Express.js, provides the necessary endpoints to power features such as user authentication, career track recommendations, and personalized skill assessments.
<<<<<<< HEAD
=======

---

## Features (at present)

- **Authentication**: Secure login and registration using JWT.
- **User Management**: CRUD operations for users.
- **Photos Uploads**: Upload files (e.g., profile images) to Cloudinary.

## Technologies Used (at present)

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Cloudinary**: Cloud storage service for handling file uploads.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.
- **Nodemailer**: Library for sending emails, used in user verification and password recovery.
- **bcryptjs**: A library for hashing passwords securely.
- **colors**: Library for adding color to console outputs.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **express-async-handler**: Simplifies async error handling in Express routes.
- **express-validator**: Middleware for validating and sanitizing user input.
- **jsonwebtoken**: Used for creating and verifying JSON Web Tokens (JWTs).
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **morgan**: HTTP request logger middleware for Node.js.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary Account](https://cloudinary.com/) (for file storage)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SilckRoad-MarcoPolo/silkRoad_APIs.git
```

2. Navigate to the project directory:

```bash
cd silkroad_apis
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables by creating a `.env` file in the root directory:

```bash
# Node Environment
NODE_ENV=""
# Port
PORT=""
# Database
DB_URL=""
# JWT
JWT_SECRET=""
JWT_EXPIRES_IN=""
# Email
EMAIL_HOST=""
EMAIL_PORT=""
EMAIL_USER=""
EMAIL_PASSWORD=""
# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_SECRET_KEY=""
```

5. Start the development server:

```bash
npm run start:dev
```

## API Routes

### Public Routes

- **POST /signup**  
  Route to register a new user.  
  Validators: `authValidator.signUpValidator`  
  Controller: `signup`

- **POST /login**  
  Route to log in a user.  
  Validators: `authValidator.logInValidator`  
  Controller: `login`

- **POST /forgotpassword**  
  Route to request a password reset.  
  Validators: `authValidator.forgotPasswordValidator`  
  Controller: `forgotPassword`

- **POST /verifyOTP**  
  Route to verify the OTP for password recovery.  
  Controller: `verifyPasswordCode`

- **PUT /resetpassword**  
  Route to reset the password after verifying OTP.  
  Controller: `resetPassword`

### Protected Routes (Require Authentication)

- **POST /upload-photo**  
  Route to upload an avatar/photo for the user.  
  Middleware: `protect`, `upload.single("photo")`  
  Controller: `uploadPhoto`

- **PATCH /updatepassword**  
  Route to update the user's password.  
  Middleware: `protect`, `userValidators.updatePasswordValidator`  
  Controller: `userController.updatePassword`

- **PATCH /updateprofile**  
  Route to update the user's profile information.  
  Middleware: `protect`, `userValidators.updateUserValidator`  
  Controller: `userController.updateProfile`

- **DELETE /inactiveaccount**  
  Route to deactivate the user's account.  
  Middleware: `protect`  
  Controller: `userController.inactiveAccount`

### Admin Routes (Require Admin Access)

- **GET /users**  
  Route to get all users.  
  Middleware: `protect`, `restrictTo("admin")`  
  Controller: `userController.getUsers`

- **POST /users**  
  Route to create a new user.  
  Middleware: `protect`, `restrictTo("admin")`, `userValidators.createUserValidator`  
  Controller: `userController.createUser`

- **GET /users/:id**  
  Route to get a specific user by ID.  
  Middleware: `protect`, `restrictTo("admin")`, `userValidators.checkIDValidator`  
  Controller: `userController.getUser`

- **PATCH /users/:id**  
  Route to update a specific user by ID.  
  Middleware: `protect`, `restrictTo("admin")`, `userValidators.checkIDValidator`  
  Controller: `userController.updateUser`

- **DELETE /users/:id**  
  Route to delete a specific user by ID.  
  Middleware: `protect`, `restrictTo("admin")`, `userValidators.checkIDValidator`  
  Controller: `userController.deleteUser`

## API Documentation

For detailed API documentation, you can access the Postman documentation:

[API Documentation on Postman](https://documenter.getpostman.com/view/28938696/2sAXjSxoBE)

### Error Handling

All errors are handled globally using a custom middleware (`globalError`) to provide standardized error responses.

## License

This project is licensed under the ISC License.

## Author

**Ahmed Magdy**
>>>>>>> dd024e1 (Update README File)

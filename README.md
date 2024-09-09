# Silk Road Backend APIs

**Silk Road** is an AI-driven mobile application designed to guide developers and software engineers through personalized learning paths. The backend API, built with Node.js and Express.js, provides the necessary endpoints to power features such as user authentication, career track recommendations, and personalized skill assessments.

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

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary Account](https://cloudinary.com/) (for file storage)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AhmedDR200/silkroad_apis.git
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
NODE_ENV=development
PORT=3000
DATABASE=mongodb://localhost:27017/silkroad
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

5. Start the development server:

```bash
npm run start:dev
```

### API Endpoints

The API includes the following main routes:

- **Auth**: `/api/v1/auth` - Handles authentication and user management.
- **Users**: `/api/v1/users` - Manage user profiles.
- **Uploads**: `/api/v1` - Handles file uploads to Cloudinary.

### Example Usage

- **Register a User**: `POST /api/v1/auth/signup`
- **Login**: `POST /api/v1/auth/login`
- **Upload File**: `POST /api/v1/upload-photo`

### Error Handling

All errors are handled globally using a custom middleware (`globalError`) to provide standardized error responses.

## License

This project is licensed under the ISC License.

## Author

**Ahmed Magdy**

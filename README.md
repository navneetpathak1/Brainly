# Brainly - Knowledge Sharing Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Live-brightgreen)](https://brainlie.netlify.app/)

Brainly is a full-stack web application built with React, TypeScript, Node.js, Express, and MongoDB. It's designed to be a knowledge-sharing platform where users can create, share, and explore content in a structured way.

🔗 **Live Demo:** [https://brainlie.netlify.app/](https://brainlie.netlify.app/)

## Features

- **User Authentication**: Secure signup and login functionality with JWT
- **Content Management**: Create, read, update, and delete content
- **Sharing**: Generate shareable links for your content
- **Modern UI**: Built with React and Tailwind CSS for a responsive design
- **Type Safety**: Full TypeScript support for both frontend and backend

## Tech Stack

### Frontend
- React 
- TypeScript
- Vite (Build tool)
- Tailwind CSS
- React Router
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS enabled

## Project Structure

```
Brainly/
├── Brainly/                  # Backend
│   ├── src/
│   │   ├── db.ts            # Database connection and models
│   │   ├── index.ts         # Main server file with API routes
│   │   ├── middleware.ts    # Authentication middleware
│   │   └── utils.ts         # Utility functions
│   ├── .env                 # Environment variables
│   └── package.json
│
└── brainlyFrontend/         # Frontend
    ├── src/
    │   ├── components/      # Reusable React components
    │   ├── pages/           # Page components
    │   ├── hooks/           # Custom React hooks
    │   ├── assets/          # Static assets
    │   └── App.tsx          # Main App component
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Brainly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Brainly` directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd brainlyFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/v1/signup` - Register a new user
- `POST /api/v1/signin` - Login user

### Content
- `POST /api/v1/contents` - Create new content
- `GET /api/v1/contents` - Get all contents for the authenticated user
- `GET /api/v1/contents/:id` - Get a specific content
- `PUT /api/v1/contents/:id` - Update a content
- `DELETE /api/v1/contents/:id` - Delete a content

### Sharing
- `POST /api/v1/share` - Generate a shareable link for content
- `GET /api/v1/brain/:shareLink` - Access shared content

## Environment Variables

### Backend (`.env`)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Port number for the server (default: 3001)

## Scripts

### Backend
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ using modern web technologies
- Special thanks to all contributors and open-source libraries used in this project

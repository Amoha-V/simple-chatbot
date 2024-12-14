# Simple Chatbot Application

## Project Overview

A full-stack chatbot application with a React frontend and Node.js backend, powered by Hugging Face AI.

## Project Structure

```
chatbot/
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── controllers/
│   │   │   └── chatController.js
│   │   ├── models/
│   │   │   └── ChatHistory.js
│   │   ├── routes/
│   │   │   └── chatRoutes.js
│   │   ├── utils/
│   │   │   └── huggingFaceClient.js
│   │   └── server.js
│   └── .env
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   │   └── ChatInterface.js
│   │   ├── services/
│   │   │   └── chatService.js
│   │   └── App.js
│   └── .env
└── README.md
```

## Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- MongoDB (optional, for chat history)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string (optional)
   HUGGINGFACE_API_KEY=your_hugging_face_api_key
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

### Start Frontend Development Server

```bash
cd frontend
npm start
```

## Technologies Used

- Backend:
  - Express.js
  - MongoDB (optional)
  - Hugging Face Inference API

- Frontend:
  - React.js
  - Axios
  - React Hooks

## Configuration

- Modify `src/utils/huggingFaceClient.js` to change AI model
- Update environment variables as needed

## License

MIT License

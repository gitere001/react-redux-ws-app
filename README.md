# react-redux-ws-app

A demo project to implement **WebSockets** for real-time updates in a **Course Management System**. This project demonstrates how to build a reactive, real-time application using modern full-stack technologies.

---

## Overview

This app simulates real-time course and enrollment updates using WebSockets. You can use tools like **Postman** to simulate adding new courses and student enrollments, which then instantly update the frontend interface without page reloads.

---

## Technologies Used

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express, WebSocket (ws), MongoDB
- **Communication:** WebSocket protocol for real-time bi-directional communication between client and server

---

## Project Structure

react-redux-ws-app/

- ├── server/ # Backend Express server with WebSocket integration
- ├── websocket-client/ # React + Redux frontend client

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/gitere001/react-redux-ws-app.git
cd react-redux-ws-app
```

2. Setup backend server:

```bash
cd server
npm install
```

3. Configure your .env file in the server directory with your MongoDB connection string:

```bash
MONGO_URI=your_mongodb_connection_string_here
PORT=8000
```

4. Start the backend server:

```bash
npm start
```

5. Setup frontend client:

```bash
cd ../websocket-client
npm install
```
6. Start the frontend development server:
```bash
npm run dev
```
7. Open your browser and visit http://localhost:5173 (or the port your frontend uses).

## Usage
- Use Postman or any API testing tool to simulate adding new courses and enrollments via the backend API endpoints.

- Changes are broadcasted via WebSocket to the connected React client, which automatically updates the UI using Redux.

## Features
- Real-time notifications on new courses and enrollments

- Seamless frontend state management with Redux

- Clean UI styled with Tailwind CSS

- Robust backend with Express and MongoDB

- WebSocket integration using ws package for real-time updates
## Contact
- Created by James Gitere
- Email: gitere.dev@gmail.com
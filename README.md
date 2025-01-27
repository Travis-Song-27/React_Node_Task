# README

## TodoList Application

This is a simple application built with React, Express.js and MongoDB to manage tasks. This app allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of tasks stored in memory.

## Project Structure

### Explanation of Key Components
#### Front-End (`view`)
- **`main.jsx`**: Entry point for the front-end React application.
- **`App.jsx`**: Defines routes and navigation logic using React Router.
- **`TodoList.jsx`**: Manages and displays the task list.
- **`Login.jsx`**: Implements the login interface.
- **`Home.jsx`**: Displays the main homepage for the app.

#### Back-End (`server`)
- **`controllers/user.js`**: Contains business logic for user-related API routes.
- **`db/index.js`**: Establishes and manages the connection to MongoDB using Mongoose.
- **`middleware/auth.js`**: Provides authentication logic using JWT for secure endpoints.
- **`models/User.js`**: Defines the user schema and interacts with the database.
- **`routers/user.js`**: Maps HTTP requests to the appropriate controller functions.
- **`server.js`**: responsible for starting the backend server and configuring basic functionality.

This structure separates the front-end and back-end responsibilities, enabling a clean and modular design.

 

## Getting Started

This project was bootstrapped with Vite.


## In the project/view directory:

### `npm run dev`
Runs the app in the development mode.
Open http://localhost:5173 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.


### `npm run build`
Builds the app for production.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

## In the project/server directory:

### `npm start`

Runs the app in production mode.  
- Open `http://localhost:3000` to view it in your browser (or another port if configured).  
- This mode is optimized for performance and stability, making it suitable for deployment.  

The app will **not reload automatically** if you make changes. To see updates, you need to manually restart the server.

### `npm run dev`

Runs the app in development mode using `nodemon`.  
- Open `http://localhost:3000` to view it in your browser.  
- The server will automatically restart whenever you make changes to the code.  

This mode is ideal for development as it provides real-time updates and displays any errors or warnings directly in the console.  
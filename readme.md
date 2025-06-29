# Excel Analytics Platform

Welcome to the Excel Analytics Platform, a web-based application designed to upload, parse, and analyze Excel files (.xls, .xlsx) with visualization capabilities. This project uses a Node.js backend with Express and MongoDB for data storage, paired with a React frontend. This README provides a detailed overview of what has been implemented, step-by-step setup instructions, troubleshooting tips, and the planned next steps as of 12:43 PM IST on Sunday, June 29, 2025.

## Project Overview

This platform allows users to:
- Upload Excel files and parse their data into a JSON format.
- Display the parsed data in a tabular format on the frontend.
- Select specific columns for detailed analysis via a dropdown.
- (Upcoming) Visualize data using Chart.js for interactive charts.

The project structure includes a `server` directory for the backend and a `client` directory for the frontend, managed within a single Git repository.

## What Has Been Done So Far

### Step 1: Project Setup
- Initialized a Git repository and structured the project with `server` and `client` directories.
- Configured the backend with Express, CORS, and a MongoDB Atlas connection using environment variables in a `.env` file.
- Set up the frontend with React, including a login page using JWT authentication.

### Step 2: Authentication
- Implemented a `/api/auth/login` endpoint in `server/routes/auth.js` to handle user login.
- Users log in with `testuser`/`testpassword` to receive a JWT token, stored in `localStorage` for authenticated requests.
- Added `authMiddleware` in `server/middleware/auth.js` to protect endpoints.

### Step 3: File Upload Functionality
- Integrated Multer in `server/routes/upload.js` to handle file uploads.
- Created a `/api/upload` endpoint to accept `.xls` and `.xlsx` files, saving them to the `server/uploads/` directory.
- Example `curl` command to test upload:
  ```bash
  curl -X POST http://localhost:5000/api/upload -H "Authorization: Bearer <your-jwt>" -F "file=./sample_airport_data.xlsx"


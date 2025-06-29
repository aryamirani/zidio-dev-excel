# Excel Analytics Platform

Welcome to the Excel Analytics Platform, a web-based application designed to upload, parse, and analyze Excel files (.xls, .xlsx) with visualization capabilities. This project uses a Node.js backend with Express and MongoDB for data storage, paired with a React frontend. This README provides a complete guide for setting up and using the platform on your own machine via the normal GUI (web interface), including every step from prerequisites to file upload, as of 12:50 PM IST on Sunday, June 29, 2025.

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
- Configured the backend with Express, CORS, and a MongoDB Atlas connection using environment variables.
- Set up the frontend with React, including a login page using JWT authentication.

### Step 2: Authentication
- Implemented a `/api/auth/login` endpoint to handle user login with `testuser`/`testpassword`.
- Generated JWT tokens stored in `localStorage` for authenticated requests.
- Added `authMiddleware` to protect endpoints.

### Step 3: File Upload Functionality
- Integrated Multer to handle file uploads.
- Created a `/api/upload` endpoint to accept `.xls` and `.xlsx` files, saving them to `server/uploads/`.

### Step 4: Parse Excel Data with SheetJS
- Added SheetJS to parse Excel files into JSON.
- Displayed parsed data in a table on the frontend.
- Saved data to MongoDB using a `Data` model.

### Step 5: Allow Users to Select Columns for Visualization
- Created `/api/data/columns` and `/api/data/column/:columnName` endpoints.
- Updated the frontend to show a dropdown for column selection with corresponding data.

## How to Set Up and Run the Project

### Prerequisites
- **Node.js**: Version 22.16.0 or later – [Download](https://nodejs.org)
- **npm**: Comes with Node.js – check with `npm -v`
- **MongoDB Atlas**: Sign up [here](https://www.mongodb.com/cloud/atlas)
- **Git**: [Install Git](https://git-scm.com)
- **Text Editor**: e.g., VS Code
- **Browser**: Chrome, Firefox, or Edge
- **Sample File**: `sample_airport_data.xlsx` (with columns like "Airport Code", "Airport Name", etc.)

### Step-by-Step Installation and Usage

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/excel-analytics-platform.git
cd excel-analytics-platform
```

#### 2. Create and Configure the `.env` File
```bash
cd server
touch .env
```

Paste the following into `.env` and update values:
```
MONGO_URI= ..contact me for this
JWT_SECRET=contact me for this
PORT=5000
```

#### 3. Install Dependencies

**Backend:**
```bash
cd server
npm init -y
npm install express cors mongoose dotenv multer xlsx
```

**Frontend:**
```bash
cd ../client
npm install
```

#### 4. Start the Server
```bash
cd server
node server.js
```
Expected output:
```
[dotenv@17.0.0] injecting env (3) from .env
Server running on port 5000
MongoDB connected
```

#### 5. Start the Frontend
```bash
cd ../client
npm start
```

App runs at: [http://localhost:3000](http://localhost:3000)

#### 6. Log In to Get a JWT
- Username: `testuser`
- Password: `testpassword`

Check JWT in Dev Tools → Application → Local Storage → token

#### 7. Upload and Analyze Excel File
- Upload `sample_airport_data.xlsx` using the upload form.
- Table with rows will render, along with column dropdown.
- Select a column to see its values below.


## Contributing

1. Fork this repo
2. Create a new branch
3. Make changes and commit
4. Push to your fork and open a PR

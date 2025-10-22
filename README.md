Payroll Management System

A full-stack Payroll & HRMS web application designed to automate employee management — including attendance tracking, leave approval, shift management, salary setup, and automated payslip generation.
Built with MERN Stack, the system provides separate Admin and Employee roles, ensuring secure and seamless payroll processing.

Live Demo

🔗 Payroll Management System (Live):- https://payroll-system-roan.vercel.app/

🎥 Demo Video: https://player.cloudinary.com/embed/?cloud_name=duvw71tdz&public_id=payroll_w92t41&profile=cld-default

🛠️ Tech Stack

Frontend:

React.js

Material-UI (MUI)

Axios

Redux Toolkit

Day.js

Backend:

Node.js

Express.js

MongoDB (Mongoose ODM)

Cloudinary (File Uploads)

JOI (Request Validation)

JWT Authentication

Multer (for file uploads)

Deployment:

Frontend → Vercel

Backend + Database → Render

👤 Roles & Access
Role Permissions
Admin / Company Manage employees, approve/reject leaves, define salary heads, generate payslips
Employee Apply for leaves, view attendance, download salary slips

✨ Key Features
👨‍💼 Employee Management

Add, update, and delete employee details

Upload employee photo and documents via Cloudinary

🕒 Attendance Tracking

Track daily attendance with Day/Night shift options

Display today’s attendance and leaves on the admin dashboard

Automatic calculation of total working hours

🌴 Leave Management

Employees can apply for leaves

Admins can approve or reject requests

Dashboard summary for pending and approved leaves

💰 Salary Management

Fully customizable salary heads (like Basic, HRA, Bonus, etc.)

Define employee-wise salary settings

Automated salary generation based on attendance and settings

📊 Admin Dashboard

Today’s attendance summary

Today’s leave summary

Employee count overview

Quick actions for payroll processing

👨‍🏭 Employee Portal

Secure employee login

View attendance history

Track leave status

View and download salary slips

### 🧩 Project Structure

Payroll-System/
├── frontend/ → React.js + MUI (Vite) client
├── backend/ → Node.js + Express + MongoDB API
└── README.md

System Architecture
Frontend (React + MUI)
|
| Axios (REST API Calls)
↓
Backend (Node.js + Express)
|
| Mongoose (ODM)
↓
Database (MongoDB)

Frontend Setup
cd frontend
npm install
npm run dev

Additional Integrations:

Cloudinary → Employee photo & document storage

JOI → Schema-based backend validation

JWT → Authentication & Role-based access control

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Chetansharma20/Payroll-System.git
cd Payroll-System

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file in the root directory
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000

4️⃣ Run the application
npm run dev

The app will run on http://localhost:5173
(frontend) and backend on your configured port.

📡 API Overview
Method Endpoint Description
POST /api/company/addcompany Register a new company
POST /api/company/login Company login
POST /api/employee/addemployee Add new employee
GET /api/employee/fetchemployee Fetch all employees
POST /api/attendance/mark Mark attendance
GET /api/attendance/today Get today’s attendance
POST /api/leave/apply Apply for leave
GET /api/leave/all Fetch all leaves
POST /api/salary/generate Generate salary slip

🧠 Future Enhancements

Role-based analytics dashboard

Attendance auto-sync with biometric system

Salary slip PDF generation & email integration

Department & Designation-based filtering

Export reports (Excel/PDF)

👨‍💻 Developer

Chetan Sharma
📧 sharmachetan20082000@gmail.com

🏷️ License

This project is licensed under the MIT License — you’re free to use and modify it with attribution.

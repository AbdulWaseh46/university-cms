# 🎓 University Course Management System

A React-based University Course Management System with multi-page routing, Context API, and localStorage persistence.

## 🚀 Live Features
- Dashboard with summary stats
- Add / Delete Students
- Add / Delete Courses
- Enroll Students in Courses
- Remove Enrollments
- Search Students
- Prevent Duplicate Enrollments
- Student Detail Page
- Fully Responsive UI
- Form Validation
- Toast Notifications

## 🛠️ Tech Stack
- React 18
- React Router v6
- Context API
- localStorage (no database)
- CSS Variables

## 📁 Project Structure
src/
├── context/
│   └── AppContext.jsx
├── components/
│   ├── Navbar.jsx
│   ├── StudentCard.jsx
│   ├── CourseCard.jsx
│   ├── EnrollmentTable.jsx
│   └── ToastContainer.jsx
├── pages/
│   ├── Home.jsx
│   ├── Students.jsx
│   ├── Courses.jsx
│   ├── Enroll.jsx
│   ├── Enrollments.jsx
│   └── StudentDetail.jsx
├── App.jsx
├── index.js
└── index.css
## ⚙️ How to Run Locally

### Prerequisites
- Node.js (v16 or higher) → https://nodejs.org

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/AbdulWaseh46/university-cms.git

# 2. Go into the project folder
cd university-cms

# 3. Install dependencies
npm install

# 4. Start the app
npm start
```

App will open at **http://localhost:3000**

## 📌 Pages & Routes
| Route | Page |
|---|---|
| `/` | Dashboard |
| `/students` | Students |
| `/courses` | Courses |
| `/enroll` | Enroll Student |
| `/enrollments` | All Enrollments |
| `/student/:id` | Student Detail |
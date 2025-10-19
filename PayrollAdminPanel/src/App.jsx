// // // // App.jsx
// // // import React from 'react';
// // // import { Navigate, Route, Routes } from 'react-router-dom';
// // // import Login from './Components/Login';
// // // import AdminLayout from './Components/AdminLayout';
// // // import EmployeeRouting from './Employeeside/EmployeeRouting';

// // // const App = () => {
// // //  const userRole = localStorage.getItem("userRole");
// // //   return (
// // //      <Routes>
// // //       {/* Login page */}
// // //       <Route path="/login" element={<Login />} />

// // //       {/* Admin routes */}
// // //       <Route path="/admin/*" element={<AdminLayout />} />

// // //       {/* Employee routes */}
// // //       <Route path="/employee/*" element={<EmployeeRouting />} />

// // //       {/* Default fallback */}
// // //       <Route path="*" element={<Navigate to="/login" replace />} />
// // //     </Routes>
// // //   );
// // // };

// // // export default App;
// // // App.jsx
// // import React from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import Login from './Components/Login';
// // import AdminLayout from './Components/AdminLayout';
// // import EmployeeRouting from './Employeeside/EmployeeRouting';
// // import ProtectedRoute from './protected route/Protectedroute';
// // import MainContent from './Components/MainContent';

// // const App = () => {
// //   return (
// //     <Routes>
// //       {/* Common login page */}
// //       <Route path="/login" element={<Login />} />

// //       {/* Admin side */}
// //       <Route
// //         path="/admin/*"
// //         element={
// //           <ProtectedRoute role="admin">
// //           <MainContent/>
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* Employee side — use the full routing component */}
// //       <Route
// //         path="/employee/*"
// //         element={
// //           <ProtectedRoute role="employee">
// //             <EmployeeRouting />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* Fallback */}
// //       <Route path="*" element={<Navigate to="/login" replace />} />
// //     </Routes>
// //   );
// // };

// // export default App;
// // App.jsx - FIXED VERSION
// // import React from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import Login from './Components/Login';
// // import AdminLayout from './Components/AdminLayout';
// // import EmployeeRouting from './Employeeside/EmployeeRouting';
// // import ProtectedRoute from './protected route/Protectedroute';

// // const App = () => {
// //   return (
// //     <Routes>
// //       {/* Common login page */}
// //       <Route path="/login" element={<Login />} />

// //       {/* Admin side - FIXED: Use AdminLayout instead of MainContent */}
// //       <Route
// //         path="/admin/*"
// //         element={
// //           <ProtectedRoute role="admin">
// //             <AdminLayout />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* Employee side */}
// //       <Route
// //         path="/employee/*"
// //         element={
// //           <ProtectedRoute role="employee">
// //             <EmployeeRouting />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* Fallback */}
// //       <Route path="*" element={<Navigate to="/login" replace />} />
// //     </Routes>
// //   );
// // };

// // export default App;
// import React from 'react'
// import AdminLayout from './Components/AdminLayout'

// const App = () => {
//   return (
//     <div>
//       <AdminLayout/>
//     </div>
//   )
// }

// export default App

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UnifiedLogin from './Components/UnifiedLogin';
import AdminLayout from './Components/AdminLayout';
import EmployeeRouting from './Employeeside/EmployeeRouting';
import ProtectedRoute from './protected route/Protectedroute';
import AddCompany from './Components/AddCompany';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<UnifiedLogin />} />
      <Route path="/addcompany" element={<AddCompany />} />

      {/* Admin/Company protected routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      {/* Employee protected routes */}
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute role="employee">
            <EmployeeRouting />
          </ProtectedRoute>
        }
      />

      {/* Default redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
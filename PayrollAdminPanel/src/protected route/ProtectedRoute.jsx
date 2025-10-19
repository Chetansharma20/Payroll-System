// // import { Navigate } from "react-router-dom";
// // import { useSelector } from "react-redux";

// // const ProtectedRoute = ({ children, role }) => {
// //   const { isLogin } = useSelector((state) => state.company);
// //   const { isAuthenticated } = useSelector((state) => state.employee);

// //   const userType = localStorage.getItem("userType");

// //   // console log for debugging
// //   console.log('[ProtectedRoute] role=', role, 'isLogin=', isLogin, 'isAuthenticated=', isAuthenticated, 'userType=', userType);

// //   if (role === "admin" && userType === "admin" && isLogin)
// //      return children;
// //   if (role === "employee" && userType === "employee" && isAuthenticated) 
// //     return children;

// //   // fallback to login
// //   return <Navigate to="/login" replace />;
// // };

// // export default ProtectedRoute;
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children, role }) => {
//   const { isLogin } = useSelector((state) => state.company);
//   const { isAuthenticated } = useSelector((state) => state.employee);
//   const userType = localStorage.getItem("userType");

//   console.log('[ProtectedRoute]', { role, isLogin, isAuthenticated, userType });

//   // Admin access
//   if (role === "admin") {
//     if (isLogin && userType === "admin") return children;
//     return <Navigate to="/login" replace />;
//   }

//   // Employee access
//   if (role === "employee") {
//     if (isAuthenticated && userType === "employee") return children;
//     return <Navigate to="/login" replace />;
//   }

//   return <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, role }) => {
  const { isLogin: companyLogin } = useSelector((state) => state.company);
  const { isLogin: employeeLogin } = useSelector((state) => state.employee);
  const userType = localStorage.getItem('userType');
  const token = localStorage.getItem('token');

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  if (role === 'admin') {
    if (userType === 'admin' && companyLogin) {
      return children;
    }
    return <Navigate to="/login" replace />;
  }

  if (role === 'employee') {
    if (userType === 'employee' && employeeLogin) {
      return children;
    }
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UnifiedLogin from './Components/UnifiedLogin';
import AdminLayout from './Components/AdminLayout';
import EmployeeRouting from './Employeeside/EmployeeRouting';

import AddCompany from './Components/AddCompany';
import ProtectedRoute from './protected-route/ProtectedRoute';

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
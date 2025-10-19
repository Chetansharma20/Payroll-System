// import React from 'react'
// import DrawerEmployee from './DrawerEmployee'
// import Login from './Login'
// import Leaves from './Leaves'
// import Attendances from './Attendances'
// import { Route, Routes } from 'react-router-dom'
// import DashBoard from './DashBoard'
// import Profile from './Profile'
// import Salary from './Salary'

// const EmployeeRouting = () => {
//   return (
//  <>
//  <DrawerEmployee/>
//     <Routes>
//        <Route path='/' element={<Login/>}/> 
//        <Route path='/leaves' element={<Leaves/>}/>
//        <Route path='/attendances' element={<Attendances/>}/>
//         <Route path='/dashboard' element={<DashBoard/>}/>
//           <Route path='/profile' element={<Profile/>}/>
//           <Route path='/salary' element={<Salary/>}/>
//     </Routes>

 
 
 
 
 
//  </>
//   )
// }

// export default EmployeeRouting
import React from 'react';
import DrawerEmployee from './DrawerEmployee';

import Leaves from './Leaves';
import Attendances from './Attendances';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashBoard from './DashBoard';
import Profile from './Profile';
import Salary from './Salary';

const EmployeeRouting = () => {
  return (
    <>
      <DrawerEmployee />
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/attendances" element={<Attendances />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/salary" element={<Salary />} />
        
        {/* Redirect to dashboard by default */}
        <Route path="*" element={<Navigate to="/employee/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default EmployeeRouting;
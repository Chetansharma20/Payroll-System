// // import { Box } from '@mui/material';
// // import React from 'react';
// // import { Navigate, Route, Routes } from 'react-router-dom';
// // import ProtectedRoute from '../protected route/Protectedroute';

// // import OverView from '../Pages/OverView';
// // import PayrollSummary from '../Pages/Overview/PayrollSummary';
// // import SalaryDisburesment from '../Pages/Overview/SalaryDisburesment';
// // import RecentActivities from '../Pages/Overview/RecentActivities';
// // import GeneratePayroll from '../Pages/GeneratePayroll';
// // import SalaryStructure from "../Pages/Payroll Processing/SalaryStructure";
// // import OvertimeDeductions from '../Pages/OvertimeDeductions';
// // import BonusIncentives from '../Pages/Payroll Processing/BonusIncentives';
// // import PayslipManagement from '../Pages/Payroll Processing/PayslipManagement';
// // import AddEmployee from '../Pages/Employees/AddEmployee';
// // import EmployeeList from '../Pages/Employees/EmployeeList';
// // import DepartmentsDesignation from '../Pages/Employees/DepartmentsDesignation';
// // import AttendanceTracking from '../Pages/Employees/AttendanceTracking';
// // import EmployeeDocuments from '../Pages/Employees/EmployeeDocuments';
// // import TaxCalculations from '../Pages/TaxCalculations';
// // import PFEsi from '../Pages/PFEsi';
// // import ComplianceFilings from '../Pages/ComplianceFilings';
// // import AuditLogs from '../Pages/AuditLogs';
// // import CustomReports from '../Pages/CustomReports';
// // import CompanySettings from '../Pages/Settings/CompanySettings';
// // import UserRoles from '../Pages/Settings/UserRoles';
// // import PayrollConfigurations from '../Pages/PayrollConfigurations';
// // import NotificationAlerts from '../Pages/NotificationAlerts';
// // import DataBackupRestore from '../Pages/DataBackupRestore';
// // import BranchList from '../Pages/Branches/BranchList';
// // import SalaryHeads from '../Pages/Settings/SalaryHeads';
// // import Leave from '../Pages/Employees/Leave';
// // import SalarySettings from '../Pages/Employees/SalarySettings';
// // import AdminLayout from './AdminLayout';

// // const MainContent = () => {
// //   return (
// //     <Box component="main" sx={{ flexGrow: 1, marginTop: 10 }}>
// //       <Routes>
// //         {/* Dashboard / admin pages */}
// //         <Route
// //           path="/"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <AdminLayout/>
// //             </ProtectedRoute>
// //           }
// //         />
// //          <Route path="overview" element={<OverView />} />
// //         <Route
// //           path="payrollsummary"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <PayrollSummary />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="salarydisbursement"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <SalaryDisburesment />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="recentactivities"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <RecentActivities />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Payroll */}
// //         <Route
// //           path="payroll/generatepayroll"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <GeneratePayroll />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="payroll/salarystructure"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <SalaryStructure />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="payroll/overtimedeductions"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <OvertimeDeductions />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="payroll/bonusincentives"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <BonusIncentives />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="payroll/payslip"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <PayslipManagement />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Employee Management */}
// //         <Route
// //           path="employees/add"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <AddEmployee />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="employees/list"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <EmployeeList />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="employees/salarysetting"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <SalarySettings />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="employees/departmentdesignation"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <DepartmentsDesignation />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="employees/attendancetracking"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <AttendanceTracking />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="employees/documents"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <EmployeeDocuments />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="employees/leave"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <Leave />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Compliance / Settings / Other admin */}
// //         <Route
// //           path="compliance/taxcalculations"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <TaxCalculations />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="compliance/pfesi"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <PFEsi />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="compliance/compliancefiling"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <ComplianceFilings />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="compliance/auditlogs"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <AuditLogs />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="compliance/customreports"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <CustomReports />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="settings/companysettings"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <CompanySettings />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="settings/userroles"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <UserRoles />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="settings/payrollconfigurations"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <PayrollConfigurations />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="settings/notificationalerts"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <NotificationAlerts />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="settings/databackuprestore"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <DataBackupRestore />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="branches/branchlist"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <BranchList />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="payroll/salaryheads"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <SalaryHeads />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Redirect unknown admin paths */}
// //         <Route path="*" element={<Navigate to="overview" replace />} />
// //       </Routes>
// //     </Box>
// //   );
// // };

// // export default MainContent;
// import { Box } from '@mui/material';
// import React from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';

// import OverView from '../Pages/OverView';
// import PayrollSummary from '../Pages/Overview/PayrollSummary';
// import SalaryDisburesment from '../Pages/Overview/SalaryDisburesment';
// import RecentActivities from '../Pages/Overview/RecentActivities';
// import GeneratePayroll from '../Pages/GeneratePayroll';
// import SalaryStructure from "../Pages/Payroll Processing/SalaryStructure";
// import OvertimeDeductions from '../Pages/OvertimeDeductions';
// import BonusIncentives from '../Pages/Payroll Processing/BonusIncentives';
// import PayslipManagement from '../Pages/Payroll Processing/PayslipManagement';
// import AddEmployee from '../Pages/Employees/AddEmployee';
// import EmployeeList from '../Pages/Employees/EmployeeList';
// import DepartmentsDesignation from '../Pages/Employees/DepartmentsDesignation';
// import AttendanceTracking from '../Pages/Employees/AttendanceTracking';
// import EmployeeDocuments from '../Pages/Employees/EmployeeDocuments';
// import TaxCalculations from '../Pages/TaxCalculations';
// import PFEsi from '../Pages/PFEsi';
// import ComplianceFilings from '../Pages/ComplianceFilings';
// import AuditLogs from '../Pages/AuditLogs';
// import CustomReports from '../Pages/CustomReports';
// import CompanySettings from '../Pages/Settings/CompanySettings';
// import UserRoles from '../Pages/Settings/UserRoles';
// import PayrollConfigurations from '../Pages/PayrollConfigurations';
// import NotificationAlerts from '../Pages/NotificationAlerts';
// import DataBackupRestore from '../Pages/DataBackupRestore';
// import BranchList from '../Pages/Branches/BranchList';
// import SalaryHeads from '../Pages/Settings/SalaryHeads';
// import Leave from '../Pages/Employees/Leave';
// import SalarySettings from '../Pages/Employees/SalarySettings';

// const MainContent = () => {
//   return (
//     <Box component="main" sx={{ flexGrow: 1, marginTop: 10 }}>
//       <Routes>
//         {/* REMOVED redundant ProtectedRoute wrappers - already protected in App.jsx */}
        
//         {/* Dashboard */}
//         <Route path="overview" element={<OverView />} />
//         <Route path="payrollsummary" element={<PayrollSummary />} />
//         <Route path="salarydisbursement" element={<SalaryDisburesment />} />
//         <Route path="recentactivities" element={<RecentActivities />} />

//         {/* Payroll */}
//         <Route path="payroll/generatepayroll" element={<GeneratePayroll />} />
//         <Route path="payroll/salarystructure" element={<SalaryStructure />} />
//         <Route path="payroll/overtimedeductions" element={<OvertimeDeductions />} />
//         <Route path="payroll/bonusincentives" element={<BonusIncentives />} />
//         <Route path="payroll/payslip" element={<PayslipManagement />} />
//         <Route path="payroll/salaryheads" element={<SalaryHeads />} />

//         {/* Employee Management */}
//         <Route path="employees/add" element={<AddEmployee />} />
//         <Route path="employees/list" element={<EmployeeList />} />
//         <Route path="employees/salarysetting" element={<SalarySettings />} />
//         <Route path="employees/departmentdesignation" element={<DepartmentsDesignation />} />
//         <Route path="employees/attendancetracking" element={<AttendanceTracking />} />
//         <Route path="employees/documents" element={<EmployeeDocuments />} />
//         <Route path="employees/leave" element={<Leave />} />

//         {/* Compliance */}
//         <Route path="compliance/taxcalculations" element={<TaxCalculations />} />
//         <Route path="compliance/pfesi" element={<PFEsi />} />
//         <Route path="compliance/compliancefiling" element={<ComplianceFilings />} />
//         <Route path="compliance/auditlogs" element={<AuditLogs />} />
//         <Route path="compliance/customreports" element={<CustomReports />} />

//         {/* Settings */}
//         <Route path="settings/companysettings" element={<CompanySettings />} />
//         <Route path="settings/userroles" element={<UserRoles />} />
//         <Route path="settings/payrollconfigurations" element={<PayrollConfigurations />} />
//         <Route path="settings/notificationalerts" element={<NotificationAlerts />} />
//         <Route path="settings/databackuprestore" element={<DataBackupRestore />} />

//         {/* Branches */}
//         <Route path="branches/branchlist" element={<BranchList />} />

//         {/* Redirect unknown paths to overview */}
//         <Route path="*" element={<Navigate to="/admin/overview" replace />} />
//       </Routes>
//     </Box>
//   );
// };


// export default MainContent;
import { Box } from '@mui/material'
import React from 'react'
import OverView from '../Pages/OverView'
import { Route, Routes } from 'react-router-dom'
import PayrollSummary from '../Pages/Overview/PayrollSummary'

import SalaryDisburesment from '../Pages/Overview/SalaryDisburesment'
import RecentActivities from '../Pages/Overview/RecentActivities'
import GeneratePayroll from '../Pages/GeneratePayroll'
import SalaryStructure from  "../Pages/Payroll Processing/SalaryStructure"
import OvertimeDeductions from '../Pages/OvertimeDeductions'
import BonusIncentives from '../Pages/Payroll Processing/BonusIncentives'
import PayslipManagement from '../Pages/Payroll Processing/PayslipManagement'
import AddEmployee from '../Pages/Employees/AddEmployee'
import EmployeeList from '../Pages/Employees/EmployeeList'
import DepartmentsDesignation from '../Pages/Employees/DepartmentsDesignation'
import AttendanceTracking from '../Pages/Employees/AttendanceTracking'
import EmployeeDocuments from '../Pages/Employees/EmployeeDocuments'
import TaxCalculations from '../Pages/TaxCalculations'
import PFEsi from '../Pages/PFEsi'
import ComplianceFilings from '../Pages/ComplianceFilings'
import AuditLogs from '../Pages/AuditLogs'
import CustomReports from '../Pages/CustomReports'
import CompanySettings from '../Pages/Settings/CompanySettings'
import UserRoles from '../Pages/Settings/UserRoles'
import PayrollConfigurations from '../Pages/PayrollConfigurations'
import NotificationAlerts from '../Pages/NotificationAlerts'

import AddCompany from './AddCompany'

import BranchList from '../Pages/Branches/BranchList'
import SalaryHeads from '../Pages/Settings/SalaryHeads'
import Leave from '../Pages/Employees/Leave'
import SalarySettings from '../Pages/Employees/SalarySettings'
import UnifiedLogin from './UnifiedLogin'
const MainContent = () => {
  return (
   <Box component="main" sx={{flexGrow:1, marginTop:10}}>
<Routes>
    <Route path='/dashboard/overview' element={<OverView/>}/>
    <Route path='/dashboard/payrollsummary' element={<PayrollSummary/>}/>
    {/* <Route path='/dashboard/employeeattendance' element={<EmployeeAttendance/>}/> */}
    <Route path='/dashboard/salarydisbursement' element={<SalaryDisburesment/>}/>
    <Route path='/dashboard/recentacticities' element={<RecentActivities/>}/>
    <Route path='/payroll/generatepayroll' element={<GeneratePayroll/>}/>
    <Route path='/payroll/salarystructure' element={<SalaryStructure/>}/>
    <Route path='/payroll/overtimedeductions' element={<OvertimeDeductions/>}/>
    <Route path='/payroll/bonusincentives' element={<BonusIncentives/>}/>
    <Route path='/payroll/payslip' element={<PayslipManagement/>}/>
    <Route path='/employee/addemployee' element={<AddEmployee/>}/>
    <Route path='/employee/employeelist' element={<EmployeeList/>}/>
      <Route path='/employee/salarysetting' element={<SalarySettings/>}/>
    <Route path='/employee/departmentdesignation' element={<DepartmentsDesignation/>}/>
    <Route path='/employee/attendancetracking' element={<AttendanceTracking/>}/>
    <Route path='/employee/employeedocuments' element={<EmployeeDocuments/>}/>
    <Route path='/compliance/taxcalculations' element={<TaxCalculations/>}/>
    <Route path='/compliance/pfesi' element={<PFEsi/>}/>
    <Route path='/compliance/compliancefiling' element={<ComplianceFilings/>}/>
    <Route path='/compliance/auditlogs' element={<AuditLogs/>}/>
    <Route path='/compliance/customreports' element={<CustomReports/>}/>
    <Route path='/settings/companysettings' element={<CompanySettings/>}/>
    <Route path='/settings/userroles' element={<UserRoles/>}/>
    <Route path='/settings/payrollconfigurations' element={<PayrollConfigurations/>}/>
    <Route path='/settings/notificationalerts' element={<NotificationAlerts/>}/>
    {/* <Route path='/settings/databackuprestore' element={<DataBackupRestore/>}/> */}
    <Route path='/branches/branchlist' element={<BranchList/>}/>
    <Route path='/addcompany' element={<AddCompany/>}/>
    <Route path='/login' element={<UnifiedLogin/>}/>
    

    <Route path='/payroll/salaryheads' element={<SalaryHeads/>}/>
    <Route path='/employee/leave' element={<Leave/>}/>
    

</Routes>






   </Box>
  )
}

export default MainContent
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
import DataBackupRestore from '../Pages/DataBackupRestore'
import AddCompany from './AddCompany'
import Login from './Login'
import BranchList from '../Pages/Branches/BranchList'
import SalaryHeads from '../Pages/Settings/SalaryHeads'
import Leave from '../Pages/Employees/Leave'
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
    <Route path='/settings/databackuprestore' element={<DataBackupRestore/>}/>
    <Route path='/branches/branchlist' element={<BranchList/>}/>
    <Route path='/addcompany' element={<AddCompany/>}/>
    <Route path='/login' element={<Login/>}/>
    

    <Route path='/settings/salaryheads' element={<SalaryHeads/>}/>
    <Route path='/employee/leave' element={<Leave/>}/>
    

</Routes>






   </Box>
  )
}

export default MainContent
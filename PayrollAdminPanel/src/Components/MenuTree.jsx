// import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import React from 'react';
// import { Box } from '@mui/material';
// import BadgeIcon from '@mui/icons-material/Badge';
// import PaymentIcon from '@mui/icons-material/Payment';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { useNavigate } from 'react-router-dom';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// const MenuTree = () => {
//   const navigate = useNavigate();

//   return (
//     <SimpleTreeView>
//       <TreeItem
//         itemId="1"
//         label={
//           <Box display="flex" alignItems="center" gap={1}>
//             <DashboardIcon /> Dashboard
//           </Box>
//         }
//       >
//         <TreeItem itemId="2" label="Overview" onClick={() => navigate('/dashboard/overview')} />
//         {/* <TreeItem itemId="3" label="Payroll Summary" onClick={() => navigate('/dashboard/payrollsummary')} /> */}
//         {/* <TreeItem itemId="4" label="Employee Attendance" onClick={() => navigate('/dashboard/employeeattendance')} /> */}
//         {/* <TreeItem itemId="5" label="Salary Disbursement" onClick={() => navigate('/dashboard/salarydisbursement')} /> */}
//         {/* <TreeItem itemId="6" label="Recent Activities" onClick={() => navigate('/dashboard/recentacticities')} /> */}
//       </TreeItem>

//       <TreeItem
//         itemId="7"
//         label={
//           <Box display="flex" alignItems="center" gap={1}>
//             <BadgeIcon /> Employee Management
//           </Box>
//         }
//       >
//         {/* <TreeItem itemId="8" label="Add Employee" onClick={() => navigate('/employee/addemployee')} /> */}
//         <TreeItem itemId="9" label="Employee List" onClick={() => navigate('/employee/employeelist')} />
//         <TreeItem itemId="10" label="Department And Designation" onClick={() => navigate('/employee/departmentdesignation')} />
//         <TreeItem itemId="11" label="Attendance Tracking" onClick={() => navigate('/employee/attendancetracking')} />
//         <TreeItem itemId="12" label="Employee Documents" onClick={() => navigate('/employee/employeedocuments')} />
//            <TreeItem itemId="32" label="Employee Leaves" onClick={() => navigate('/employee/leave')} />
//             <TreeItem itemId="33" label="Salary Settings" onClick={() => navigate('/employee/salarysetting')} />
//       </TreeItem>

//       <TreeItem
//         itemId="13"
//         label={
//           <Box display="flex" alignItems="center" gap={1}>
//             <PaymentIcon /> Payroll Processing
//           </Box>
//         }
//       >
//          <TreeItem itemId="29" label="Salary Heads" onClick={() => navigate('/payroll/salaryheads')} />
//         {/* <TreeItem itemId="15" label="Salary Structure" onClick={() => navigate('/payroll/salarystructure')} /> */}
//         {/* <TreeItem itemId="17" label="Bonus And Incentives" onClick={() => navigate('/payroll/bonusincentives')} /> */}
//         <TreeItem itemId="18" label="Payslip Management" onClick={() => navigate('/payroll/payslip')} />
//       </TreeItem>

//       {/* <TreeItem
//         itemId="25"
//         label={
//           <Box display="flex" alignItems="center" gap={1}>
//             <SettingsIcon /> Settings And Administration
//           </Box>
//         }
//       >
//         <TreeItem itemId="26" label="Company Settings" onClick={() => navigate('/settings/companysettings')} />
//         <TreeItem itemId="27" label="User Roles And Permissions" onClick={() => navigate('/settings/userroles')} />
//         <TreeItem itemId="28" label="Payroll Configurations" onClick={() => navigate('/settings/payrollconfigurations')} />
//         <TreeItem itemId="29" label="Salary Heads" onClick={() => navigate('/settings/salaryheads')} />
//       </TreeItem> */}

//       <TreeItem
//         itemId="30"
//         label={
//           <Box display="flex" alignItems="center" gap={1}>
//           <ApartmentIcon/> Company Branches
//           </Box>
//         }
//       >
//         <TreeItem itemId="31" label="Company Branches" onClick={() => navigate('/branches/branchlist')} />
       
//       </TreeItem>




//     </SimpleTreeView>
//   );
// };

// export default MenuTree;
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react';
import { Box } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';

const MenuTree = () => {
  const navigate = useNavigate();

  return (
    <SimpleTreeView>
      <TreeItem
        itemId="1"
        label={
          <Box display="flex" alignItems="center" gap={1}>
            <DashboardIcon /> Dashboard
          </Box>
        }
      >
        <TreeItem 
          itemId="2" 
          label="Overview" 
          onClick={() => navigate('/admin/dashboard/overview')} 
        />
      </TreeItem>

      <TreeItem
        itemId="7"
        label={
          <Box display="flex" alignItems="center" gap={1}>
            <BadgeIcon /> Employee Management
          </Box>
        }
      >
        <TreeItem 
          itemId="9" 
          label="Employee List" 
          onClick={() => navigate('/admin/employee/employeelist')} 
        />
        <TreeItem 
          itemId="10" 
          label="Department And Designation" 
          onClick={() => navigate('/admin/employee/departmentdesignation')} 
        />
        <TreeItem 
          itemId="11" 
          label="Attendance Tracking" 
          onClick={() => navigate('/admin/employee/attendancetracking')} 
        />
        <TreeItem 
          itemId="12" 
          label="Employee Documents" 
          onClick={() => navigate('/admin/employee/employeedocuments')} 
        />
        <TreeItem 
          itemId="32" 
          label="Employee Leaves" 
          onClick={() => navigate('/admin/employee/leave')} 
        />
        <TreeItem 
          itemId="33" 
          label="Salary Settings" 
          onClick={() => navigate('/admin/employee/salarysetting')} 
        />
      </TreeItem>

      <TreeItem
        itemId="13"
        label={
          <Box display="flex" alignItems="center" gap={1}>
            <PaymentIcon /> Payroll Processing
          </Box>
        }
      >
        <TreeItem 
          itemId="29" 
          label="Salary Heads" 
          onClick={() => navigate('/admin/payroll/salaryheads')} 
        />
        <TreeItem 
          itemId="18" 
          label="Payslip Management" 
          onClick={() => navigate('/admin/payroll/payslip')} 
        />
      </TreeItem>

      <TreeItem
        itemId="30"
        label={
          <Box display="flex" alignItems="center" gap={1}>
            <ApartmentIcon /> Company Branches
          </Box>
        }
      >
        <TreeItem 
          itemId="31" 
          label="Company Branches" 
          onClick={() => navigate('/admin/branches/branchlist')} 
        />
      </TreeItem>
    </SimpleTreeView>
  );
};

export default MenuTree;
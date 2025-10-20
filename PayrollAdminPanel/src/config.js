const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  BASE_URL,

  AUTH: {
    COMPANY_LOGIN: `${BASE_URL}/api/companylogin`,
    EMPLOYEE_LOGIN: `${BASE_URL}/api/employeelogin`,
  },

  REGISTER: {
    COMPANY: `${BASE_URL}/api/addcompany`,
    EMPLOYEE: `${BASE_URL}/api/addemployee`,
  },

  EMPLOYEES: {
    LIST_BY_COMPANY: `${BASE_URL}/api/getemployeebycompany`,
    ADD_ATTENDANCE: `${BASE_URL}/api/addattendance`,
    PHOTO: (photoPath) => `${BASE_URL}/${photoPath}`,
    DOCUMENT: (docPath) => `${BASE_URL}/${docPath}`,
    FETCH_LEAVE_BY_EMPLOYEE: `${BASE_URL}/api/fetchleavebyemployeeid`,
  },
   LEAVE: {
    FETCH_BY_MONTH_YEAR: `${BASE_URL}/api/fetchleavebymonthandyear`,
    ADD: `${BASE_URL}/api/addleave`,
    UPDATE_STATUS: `${BASE_URL}/api/updateleavestatus`,

  },

  ATTENDANCE: {
    FETCH: `${BASE_URL}/api/fetchattendancebymonthandyear`,
    UPDATE: `${BASE_URL}/api/updateattendance`,
     FETCH_BY_EMPLOYEE: `${BASE_URL}/api/fetchattendancebyemployeeid`,
  },

 SALARY_SETTING: {
  FETCH_EMPLOYEES: `${BASE_URL}/api/getemployeebycompany`,
  FETCH_SALARY_HEADS: `${BASE_URL}/api/salaryheadsbycompany`,
  SAVE_SETTINGS: `${BASE_URL}/api/addsalarysettings`,
  ADD_SALARY_HEAD: `${BASE_URL}/api/addsalaryhead`,
  DELETE_SALARY_HEAD: `${BASE_URL}/api/deletesalaryhead`,
},
SALARY: {
  FETCH_EMPLOYEES: `${BASE_URL}/api/getemployeebycompany`,
  FETCH_SALARY_SLIPS: `${BASE_URL}/api/getsalaryslipbycompany`,
  CALCULATE_SALARY: `${BASE_URL}/api/calculatesalaryslip`,
  CALCULATE_SALARY_FOR_ALL: `${BASE_URL}/api/calculatesalaryslipbycompany`,
  DELETE_SALARY_SLIP: `${BASE_URL}/api/deletesalaryslip`,
},
 DASHBOARD: {
    EMPLOYEE_COUNT: `${BASE_URL}/api/getdashboardcounts`,
    LEAVE_COUNT: `${BASE_URL}/api/getleavecounts`,
    ATTENDANCE_COUNT: `${BASE_URL}/api/getattendancecount`,
 LEAVE_COUNT_BY_EMPLOYEE: `${BASE_URL}/api/getleavescountbyemployee`,
    ATTENDANCE_COUNT_BY_EMPLOYEE: `${BASE_URL}/api/getattendancecountbyemployee`,
  },
    BRANCH: {
    GET_BY_COMPANY: `${BASE_URL}/api/getbranchbycompany`,
    ADD: `${BASE_URL}/api/addbranch`,
    DELETE: `${BASE_URL}/api/deletebranch`,
  },

  // ✅ NEW ADDITIONS
  DEPARTMENT: {
    ADD: `${BASE_URL}/api/adddepartment`,
    FETCH_BY_COMPANY: `${BASE_URL}/api/fetchdepartmentbycompany`,
    DELETE: `${BASE_URL}/api/deletedepartment`,
  },

  DESIGNATION: {
    ADD: `${BASE_URL}/api/adddesignation`,
    FETCH_BY_COMPANY: `${BASE_URL}/api/fetchdesignationbycompany`,
    DELETE: `${BASE_URL}/api/deletedesignation`,
  },
   EMPLOYEE_DOCUMENTS: {
    FETCH_BY_COMPANY: `${BASE_URL}/api/getemployeebycompany`,
    UPDATE: `${BASE_URL}/api/updateemployee`,
    FILE_URL: (filePath) => `${BASE_URL}/${filePath}`,
  },
   LEAVE: {
    FETCH_BY_MONTH_YEAR: `${BASE_URL}/api/fetchleavebymonthandyear`,
    ADD: `${BASE_URL}/api/addleave`,
    UPDATE_STATUS: `${BASE_URL}/api/updateleavestatus`,
  },
};

export default API_ENDPOINTS;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import API_ENDPOINTS from '../../config';



const EmployeeList = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { companyData } = useSelector((state) => state.company);

  const [allEmployees, setAllEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendance, setAttendance] = useState({
    AttendanceDate: dayjs(),
    InPunchTime: dayjs(),
    OutPunchTime: dayjs()
  });

  // Documents dialog
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch employees by company
  useEffect(() => {
    if (!companyData?._id) return;

    const fetchEmployees = async () => {
      try {
        const response = await axios.post(
          API_ENDPOINTS.EMPLOYEES.LIST_BY_COMPANY,
          { CompanyId: companyData._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAllEmployees(response.data.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, [companyData, token]);

  // Attendance dialog handlers
  const handleOpenDialog = (employee) => {
    setSelectedEmployee(employee);
    setAttendance({
      AttendanceDate: dayjs(),
      InPunchTime: dayjs(),
      OutPunchTime: dayjs()
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  const handleSubmit = async () => {
    if (!selectedEmployee) return;

    const payload = {
      EmployeeID: selectedEmployee._id,
      CompanyId: companyData._id,
      AttendanceDate: attendance.AttendanceDate.toISOString(),
      InPunchTime: attendance.InPunchTime.toISOString(),
      OutPunchTime: attendance.OutPunchTime.toISOString()
    };

    try {
      const response = await axios.post(API_ENDPOINTS.EMPLOYEES.ADD_ATTENDANCE, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSnackbar({
        open: true,
        message: response.data.message || "Attendance submitted successfully!",
        severity: 'success'
      });

      handleCloseDialog();
    } catch (error) {
      console.error("Error submitting attendance:", error);
      const status = error.response?.status;

      setSnackbar({
        open: true,
        message:
          status === 409
            ? "Attendance already marked for this date!"
            : status === 400
            ? error.response.data.message || "Invalid data provided!"
            : "Something went wrong while submitting attendance.",
        severity: status === 409 ? "warning" : status === 400 ? "error" : "error"
      });
    }
  };

  // Documents dialog handlers
  const handleOpenDocumentsDialog = (employee) => {
    setDocumentsData(employee);
    setDocumentsDialogOpen(true);
  };
  const handleCloseDocumentsDialog = () => {
    setDocumentsDialogOpen(false);
    setDocumentsData(null);
  };

  // Snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  // DataGrid columns
  const columns = [
    {
      field: 'EmployeePhoto',
      headerName: 'Photo',
      width: 100,
    renderCell: (params) =>
        params.value ? <Avatar src={params.value} alt="photo" /> : 'N/A'
      
    },
    { field: 'EmployeeName', headerName: 'Name', flex: 1 },
    { field: 'EmployeePhoneNo', headerName: 'Phone No', width: 120 },
    { field: 'EmployeeGender', headerName: 'Gender', width: 120 },
    { field: 'EmployeeDesignation', headerName: 'Designation', flex: 2 },
    {
      field: 'attendance',
      headerName: 'Attendance',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="info"
          sx={{ borderRadius: '20px', textTransform: 'none' }}
          onClick={() => handleOpenDialog(params.row)}
        >
          Mark
        </Button>
      )
    },
    {
      field: 'documents',
      headerName: 'Documents',
      width: 120,
      renderCell: (params) => (
        <Button onClick={() => handleOpenDocumentsDialog(params.row)} color="primary">
          <VisibilityIcon />
        </Button>
      )
    }
  ];

  const rows = allEmployees
    .filter(emp => emp.EmployeeName?.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((emp, index) => ({ id: emp._id || index, ...emp }));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
          <Box sx={{ width: '79vw' }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Employee List
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <TextField
                  label="Search Employee"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ minWidth: 250 }}
                />
                <Button variant="contained" color="success" onClick={() => navigate('/admin/employee/addemployee')}>
                  Add Employee
                </Button>
              </Box>
            </Box>

            {/* Data Grid */}
            <Box sx={{ height: 450, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                sx={{ backgroundColor: 'white' }}
              />
            </Box>
          </Box>

          {/* Attendance Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
              Mark Attendance
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mt: 1 }}>
                <TextField
                  label="Employee Name"
                  fullWidth
                  value={selectedEmployee?.EmployeeName || ''}
                  disabled
                  margin="normal"
                />
                <DatePicker
                  label="Attendance Date"
                  value={attendance.AttendanceDate}
                  onChange={(newDate) => setAttendance((prev) => ({ ...prev, AttendanceDate: newDate }))}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
                <TimePicker
                  label="Punch In Time"
                  value={attendance.InPunchTime}
                  onChange={(newValue) =>
                    setAttendance((prev) => ({
                      ...prev,
                      InPunchTime: dayjs(prev.AttendanceDate)
                        .hour(newValue.hour())
                        .minute(newValue.minute())
                        .second(0)
                    }))
                  }
                  ampm
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
                <TimePicker
                  label="Punch Out Time"
                  value={attendance.OutPunchTime}
                  onChange={(newValue) =>
                    setAttendance((prev) => ({
                      ...prev,
                      OutPunchTime: dayjs(prev.AttendanceDate)
                        .hour(newValue.hour())
                        .minute(newValue.minute())
                        .second(0)
                    }))
                  }
                  ampm
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleCloseDialog} variant="outlined" color="error">
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar Feedback */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </LocalizationProvider>

      {/* Documents Dialog */}
      <Dialog open={documentsDialogOpen} onClose={handleCloseDocumentsDialog}>
        <DialogTitle sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
          Uploaded Documents
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            padding: 2,
            height: '60vh',
            maxWidth: '60vh'
          }}
        >
          {documentsData ? (
            ['AdhaarCard', 'PanCard', 'PassBook', 'Degree'].map((key) =>
              documentsData[key] ? (
                <img
                  key={key}
                  alt={key}
                  src={API_ENDPOINTS.EMPLOYEES.DOCUMENT(documentsData[key])}
                  style={{
                    height: 350,
                    width: 450,
                    borderRadius: '12px',
                    objectFit: 'contain',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                  }}
                />
              ) : (
                <Typography key={key} color="text.secondary" sx={{ minWidth: 150, alignSelf: 'center' }}>
                  {key}: Not Uploaded
                </Typography>
              )
            )
          ) : (
            <Typography>No document data available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDocumentsDialog} color="error" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeList;

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
const EmployeeList = () => {
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
  const handleOpenDocumentsDialog = (employee) => {
    console.log(employee)
    setDocumentsData(employee);
    setDocumentsDialogOpen(true);
  };
  
  const handleCloseDocumentsDialog = () => {
    setDocumentsDialogOpen(false);
    setDocumentsData(null);
  };
  const { companyData } = useSelector((state) => state.user);
  const [allEmployees, setAllEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [attendance, setAttendance] = useState({
    InPunchTime: dayjs(),
    OutPunchTime: dayjs()
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await axios.post("http://localhost:5000/api/getemployeebycompany", {
          CompanyId: companyData._id
        });
        setAllEmployees(result.data.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, [companyData]);

  const handleOpenDialog = (employee) => {
    setSelectedEmployee(employee);
    setAttendance({
      InPunchTime: dayjs(),
      OutPunchTime: dayjs()
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    const formattedIn = attendance.InPunchTime ? dayjs(attendance.InPunchTime).format('hh:mm A') : '';
    const formattedOut = attendance.OutPunchTime ? dayjs(attendance.OutPunchTime).format('hh:mm A') : '';

    const payload = {
      EmployeeID: selectedEmployee._id,
      CompanyId: companyData._id,
      InPunchTime: formattedIn,
      OutPunchTime: formattedOut
    };

    handleCloseDialog();
    setSnackbarOpen(true);

    try {
      const response = await axios.post("http://localhost:5000/api/addattendance", payload);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error attendance data:", error);
    }
  };

   const columns = [
    {
      field: 'EmployeePhoto',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => (
        <img
          alt="photo"
          src={`http://localhost:5000/${params.row.EmployeePhoto}`}
          height={50}
          width={50}
          style={{ borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center' }}
        />
      )
    },
    { field: 'EmployeeName', headerName: 'Name', flex: 1 },
    { field: 'EmployeePhoneNo', headerName: 'Phone No', width:120 },
    { field: 'EmployeeGender', headerName: 'Gender', width: 120},
    { field: 'EmployeeDesignation', headerName: 'Designation', flex: 2 },
    {
      field: 'attendance',
      headerName: 'Attendance',
      width: 100,
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
    <Button
      onClick={() => handleOpenDocumentsDialog(params.row)}
      color="primary"
      sx={{ minWidth: 'auto' }}
    >
      <VisibilityIcon />
    </Button>
  )
}

  ];

  const rows = allEmployees
    .filter(emp => emp.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((emp, index) => ({
      id: emp._id || index,
      ...emp
    }));

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
        <Box sx={{ width: '79vw' }}>
          {/* Title */}
          <Box sx={{ width: '100%', mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Employee List
            </Typography>

            {/* Search + Add Button Row */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap'
              }}
            >
              <TextField
                label="Search Employee"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 250 }}
              />

              <Button
                variant="contained"
                color="success"
                sx={{mr:2}}
                onClick={() => navigate('/employee/addemployee')}
              >
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
                value={attendance.InPunchTime}
                onChange={(newDate) => {
                  setAttendance((prev) => ({
                    punchIn: newDate.hour(prev.InPunchTime.hour()).minute(prev.InPunchTime.minute()),
                    punchOut: newDate.hour(prev.OutPunchTime.hour()).minute(prev.OutPunchTime.minute())
                  }));
                }}
                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
              />

              <TimePicker
                label="Punch In Time"
                value={attendance.InPunchTime}
                onChange={(newValue) =>
                  setAttendance({ ...attendance, InPunchTime: newValue })
                }
                ampm
                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
              />

              <TimePicker
                label="Punch Out Time"
                value={attendance.OutPunchTime}
                onChange={(newValue) =>
                  setAttendance({ ...attendance, OutPunchTime: newValue })
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
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Attendance submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
    <Dialog open={documentsDialogOpen} onClose={handleCloseDocumentsDialog}>
  <DialogTitle sx={{ fontWeight: 'bold', backgroundColor: '#f0f0fz' }}>
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
    maxWidth:'60vh'  // limit max height of dialog content for better UX
  }}
>
  {documentsData ? (
    ['AdhaarCard', 'PanCard', 'PassBook', 'Degree'].map((key) =>
      documentsData[key] ? (
        <img
          key={key}
          alt={key}
          src={`http://localhost:5000/${documentsData[key]}`}
          style={{
            height: 350,
            width: 450,
            borderRadius: '12px',
            objectFit: 'contain',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
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

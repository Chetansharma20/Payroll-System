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

const EmployeeList = () => {
  const { companyData } = useSelector((state) => state.user);
  const [allEmployees, setAllEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleSubmit = async ()=> {
    const formattedIn = attendance.InPunchTime ? dayjs(attendance.InPunchTime).format('hh:mm A') : '';
    const formattedOut = attendance.OutPunchTime ? dayjs(attendance.OutPunchTime).format('hh:mm A') : '';

    const payload = {
      EmployeeID: selectedEmployee._id,
      CompanyId: companyData._id,
    
      InPunchTime: formattedIn,
      OutPunchTime: formattedOut
    };

    console.log("Submitting Attendance:", payload);


    handleCloseDialog();
    setSnackbarOpen(true);
  


    try {
      const response = await axios.post("http://localhost:5000/api/addattendance",payload);

      console.log(response.data.data)
    } catch (error) {
      console.error("Error  attendance data:", error);
    }
  }
  ;
  const columns = [
   {
      field: 'EmployeePhoto',
      headerName: 'Photo',
      width: 130,
      renderCell: (params) => (
        <img
          alt="photo"
          src={`http://localhost:5000/${params.row.EmployeePhoto}`}
          height={50}
          width={50}
          style={{ borderRadius: '50%' }}
        />
      )
    },
    
    { field: 'EmployeeName', headerName: 'Name', flex: 1 },
    { field: 'EmployeePhoneNo', headerName: 'Phone No', flex: 1 },
    { field: 'EmployeeGender', headerName: 'Gender', flex: 1 },
    { field: 'EmployeeDesignation', headerName: 'Designation', flex: 1 },
    {
      field: 'attendance',
      headerName: 'Attendance',
      width: 160,
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
    }
  ];

  const rows = allEmployees.map((emp, index) => ({
    id: emp._id || index,
    ...emp
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', justifyContent: 'center',  marginTop: '5%' }}>
        <Box sx={{ width: '79vw' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              width: '97%'
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Employee List
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate('/employee/addemployee')}
            >
              Add Employee
            </Button>
          </Box>

          <Box sx={{ height: 500, width: '100%' }}>
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
        <Dialog open={openDialog} onClose={handleCloseDialog} >
          <DialogTitle sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
            Mark Attendance
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mt: 1 }}>
              <TextField
                label="Employee Name"
                fullWidth
                value={selectedEmployee?.EmpName || ''}
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
  );
};

export default EmployeeList;
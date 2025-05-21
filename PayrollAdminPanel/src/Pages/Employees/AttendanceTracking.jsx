import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AttendenceTrack = () => {
  const { companyData } = useSelector((state) => state.user);
  const [EmployeeId, setEmployeeId] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inPunch, setInPunch] = useState('');
  const [outPunch, setOutPunch] = useState('');

  // Fetch employees by company
  useEffect(() => {
    const fetchEmployees = async () => {
      console.log("Fetch employees")
      try {
        const response = await axios.post("http://localhost:5000/api/getemployeebycompany", {
          CompanyId: companyData._id
        });
console.log(response.data.data)

        const formattedData = response.data.data.map(emp => ({
          ...emp,
          EmployeeName: emp.EmployeeName || 'Unnamed',
          _id: emp._id
        }));

        setEmployees(formattedData);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    if (companyData?._id) {
      fetchEmployees();
    }
  }, [companyData]);
     const[selectMonth, setSelectedMonth] = useState(dayjs())
     const[selectYear, setSelectedYear] = useState(dayjs())   
useEffect(() => {
  const fetchAttendance = async () => {
    if (!EmployeeId || !companyData?._id) {
      setAttendanceData([]); // Clear table if no selection
      return;
    }

    const month = selectMonth?.format('MM');
    const year = selectYear?.format('YYYY');

    try {
      if (month && year) {
        // Fetch by month and year
        const response = await axios.post(
          "http://localhost:5000/api/fetchattendancebymonthandyear",
          {
            EmployeeID: EmployeeId,
            month,
            year,
            CompanyId: companyData._id,
          }
        );
        setAttendanceData(response.data.data);
      } else {
        // Fetch all attendance for employee
        const response = await axios.post(
          "http://localhost:5000/api/fetchattendancebyemployeeid",
          {
            EmployeeID: EmployeeId,
            CompanyId: companyData._id,
          }
        );
        setAttendanceData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setAttendanceData([]); // Clear on error
    }
  };

  fetchAttendance();
}, [EmployeeId, selectMonth, selectYear, companyData?._id]);


  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setInPunch(row.InPunchTime || '');
    setOutPunch(row.OutPunchTime || '');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
    setInPunch('');
    setOutPunch('');
  };

  const columns = [
    {
      field: 'EmployeeID',
      headerName: 'Employee Name',
      flex: 1,
      renderCell: (params) => {
        return params.row?.EmployeeID?.EmployeeName || 'N/A';
      }
    },
    {
      field: 'AttendanceDate',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => dayjs(params.row.AttendanceDate).format('YYYY-MM-DD')
    },
    { field: 'InPunchTime', headerName: 'Punch In', flex: 1 },
    { field: 'OutPunchTime', headerName: 'Punch Out', flex: 1 },
    {
      field: 'update',
      headerName: 'Update',
      flex: 0.5,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenDialog(params.row)} color="primary">
          <EditIcon />
        </IconButton>
      )
    }
  ];

  const rows = attendanceData.map((entry) => ({
    id: entry._id,
    ...entry
  }));

  return (
    <Box sx={{ m: 5, marginTop: '45px' }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Attendance Tracking
      </Typography>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
      value={selectMonth}
      onChange={(newValue) => setSelectedMonth(newValue)}
       views={[ 'month']}
      dateFormat="MM"
      showMonthYearPicker
      placeholderText="Select month "
      isClearable

    />
    <DatePicker
      value={selectYear}
      onChange={(newValue) => setSelectedYear(newValue)}
       views={['year']}
      dateFormat="yyyy"
      showMonthYearPicker
      placeholderText="Select  year"
      isClearable
    />
    </LocalizationProvider>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '70vw' }}>
        <Autocomplete
          options={employees}
          getOptionLabel={(option) => option.EmployeeName || ''}
          value={employees.find(emp => emp._id === EmployeeId) || null}
          onChange={(event, newValue) => {
            setEmployeeId(newValue ? newValue._id : '');
          }}
          renderInput={(params) => <TextField {...params} label="Select Employee" fullWidth />}
        />
      </Box>

      <Box sx={{ height: 500, backgroundColor: 'white' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </Box>

      {/* Editable Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Attendance</DialogTitle>
        <DialogContent dividers>
          {selectedRow && (
            <>
              <Typography><strong>Name:</strong> {selectedRow?.EmployeeID?.EmployeeName || 'N/A'}</Typography>
              <Typography><strong>Date:</strong> {dayjs(selectedRow.AttendanceDate).format('YYYY-MM-DD')}</Typography>
              <TextField
                label="Punch In"
                fullWidth
                margin="normal"
                value={inPunch}
                onChange={(e) => setInPunch(e.target.value)}
              />
              <TextField
                label="Punch Out"
                fullWidth
                margin="normal"
                value={outPunch}
                onChange={(e) => setOutPunch(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">Cancel</Button>
          <Button
            onClick={() => {
              // You can trigger update logic here
              console.log("Updated values:", {
                InPunchTime: inPunch,
                OutPunchTime: outPunch
              });
              handleCloseDialog();
            }}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AttendenceTrack;

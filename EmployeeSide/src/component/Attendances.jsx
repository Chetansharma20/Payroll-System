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
  IconButton,
  Paper,
  Grid
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Attendences = () => {
  const { EmployeeData } = useSelector((state) => state.user);
  // const [EmployeeId, setEmployeeId] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  // const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inPunch, setInPunch] = useState('');
  const [outPunch, setOutPunch] = useState('');
  const [selectMonth, setSelectedMonth] = useState(dayjs());
  const [selectYear, setSelectedYear] = useState(dayjs());

 
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/fetchattendancebyemployeeid", {
          EmployeeID: EmployeeData._id
        });

        const formattedData = response.data.data.map(emp => ({
          ...emp,
          EmployeeName: emp.EmployeeName || 'Unnamed',
          _id: emp._id
        }));

        setAttendanceData(formattedData);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    if (EmployeeData?._id) {
      fetchAttendance();
    }
  }, [EmployeeData]);

  // Fetch attendance
  // useEffect(() => {
  //   const fetchAttendance = async () => {
  //     if (!EmployeeId || !companyData?._id) {
  //       setAttendanceData([]);
  //       return;
  //     }

  //     const month = selectMonth?.format('MM');
  //     const year = selectYear?.format('YYYY');

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/api/fetchattendancebymonthandyear",
  //         { EmployeeID: EmployeeId, month, year, CompanyId: companyData._id }
  //       );
  //       setAttendanceData(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching attendance data:", error);
  //       setAttendanceData([]);
  //     }
  //   };

  //   fetchAttendance();
  // }, [EmployeeId, selectMonth, selectYear, companyData?._id]);

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
      renderCell: (params) => params.row?.EmployeeID?.EmployeeName || 'N/A'
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
      headerName: 'Edit',
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
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3}}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Attendance Tracking
        </Typography>

        {/* Filters */}
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} sm={4} md={3}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['month']}
                label="Select Month"
                value={selectMonth}
                onChange={(newValue) => setSelectedMonth(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['year']}
                label="Select Year"
                value={selectYear}
                onChange={(newValue) => setSelectedYear(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider> */}
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            {/* <Autocomplete sx={{width:'180px'}}
              options={employees}
              getOptionLabel={(option) => option.EmployeeName || ''}
              value={employees.find(emp => emp._id === EmployeeId) || null}
              onChange={(event, newValue) => {
                setEmployeeId(newValue ? newValue._id : '');
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Employee" fullWidth />
              )}
            /> */}
          </Grid>
        </Grid>

        {/* Attendance Table */}
        <Box sx={{ height: 450 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            sx={{
              borderRadius: 2,
              backgroundColor: '#fafafa',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1976d2',
                color: '#fff',
                fontWeight: 'bold'
              }
            }}
          />
        </Box>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Attendance</DialogTitle>
        <DialogContent dividers>
          {selectedRow && (
            <>
              <Typography gutterBottom><strong>Name:</strong> {selectedRow?.EmployeeID?.EmployeeName || 'N/A'}</Typography>
              <Typography gutterBottom><strong>Date:</strong> {dayjs(selectedRow.AttendanceDate).format('YYYY-MM-DD')}</Typography>
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
          <Button onClick={handleCloseDialog} color="error" variant="outlined">Cancel</Button>
          <Button
            onClick={() => {
              console.log("Updated values:", { InPunchTime: inPunch, OutPunchTime: outPunch });
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

export default Attendences;

import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Leave = () => {
  const { companyData } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);
  const [EmployeeId, setEmployeeId] = useState('');
  const [leaveData, setLeaveData] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [openDialog, setopenDialog] = useState(false);
   const [openDialog1, setopenDialog1] = useState(false);
  const [selectMonth, setSelectedMonth] = useState(dayjs());
  const [selectYear, setSelectedYear] = useState(dayjs());
  const [selectedLeave, setSelectedLeave] = useState(null);
const [updatedStatus, setUpdatedStatus] = useState('');
  const openAddDialog = () => setopenDialog(true);
  const closeAddDialog = () => setopenDialog(false);

  const openAddDialog1 = () => setopenDialog1(true);
  const closeAddDialog1 = () => setopenDialog1(false);
 const[snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = ()=>
  {
    setSnackbarOpen(false)
  }
  const submitLeave = async (e) => {
    e.preventDefault();
    const getleave = new FormData(e.target);
    const reqdata = Object.fromEntries(getleave.entries());
    const FormattedFrom = fromDate.format('YYYY-MM-DD');
    const FormattedTo = toDate.format('YYYY-MM-DD');

    try {
      const leave = await axios.post('http://localhost:5000/api/addleave', {
        ...reqdata,
        CompanyId: companyData._id,
        EmployeeID: EmployeeId,
        FromDate: FormattedFrom,
        ToDate: FormattedTo
      });
      // alert('Leave added');
       setSnackbarOpen(true)
      setopenDialog(false);
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong';
      alert(message);
    }
  };
 const updateLeaveStatus = async () => {
    try {
      await axios.post('http://localhost:5000/api/updateleavestatus', {
        LeaveId: selectedLeave._id,
        LeaveStatus: updatedStatus
      });
      // alert("Leave status updated");
       setSnackbarOpen(true)
      setopenDialog1(false);
      setEmployeeId(EmployeeId); 
    } catch (error) {
      alert("Failed to update leave status", 'error');
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/getemployeebycompany', {
          CompanyId: companyData._id
        });

        const formattedData = response.data.data.map((emp) => ({
          ...emp,
          EmployeeName: emp.EmployeeName || 'Unnamed',
          _id: emp._id
        }));

        setEmployees(formattedData);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    if (companyData?._id) {
      fetchEmployees();
    }
  }, [companyData]);

  useEffect(() => {
    const fetchLeave = async () => {
      if (!EmployeeId || !companyData?._id) {
        setLeaveData([]);
        return;
      }

      const month = selectMonth?.format('MM');
      const year = selectYear?.format('YYYY');

      try {
        const url =
          month && year
            ? 'http://localhost:5000/api/fetchleavebymonthandyear'
            : 'http://localhost:5000/api/fetchleavebycompanyid';

        const response = await axios.post(url, {
          EmployeeID: EmployeeId,
          month,
          year,
          CompanyId: companyData._id
        });

        setLeaveData(response.data.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setLeaveData([]);
      }
    };

    fetchLeave();
  }, [EmployeeId, selectMonth, selectYear, companyData?._id]);

  const columns = [
    {
      field: 'EmployeeID',
      headerName: 'Employee Name',
      flex: 1,
      renderCell: (params) => params.row?.EmployeeID?.EmployeeName || 'N/A'
    },
    {
      field: 'FromDate',
      headerName: 'From Date',
      flex: 1,
      renderCell: (params) => dayjs(params.row.FromDate).format('YYYY-MM-DD')
    },
    {
      field: 'ToDate',
      headerName: 'To Date',
      flex: 1,
      renderCell: (params) => dayjs(params.row.ToDate).format('YYYY-MM-DD')
    },
     {
      field: 'LeaveStatus',
      headerName: 'Status',
      flex: 1,
  
    },
      {
            field: 'status',
            headerName: 'Update',
            width: 160,
            renderCell: (params) => (
              <Button
                variant="contained"
                size="small"
                color="info"
                sx={{ borderRadius: '20px', textTransform: 'none' }}
                onClick={() => {   setSelectedLeave(params.row);
     setUpdatedStatus(params.row.leaveStatus);
   openAddDialog1(params.row)}}
              >
                update
              </Button>
            )
          }
  ];

  const rows = leaveData.map((entry) => ({
    id: entry._id,
    ...entry
  }));

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Leave Tracking
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker views={['month']} value={selectMonth} onChange={setSelectedMonth} label="Select Month" />
            <DatePicker views={['year']} value={selectYear} onChange={setSelectedYear} label="Select Year" />
          </LocalizationProvider>

          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.EmployeeName || ''}
            value={employees.find((emp) => emp._id === EmployeeId) || null}
            onChange={(event, newValue) => setEmployeeId(newValue ? newValue._id : '')}
            sx={{ minWidth: 250 }}
            renderInput={(params) => <TextField {...params} label="Select Employee" />}
          />

          <Button variant="contained" sx={{ backgroundColor: '#2980b9' }} onClick={openAddDialog}>
            Add Leave
          </Button>
        </Box>

        <Box sx={{ height: 500, backgroundColor: 'white' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} />
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={closeAddDialog} maxWidth="sm" fullWidth>
        <Box
          component="form"
          onSubmit={submitLeave}
          sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Add Leave</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.EmployeeName || ''}
              value={employees.find((emp) => emp._id === EmployeeId) || null}
              onChange={(event, newValue) => setEmployeeId(newValue ? newValue._id : '')}
              renderInput={(params) => <TextField {...params} label="Select Employee" fullWidth required />}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
              />
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
              />
            </LocalizationProvider>

            <TextField label="Leave Description" name="LeaveDescription" required />

            <FormControl fullWidth>
              <InputLabel id="leave-type-label">Leave Type</InputLabel>
              <Select
                labelId="leave-type-label"
                name="LeaveType"
                label="Leave Type"
                defaultValue=""
                required
              >
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="sick">Sick</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Leave Status</FormLabel>
              <RadioGroup row name="LeaveStatus" value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}>
                <FormControlLabel value="pending" control={<Radio size="small" />} label="Pending" />
                <FormControlLabel value="approved" control={<Radio size="small" />} label="Approved" />
                <FormControlLabel value="reject" control={<Radio size="small" />} label="Reject" />
              </RadioGroup>
            </FormControl>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'flex-end', mt: 1 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={closeAddDialog} variant="contained" color="error">
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>



     <Dialog open={openDialog1} onClose={closeAddDialog1}>
  <form onSubmit={updateLeaveStatus}>
    <DialogTitle>Select an Option</DialogTitle>
    <DialogContent>
      <FormControl component="fieldset">
        <FormLabel component="legend">Options</FormLabel>
        <RadioGroup name="LeaveStatus"    value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
>
          <FormControlLabel value="approved" control={<Radio />} label="Approved" />
          <FormControlLabel value="reject" control={<Radio />} label="Reject" />
        </RadioGroup>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeAddDialog1}>Cancel</Button>
      <Button type="submit" variant="contained">Submit</Button>
    </DialogActions>
  </form>
</Dialog>
  <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Leave added successfully
          </Alert>
        </Snackbar>
    </>
  );
};

export default Leave;

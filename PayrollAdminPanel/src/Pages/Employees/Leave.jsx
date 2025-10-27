import React, { useEffect, useState } from 'react';
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
  Typography,
  Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import API_ENDPOINTS from "../../config";


const Leave = () => {
  const token = localStorage.getItem('token');
  const { companyData } = useSelector((state) => state.company);

  const [employees, setEmployees] = useState([]);
  const [EmployeeId, setEmployeeId] = useState('');
  const [leaveData, setLeaveData] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [selectMonth, setSelectedMonth] = useState(dayjs());
  const [selectYear, setSelectedYear] = useState(dayjs());
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('pending');

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // ---------------- FETCH EMPLOYEES ----------------
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post(
          API_ENDPOINTS.EMPLOYEES.LIST_BY_COMPANY,
          { CompanyId: companyData._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const formatted = response.data.data.map((emp) => ({
          ...emp,
          EmployeeName: emp.EmployeeName || 'Unnamed',
          _id: emp._id
        }));
        setEmployees(formatted);
      } catch (err) {
        console.error('Failed to fetch employees:', err);
      }
    };

    if (companyData?._id) fetchEmployees();
  }, [companyData]);

  // ---------------- FETCH LEAVE DATA ----------------
  const fetchLeave = async () => {
    if (!EmployeeId || !companyData?._id) {
      setLeaveData([]);
      return;
    }

    const month = selectMonth?.format('MM');
    const year = selectYear?.format('YYYY');

    try {
      const response = await axios.post(
        API_ENDPOINTS.LEAVE.FETCH_BY_MONTH_YEAR,
        {
          EmployeeID: EmployeeId,
          month,
          year,
          CompanyId: companyData._id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLeaveData(response.data.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setLeaveData([]);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [EmployeeId, selectMonth, selectYear, companyData?._id]);

  // ---------------- SUBMIT LEAVE ----------------
  const submitLeave = async (e) => {
    e.preventDefault();
    if (!EmployeeId) return alert('Select an employee first');

    if (fromDate.isAfter(toDate)) {
      alert('From Date cannot be after To Date');
      return;
    }

    const reqdata = new FormData(e.target);
    const data = Object.fromEntries(reqdata.entries());
    const FormattedFrom = fromDate.format('YYYY-MM-DD');
    const FormattedTo = toDate.format('YYYY-MM-DD');

    try {
      await axios.post(
        API_ENDPOINTS.LEAVE.ADD,
        {
          ...data,
          CompanyId: companyData._id,
          EmployeeID: EmployeeId,
          FromDate: FormattedFrom,
          ToDate: FormattedTo,
          LeaveStatus: updatedStatus
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnackbarMessage('Leave added successfully');
      setSnackbarOpen(true);
      setOpenDialog(false);
      fetchLeave();
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong';
      alert(message);
    }
  };

  // ---------------- UPDATE LEAVE STATUS ----------------
  const updateLeaveStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        API_ENDPOINTS.LEAVE.UPDATE_STATUS,
        {
          LeaveId: selectedLeave._id,
          LeaveStatus: updatedStatus
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnackbarMessage('Leave status updated');
      setSnackbarOpen(true);
      setOpenDialog1(false);
      fetchLeave();
    } catch (error) {
      alert('Failed to update leave status');
    }
  };

  // ---------------- DATAGRID COLUMNS ----------------
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
    { field: 'LeaveType', headerName: 'Type', flex: 1 },
    { field: 'LeaveStatus', headerName: 'Status', flex: 1 },
    {
      field: 'action',
      headerName: 'Update',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="info"
          sx={{ borderRadius: '20px', textTransform: 'none' }}
          onClick={() => {
            setSelectedLeave(params.row);
            setUpdatedStatus(params.row.LeaveStatus);
            setOpenDialog1(true);
          }}
        >
          Update
        </Button>
      )
    }
  ];

  const rows = leaveData.map((entry) => ({ id: entry._id, ...entry }));

  return (
    <>
      <Box sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Leave Tracking
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={['month']}
              value={selectMonth}
              onChange={setSelectedMonth}
              label="Select Month"
              slotProps={{ textField: { fullWidth: true, sx: { width: { xs: '100%', sm: 'auto' } } } }}
            />
            <DatePicker
              views={['year']}
              value={selectYear}
              onChange={setSelectedYear}
              label="Select Year"
              slotProps={{ textField: { fullWidth: true, sx: { width: { xs: '100%', sm: 'auto' } } } }}
            />
          </LocalizationProvider>

          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.EmployeeName || ''}
            value={employees.find((emp) => emp._id === EmployeeId) || null}
            onChange={(e, newValue) =>
              setEmployeeId(newValue ? newValue._id : '')
            }
            sx={{ minWidth: { xs: '100%', sm: 250 }, width: { xs: '100%', sm: 'auto' } }}
            renderInput={(params) => (
              <TextField {...params} label="Select Employee" fullWidth />
            )}
          />

          <Button
            variant="contained"
            sx={{ backgroundColor: '#2980b9', width: { xs: '100%', sm: 'auto' } }}
            onClick={() => setOpenDialog(true)}
          >
            Add Leave
          </Button>
        </Box>

        <Box sx={{ height: { xs: 400, sm: 500 }, width: '100%', backgroundColor: 'white', overflowX: 'auto' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} sx={{ minWidth: { xs: 600, sm: 'auto' } }} />
        </Box>
      </Box>

      {/* ADD LEAVE DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <Box
          component="form"
          onSubmit={submitLeave}
          sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Add Leave
          </DialogTitle>

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.EmployeeName || ''}
              value={employees.find((emp) => emp._id === EmployeeId) || null}
              onChange={(event, newValue) =>
                setEmployeeId(newValue ? newValue._id : '')
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Employee" fullWidth required />
              )}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={setFromDate}
              />
              <DatePicker label="To Date" value={toDate} onChange={setToDate} />
            </LocalizationProvider>

            <TextField
              label="Leave Description"
              name="LeaveDescription"
              required
            />

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
              <RadioGroup
                row
                name="LeaveStatus"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <FormControlLabel
                  value="pending"
                  control={<Radio size="small" />}
                  label="Pending"
                />
                <FormControlLabel
                  value="approved"
                  control={<Radio size="small" />}
                  label="Approved"
                />
                <FormControlLabel
                  value="rejected"
                  control={<Radio size="small" />}
                  label="Rejected"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'flex-end', mt: 1 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={() => setOpenDialog(false)} variant="contained" color="error">
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* UPDATE LEAVE STATUS DIALOG */}
      <Dialog open={openDialog1} onClose={() => setOpenDialog1(false)}>
        <form onSubmit={updateLeaveStatus}>
          <DialogTitle>Update Leave Status</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup
                name="LeaveStatus"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <FormControlLabel value="approved" control={<Radio />} label="Approved" />
                <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog1(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Leave;

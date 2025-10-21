import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import API_ENDPOINTS from '../config';

const Leave = () => {
  const { EmployeeData } = useSelector((state) => state.employee);
  const [leaveData, setLeaveData] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [openDialog, setopenDialog] = useState(false);

  const openAddDialog = () => setopenDialog(true);
  const closeAddDialog = () => setopenDialog(false);

  // ✅ Centralized fetch function
  const fetchLeaves = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.EMPLOYEES.FETCH_LEAVE_BY_EMPLOYEE, {
        EmployeeID: EmployeeData._id
      });

      const formattedData = response.data.data.map((emp) => ({
        ...emp,
        EmployeeName: emp.EmployeeName || 'Unnamed',
        _id: emp._id
      }));

      setLeaveData(formattedData);
    } catch (error) {
      console.error('Failed to fetch leaves:', error);
    }
  };

  // ✅ Fetch on component mount or when EmployeeData changes
  useEffect(() => {
    if (EmployeeData?._id) fetchLeaves();
  }, [EmployeeData]);

  const submitLeave = async (e) => {
    e.preventDefault();
    const getleave = new FormData(e.target);
    const reqdata = Object.fromEntries(getleave.entries());
    const FormattedFrom = fromDate.format('YYYY-MM-DD');
    const FormattedTo = toDate.format('YYYY-MM-DD');

    try {
      await axios.post(API_ENDPOINTS.LEAVE.ADD, {
        ...reqdata,
        EmployeeID: EmployeeData._id,
        FromDate: FormattedFrom,
        ToDate: FormattedTo,
        CompanyId: EmployeeData.CompanyId
      });

      alert('Leave added successfully');
      setopenDialog(false);

      // ✅ Immediately refresh leave list
      await fetchLeaves();
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong';
      alert(message);
    }
  };

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
      flex: 1
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
    </>
  );
};

export default Leave;

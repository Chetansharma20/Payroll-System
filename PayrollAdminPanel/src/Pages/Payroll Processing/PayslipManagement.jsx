import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EmployeeSlip from './EmployeeSlip';

const PayslipManagement = () => {
  const [salaryslip, setSalarySlip] = useState([]);
  const { companyData } = useSelector((state) => state.user);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [EmployeeId, setEmployeeId] = useState('');

  const openAddDialog = () => setOpenDialog(true);
  const closeAddDialog = () => setOpenDialog(false);

  const openAddDialog1 = () => setOpenDialog1(true);
  const closeAddDialog1 = () => setOpenDialog1(false);

  const calculateSalary = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqData = Object.fromEntries(formData.entries());

    try {
      const result = await axios.post(
        'http://localhost:5000/api/calculatesalaryslip',
        { ...reqData, EmployeeID: EmployeeId, CompanyId: companyData._id }
      );
      console.log(result.data.data);
      alert('Salary Slip Generated');
      closeAddDialog();
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.error(message);
      alert('Error generating salary slip');
    }
  };

  const calculateSalaryforall = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqData = Object.fromEntries(formData.entries());

    try {
      const result = await axios.post(
        'http://localhost:5000/api/calculatesalaryslipbycompany',
        { ...reqData,  CompanyId: companyData._id }
      );
      console.log(result.data.data);
      alert('Salary Slip for all  Generated');
      closeAddDialog1();
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.error(message);
      alert('Error generating salary slip');
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/getemployeebycompany', {
          CompanyId: companyData._id
        });
        const formatted = response.data.data.map((emp) => ({
          ...emp,
          EmployeeName: emp.EmployeeName || 'Unnamed',
          _id: emp._id
        }));
        setEmployees(formatted);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    if (companyData?._id) fetchEmployees();
  }, [companyData]);

  useEffect(() => {
    const fetchSalarySlips = async () => {
      try {
        const result = await axios.post('http://localhost:5000/api/getsalaryslipbycompany', {
          CompanyId: companyData._id
        });
        setSalarySlip(result.data.data);
      } catch (error) {
        console.error('Failed to fetch salary slips:', error);
      }
    };

    if (companyData?._id) fetchSalarySlips();
  }, [companyData]);

  const columns = [
    {
      field: 'EmployeeName',
      headerName: 'Employee Name',
      flex: 1,
      renderCell: (params) => (
        <span>{params?.row?.EmployeeID?.EmployeeName || 'N/A'}</span>
      )
    },
    { field: 'Month', headerName: 'Month', flex: 1 },
    // { field: 'todate', headerName: 'To date', flex: 1 },
    { field: 'netSalary', headerName: 'Net Salary', flex: 1 },
    { field: 'grossSalary', headerName: 'Gross Salary', flex: 1 },
    {
      field: 'SalarySlip',
      headerName: 'Slip',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <PDFDownloadLink
          document={<EmployeeSlip data={params.row} />}
          fileName={`Slip_${params?.row.EmployeeID?.EmployeeName || 'Employee'}.pdf`}
          style={{ color: 'blue' }}
        >
          <DescriptionIcon />
        </PDFDownloadLink>
      )
    }
  ];

  const rows = salaryslip.map((slip, index) => ({
    id: slip._id || index,
    ...slip
  }));

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Payslip Management
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={openAddDialog}
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            mb: 2,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
         Generate Salary 
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={openAddDialog1}
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            mb: 2,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          Generate salary for all
        </Button>

        <Paper
  elevation={3}
  sx={{
    borderRadius: 3,
    p: 2,
    backgroundColor: '#ffffff',
    height: 400, 
    overflow: 'auto'
  }}
>
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[5, 10, 25, 100]}
    disableRowSelectionOnClick
    sx={{
      border: 0,
      fontSize: 15,
      '& .MuiDataGrid-row': {
        borderBottom: '1px solid #f0f0f0'
      },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#f7f7f7',
        fontWeight: 'bold'
      },
      '& .MuiDataGrid-cell': {
        py: 1.5
      }
    }}
  />
</Paper>
      </Box>

      <Dialog open={openDialog} onClose={closeAddDialog} maxWidth="sm" fullWidth>
        <Box
          component="form"
          onSubmit={calculateSalary}
          sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Generate Salary Slip
          </DialogTitle>

          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.EmployeeName || ''}
            value={employees.find((emp) => emp._id === EmployeeId) || null}
            onChange={(event, newValue) => {
              setEmployeeId(newValue ? newValue._id : '');
            }}
            renderInput={(params) => <TextField {...params} label="Select Employee" fullWidth />}
          />

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              size="small"
              label="Select Month"
              name="Month"
              defaultValue={new Date().toISOString().slice(0, 7)}
              type="month"
              required
              InputLabelProps={{ shrink: true }}
            />
        
          </DialogContent>

          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={closeAddDialog} variant="contained" color="error">
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={openDialog1} onClose={closeAddDialog1} maxWidth="sm" fullWidth>
        <Box
          component="form"
          onSubmit={calculateSalaryforall}
          sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Generate Salary Slip for all
          </DialogTitle>

          {/* <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.EmployeeName || ''}
            value={employees.find((emp) => emp._id === EmployeeId) || null}
            onChange={(event, newValue) => {
              setEmployeeId(newValue ? newValue._id : '');
            }}
            renderInput={(params) => <TextField {...params} label="Select Employee" fullWidth />}
          /> */}

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              size="small"
              label="Select Month"
              name="Month"
              defaultValue={new Date().toISOString().slice(0, 7)}
              type="month"
              required
              InputLabelProps={{ shrink: true }}
            />
            
          </DialogContent>

          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={closeAddDialog1} variant="contained" color="error">
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default PayslipManagement;

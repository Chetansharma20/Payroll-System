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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EmployeeSlip from './EmployeeSlip';
import API_ENDPOINTS from '../../config';
import axiosInstance from '../../api/axiosinstance';


const PayslipManagement = () => {
  const [salaryslip, setSalarySlip] = useState([]);
  const { companyData } = useSelector((state) => state.company);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [EmployeeId, setEmployeeId] = useState('');

  const openAddDialog = () => setOpenDialog(true);
  const closeAddDialog = () => setOpenDialog(false);

  const openAddDialog1 = () => setOpenDialog1(true);
  const closeAddDialog1 = () => setOpenDialog1(false);

  // Fetch employees for dropdown
  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.SALARY.FETCH_EMPLOYEES, {
        CompanyId: companyData._id,
      });
      const formatted = res.data.data.map((emp) => ({
        ...emp,
        EmployeeName: emp.EmployeeName || 'Unnamed',
        _id: emp._id,
      }));
      setEmployees(formatted);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  // Fetch salary slips
  const fetchSalarySlips = async () => {
    try {
      const result = await axiosInstance.post(API_ENDPOINTS.SALARY.FETCH_SALARY_SLIPS, {
        CompanyId: companyData._id,
      });
      setSalarySlip(result.data.data);
    } catch (error) {
      console.error('Failed to fetch salary slips:', error);
    }
  };

  // Generate salary for one employee
  const calculateSalary = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqData = Object.fromEntries(formData.entries());
    try {
      await axiosInstance.post(API_ENDPOINTS.SALARY.CALCULATE_SALARY, {
        ...reqData,
        EmployeeID: EmployeeId,
        CompanyId: companyData._id,
      });
      alert('Salary Slip Generated');
      closeAddDialog();
      fetchSalarySlips();
    } catch (error) {
      const message = error?.response?.data?.message || 'Error generating salary slip';
      console.error(message);
      alert(message);
    }
  };

  // Generate salary for all employees
  const calculateSalaryforall = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqData = Object.fromEntries(formData.entries());
    try {
      await axiosInstance.post(API_ENDPOINTS.SALARY.CALCULATE_SALARY_FOR_ALL, {
        ...reqData,
        CompanyId: companyData._id,
      });
      alert('Salary Slips Generated for All Employees');
      closeAddDialog1();
      fetchSalarySlips();
    } catch (error) {
      const message = error?.response?.data?.message || 'Error generating salary slips';
      console.error(message);
      alert(message);
    }
  };

  // Delete a salary slip
  const deleteSalarySlipById = async (id) => {
    if (!window.confirm('Are you sure you want to delete this salary slip?')) return;
    try {
      const result = await axiosInstance.delete(API_ENDPOINTS.SALARY.DELETE_SALARY_SLIP, {
        data: { SalarySlipId: id },
      });
      alert(result.data.message);
      fetchSalarySlips();
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to delete salary slip';
      console.error(message);
      alert(message);
    }
  };

  useEffect(() => {
    if (companyData?._id) {
      fetchEmployees();
      fetchSalarySlips();
    }
  }, [companyData]);

  const columns = [
    {
      field: 'EmployeeName',
      headerName: 'Employee Name',
      flex: 1,
      renderCell: (params) => (
        <span>{params?.row?.EmployeeID?.EmployeeName || 'N/A'}</span>
      ),
    },
    { field: 'Month', headerName: 'Month', flex: 1 },
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
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ mb: 3 }}
          onClick={() => deleteSalarySlipById(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = salaryslip.map((slip, index) => ({
    id: slip._id || index,
    ...slip,
  }));

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Payslip Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={openAddDialog}
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mb: 2, mr: 2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
      >
        Generate Salary
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={openAddDialog1}
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mb: 2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
      >
        Generate Salary for All
      </Button>

      <Paper elevation={3} sx={{ borderRadius: 3, p: 2, backgroundColor: '#ffffff', height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25, 100]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            fontSize: 15,
            '& .MuiDataGrid-row': { borderBottom: '1px solid #f0f0f0' },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f7f7f7',
              fontWeight: 'bold',
            },
          }}
        />
      </Paper>

      {/* Single employee salary dialog */}
      <Dialog open={openDialog} onClose={closeAddDialog} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={calculateSalary} sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column' }}>
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Generate Salary Slip
          </DialogTitle>

          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.EmployeeName || ''}
            value={employees.find((emp) => emp._id === EmployeeId) || null}
            onChange={(event, newValue) => setEmployeeId(newValue ? newValue._id : '')}
            renderInput={(params) => <TextField {...params} label="Select Employee" fullWidth />}
          />

          <DialogContent>
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
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button onClick={closeAddDialog} variant="contained" color="error">Close</Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* All employees salary dialog */}
      <Dialog open={openDialog1} onClose={closeAddDialog1} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={calculateSalaryforall} sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column' }}>
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Generate Salary Slip for All
          </DialogTitle>

          <DialogContent>
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
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button onClick={closeAddDialog1} variant="contained" color="error">Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default PayslipManagement;

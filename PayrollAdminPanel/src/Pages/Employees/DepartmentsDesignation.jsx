import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API_ENDPOINTS from "../../config";

const DepartmentsDesignation = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [departments, setAlldepartments] = useState([]);
  const [designation, setAlldesignation] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const { companyData } = useSelector((state) => state.company);

  const openAddDialog = () => setOpenDialog(true);
  const closeAddDialog = () => setOpenDialog(false);
  const openAddDialog1 = () => setOpenDialog1(true);
  const closeAddDialog1 = () => setOpenDialog1(false);

  const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }));

  // Submit Department
  const SubmitDepartment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const departmentdata = Object.fromEntries(formData.entries());

    try {
const result = await axios.post(API_ENDPOINTS.DEPARTMENT.ADD, { ...departmentdata, CompanyId: companyData._id });
      setSnackbar({ open: true, message: 'Department Added', severity: 'success' });
      closeAddDialog();
      setAlldepartments(prev => [...prev, { ...departmentdata, id: result.data?.data?._id }]);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  // Submit Designation
  const SubmitDesignation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const designationdata = Object.fromEntries(formData.entries());

    try {
      const result = await axios.post("http://localhost:5000/api/adddesignation", { ...designationdata, CompanyId: companyData._id });
      setSnackbar({ open: true, message: 'Designation Added', severity: 'success' });
      closeAddDialog1();
      setAlldesignation(prev => [...prev, { ...designationdata, id: result.data?.data?._id }]);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  // Delete Department
  const deleteDepartment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      const result = await axios.delete("http://localhost:5000/api/deletedepartment", { data: { DepartmentId: id } });
      setAlldepartments(prev => prev.filter(dep => dep.id !== id));
      setSnackbar({ open: true, message: result.data.message, severity: 'success' });
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete department";
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  // Delete Designation
  const deleteDesignation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this designation?")) return;
    try {
      const result = await axios.delete("http://localhost:5000/api/deletedesignation", { data: { DesignationId: id } });
      setAlldesignation(prev => prev.filter(des => des.id !== id));
      setSnackbar({ open: true, message: result.data.message, severity: 'success' });
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete designation";
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  // Fetch Departments
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const result = await axios.post("http://localhost:5000/api/fetchdepartmentbycompany", { CompanyId: companyData._id });
        const formattedData = result.data.map(dep => ({ ...dep, id: dep._id }));
        setAlldepartments(formattedData);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to fetch departments', severity: 'error' });
      }
    };
    if (companyData?._id) fetchDepartment();
  }, [companyData]);

  // Fetch Designations
  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const result = await axios.post("http://localhost:5000/api/fetchdesignationbycompany", { CompanyId: companyData._id });
        const formattedData = result.data.map(des => ({ ...des, id: des._id }));
        setAlldesignation(formattedData);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to fetch designations', severity: 'error' });
      }
    };
    if (companyData?._id) fetchDesignation();
  }, [companyData]);

  const Departmentcolumns = [
    { field: 'DepartmentName', headerName: 'Department Name', flex: 1, minWidth: 150 },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Button variant="contained" color="error" size="small" onClick={() => deleteDepartment(params.row.id)}>
          Delete
        </Button>
      )
    }
  ];

  const Designationcolumns = [
    { field: 'DesignationName', headerName: 'Designation Name', flex: 1, minWidth: 150 },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Button variant="contained" color="error" size="small" onClick={() => deleteDesignation(params.row.id)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <>
      <Box sx={{ height: '100vh', width: '80vw', display: 'flex' }}>
        <Box sx={{ padding: 2, width: '50%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#2980b9' }} onClick={openAddDialog}>Add Department</Button>
          </Box>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={departments}
              columns={Departmentcolumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
            />
          </Box>
        </Box>
        <Box sx={{ padding: 2, width: '50%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#2980b9' }} onClick={openAddDialog1}>Add Designation</Button>
          </Box>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={designation}
              columns={Designationcolumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
            />
          </Box>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={closeAddDialog}>
        <Box component="form" sx={{ padding: 2 }} onSubmit={SubmitDepartment}>
          <DialogTitle>Add Department</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField fullWidth label="Department Name" name="DepartmentName" required />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button onClick={closeAddDialog} variant="contained" color="error">Close</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={openDialog1} onClose={closeAddDialog1}>
        <Box component="form" sx={{ padding: 2 }} onSubmit={SubmitDesignation}>
          <DialogTitle>Add Designation</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField fullWidth label="Designation Name" name="DesignationName" required />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button onClick={closeAddDialog1} variant="contained" color="error">Close</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DepartmentsDesignation;

import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API_ENDPOINTS from '../../config';

const BranchList = () => {
  const { companyData } = useSelector((state) => state.company);

  const [AllBranches, setAllBranches] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchBranch = async () => {
      if (!companyData?._id) return;
      try {
        const result = await axios.post(API_ENDPOINTS.BRANCH.GET_BY_COMPANY, { CompanyId: companyData._id });
        const formattedData = result.data.data.map(brn => ({ ...brn, id: brn._id }));
        setAllBranches(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBranch();
  }, [companyData]);

  const openAddDialog = () => setOpenDialog(true);
  const closeAddDialog = () => { setOpenDialog(false); setChecked(false); };
  const handleChange = (e) => setChecked(e.target.checked);

  const createBranch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const getBranch = Object.fromEntries(formData.entries());

    const payload = {
      BranchName: getBranch.BranchName,
      BranchAddress: getBranch.BranchAddress,
      BranchCity: getBranch.BranchCity,
      BranchState: getBranch.BranchState,
      BranchPinCode: Number(getBranch.BranchPinCode),
      BranchIsActive: checked,
      CompanyId: companyData._id
    };

    try {
      const result = await axios.post(API_ENDPOINTS.BRANCH.ADD, payload);
      setAllBranches(prev => [...prev, { ...result.data.data, id: result.data.data._id }]);
      closeAddDialog();
      alert("Branch Added Successfully");
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      console.log(message);
      alert(message);
    }
  };

  const deleteBranch = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      const result = await axios.delete(API_ENDPOINTS.BRANCH.DELETE, { data: { BranchId: id } });
      setAllBranches(prev => prev.filter(branch => branch.id !== id));
      alert(result.data.message);
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete branch";
      console.error(message);
      alert(message);
    }
  };

  const columns = [
    { field: 'BranchName', headerName: 'Branch Name', flex: 1, minWidth: 150 },
    { field: 'BranchAddress', headerName: 'Branch Address', flex: 1, minWidth: 150 },
    { field: 'BranchCity', headerName: 'Branch City', flex: 1, minWidth: 150 },
    { field: 'BranchState', headerName: 'Branch State', flex: 1, minWidth: 150 },
    { field: 'BranchPinCode', headerName: 'Pincode', flex: 1, minWidth: 150 },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Button variant="contained" color="error" size="small" onClick={() => deleteBranch(params.row.id)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <>
      <Box sx={{ padding: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#2980b9', width: { xs: '100%', sm: 'auto' } }} onClick={openAddDialog}>
            Add Branch
          </Button>
        </Box>
        <Box sx={{ height: { xs: 400, sm: 500 }, width: '100%', overflowX: 'auto' }}>
          <DataGrid
            rows={AllBranches}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            sx={{ minWidth: { xs: 700, sm: 'auto' } }}
          />
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={closeAddDialog} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={createBranch} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Add Branch</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Branch Name" name="BranchName" type="text" required />
            <TextField label="Branch Address" name="BranchAddress" type="text" required />
            <TextField label="Branch City" name="BranchCity" type="text" required />
            <TextField label="Branch State" name="BranchState" type="text" required />
            <TextField label="Branch Pincode" name="BranchPinCode" type="text" required />
            <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} color="primary" />} label="Is Active?" />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button onClick={closeAddDialog} variant="contained" color="error">Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default BranchList;

import React, { useEffect, useState } from 'react';
import {
  Box,
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
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SalaryHeads = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const {companyData} = useSelector((state)=> state.user); // Replace with actual company data
  const [AllSalaryHeads, setAllSalaryHeads] = useState([]); // Replace with actual branch data

  const openAddDialog = () => {
    setOpenDialog(true);
  };

  const closeAddDialog = () => {
    setOpenDialog(false);
  };

  const SubmitSalaryHeads = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqData = Object.fromEntries(formData.entries());
    console.log('REQ', reqData);

    try {
      const result = await axios.post(
        'http://localhost:5000/api/addsalaryheads', {  ...reqData,CompanyId: companyData._id,} );
      console.log(result.data);
      alert('Salary head added');
      
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Something went wrong';
      console.error(message);
      alert(message);
    }
  };

  useEffect(()=> 
    {
      let fetchEmployees = async()=>
      {
        let result = await axios.post("http://localhost:5000/api/salaryheadsbycompany", {CompanyId: companyData._id})
        console.log(result)
        const formattedData = result.data.data.map(sal => ({
          ...sal,
          id: sal._id, // Required by DataGrid
        }));
        setAllSalaryHeads(formattedData)
      }
      fetchEmployees()
     } ,[])



  const columns = [
    { field: 'SalaryHeadsTitle', headerName: 'Name', width: 100 },
    { field: 'ShortName', headerName: 'Short Name', width: 200 },
    { field: 'SalaryHeadsType', headerName: 'Type', width: 150 },
    { field: 'SalaryHeadsValue', headerName: 'Values', width: 150 },
    { field: 'SalaryCalcultateMethod', headerName: 'Method', width: 150 },
    
  ]; // Example column data – replace with your actual column structure

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#2980b9' }}
          onClick={openAddDialog}
        >
          Add Salary Heads
        </Button>
      </Box>

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={AllSalaryHeads}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
        />
      </Box>

      <Dialog open={openDialog} onClose={closeAddDialog} maxWidth="sm" fullWidth>
        <Box
          component="form"
          onSubmit={SubmitSalaryHeads}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '500px',
          }}
        >
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          <Typography variant="h6">Add Salary Head</Typography>
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} >
          <TextField
            size="small"
            label="Title"
            name="SalaryHeadsTitle"
            type="text"
            required
          />
          <TextField
            size="small"
            label="Name"
            name="ShortName"
            type="text"
            required
          />
          <TextField
            size="small"
            label="Value"
            name="SalaryHeadsValue"
            type="text"
            required
          />

          <FormControl>
            <FormLabel>Salary Heads Type</FormLabel>
            <RadioGroup row name="SalaryHeadsType">
              <FormControlLabel
                value="Earnings"
                control={<Radio size="small" />}
                label="Earnings"
              />
              <FormControlLabel
                value="Deductions"
                control={<Radio size="small" />}
                label="Deductions"
              />
            </RadioGroup>
          </FormControl>

          <FormControl size="small" fullWidth required>
            <InputLabel id="salary-method-label">
              Salary Calculation Method
            </InputLabel>
            <Select
              labelId="salary-method-label"
              name="SalaryCalcultateMethod"
              label="Salary Calculation Method"
              defaultValue=""
            >
              <MenuItem value="">
                {/* <em>None</em> */}
              </MenuItem>
              <MenuItem value="Fixed">Fixed</MenuItem>
              <MenuItem value="PF">PF</MenuItem>
              <MenuItem value="TRANS">Trans</MenuItem>
              <MenuItem value="LWF">LWF</MenuItem>
            </Select>
          </FormControl>
          </DialogContent>
         <DialogActions>
                    <Button  type="submit" variant='contained' color='primary'>Submit</Button>
                    <Button onClick={() => closeAddDialog()} variant='contained' color='error'>Close</Button>
        
                  </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default SalaryHeads;

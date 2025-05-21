import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const BranchList = () => {


    let createBranch = async (e)=>
    {
        e.preventDefault()
        let fromData = new FormData(e.target)
        let getBranch = Object.fromEntries(fromData.entries())
        console.log(getBranch)

        try
        {
            let result = await axios.post("http://localhost:5000/api/addbranch", {...getBranch, CompanyId:companyData._id})
            console.log(result.data)
            alert("Branch Added")
        }
        catch(error)
        {
            const message = error?.response?.data?.message || "Something went wrong";
            console.log(message);
            alert(message);
        }

    }
   
    const[checked, setChecked] = useState(false)
    const handleChange = (e)=>
    {
       setChecked(e.target.checked) 
    }
    const[openDialog, setopenDialog] = useState(false)
    let openAddDialog = (prod)=>
    {
        setopenDialog(true)
        
    }

    let closeAddDialog=()=>
    {
        setopenDialog(false)
    }
    let { companyData } = useSelector((state) => state.user)
    const[AllBranches, setAllBranches] = useState([])
useEffect(()=>
{
    let fetchBranch = async()=>
    {
        let result = await axios.post("http://localhost:5000/api/getbranchbycompany", {CompanyId:companyData._id})
        console.log(result.data.data)
        const formattedData = result.data.data.map(brn => ({
            ...brn,
            id: brn._id, // Required by DataGrid
          }));
setAllBranches(formattedData)

    }
    fetchBranch()
},[])
    const columns = [
        { field: 'BranchName', headerName: 'Branch Name', flex: 1,minWidth: 150 },
        // { field: 'EmployeeEmail', headerName: 'Email ID', flex: 1,minWidth: 250 },
        { field: 'RegistrationNo', headerName: 'Registration No', flex: 1,minWidth: 150 },
        { field: 'BranchAddress', headerName: 'Branch Address', flex: 1,minWidth: 150 },
        { field: 'BranchCity', headerName: 'Branch City', flex: 1,minWidth: 150 },
        { field: 'BranchState', headerName: 'Branch State', flex: 1,minWidth: 150 },
        { field: 'BranchPinCode', headerName: 'Pincode', flex: 1,minWidth: 150 },
        { field: 'CompanyId', headerName: 'Company Id', flex: 1,minWidth: 150 },
       
    ]
  return (
    <>
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" sx={{  backgroundColor: '#2980b9'}}onClick={() => openAddDialog()}>
          Add Branch
        </Button>
      </Box>
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={AllBranches}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
    <Dialog  open={openDialog} onClose={closeAddDialog}  maxWidth="sm" fullwidth>
<Box component="form" onSubmit={createBranch}sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      width:'500px'
    }}>
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Add Branch
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} >
            
            <TextField label="Branch Name" 
            name='BranchName' 
            type="text" 
            required />
            

            <TextField label="Branch Address" 
            name='BranchAddress' 
            type="text" 
            required />
            <TextField label="Registration No" 
            name='RegistrationNo' 
            type="text" 
            required />
            <TextField label="Branch City" 
            name='BranchCity' 
            type="text" 
            required />
            <TextField label="BranchState" 
            name='BranchState' 
            type="text" 
            required />
            <TextField label="Branch Pincode" 
            name='BranchPincode' 
            type="text" 
            required />
            <FormControlLabel
                      control={<Checkbox checked={checked} onChange={handleChange} color="primary" />}
                      label="Is Active?"
                    />
              {/* <TextField onChange={(e) => setnewPrice(e.target.value)} label="Enter Updated Price" name="price" /> */}
           
          </DialogContent>
          <DialogActions>
            <Button  type="submit" variant='contained' color='primary'>Submit</Button>
            <Button onClick={() => closeAddDialog()} variant='contained' color='error'>Close</Button>

          </DialogActions>
          </Box>
        </Dialog>
        
    </>
    
  )
}

export default BranchList
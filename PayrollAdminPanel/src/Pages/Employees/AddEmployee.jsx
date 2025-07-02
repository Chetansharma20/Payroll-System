import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
  Typography,

} from '@mui/material';


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AddEmployee = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const[snackbarOpen, setSnackbarOpen] = useState(false);
     const openAddDialog = () => {
    setOpenDialog(true);
    
  };

  const handleSnackbarClose = ()=>
  {
    setSnackbarOpen(false)
  }
  const closeAddDialog = ()=>
  {
    setOpenDialog(false)
  }
 
  const [employeePhoto, setEmployeePhoto] = useState(null);
const [aadhaarCard, setAadhaarCard] = useState(null);
const [panCard, setPanCard] = useState(null);
const [passBook, setPassBook] = useState(null);
const [degree, setDegree] = useState(null);

  let { companyData } = useSelector((state) => state.user)
  console.log(companyData._id)
  const SubmitEmployeeData = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let reqData = Object.fromEntries(formData.entries());
    console.log('REQ', reqData);

    try {
  
  

      let result = await axios.post('http://localhost:5000/api/addemployee', { ...reqData, EmployeePhoto: employeePhoto, AdhaarCard:aadhaarCard, PanCard:panCard, PassBook:passBook, Degree:degree,  CompanyId: companyData._id },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      console.log(result.data.data)
      // alert("Employee added")
      setSnackbarOpen(true)
    }


    catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      console.log(message);
      alert(message);

    }


  };
const[getAllBranch,setAllBranch] = useState([])
useEffect(()=>
{
  let getBranch = async()=>
  {
    let result = await axios.post("http://localhost:5000/api/getbranchbycompany", {CompanyId:companyData._id})
    console.log(result)
    setAllBranch(result.data.data)
  }
  getBranch()
},[])

const[departments, setAlldepartments] = useState([])
const[designation, setAlldesignation] = useState([])
useEffect(()=>
{
    let fetchDepartment = async()=>
    {
        let result = await axios.post("http://localhost:5000/api/fetchdepartmentbycompany", {CompanyId:companyData._id})
        console.log(result.data.data)
        const formattedData = result.data.map(dep => ({
            ...dep,
            id: dep._id, // Required by DataGrid
          }));
setAlldepartments(formattedData)

    }
    fetchDepartment()
},[])
useEffect(()=>
  {
      let fetchDesignation = async()=>
      {
          let result = await axios.post("http://localhost:5000/api/fetchdesignationbycompany", {CompanyId:companyData._id})
          console.log(result.data.data)
          const formattedData = result.data.map(des => ({
              ...des,
              id: des._id, // Required by DataGrid
            }));
  setAlldesignation(formattedData)
  
      }
      fetchDesignation()
  },[])

  return (
    <>
  <Box sx={{ pt: 2, px: 3, pb: 2, minHeight: 'auto', boxSizing: 'border-box' }}>

      <Box
        sx={{
          maxWidth: '800',
          display: 'flex',
          mr:35,
        flexDirection: 'column',
          p: 2,
          borderRadius: 3,
          boxShadow: 4,
        
          // position:'absolute',
          // left:50,
          // right:50,
          // top:80
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{fontWeight: 700, color: '#2e7d32'}}>
          Add Employee
        </Typography>

        <Box
  component="form"
  onSubmit={SubmitEmployeeData}
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    flexWrap: 'wrap',
  }}
>
  {/* LEFT COLUMN */}
  <Box sx={{ flex: 1, minWidth: '48%', display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField size="small" label="Name" name="EmployeeName" type="text" required />
    <TextField size="small" label="Email" name="EmployeeEmail" type="email" required />
    <TextField size="small" label="PhoneNo" name="EmployeePhoneNo" type="text" required />
    <TextField size="small" label="Address" name="EmployeeAddress" type="text" required />
    <TextField size="small" label="City" name="EmployeeCity" type="text" required />
    <TextField size="small" label="State" name="EmployeeState" type="text" required />
    <TextField size="small" label="Pincode" name="EmployeePincode" type="number" required />
    <TextField size="small" label="Password" name="EmployeePassword" type="password" required />
    <FormControl>
      <FormLabel>Gender</FormLabel>
      <RadioGroup row name="EmployeeGender">
        <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
        <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
        <FormControlLabel value="Other" control={<Radio size="small" />} label="Others" />
      </RadioGroup>
    </FormControl>
  </Box>

  {/* RIGHT COLUMN */}
  <Box sx={{ flex: 1, minWidth: '48%', display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField
      size="small"
      label="Date Of Birth"
      name="EmployeeDOB"
      type="date"
      required
      InputLabelProps={{ shrink: true }}
    />
    <TextField
      size="small"
      label="Joining Date"
      name="EmployeeJoiningDate"
      type="date"
      required
      InputLabelProps={{ shrink: true }}
    />

    
    <FormControl size="small">
      <Select name="EmployeeDepartment" required defaultValue="" displayEmpty>
        <MenuItem disabled value="">Select Deparmtent</MenuItem>
        {departments.map((dep) => (
          <MenuItem key={dep._id} value={dep.DepartmentName}>{dep.DepartmentName}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl size="small">
      <Select name="EmployeeDesignation" required defaultValue="" displayEmpty>
        <MenuItem disabled value="">Select Designation</MenuItem>
        {designation.map((des) => (
          <MenuItem key={des._id} value={des.DesignationName}>{des.DesignationName}</MenuItem>
        ))}
      </Select>
    </FormControl>
   

    {/* <TextField size="small" label="Department" name="EmployeeDepartment" type="text" required /> */}
    <TextField size="small" label="Employee Type" name="EmployeeType" type="text" required />
    {/* <TextField size="small" label="Company Id" name="CompanyId" type="text" required /> */}

    <FormControl size="small">
      <Select name="BranchId" required defaultValue="" displayEmpty>
        <MenuItem disabled value="">Select Branch</MenuItem>
        {getAllBranch.map((br) => (
          <MenuItem key={br._id} value={br.BranchName}>{br.BranchName}</MenuItem>
        ))}
      </Select>
    </FormControl>
<Button
  onClick={openAddDialog}
  variant="outlined"
  color="primary"
  size="small"
  sx={{
    alignSelf: 'flex-start',
    textTransform: 'none',
    px: 2,
    py: 1,
    borderRadius: 2,
    mt: 1,
    fontWeight: 500,
    gap: 1,
    display: 'flex',
    alignItems: 'center',
  }}

>
  Add Documents
</Button>

    

    <Button
      type="submit"
      variant="contained"
      size="small"
      color="success"
      sx={{ alignSelf: 'flex-start' }}
    >
      Add Employee
    </Button>
  </Box>
 <Dialog open={openDialog} onClose={closeAddDialog} maxWidth="sm" fullWidth>
  <DialogTitle>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Upload Employee Documents
    </Typography>
  </DialogTitle>

  <DialogContent dividers>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button variant="outlined" component="label">
        Upload Photo
        <input type="file" hidden onChange={(e) => setEmployeePhoto(e.target.files[0])} />
      </Button>
      {employeePhoto && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {employeePhoto.name}
        </Typography>
      )}

      <Button variant="outlined" component="label">
        Upload Aadhaar Card
        <input type="file" hidden onChange={(e) => setAadhaarCard(e.target.files[0])} />
      </Button>
      {aadhaarCard && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {aadhaarCard.name}
        </Typography>
      )}

      <Button variant="outlined" component="label" required>
        Upload PAN Card
        <input type="file" hidden onChange={(e) => setPanCard(e.target.files[0])} />
      </Button>
      {panCard && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {panCard.name}
        </Typography>
      )}

      <Button variant="outlined" component="label">
        Upload Bank Passbook
        <input type="file" hidden onChange={(e) => setPassBook(e.target.files[0])} />
      </Button>
      {passBook && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {passBook.name}
        </Typography>
      )}

      <Button variant="outlined" component="label">
        Upload Degree
        <input type="file" hidden onChange={(e) => setDegree(e.target.files[0])} />
      </Button>
      {degree && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {degree.name}
        </Typography>
      )}
    </Box>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
    <Button onClick={closeAddDialog} variant="contained" color="error">
      Done
    </Button>
  </DialogActions>
</Dialog>
  <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Employee Added successfully!
          </Alert>
        </Snackbar>
</Box>

      </Box>
    </Box>
    
   </>
  );
};

export default AddEmployee;
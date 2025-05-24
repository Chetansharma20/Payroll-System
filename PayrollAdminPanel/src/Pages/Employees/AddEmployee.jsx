import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,

} from '@mui/material';
import { computeAxisValue } from '@mui/x-charts/internals';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AddEmployee = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  let { companyData } = useSelector((state) => state.user)
  console.log(companyData._id)
  const SubmitEmployeeData = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let reqData = Object.fromEntries(formData.entries());
    console.log('REQ', reqData);

    try {
  

      let result = axios.post('http://localhost:5000/api/addemployee', { ...reqData, EmployeePhoto: selectedImage, CompanyId: companyData._id },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      alert("Employee added")
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
    <Box sx={{ p: 4, minHeight: '100vh', overflowX: 'hidden', // ✅ Prevent horizontal scroll
      overflowY: 'auto',   // Optional: enable vertical scroll only if needed
      boxSizing: 'border-box', }}>
      <Box
        sx={{
          maxWidth: '800',
          // mx: 'auto',
          display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'center',
          // padding: 1,
          mr:35,
          // ml:6,
          flexDirection: 'column',
          p: 4,
          borderRadius: 3,
          boxShadow: 4
          // position:'absolute',
          // left:50,
          // right:50,
          // top:80
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
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
    <TextField size="small" label="PhoneNo" name="EmployeePhoneNo" type="number" required />
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
      <Select name="DepartmentName" required defaultValue="" displayEmpty>
        <MenuItem disabled value="">Select Deparmtent</MenuItem>
        {departments.map((dep) => (
          <MenuItem key={dep._id} value={dep._id}>{dep.DepartmentName}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl size="small">
      <Select name="DesignationName" required defaultValue="" displayEmpty>
        <MenuItem disabled value="">Select Designation</MenuItem>
        {designation.map((des) => (
          <MenuItem key={des._id} value={des._id}>{des.DesignationName}</MenuItem>
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
          <MenuItem key={br._id} value={br._id}>{br.BranchName}</MenuItem>
        ))}
      </Select>
    </FormControl>

    <Button variant="outlined" component="label">
      Upload Image
      <input
        type="file"
        name="EmployeePhoto"
        hidden
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
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
</Box>

      </Box>
    </Box>
  );
};

export default AddEmployee;

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DepartmentsDesignation = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const openAddDialog = () => {
    setOpenDialog(true);
    
  };

  const closeAddDialog = () => {
    setOpenDialog(false);
    
  };
  const openAddDialog1 = () => {
    setOpenDialog1(true);
  };

  const closeAddDialog1 = () => {
    setOpenDialog1(false);
  };
  let { companyData } = useSelector((state) => state.user)
  const  SubmitDepartment =  async(e)=>
  {
    e.preventDefault()
    let getData = new FormData(e.target)
    let departmentdata = Object.fromEntries(getData.entries())
    console.log(departmentdata)
  
    try
    {
      let result  = await axios.post("http://localhost:5000/api/adddepartment",{...departmentdata, CompanyId: companyData._id} )
      console.log(result)
      alert("Department Added")
    }
    catch(error)
    {
      const message = error?.response?.data?.message || "Something went wrong";
      console.log(message);
      alert(message);
    }
  }
  const  SubmitDesignation =  async(e)=>
    {
      e.preventDefault()
      let getData = new FormData(e.target)
      let designationdata = Object.fromEntries(getData.entries())
      console.log(designationdata)
    
      try
      {
        let result  = await axios.post("http://localhost:5000/api/adddesignation",{...designationdata, CompanyId:companyData._id})
        console.log(result)
        alert("Designation Added")
      }
      catch(error)
      {
        const message = error?.response?.data?.message || "Something went wrong";
        console.log(message);
        alert(message);
      }
    }
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
  // const[alldepartments, setAlldepartments]  = useState([])
  // useEffect(()=> 
  //   {
  //     let fetchDepartments = async()=>
  //     {
  //       let result = await axios.get("http://localhost:5000/api/get")
  //       console.log(result)
  //       const formattedData = result.data.data.map(dep => ({
  //         ...dep,
  //         id: dep._id, // Required by DataGrid
  //       }));
  //       setAlldepartments(formattedData)
  //     }
  //     fetchDepartments()
  //    } ,[])
    //  let navigate = useNavigate()
  const Departmentcolumns = [
   { field: 'DepartmentName' , headerName: 'Department Name', flex:1, minWidth:150},
  //  { field: 'CompanyId' , headerName: 'Company Id', flex:1, minWidth:150}
  //  { field: 'DepartmentIsActive' , headerName: 'Department is Active?', flex:1, minWidth:150}
  ]
  const Designationcolumns = [
    { field: 'DesignationName' , headerName: 'Designation Name', flex:1, minWidth:150},
   //  { field: 'CompanyId' , headerName: 'Company Id', flex:1, minWidth:150}
    // { field: 'DepartmentIsActive' , headerName: 'Department is Active?', flex:1, minWidth:150}
   ]
  return (
    <>
    <Box sx={{height:'100vh', width:'80vw', display:'flex'}}>
  <Box sx={{ padding: 2,  width:'50%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" sx={{  backgroundColor: '#2980b9'}}onClick={() => openAddDialog()}>
          Add Department 
        </Button>
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
    <Box sx={{ padding: 2, width:'50%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" sx={{  backgroundColor: '#2980b9'}}onClick={() => openAddDialog1()}>
          Add  Designation
        </Button>
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
        <Box component="form"  sx={{ padding: 2 }} onSubmit={SubmitDepartment}>
          <DialogTitle>Add Department </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {/* <TextField fullWidth label="Designation Name" name="empDesignation" required /> */}
            <TextField fullWidth label="Department Name" name="DepartmentName" required />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button onClick={closeAddDialog} variant="contained" color="error">Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={openDialog1} onClose={closeAddDialog}>
        <Box component="form"  sx={{ padding: 2 }} onSubmit={SubmitDesignation}>
          <DialogTitle>Add Designation </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>

            {/* <TextField fullWidth label="Department Name" name="empDepartmentName" required /> */}
            <TextField fullWidth label="Designation Name" name="DesignationName" required />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button onClick={closeAddDialog1} variant="contained" color="error">Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
      
    </>
  )
}

export default DepartmentsDesignation
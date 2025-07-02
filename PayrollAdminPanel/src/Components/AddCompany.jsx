import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const AddCompany = () => {

  
    const[checked, setChecked] = useState(false)
    const handleChange = (event)=>
    {
      setChecked(event.target.checked);
  
  }
 const SubmitCompanyData = async (e)=>
 {
  e.preventDefault()
let formData = new FormData(e.target)
let reqData = Object.fromEntries(formData.entries())
reqData.CompanyIsActive = checked;
console.log(reqData)

try
{
  let result = await axios.post('http://localhost:5000/api/addcompany',reqData)
  alert("Company Added")
}
catch(error)
{
  const message = error?.response?.data?.message || "Something went wrong";
    console.log(message);
    alert(message);
  
}
 }
  
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
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700, color: '#2e7d32',}}> 
          Add Company
        </Typography>

        <Box
  component="form"
  onSubmit={SubmitCompanyData}
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    flexWrap: 'wrap',
  }}
>

  <Box sx={{ flex: 1, minWidth: '48%', display: 'flex', flexDirection: 'column', gap: 2 }}>



<TextField label="Company Name" 
name='CompanyName' 
type="text" 
required />
<TextField label="Company Name" 
name='CompanyEmail' 
type="email" 
required />

<TextField label="Company Password" 
name='CompanyPassword' 
type="password" 
required />
<TextField label="Company Address" 
name='CompanyAddress' 
type="text" 
required />
<TextField label="Registration No" 
name='RegistrationNo' 
type="text" 
required />
 </Box>
  
   <Box sx={{ flex: 1, minWidth: '48%', display: 'flex', flexDirection: 'column', gap: 2 }}> 
<TextField label="Company City" 
name='CompanyCity' 
type="text" 
required />
<TextField label="Company State" 
name='CompanyState' 
type="text" 
required />
{/* <TextField label="Salary Heads" 
name='SalaryHeads' 
type="text" 
required />
 */}



<FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} color="primary" />}
          label="Is Active?"
        />
        <Button type="submit"
          variant="contained"
          size="small"
          color="success"
          sx={{ margin: 2 }} >Add Company</Button>
 
</Box>





          </Box>
          </Box>
    </Box>
  
  )
}

export default AddCompany
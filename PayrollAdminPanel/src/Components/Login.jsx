import { Box, Paper, TextField, Typography , Button} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { login } from '../ReduxWork/UserSlice'

const Login = () => {
    let navigate  = useNavigate()
    let dispatcher = useDispatch()

    let CompanyLogin = async (e)=>
    {
      e.preventDefault()

      let formData = new FormData(e.target)
      let getData = Object.fromEntries(formData.entries())
      console.log(getData)

      try
      {
      let result = await axios.post("http://localhost:5000/api/companylogin", getData)
        console.log(result)
        dispatcher(login(result.data.data))

        // alert('user Login')
        navigate('/employee/employeelist')

      }
      catch(error)
      {
        console.log(error.response)
      }

    }
  return (
    <>
    <Box  sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: '100vh',
        backgroundColor: '#FFEBEE',  // Light pink background for a soft touch
        padding: 2,
        width:"70vw",
        height:'100vh'
        ,
        marginRight:'70px',
        flexDirection:'column'
      }}>
        {/* <Paper  
          elevation={6}
        sx={{
          padding: 3,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: '#fff',
        }} > */}
            <Typography>Login</Typography>

            <Box  component="form"
          onSubmit={(e) => CompanyLogin(e)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width:400,
            padding:4,
            backgroundColor:'white',
            boxShadow:3,
            borderRadius:2
          }}>
                <TextField type='text' label='Enter Email' variant='outlined' name='CompanyEmail'   sx={{ marginBottom: 2 }} required  />
                <TextField type='password' label='Enter Password' variant='outlined' name='CompanyPassword' required sx={{ marginBottom: 2 }} />
                <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              padding: '12px',
              '&:hover': {
                backgroundColor: '#4caf50',  // Lighter green on hover
              },
            }}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            New User?{' '}
            <Button
              variant="text"
              size="small"
              onClick={() => navigate("/addcompany")}
              sx={{ textTransform: 'none' }}
            >
              Register
            </Button>
          </Typography>
            </Box>
        {/* </Paper> */}
    </Box>
    
    
    
    </>
  )
}

export default Login
import { Box, Paper, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../ReduxWork/UserSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
const CompanyLogin = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const getData = Object.fromEntries(formData.entries());
  
  try {
    const result = await axios.post("http://localhost:5000/api/companylogin", getData);
    const token = result.data.token || result.data.data.token; // adjust based on response
    localStorage.setItem('token', token); // store the JWT
    
    dispatch(login(result.data.data));
    navigate('/employee/employeelist');
  } catch (error) {
    console.log(error.response);
  }
};


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        // backgroundColor: '#f5f7fa',
        padding: 2,
        width: '70vw',
        marginRight: '70px',
        flexDirection: 'column',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          
          padding: 5,
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          backgroundColor: '#ffffff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 700,
            marginBottom: 3,
            color: '#2e7d32',
          }}
        >
          Company Login
        </Typography>

        <Box
          component="form"
          onSubmit={CompanyLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Company Email"
            type="email"
            name="CompanyEmail"
            variant="outlined"
            required
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            name="CompanyPassword"
            variant="outlined"
            required
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{
              fontWeight: 'bold',
              paddingY: 1.2,
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
            }}
          >
            Login
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: 3,
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          New User?{' '}
          <Button
            variant="text"
            size="small"
            onClick={() => navigate("/addcompany")}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#2e7d32',
              '&:hover': {
                textDecoration: 'underline',
                backgroundColor: 'transparent',
              },
            }}
          >
            Register here
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
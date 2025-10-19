import { Box, Paper, TextField, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as companyLogin } from '../ReduxWork/UserSlice';
import { login as employeeLogin } from '../ReduxWork/EmployeeSlice';
import API_ENDPOINTS from '../config';

const UnifiedLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginType, setLoginType] = useState('company'); // 'company' or 'employee'

  const handleLoginTypeChange = (event, newType) => {
    if (newType !== null) {
      setLoginType(newType);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const getData = Object.fromEntries(formData.entries());
    
    try {
      if (loginType === 'company') {
        // Company Login
        const result = await axios.post(API_ENDPOINTS.AUTH.COMPANY_LOGIN, getData);
        const token = result.data.token || result.data.data.token;
        
        localStorage.setItem('token', token);
        localStorage.setItem('userType', 'admin');
        
        dispatch(companyLogin(result.data.data));
        navigate('/admin/dashboard/overview');
      } else {
        // Employee Login
        const result = await axios.post(API_ENDPOINTS.AUTH.EMPLOYEE_LOGIN, getData);
        const token = result.data.token || result.data.data.token;
        
        localStorage.setItem('token', token);
        localStorage.setItem('userType', 'employee');
        
        dispatch(employeeLogin(result.data.data));
        navigate('/employee/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.response);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 5,
          width: '100%',
          maxWidth: 450,
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
          Welcome Back
        </Typography>

        {/* Toggle between Company and Employee Login */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <ToggleButtonGroup
            value={loginType}
            exclusive
            onChange={handleLoginTypeChange}
            aria-label="login type"
            sx={{
              '& .MuiToggleButton-root': {
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
              },
              '& .Mui-selected': {
                backgroundColor: '#2e7d32 !important',
                color: '#fff !important',
              },
            }}
          >
            <ToggleButton value="company">Company</ToggleButton>
            <ToggleButton value="employee">Employee</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label={loginType === 'company' ? 'Company Email' : 'Employee Email'}
            type="email"
            name={loginType === 'company' ? 'CompanyEmail' : 'EmployeeEmail'}
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
            name={loginType === 'company' ? 'CompanyPassword' : 'EmployeePassword'}
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
            Login as {loginType === 'company' ? 'Company' : 'Employee'}
          </Button>
        </Box>

        {loginType === 'company' && (
          <Typography
            variant="body2"
            align="center"
            sx={{
              marginTop: 3,
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            New Company?{' '}
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
        )}
      </Paper>
    </Box>
  );
};

export default UnifiedLogin;
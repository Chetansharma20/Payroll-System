import { Box, Paper, TextField, Typography, Button } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../Redux/UserSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const EmployeeLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const getData = Object.fromEntries(formData.entries())
    console.log(getData)

    try {
      const result = await axios.post("http://localhost:5000/api/employeelogin", getData)
      console.log(result)
      dispatch(login(result.data.data))
      navigate('/leaves')
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0f7fa, #ffe0b2)',
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#4caf50' }}
        >
          Employee Login
        </Typography>

        <Box
          component="form"
          onSubmit={EmployeeLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}
        >
          <TextField
            label="Email"
            name="EmployeeEmail"
            type="email"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="EmployeePassword"
            type="password"
            variant="outlined"
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1.5,
              '&:hover': {
                backgroundColor: '#388e3c',
              },
            }}
          >
            Login
          </Button>

          {/* <Typography variant="body2" align="center">
            New User?{' '}
            <Button
              variant="text"
              size="small"
              onClick={() => navigate("/addcompany")}
              sx={{ textTransform: 'none', fontWeight: 'bold', color: '#1976d2' }}
            >
              Register Here
            </Button>
          </Typography> */}
        </Box>
      </Paper>
    </Box>
  )
}

export default Login

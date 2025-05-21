import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemText, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuTree from './MenuTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import { logout } from '../ReduxWork/UserSlice';
import { useDispatch } from 'react-redux';
const SideBar = () => {
    // const[open, setOpen] = useState(true)
    const drawerWidth = 260;

    // const toggleDrawer = ()=>
    // {
    //     setOpen(!open)
    // }
    let dispatcher = useDispatch()
    let navigate = useNavigate()

    let handleLogout = ()=>
    {
      dispatcher(logout())
    }
    
  return (
    <>



  <Drawer sx={{width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper':{
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2c3e50', // Sidebar background
            color: '#ecf0f1', // Text color
        },
     }}
     
     variant='permanent'
     anchor='left'  >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          {/* <DashboardIcon sx={{ fontSize: 32, mr: 1, color: '#f39c12' }} /> */}
          <Typography variant="h6" sx={{ fontWeight: 'bold',  color: '#ecf0f1' }}>
            PayRoll
          </Typography>
        </Box>


<List>


    <ListItem>
        <ListItemText>
       
        <AdminPanelSettingsIcon  sx={{ color: '#ecf0f1', mr: 1 }}/>       Admin Panel    
          
        </ListItemText>
    </ListItem>
    <MenuTree/>
</List>
 </Drawer>


     <Box component="main" sx={{ flexGrow: 1,  }}>
  <AppBar
    position='fixed'
    sx={{
      width:'84.5%',
      // backgroundColor: '#00796b',
      px: 2,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      // background: 'linear-gradient(to right, #16a085, #1abc9c)',
      backgroundColor: '#2c3e50',
    }}
  >
    <Toolbar >
    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Admin Portal
            </Typography>

      <List>
        <ListItem>
          <Button variant='contained' onClick={() => { navigate('/login')}}  sx={{
                // backgroundColor: '#2ecc71',
                 backgroundColor: '#3498db',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  // backgroundColor: '#27ae60',
                  backgroundColor: '#2980b9',

                },
              }}>
            LogIn
          </Button>
            <Button variant='contained'  onClick={() =>{navigate('/login'),handleLogout()}}  sx={{
                // backgroundColor: '#2ecc71',
                 backgroundColor: '#3498db',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  // backgroundColor: '#27ae60',
                  backgroundColor: '#2980b9',

                },
              }}>
            LogOut
          </Button>
        </ListItem>
      </List>
    </Toolbar>
  </AppBar>
</Box>
</>  
    
  )
}

export default SideBar
// import {
//     Box,
//     Drawer,
//     IconButton,
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
//     Button,
//     Avatar
// } from '@mui/material'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { login, logout } from '../Redux/UserSlice' // Optional: If you want to dispatch logout

// import ListIcon from '@mui/icons-material/List'
// import LoginIcon from '@mui/icons-material/Login'
// import AccessTimeIcon from '@mui/icons-material/AccessTime'
// import EventBusyIcon from '@mui/icons-material/EventBusy'
// import AnalyticsIcon from '@mui/icons-material/Analytics'
// import LogoutIcon from '@mui/icons-material/Logout'

// const DrawerEmployee = () => {
//      const { EmployeeData, isLogin } = useSelector((state) => state.user);
//     const [isDrawerOpen, setisDrawerOpen] = useState(false)
//     const navigate = useNavigate()
//     const dispatcher = useDispatch()

//     const handleDrawerOpen = () => {
//         setisDrawerOpen(true)
//     }

//     const handleDrawerClose = () => {
//         setisDrawerOpen(false)
//     }

//     const handleLogout = () => {
//         // dispatch(login(null)) // or a logout action if you have one
// dispatcher(logout())
//         navigate('/')
//     }

//     return (
//         <>
//             <Box
//                 sx={{
//                     width: '100%',
//                     background: 'linear-gradient(to right, #3f51b5, #5a55ae)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     color: 'white',
//                     px: 2,
//                     py: 1,
//                     boxShadow: 2
//                 }}
//             >
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         sx={{ color: 'white' }}
//                         aria-label="menu"
//                         onClick={handleDrawerOpen}
//                     >
//                         <ListIcon />
//                     </IconButton>
//                     <Box sx={{ ml: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>
//                         Employee Panel
//                     </Box>
//                 </Box>
//                 <List>
//                 <ListItem>{isLogin ? (
//                          <Avatar onClick={()=>{navigate('/profile')}} sx={{ backgroundColor: 'rgba(16, 7, 250, 0.1)', cursor: 'pointer',  }}>
//                                         {EmployeeData?.EmployeeName.charAt(0).toUpperCase()}
//                                     </Avatar>
//                 ):(<Button
//                     color="inherit"
//                     startIcon={<LogoutIcon />}
//                     onClick={handleLogout}
//                     sx={{
//                         textTransform: 'none',
//                         fontWeight: 500,
//                         border: '1px solid white',
//                         borderRadius: 2,
//                         px: 2,
//                         py: 0.5,
//                         mr:5,
//                         '&:hover': {
//                             backgroundColor: 'rgba(255,255,255,0.1)'
//                         },
//                       }}
//                 >
//                     Logout
//                 </Button>
//            )}
//            </ListItem>
//                 </List>
//             </Box>

//             <Drawer
//                 open={isDrawerOpen}
//                 onClose={handleDrawerClose}
//                 PaperProps={{
//                     sx: {
//                         backgroundColor: '#f5f5f5',
//                         width: 250,
//                         borderTopRightRadius: '12px',
//                         borderBottomRightRadius: '12px',
//                         p: 1
//                     }
//                 }}
//             >
//                 <List>
//                     <ListItem
//                         onClick={() => {
//                             navigate('/')
//                             handleDrawerClose()
//                         }}
//                         sx={{
//                             borderRadius: 2,
//                             mb: 1,
//                             '&:hover': {
//                                 backgroundColor: '#e3f2fd'
//                             }
//                         }}
//                     >
//                         <ListItemIcon sx={{ color: '#3f51b5' }}>
//                             <LoginIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Login" />
//                     </ListItem>

//                     <ListItem
//                         onClick={() => {
//                             navigate('/attendances')
//                             handleDrawerClose()
//                         }}
//                         sx={{
//                             borderRadius: 2,
//                             mb: 1,
//                             '&:hover': {
//                                 backgroundColor: '#e8f5e9'
//                             }
//                         }}
//                     >
//                         <ListItemIcon sx={{ color: '#4caf50' }}>
//                             <AccessTimeIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Attendances" />
//                     </ListItem>

//                     <ListItem
//                         onClick={() => {
//                             navigate('/leaves')
//                             handleDrawerClose()
//                         }}
//                         sx={{
//                             borderRadius: 2,
//                             mb: 1,
//                             '&:hover': {
//                                 backgroundColor: '#fff3e0'
//                             }
//                         }}
//                     >
//                         <ListItemIcon sx={{ color: '#ff9800' }}>
//                             <EventBusyIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Leaves" />
//                     </ListItem>

//                     <ListItem
//                         onClick={() => {
//                             navigate('/dashboard')
//                             handleDrawerClose()
//                         }}
//                         sx={{
//                             borderRadius: 2,
//                             '&:hover': {
//                                 backgroundColor: '#f3e5f5'
//                             }
//                         }}
//                     >
//                         <ListItemIcon sx={{ color: '#9c27b0' }}>
//                             <AnalyticsIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Dashboard" />
//                     </ListItem>
//                      <ListItem
//                         onClick={() => {
//                             navigate('/salary')
//                             handleDrawerClose()
//                         }}
//                         sx={{
//                             borderRadius: 2,
//                             '&:hover': {
//                                 backgroundColor: '#f3e5f5'
//                             }
//                         }}
//                     >
//                         <ListItemIcon sx={{ color: '#9c27b0' }}>
//                             <AnalyticsIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Salary" />
//                     </ListItem>
                    
//                 </List>
//             </Drawer>
//         </>
//     )
// }

// export default DrawerEmployee
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Avatar,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxWork/EmployeeSlice';

import ListIcon from '@mui/icons-material/List';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DrawerEmployee = () => {
    const { EmployeeData, isLogin } = useSelector((state) => state.employee);
    const [isDrawerOpen, setisDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setisDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setisDrawerOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    background: 'linear-gradient(to right, #3f51b5, #5a55ae)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'white',
                    px: 2,
                    py: 1,
                    boxShadow: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        sx={{ color: 'white' }}
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                    >
                        <ListIcon />
                    </IconButton>
                    <Box sx={{ ml: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>
                        Employee Panel
                    </Box>
                </Box>
                <List>
                    <ListItem>
                        {isLogin ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                                    {EmployeeData?.EmployeeName || 'Employee'}
                                </Typography>
                                <Avatar 
                                    onClick={() => navigate('/employee/profile')} 
                                    sx={{ 
                                        backgroundColor: '#fff', 
                                        color: '#3f51b5',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        }
                                    }}
                                >
                                    {EmployeeData?.EmployeeName?.charAt(0)?.toUpperCase() || 'E'}
                                </Avatar>
                                <Button
                                    color="inherit"
                                    startIcon={<LogoutIcon />}
                                    onClick={handleLogout}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        border: '1px solid white',
                                        borderRadius: 2,
                                        px: 2,
                                        py: 0.5,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        },
                                    }}
                                >
                                    Logout
                                </Button>
                            </Box>
                        ) : null}
                    </ListItem>
                </List>
            </Box>

            <Drawer
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        backgroundColor: '#f5f5f5',
                        width: 250,
                        borderTopRightRadius: '12px',
                        borderBottomRightRadius: '12px',
                        p: 1
                    }
                }}
            >
                <List>
                    <ListItem
                        onClick={() => {
                            navigate('/employee/dashboard');
                            handleDrawerClose();
                        }}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#f3e5f5'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#9c27b0' }}>
                            <AnalyticsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem
                        onClick={() => {
                            navigate('/employee/attendances');
                            handleDrawerClose();
                        }}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#e8f5e9'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#4caf50' }}>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Attendances" />
                    </ListItem>

                    <ListItem
                        onClick={() => {
                            navigate('/employee/leaves');
                            handleDrawerClose();
                        }}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#fff3e0'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#ff9800' }}>
                            <EventBusyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Leaves" />
                    </ListItem>

                    <ListItem
                        onClick={() => {
                            navigate('/employee/salary');
                            handleDrawerClose();
                        }}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#e3f2fd'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#2196f3' }}>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Salary" />
                    </ListItem>

                    <ListItem
                        onClick={() => {
                            navigate('/employee/profile');
                            handleDrawerClose();
                        }}
                        sx={{
                            borderRadius: 2,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#fce4ec'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#e91e63' }}>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default DrawerEmployee;
// // import {
// //   AppBar,
// //   Avatar,
// //   Box,
// //   Button,
// //   Drawer,
// //   IconButton,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Toolbar,
// //   Typography,
// // } from '@mui/material';
// // import React from 'react';
// // import MenuTree from './MenuTree';
// // import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// // import { useNavigate } from 'react-router-dom';
// // import { logout } from '../ReduxWork/UserSlice';
// // import { logout as employeeLogout } from '../ReduxWork/EmployeeSlice';
// // import { useDispatch, useSelector } from 'react-redux';
// // const SideBar = () => {
// //   const { companyData, isLogin } = useSelector((state) => state.company);
// //   const drawerWidth = 260;
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //   localStorage.removeItem("userType"); // remove role info
// //     localStorage.removeItem("token"); 
// //     dispatch(logout());
// //     dispatch(employeeLogout());
// //     navigate('/login', { replace: true });
// //   };

// //   const handleLogin = () => {
// //     navigate('/login');
// //   };

// //   return (
// //     <>
// //       <Drawer
// //         sx={{
// //           width: drawerWidth,
// //           flexShrink: 0,
// //           '& .MuiDrawer-paper': {
// //             width: drawerWidth,
// //             boxSizing: 'border-box',
// //             backgroundColor: '#2c3e50',
// //             color: '#ecf0f1',
// //           },
// //         }}
// //         variant='permanent'
// //         anchor='left'
// //       >
// //         <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
// //           <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#ecf0f1' }}>
// //             PayRoll
// //           </Typography>
// //         </Box>

// //         <List>
// //           <ListItem>
// //             <ListItemText>
// //               <AdminPanelSettingsIcon sx={{ color: '#ecf0f1', mr: 1 }} />
// //               Admin Panel
// //             </ListItemText>
// //           </ListItem>
// //           <MenuTree />
// //         </List>
// //       </Drawer>

// //       <Box component='main' sx={{ flexGrow: 1 }}>
// //         <AppBar
// //           position='fixed'
// //           sx={{
// //             width: '84.5%',
// //             px: 2,
// //             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
// //             backgroundColor: '#2c3e50',
// //           }}
// //         >
// //           <Toolbar>
// //             <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} />
// //             <Typography variant='h6' sx={{ flexGrow: 1 }}>
// //               Admin Portal
// //             </Typography>

// //             <List>
// //               <ListItem>
// //                 {isLogin ? (
// //                          <Avatar onClick={handleLogout} sx={{ backgroundColor: 'rgba(16, 7, 250, 0.1)', cursor: 'pointer',  }}>
// //                                         {companyData?.CompanyName?.[0]?.toUpperCase() || "P"}
// //                                     </Avatar>
// //                 ) : (
// //                   <Button
// //                     variant='contained'
// //                     onClick={handleLogin}
// //                     sx={{
// //                       backgroundColor: '#3498db',
// //                       color: '#fff',
// //                       textTransform: 'none',
// //                       fontWeight: 'bold',
// //                       '&:hover': {
// //                         backgroundColor: '#2980b9',
// //                       },
// //                     }}
// //                   >
// //                     LogIn
// //                   </Button>
// //                 )}
// //               </ListItem>
// //             </List>
// //           </Toolbar>
// //         </AppBar>
// //       </Box>
// //     </>
// //   );
// // };

// // export default SideBar;

// import {
//   AppBar,
//   Avatar,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Toolbar,
//   Typography,
// } from '@mui/material';
// import React from 'react';
// import MenuTree from './MenuTree';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../ReduxWork/UserSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { deepOrange } from '@mui/material/colors';
// const SideBar = () => {
//   const { companyData, isLogin } = useSelector((state) => state.company);
//   const drawerWidth = 260;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login'); // optional, redirect after logout
//   };

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             backgroundColor: '#2c3e50',
//             color: '#ecf0f1',
//           },
//         }}
//         variant='permanent'
//         anchor='left'
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
//           <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#ecf0f1' }}>
//             PayRoll
//           </Typography>
//         </Box>

//         <List>
//           <ListItem>
//             <ListItemText>
//               <AdminPanelSettingsIcon sx={{ color: '#ecf0f1', mr: 1 }} />
//               Admin Panel
//             </ListItemText>
//           </ListItem>
//           <MenuTree />
//         </List>
//       </Drawer>

//       <Box component='main' sx={{ flexGrow: 1 }}>
//         <AppBar
//           position='fixed'
//           sx={{
//             width: '84.5%',
//             px: 2,
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//             backgroundColor: '#2c3e50',
//           }}
//         >
//           <Toolbar>
//             <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} />
//             <Typography variant='h6' sx={{ flexGrow: 1 }}>
//               Admin Portal
//             </Typography>

//             <List>
//               <ListItem>
//                 {isLogin ? (
//                          <Avatar onClick={handleLogout} sx={{ backgroundColor: 'rgba(16, 7, 250, 0.1)', cursor: 'pointer',  }}>
//                                         {companyData?.CompanyName.charAt(0).toUpperCase()}
//                                     </Avatar>
//                 ) : (
//                   <Button
//                     variant='contained'
//                     onClick={handleLogin}
//                     sx={{
//                       backgroundColor: '#3498db',
//                       color: '#fff',
//                       textTransform: 'none',
//                       fontWeight: 'bold',
//                       '&:hover': {
//                         backgroundColor: '#2980b9',
//                       },
//                     }}
//                   >
//                     LogIn
//                   </Button>
//                 )}
//               </ListItem>
//             </List>
//           </Toolbar>
//         </AppBar>
//       </Box>
//     </>
//   );
// };

// export default SideBar;
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuTree from './MenuTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import { logout } from '../ReduxWork/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const SideBar = () => {
  const { companyData, isLogin } = useSelector((state) => state.company);
  const drawerWidth = 260;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2c3e50',
            color: '#ecf0f1',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#ecf0f1' }}>
            PayRoll
          </Typography>
        </Box>

        <List>
          <ListItem>
            <ListItemText>
              <AdminPanelSettingsIcon sx={{ color: '#ecf0f1', mr: 1 }} />
              Admin Panel
            </ListItemText>
          </ListItem>
          <MenuTree />
        </List>
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1 }}>
        <AppBar
          position='fixed'
          sx={{
            width: '84.5%',
            px: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#2c3e50',
          }}
        >
          <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} />
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              Admin Portal
            </Typography>

            <List>
              <ListItem>
                {isLogin ? (
                  <Avatar 
                    onClick={handleLogout} 
                    sx={{ 
                      backgroundColor: '#3498db', 
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#2980b9',
                      }
                    }}
                  >
                    {companyData?.CompanyName?.charAt(0)?.toUpperCase() || 'C'}
                  </Avatar>
                ) : (
                  <Button
                    variant='contained'
                    onClick={handleLogin}
                    sx={{
                      backgroundColor: '#3498db',
                      color: '#fff',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#2980b9',
                      },
                    }}
                  >
                    LogIn
                  </Button>
                )}
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default SideBar;
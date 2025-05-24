import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const DrawerEmployee = () => {
    const[isDrawerOpen, setisDrawerOpen] = useState(false)
    let handleDrawerOpen = ()=>
    {
        setisDrawerOpen(true)
    }
   let handleDrawerClose = ()=>
   {
    setisDrawerOpen(false)
   }
   let navigate = useNavigate();
        
        

  return (
  <>
  <Box sx={{width:'100%', backgroundColor:'GrayText', display:'flex', alignItems:'center'}}>

   <IconButton size="large" edge="start" color="inherit" aria-label="menu"  onClick={()=>{handleDrawerOpen()}}>
   
<ListIcon/>



</IconButton>
Employee panel
</Box>
<Drawer open={isDrawerOpen} onClose={handleDrawerClose} sx={{cursor:'pointer'}}>
    <List>
<ListItem onClick={()=> {navigate('/')
    handleDrawerClose()
}}>

   <ListItemIcon>
   <DashboardIcon/>
   </ListItemIcon>
    <ListItemText>
Login
    </ListItemText>


</ListItem>
<ListItem onClick={()=> {navigate('/attendances')
    handleDrawerClose()
}}>

   <ListItemIcon>
<AddIcon/>
   </ListItemIcon>
    <ListItemText>
        Attendances
    </ListItemText>


</ListItem>
<ListItem onClick={()=> {navigate('/leaves')
    handleDrawerClose()
}}>

   <ListItemIcon>
<ShoppingCartIcon/>
   </ListItemIcon>
    <ListItemText>
        Leaves
    </ListItemText>


</ListItem>

    </List>

</Drawer>
</>

  )
}

export default DrawerEmployee


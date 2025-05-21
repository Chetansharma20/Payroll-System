import { Box } from '@mui/material'
import React from 'react'
import SideBar from './SideBar'
import MainContent from './MainContent'

const AdminLayout = () => {
  return (
    <Box sx={{display:'flex'}}>

<SideBar/>
<MainContent/>
    </Box>
  )
}

export default AdminLayout
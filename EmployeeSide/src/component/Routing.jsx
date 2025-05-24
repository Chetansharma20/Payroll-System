import React from 'react'
import DrawerEmployee from './DrawerEmployee'
import Login from './Login'
import Leaves from './Leaves'
import Attendances from './Attendances'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './DashBoard'

const Routing = () => {
  return (
 <>
 <DrawerEmployee/>
    <Routes>
       <Route path='/' element={<Login/>}/> 
       <Route path='/leaves' element={<Leaves/>}/>
       <Route path='/attendances' element={<Attendances/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
    </Routes>

 
 
 
 
 
 </>
  )
}

export default Routing
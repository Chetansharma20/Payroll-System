import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OverView = () => {
  const { companyData } = useSelector((state) => state.user);
  const [counts, setCounts] = useState({ Employee: 0 });

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const EmployeeCount = await axios.post("http://localhost:5000/api/getdashboardcounts",{ CompanyId:companyData._id});
        const LeaveCount = await axios.post("http://localhost:5000/api/getleavecounts",{ CompanyId:companyData._id});
          const AttendanceCount = await axios.post("http://localhost:5000/api/getattendancecount",{ CompanyId:companyData._id});
        const { Employee } = EmployeeCount.data.data || {};
        const {Leave } = LeaveCount.data.data || {}
        const{Attendance} = AttendanceCount.data.data || {}
        setCounts({
          Employee: Employee || 0,
           Leave : Leave || 0,
           Attendance : Attendance || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardCounts();
  }, []);

  const formatNumber = (num) => (typeof num === "number" ? num.toLocaleString() : "0");

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, marginTop: '10px' }}>
           <Box sx={{ width: '79vw' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Welcome, {companyData?.CompanyName || "Admin"}
      </Typography>
             <Box
               sx={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 mb: 3,
                 width: '97%',
                 marginTop:10
               }}
             >
  <Card sx={{ width: "220px", height:'200px', border: '1px solid #222', backgroundColor: 'black', margin:3 }}>
          <CardContent sx={{ height:'100%', display:'flex', flexDirection:'column', gap:3}}>
            <Typography variant='h5' sx={{ color: 'white' }}>Total Employees</Typography>
            <Typography variant='h5' sx={{ color: 'whitesmoke' }}>{formatNumber(counts.Employee)}</Typography>
            {/* <Typography variant='body2' sx={{ color: 'green', display: 'flex' }}>
              <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} /> 15.4% increase this month
            </Typography> */}
          </CardContent>

        </Card>
         <Card sx={{ width: "220px", height:'200px', border: '1px solid #222', backgroundColor: 'black', margin:3 }}>
          <CardContent sx={{ height:'100%', display:'flex', flexDirection:'column', gap:3}}>
            <Typography variant='h5' sx={{ color: 'white' }}>Total Leaves</Typography>
            <Typography variant='h5' sx={{ color: 'whitesmoke' }}>{formatNumber(counts.Leave)}</Typography>
            {/* <Typography variant='body2' sx={{ color: 'green', display: 'flex' }}>
              <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} /> 15.4% increase this month
            </Typography> */}
          </CardContent>
          
        </Card>
         <Card sx={{ width: "220px", height:'200px', border: '1px solid #222', backgroundColor: 'black', margin:3 }}>
          <CardContent sx={{ height:'100%', display:'flex', flexDirection:'column', gap:3}}>
            <Typography variant='h5' sx={{ color: 'white' }}>Total Attendance</Typography>
            <Typography variant='h5' sx={{ color: 'whitesmoke' }}>{formatNumber(counts.Attendance)}</Typography>
            {/* <Typography variant='body2' sx={{ color: 'green', display: 'flex' }}>
              <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} /> 15.4% increase this month
            </Typography> */}
          </CardContent>
          
        </Card>




            
             
             
             
             </Box>
      
        {/* Add more cards as needed */}
      </Box>
    </Box>
  );
};

export default OverView;

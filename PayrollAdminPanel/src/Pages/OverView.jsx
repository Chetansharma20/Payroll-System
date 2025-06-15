import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OverView = () => {
  const { companyData } = useSelector((state) => state.user);
  const [counts, setCounts] = useState({ Employee: 0 });

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const EmployeeCount = await axios.post("http://localhost:5000/api/getdashboardcounts", { CompanyId: companyData._id });
        const LeaveCount = await axios.post("http://localhost:5000/api/getleavecounts", { CompanyId: companyData._id });
        const AttendanceCount = await axios.post("http://localhost:5000/api/getattendancecount", { CompanyId: companyData._id });

        const { Employee } = EmployeeCount.data.data || {};
        const { Leave } = LeaveCount.data.data || {};
        const { Attendance } = AttendanceCount.data.data || {};

        setCounts({
          Employee: Employee || 0,
          Leave: Leave || 0,
          Attendance: Attendance || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardCounts();
  }, []);

  const formatNumber = (num) => (typeof num === "number" ? num.toLocaleString() : "0");

  const cardData = [
    {
      title: "Total Employees",
      count: counts.Employee,
      icon: <GroupsIcon fontSize="large" color="primary" />,
      bg: 'linear-gradient(to right, #2193b0, #6dd5ed)',
    },
    {
      title: "Total Leaves",
      count: counts.Leave,
      icon: <CalendarMonthIcon fontSize="large" color="secondary" />,
      bg: 'linear-gradient(to right, #cc2b5e, #753a88)',
    },
    {
      title: "Total Attendance",
      count: counts.Attendance,
      icon: <CheckCircleIcon fontSize="large" sx={{ color: '#00e676' }} />,
      bg: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
        Welcome, {companyData?.CompanyName || "Admin"}
      </Typography>

      <Grid container spacing={5}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                background: card.bg,
                color: '#fff',
                boxShadow: 5,
                borderRadius: 3,
                minHeight: 180,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {card.icon}
                  <Typography variant="h6" fontWeight="bold">
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="medium" sx={{ ml: 6 }}>
                  {formatNumber(card.count)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OverView;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import API_ENDPOINTS from '../config';

const DashBoard = () => {
  const { EmployeeData } = useSelector((state) => state.employee);
  const [counts, setCounts] = useState({
    Leave: 0,
    Attendance: 0,
  });

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const [leaveRes, attendRes] = await Promise.all([
          axios.post(API_ENDPOINTS.DASHBOARD.LEAVE_COUNT_BY_EMPLOYEE, {
            EmployeeID: EmployeeData?._id,
          }),
          axios.post(API_ENDPOINTS.DASHBOARD.ATTENDANCE_COUNT_BY_EMPLOYEE, {
            EmployeeID: EmployeeData?._id,
          }),
        ]);

        setCounts({
          Leave: leaveRes.data.data?.Leave || 0,
          Attendance: attendRes.data.data?.Attendance || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (EmployeeData?._id) fetchDashboardCounts();
  }, [EmployeeData]);

  const formatNumber = (num) =>
    typeof num === 'number' ? num.toLocaleString() : '0';

  const cardData = [
    {
      title: 'Total Leaves',
      value: counts.Leave,
      icon: <CalendarTodayIcon fontSize="large" />,
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Total Attendance',
      value: counts.Attendance,
      icon: <CheckCircleIcon fontSize="large" />,
      bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mt: 5, px: isSmallScreen ? 2 : 4 }}>
      <Typography
        variant={isSmallScreen ? 'h5' : 'h4'}
        fontWeight="bold"
        gutterBottom
        color="primary"
        align="center"
      >
        Welcome, {EmployeeData?.EmployeeName || 'Employee'}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: 200,
                background: card.bg,
                color: 'white',
                borderRadius: 3,
                boxShadow: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                },
              }}
            >
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                {card.icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  {formatNumber(card.value)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashBoard;

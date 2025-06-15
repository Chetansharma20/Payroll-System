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

const OverView = () => {
  const { EmployeeData } = useSelector((state) => state.user);
  const [counts, setCounts] = useState({ Leave: 0, Attendance: 0 });

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const leaveRes = await axios.post("http://localhost:5000/api/getleavescountbyemployee", {
          EmployeeID: EmployeeData._id
        });
        const attendRes = await axios.post("http://localhost:5000/api/getattendancecountbyemployee", {
          EmployeeID: EmployeeData._id
        });

        setCounts({
          Leave: leaveRes.data.data?.Leave || 0,
          Attendance: attendRes.data.data?.Attendance || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardCounts();
  }, []);

  const formatNumber = (num) =>
    typeof num === 'number' ? num.toLocaleString() : '0';

  const cardData = [
    { title: 'Total Leaves', value: counts.Leave, bgColor: '#2E3B55' },
    { title: 'Total Attendance', value: counts.Attendance, bgColor: '#2E7D32' },
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color="primary"
        align="center"
      >
        Welcome, {EmployeeData.EmployeeName || "Employee"}
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: 180,
                backgroundColor: card.bgColor,
                color: 'white',
                borderRadius: 3,
                boxShadow: 4,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="h4">{formatNumber(card.value)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OverView;

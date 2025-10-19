import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, CircularProgress, Chip } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useSelector } from 'react-redux';
import axios from 'axios';
import API_ENDPOINTS from '../config';

const OverView = () => {
  const { companyData } = useSelector((state) => state.company);
  const [counts, setCounts] = useState({
    Employee: 0,
    Leave: 0,
    Attendance: 0,
    TodayLeave: 0,
    TodayAttendance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCounts = async () => {
    if (!companyData?._id) return;

    try {
      setLoading(true);
      setError(null);

      // All-time counts
      const [EmployeeCount, LeaveCount, AttendanceCount] = await Promise.all([
        axios.post(API_ENDPOINTS.DASHBOARD.EMPLOYEE_COUNT, { CompanyId: companyData._id }),
axios.post(API_ENDPOINTS.DASHBOARD.LEAVE_COUNT, { CompanyId: companyData._id }),
axios.post(API_ENDPOINTS.DASHBOARD.ATTENDANCE_COUNT, { CompanyId: companyData._id })

      ]);

      // Today counts
      const [TodayLeaveCount, TodayAttendanceCount] = await Promise.all([
axios.post(API_ENDPOINTS.DASHBOARD.LEAVE_COUNT, { CompanyId: companyData._id, today: true }),
axios.post(API_ENDPOINTS.DASHBOARD.ATTENDANCE_COUNT, { CompanyId: companyData._id, today: true })

      ]);

      setCounts({
        Employee: EmployeeCount.data.data.Employee || 0,
        Leave: LeaveCount.data.data.Leave || 0,
        Attendance: AttendanceCount.data.data.Attendance || 0,
        TodayLeave: TodayLeaveCount.data.data.Leave || 0,
        TodayAttendance: TodayAttendanceCount.data.data.Attendance || 0
      });
    } catch (err) {
      console.error("Error fetching dashboard counts:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [companyData?._id]);

  const formatNumber = (num) => (typeof num === "number" ? num.toLocaleString() : 0);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        gap: 2
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="body1" color="text.secondary">Loading dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        mt: 4,
        p: 4,
        borderRadius: 2,
        bgcolor: '#ffebee'
      }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  const cardData = [
    {
      title: "Total Employees",
      count: counts.Employee,
      icon: <GroupsIcon sx={{ fontSize: 48 }} />,
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      label: 'All Time'
    },
    {
      title: "Total Leaves",
      count: counts.Leave,
      icon: <CalendarMonthIcon sx={{ fontSize: 48 }} />,
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      label: 'All Time'
    },
    {
      title: "Total Attendance",
      count: counts.Attendance,
      icon: <CheckCircleIcon sx={{ fontSize: 48 }} />,
      bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      label: 'All Time'
    },
    {
      title: "Today's Leaves",
      count: counts.TodayLeave,
      icon: <CalendarMonthIcon sx={{ fontSize: 48 }} />,
      bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      label: 'Today',
      highlight: true
    },
    {
      title: "Today's Attendance",
      count: counts.TodayAttendance,
      icon: <CheckCircleIcon sx={{ fontSize: 48 }} />,
      bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      label: 'Today',
      highlight: true
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Enhanced Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          fontWeight="700" 
          mb={1}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Welcome back, {companyData?.CompanyName || "Admin"}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUpIcon fontSize="small" />
          Here's what's happening with your company today
        </Typography>
      </Box>

      {/* Enhanced Cards Grid */}
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{
                background: card.bg,
                color: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                borderRadius: 4,
                minHeight: 200,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': { 
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                {/* Label and Icon Row */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Chip 
                    label={card.label} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.25)',
                      color: '#fff',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }} 
                  />
                  <Box 
                    sx={{ 
                      bgcolor: card.iconBg,
                      borderRadius: 3,
                      p: 1.5,
                      display: 'flex',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
                
                {/* Count */}
                <Typography 
                  variant="h3" 
                  fontWeight="700" 
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '2.5rem', sm: '3rem' },
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  {formatNumber(card.count)}
                </Typography>
                
                {/* Title */}
                <Typography 
                  variant="body1" 
                  fontWeight="500"
                  sx={{ 
                    opacity: 0.95,
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px'
                  }}
                >
                  {card.title}
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
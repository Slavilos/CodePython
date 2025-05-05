import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const [userResponse, progressResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/results/user-progress', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUser(userResponse.data);
        setProgress(progressResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Ошибка при загрузке данных');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Профиль пользователя */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 20px',
                bgcolor: 'primary.main',
                fontSize: '3rem'
              }}
            >
              {user?.fullName?.charAt(0) || 'U'}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.fullName}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              @{user?.username}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user?.email}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate('/courses')}
            >
              Мои курсы
            </Button>
          </Paper>
        </Grid>

        {/* Статистика и прогресс */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Общая статистика */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Общая статистика
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Card>
                      <CardContent>
                        <Box display="flex" alignItems="center">
                          <SchoolIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            {progress.length}
                          </Typography>
                        </Box>
                        <Typography color="textSecondary">
                          Курсов
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Card>
                      <CardContent>
                        <Box display="flex" alignItems="center">
                          <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            {progress.reduce((acc, curr) => acc + (curr.progress || 0), 0) / progress.length || 0}%
                          </Typography>
                        </Box>
                        <Typography color="textSecondary">
                          Средний прогресс
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Прогресс по курсам */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Прогресс по курсам
                </Typography>
                <List>
                  {progress.map((course) => (
                    <React.Fragment key={course.courseId}>
                      <ListItem>
                        <ListItemIcon>
                          <TimelineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={course.courseTitle}
                          secondary={`Прогресс: ${course.progress}%`}
                        />
                        <Box sx={{ width: '100px', ml: 2 }}>
                          <CircularProgress
                            variant="determinate"
                            value={course.progress}
                            size={40}
                          />
                        </Box>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 
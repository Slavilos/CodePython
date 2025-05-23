import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  Button,
  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person as PersonIcon } from '@mui/icons-material';

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  margin: '0 auto',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
  },
}));

const Profile = () => {
  const [user, setUser] = useState(null);
  const [courseProgress, setCourseProgress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);

        // Получаем прогресс по курсам
        const progressResponse = await axios.get('/api/courses/progress', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourseProgress(progressResponse.data);
      } catch (error) {
        console.error('Ошибка при получении данных профиля:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  if (!user) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography>Загрузка...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Профиль пользователя */}
          <Grid item xs={12} md={4}>
            <ProfileCard elevation={0}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <StyledAvatar>
                  <PersonIcon sx={{ fontSize: 60 }} />
                </StyledAvatar>
              </Box>
              <Typography variant="h5" align="center" gutterBottom>
                {user.fullName}
              </Typography>
              <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
                {user.email}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewCourses}
                  fullWidth
                >
                  Мои курсы
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                  fullWidth
                >
                  Выйти
                </Button>
              </Box>
            </ProfileCard>
          </Grid>

          {/* Прогресс по курсам */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Прогресс обучения
            </Typography>
            <Grid container spacing={3}>
              {courseProgress.map((progress) => (
                <Grid item xs={12} key={progress.courseId}>
                  <ProgressCard>
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {progress.course.title}
                        </Typography>
                        <CustomLinearProgress
                          variant="determinate"
                          value={progress.progress}
                          color={progress.progress === 100 ? "success" : "primary"}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                          Прогресс: {progress.progress}%
                        </Typography>
                        <Typography
                          variant="body2"
                          color={progress.progress === 100 ? "success.main" : "primary.main"}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {progress.progress === 100 ? "Завершен" : "В процессе"}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
                        Последнее обновление: {new Date(progress.updatedAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </ProgressCard>
                </Grid>
              ))}
              {courseProgress.length === 0 && (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      У вас пока нет начатых курсов
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleViewCourses}
                      sx={{ mt: 2 }}
                    >
                      Начать обучение
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Chip,
  styled
} from '@mui/material';

const ProgressCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
  },
}));

const CourseProgress = () => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/api/courses/progress/user');
        setProgress(response.data);
      } catch (error) {
        console.error('Ошибка при получении прогресса:', error);
      }
    };

    fetchProgress();
  }, []);

  const renderCourseCard = (course) => {
    const progressValue = course.progress || 0;

    return (
      <Grid item xs={12} sm={6} md={4} key={course.id}>
        <ProgressCard>
          <CardContent>
            <Typography variant="h6" gutterBottom noWrap>
              {course.Course.title}
            </Typography>
            
            <Box sx={{ mt: 2, mb: 1 }}>
              <ProgressBar 
                variant="determinate" 
                value={progressValue} 
                color={progressValue === 100 ? "success" : "primary"}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Прогресс: {progressValue}%
              </Typography>
              <Chip 
                label={course.completed ? "Завершен" : "В процессе"} 
                color={course.completed ? "success" : "primary"} 
                size="small"
              />
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Последний доступ: {new Date(course.lastAccessedAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </ProgressCard>
      </Grid>
    );
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Прогресс по курсам
      </Typography>

      {progress.length > 0 ? (
        <Grid container spacing={3}>
          {progress.map(course => renderCourseCard(course))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          У вас пока нет прогресса по курсам
        </Typography>
      )}
    </Box>
  );
};

export default CourseProgress; 
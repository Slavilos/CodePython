import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import QuestionManager from './admin/QuestionManager';
import PracticalAssignmentManager from './admin/PracticalAssignmentManager';
import CourseCreator from './admin/CourseCreator';

const getAuthHeaders = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
  });
  const [newBlock, setNewBlock] = useState({
    title: '',
    order: 0
  });
  const [newLesson, setNewLesson] = useState({
    title: '',
    content: '',
    order: 0
  });
  const [showBlockForm, setShowBlockForm] = useState(false);
  const [showCourseCreator, setShowCourseCreator] = useState(false);

  const fetchData = async () => {
    try {
      const headers = getAuthHeaders();
      const [usersRes, coursesRes, statsRes] = await Promise.all([
        axios.get('/api/admin/users', { headers }),
        axios.get('/api/admin/courses', { headers }),
        axios.get('/api/admin/stats', { headers }),
      ]);
      setUsers(usersRes.data);
      setCourses(coursesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!showCourseCreator) {
      fetchData(); // Обновляем данные при закрытии окна создания курса
    }
  }, [showCourseCreator]);

  const handleDeleteUser = async (userId) => {
    try {
      const headers = getAuthHeaders();
      await axios.delete(`/api/admin/users/${userId}`, { headers });
      fetchData();
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const headers = getAuthHeaders();
      await axios.delete(`/api/admin/courses/${courseId}`, { headers });
      fetchData();
    } catch (error) {
      console.error('Ошибка при удалении курса:', error);
    }
  };

  const handleCreateCourseFull = async (courseData) => {
  try {
    const headers = getAuthHeaders();

    const content = {
      sections: courseData.blocks.map(block => ({
        title: block.title,
        lessons: block.lessons.map(lesson => ({
          title: lesson.title,
          content: lesson.content
        }))
      }))
    };

    const coursePayload = {
      title: courseData.title,
      description: courseData.description,
      level: courseData.level,
      duration: courseData.duration,
      content, // добавляем обязательное поле content
      blocks: courseData.blocks.map(block => ({
        title: block.title,
        order: block.order,
        lessons: block.lessons.map(lesson => ({
          title: lesson.title,
          content: lesson.content,
          order: lesson.order,
          questions: lesson.questions,
          assignments: lesson.assignments
        }))
      }))
    };

    await axios.post('/api/admin/courses', coursePayload, { headers, withCredentials: true });
    setShowCourseCreator(false);
    fetchData();
  } catch (error) {
    console.error('Ошибка при создании курса:', error.response?.data || error.message);
  }
};

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Панель администратора
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Всего пользователей</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Всего курсов</Typography>
              <Typography variant="h4">{stats.totalCourses}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Пользователи
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">Курсы</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowCourseCreator(true)}
            startIcon={<AddIcon />}
          >
            Добавить курс
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow 
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  sx={{ 
                    cursor: 'pointer',
                    backgroundColor: selectedCourse?.id === course.id ? 'action.selected' : 'inherit'
                  }}
                >
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>
                      <Tooltip title="Удалить курс">
                        <IconButton 
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCourse(course.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {selectedCourse && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {selectedCourse.title}
          </Typography>
          
            <Box sx={{ mb: 2 }}>
              {showBlockForm ? (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    label="Название блока"
                    value={newBlock.title}
                    onChange={e => setNewBlock({ ...newBlock, title: e.target.value })}
                    size="small"
                  />
                  <TextField
                    label="Порядок"
                    type="number"
                    value={newBlock.order}
                    onChange={e => setNewBlock({ ...newBlock, order: Number(e.target.value) })}
                    size="small"
                    sx={{ width: 120 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCreateBlock(selectedCourse.id)}
                  >
                    Сохранить
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => { setShowBlockForm(false); setNewBlock({ title: '', order: 0 }); }}
                  >
                    Отмена
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowBlockForm(true)}
                  startIcon={<AddIcon />}
                >
                  Добавить блок
                </Button>
              )}
            </Box>

          {selectedCourse.blocks?.map((block) => (
            <Accordion key={block.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{block.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCreateLesson(block.id)}
                      startIcon={<AddIcon />}
                    >
                      Добавить урок
                    </Button>
                  </Box>

                {block.lessons?.map((lesson) => (
                  <Card key={lesson.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{lesson.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lesson.content}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Tooltip title="Управление вопросами">
                          <IconButton 
                            onClick={() => {
                              handleLessonSelect(lesson);
                              setSelectedTab(1);
                            }}
                          >
                            <QuizIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Управление заданиями">
                          <IconButton 
                            onClick={() => {
                              handleLessonSelect(lesson);
                              setSelectedTab(2);
                            }}
                          >
                            <AssignmentIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}

          {selectedLesson && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                {selectedLesson.title}
              </Typography>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Информация" />
                <Tab label="Вопросы" />
                <Tab label="Практические задания" />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {selectedTab === 0 && (
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Описание урока</Typography>
                      <Typography>{selectedLesson.content}</Typography>
                    </CardContent>
                  </Card>
                )}
                {selectedTab === 1 && (
                  <QuestionManager lessonId={selectedLesson.id} />
                )}
                {selectedTab === 2 && (
                  <PracticalAssignmentManager lessonId={selectedLesson.id} />
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}

      <CourseCreator
        open={showCourseCreator}
        onClose={() => setShowCourseCreator(false)}
        onCreate={handleCreateCourseFull}
      />
    </Container>
  );
};

export default AdminDashboard;

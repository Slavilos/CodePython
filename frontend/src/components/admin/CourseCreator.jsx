import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, Card, CardContent, IconButton, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const emptyQuestion = () => ({
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  type: 'choice',
});
const emptyAssignment = () => ({
  title: '',
  description: '',
  initialCode: '',
  testCases: [{ input: '', expectedOutput: '' }],
});
const emptyLesson = () => ({
  title: '',
  content: '',
  questions: [emptyQuestion()],
  assignments: [emptyAssignment()],
});
const emptyBlock = () => ({
  title: '',
  lessons: [emptyLesson()],
});

const CourseCreator = ({ open, onClose, onCreate }) => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    blocks: [emptyBlock()],
  });

  // --- Handlers for dynamic fields ---
  const handleCourseChange = (field, value) => setCourse({ ...course, [field]: value });
  const handleBlockChange = (blockIdx, field, value) => {
    const blocks = [...course.blocks];
    blocks[blockIdx][field] = value;
    setCourse({ ...course, blocks });
  };
  const handleLessonChange = (blockIdx, lessonIdx, field, value) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx][field] = value;
    setCourse({ ...course, blocks });
  };
  const handleQuestionChange = (blockIdx, lessonIdx, qIdx, field, value) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].questions[qIdx][field] = value;
    setCourse({ ...course, blocks });
  };
  const handleOptionChange = (blockIdx, lessonIdx, qIdx, optIdx, value) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].questions[qIdx].options[optIdx] = value;
    setCourse({ ...course, blocks });
  };
  const handleAssignmentChange = (blockIdx, lessonIdx, aIdx, field, value) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].assignments[aIdx][field] = value;
    setCourse({ ...course, blocks });
  };
  const handleTestCaseChange = (blockIdx, lessonIdx, aIdx, tIdx, field, value) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].assignments[aIdx].testCases[tIdx][field] = value;
    setCourse({ ...course, blocks });
  };

  // --- Add/Remove functions ---
  const addBlock = () => setCourse({ ...course, blocks: [...course.blocks, emptyBlock()] });
  const removeBlock = (blockIdx) => setCourse({ ...course, blocks: course.blocks.filter((_, i) => i !== blockIdx) });
  const addLesson = (blockIdx) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons.push(emptyLesson());
    setCourse({ ...course, blocks });
  };
  const removeLesson = (blockIdx, lessonIdx) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons = blocks[blockIdx].lessons.filter((_, i) => i !== lessonIdx);
    setCourse({ ...course, blocks });
  };
  const addQuestion = (blockIdx, lessonIdx) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].questions.push(emptyQuestion());
    setCourse({ ...course, blocks });
  };
  const removeQuestion = (blockIdx, lessonIdx, qIdx) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].questions = blocks[blockIdx].lessons[lessonIdx].questions.filter((_, i) => i !== qIdx);
    setCourse({ ...course, blocks });
  };
  const addAssignment = (blockIdx, lessonIdx) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].assignments.push(emptyAssignment());
    setCourse({ ...course, blocks });
  };
  const removeAssignment = (blockIdx, lessonIdx, aIdx) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].assignments = blocks[blockIdx].lessons[lessonIdx].assignments.filter((_, i) => i !== aIdx);
    setCourse({ ...course, blocks });
  };
  const addTestCase = (blockIdx, lessonIdx, aIdx) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].assignments[aIdx].testCases.push({ input: '', expectedOutput: '' });
    setCourse({ ...course, blocks });
  };
  const removeTestCase = (blockIdx, lessonIdx, aIdx, tIdx) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].assignments[aIdx].testCases = blocks[blockIdx].lessons[lessonIdx].assignments[aIdx].testCases.filter((_, i) => i !== tIdx);
    setCourse({ ...course, blocks });
  };

  // --- Submit ---
  const handleSubmit = () => {
    onCreate(course);
    setCourse({ title: '', description: '', blocks: [emptyBlock()] });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Создать новый курс</DialogTitle>
      <DialogContent>
        <TextField
          label="Название курса"
          value={course.title}
          onChange={e => handleCourseChange('title', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Описание курса"
          value={course.description}
          onChange={e => handleCourseChange('description', e.target.value)}
          fullWidth
          multiline
          rows={2}
          sx={{ mb: 3 }}
        />
        <Typography variant="h6" sx={{ mb: 1 }}>Блоки</Typography>
        {course.blocks.map((block, blockIdx) => (
          <Box key={blockIdx} sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2, background: '#fafbfc', position: 'relative' }}>
            <Accordion defaultExpanded sx={{ boxShadow: 'none', background: 'transparent' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Блок {blockIdx + 1}: {block.title || 'Без названия'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="Название блока"
                  value={block.title}
                  onChange={e => handleBlockChange(blockIdx, 'title', e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Typography variant="subtitle1">Уроки</Typography>
                {block.lessons.map((lesson, lessonIdx) => (
                  <Card key={lessonIdx} sx={{ mb: 2, background: '#f7f7fa', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2">Урок {lessonIdx + 1}:</Typography>
                        <IconButton size="small" color="error" onClick={() => removeLesson(blockIdx, lessonIdx)} sx={{ width: 28, height: 28, minWidth: 0, minHeight: 0 }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton>
                      </Box>
                      <TextField
                        label="Название урока"
                        value={lesson.title}
                        onChange={e => handleLessonChange(blockIdx, lessonIdx, 'title', e.target.value)}
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Описание/контент урока"
                        value={lesson.content}
                        onChange={e => handleLessonChange(blockIdx, lessonIdx, 'content', e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Вопросы</Typography>
                      {lesson.questions.map((q, qIdx) => (
                        <Box key={qIdx} sx={{ mb: 2, p: 2.5, background: '#fff', borderRadius: 3, boxShadow: '0 2px 8px 0 #0001', border: '1px solid #e0e0e0', position: 'relative', minHeight: 120 }}>
                          <IconButton size="small" color="error" onClick={() => removeQuestion(blockIdx, lessonIdx, qIdx)} sx={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, minWidth: 0, minHeight: 0, zIndex: 2, p: 0, opacity: 0.7 }}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton>
                          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.2 }}>Вопрос {qIdx + 1}</Typography>
                          <TextField
                            label="Текст вопроса"
                            value={q.question}
                            onChange={e => handleQuestionChange(blockIdx, lessonIdx, qIdx, 'question', e.target.value)}
                            fullWidth
                            sx={{ mb: 2, background: '#fafbfc', borderRadius: 1 }}
                            InputProps={{ style: { fontWeight: 500, color: '#222' } }}
                          />
                          <Typography variant="caption" sx={{ fontWeight: 500, color: '#333', mb: 1, display: 'block' }}>Варианты ответа:</Typography>
                          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                            {q.options.map((opt, optIdx) => (
                              <Box key={optIdx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                <input
                                  type="radio"
                                  checked={q.correctAnswer === optIdx}
                                  onChange={() => handleQuestionChange(blockIdx, lessonIdx, qIdx, 'correctAnswer', optIdx)}
                                  style={{ marginBottom: 4 }}
                                />
                                <TextField
                                  value={opt}
                                  onChange={e => handleOptionChange(blockIdx, lessonIdx, qIdx, optIdx, e.target.value)}
                                  label={`Вариант ${optIdx + 1}`}
                                  size="small"
                                  sx={{ background: '#fafbfc', borderRadius: 1, width: '100%' }}
                                  InputProps={{ style: { color: '#222', fontSize: 14 } }}
                                />
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      ))}
                      <Button variant="outlined" size="small" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => addQuestion(blockIdx, lessonIdx)}>Добавить вопрос</Button>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Практические задания</Typography>
                      {lesson.assignments.map((a, aIdx) => (
                        <Box key={aIdx} sx={{ mb: 2, p: 2, background: '#e3f2fd', borderRadius: 2, border: '1px solid #90caf9' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Задание {aIdx + 1}</Typography>
                            <IconButton size="small" color="error" onClick={() => removeAssignment(blockIdx, lessonIdx, aIdx)} sx={{ width: 28, height: 28, minWidth: 0, minHeight: 0 }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton>
                          </Box>
                          <TextField
                            label="Название задания"
                            value={a.title}
                            onChange={e => handleAssignmentChange(blockIdx, lessonIdx, aIdx, 'title', e.target.value)}
                            fullWidth
                            sx={{ mb: 1, background: '#fff' }}
                          />
                          <TextField
                            label="Описание задания"
                            value={a.description}
                            onChange={e => handleAssignmentChange(blockIdx, lessonIdx, aIdx, 'description', e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                            sx={{ mb: 1, background: '#fff' }}
                          />
                          <TextField
                            label="Начальный код (опционально)"
                            value={a.initialCode}
                            onChange={e => handleAssignmentChange(blockIdx, lessonIdx, aIdx, 'initialCode', e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                            sx={{ mb: 1, background: '#fff' }}
                          />
                          <Typography variant="caption" sx={{ fontWeight: 500, color: '#333' }}>Тестовые случаи:</Typography>
                          {a.testCases.map((tc, tIdx) => (
                            <Box key={tIdx} sx={{ display: 'flex', gap: 1, mb: 0.5, pl: 2 }}>
                              <TextField
                                label="Входные данные"
                                value={tc.input}
                                onChange={e => handleTestCaseChange(blockIdx, lessonIdx, aIdx, tIdx, 'input', e.target.value)}
                                size="small"
                                sx={{ background: '#fff' }}
                              />
                              <TextField
                                label="Ожидаемый результат"
                                value={tc.expectedOutput}
                                onChange={e => handleTestCaseChange(blockIdx, lessonIdx, aIdx, tIdx, 'expectedOutput', e.target.value)}
                                size="small"
                                sx={{ background: '#fff' }}
                              />
                              <IconButton size="small" color="error" onClick={() => removeTestCase(blockIdx, lessonIdx, aIdx, tIdx)} sx={{ width: 28, height: 28, minWidth: 0, minHeight: 0 }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton>
                            </Box>
                          ))}
                          <Button variant="outlined" size="small" startIcon={<AddIcon />} sx={{ mt: 1 }} onClick={() => addTestCase(blockIdx, lessonIdx, aIdx)}>Добавить тест-кейс</Button>
                        </Box>
                      ))}
                      <Button variant="outlined" size="small" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => addAssignment(blockIdx, lessonIdx)}>Добавить задание</Button>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => addLesson(blockIdx)}>Добавить урок</Button>
              </AccordionDetails>
            </Accordion>
            <IconButton size="small" color="error" onClick={() => removeBlock(blockIdx)} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton>
          </Box>
        ))}
        <Button variant="contained" startIcon={<AddIcon />} onClick={addBlock} sx={{ mt: 2 }}>Добавить блок</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Отмена</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Создать курс</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseCreator; 
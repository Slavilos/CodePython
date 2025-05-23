import React, { useState } from 'react';
import {
  Stepper, Step, StepLabel, Button, Typography, Box, TextField, Card, CardContent, IconButton, Divider, Snackbar, Alert
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const steps = ['Информация о курсе', 'Блоки', 'Уроки', 'Вопросы и задания'];

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
  questions: [],
  assignments: [],
});
const emptyBlock = () => ({
  title: '',
  lessons: [],
});

const CourseStepper = ({ open, onClose, onCreate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    blocks: [],
  });
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [questionForm, setQuestionForm] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    type: 'choice',
  });
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    initialCode: '',
    testCases: [{ input: '', expectedOutput: '' }],
  });

  // --- Step 1: Информация о курсе ---
  const handleCourseInfo = (field, value) => setCourse({ ...course, [field]: value });

  // --- Step 2: Блоки ---
  const addBlock = () => setCourse({ ...course, blocks: [...course.blocks, emptyBlock()] });
  const removeBlock = (idx) => setCourse({ ...course, blocks: course.blocks.filter((_, i) => i !== idx) });
  const handleBlockChange = (idx, value) => {
    const blocks = [...course.blocks];
    blocks[idx].title = value;
    setCourse({ ...course, blocks });
  };

  // --- Step 3: Уроки ---
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
  const handleLessonChange = (blockIdx, lessonIdx, value) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].title = value;
    setCourse({ ...course, blocks });
  };
  const handleLessonContentChange = (blockIdx, lessonIdx, value) => {
    const blocks = [...course.blocks];
    blocks[blockIdx].lessons[lessonIdx].content = value;
    setCourse({ ...course, blocks });
  };

  // --- Step 4: Вопросы и задания ---
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

  // --- Stepper navigation ---
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setCourse({ title: '', description: '', blocks: [] });
    setSelectedBlock(0);
    setSelectedLesson(0);
  };

  // --- Submit ---
  const handleSubmit = () => {
    onCreate(course);
    setSnackbar({ open: true, message: 'Курс успешно создан!', severity: 'success' });
    handleReset();
    onClose();
  };

  // --- Step content ---
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Название курса"
              value={course.title}
              onChange={e => handleCourseInfo('title', e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="Например: Python для начинающих"
            />
            <TextField
              label="Описание курса"
              value={course.description}
              onChange={e => handleCourseInfo('description', e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
              placeholder="Кратко опишите, чему научится студент"
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            {course.blocks.map((block, idx) => (
              <Card key={idx} sx={{ mb: 2, p: 2, background: '#f7f7fa' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      label={`Название блока ${idx + 1}`}
                      value={block.title}
                      onChange={e => handleBlockChange(idx, e.target.value)}
                      sx={{ flex: 1, mr: 2 }}
                    />
                    <IconButton color="error" onClick={() => removeBlock(idx)}><DeleteIcon /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button variant="contained" startIcon={<AddIcon />} onClick={addBlock}>Добавить блок</Button>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Выберите блок для добавления уроков:</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {course.blocks.map((block, idx) => (
                <Button
                  key={idx}
                  variant={selectedBlock === idx ? 'contained' : 'outlined'}
                  onClick={() => setSelectedBlock(idx)}
                >
                  {block.title || `Блок ${idx + 1}`}
                </Button>
              ))}
            </Box>
            {course.blocks[selectedBlock] && (
              <Box>
                {course.blocks[selectedBlock].lessons?.map((lesson, lIdx) => (
                  <Card key={lIdx} sx={{ mb: 2, p: 2, background: '#e3f2fd' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TextField
                          label={`Название урока ${lIdx + 1}`}
                          value={lesson.title}
                          onChange={e => handleLessonChange(selectedBlock, lIdx, e.target.value)}
                          sx={{ flex: 1, mr: 2 }}
                        />
                        <IconButton color="error" onClick={() => removeLesson(selectedBlock, lIdx)}><DeleteIcon /></IconButton>
                      </Box>
                      <TextField
                        label="Описание/контент урока"
                        value={lesson.content}
                        onChange={e => handleLessonContentChange(selectedBlock, lIdx, e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        sx={{ mb: 1 }}
                      />
                    </CardContent>
                  </Card>
                ))}
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => addLesson(selectedBlock)}>Добавить урок</Button>
              </Box>
            )}
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Выберите урок для добавления вопросов и заданий:</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {course.blocks[selectedBlock]?.lessons?.map((lesson, idx) => (
                <Button
                  key={idx}
                  variant={selectedLesson === idx ? 'contained' : 'outlined'}
                  onClick={() => setSelectedLesson(idx)}
                >
                  {lesson.title || `Урок ${idx + 1}`}
                </Button>
              ))}
            </Box>
            {course.blocks[selectedBlock]?.lessons?.[selectedLesson] && (
              <Box>
                <Card sx={{ mb: 2, p: 2, background: '#f1f8e9' }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Добавить вопрос</Typography>
                    <TextField
                      label="Текст вопроса"
                      value={questionForm.question}
                      onChange={e => setQuestionForm({ ...questionForm, question: e.target.value })}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="caption">Варианты ответа:</Typography>
                    {questionForm.options.map((opt, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 0.5, pl: 2 }}>
                        <input
                          type="radio"
                          checked={questionForm.correctAnswer === idx}
                          onChange={() => setQuestionForm({ ...questionForm, correctAnswer: idx })}
                          style={{ marginRight: 8 }}
                        />
                        <TextField
                          value={opt}
                          onChange={e => handleQuestionOptionChange(idx, e.target.value)}
                          label={`Вариант ${idx + 1}`}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                      </Box>
                    ))}
                    <Button variant="contained" size="small" sx={{ mt: 2 }} onClick={handleAddQuestion}>Добавить вопрос</Button>
                  </CardContent>
                </Card>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Список вопросов</Typography>
                {course.blocks[selectedBlock].lessons[selectedLesson].questions?.map((q, qIdx) => (
                  <Card key={qIdx} sx={{ mb: 2, p: 2, background: '#e8f5e9' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{ flex: 1 }}>{q.question}</Typography>
                        <IconButton color="error" onClick={() => removeQuestion(selectedBlock, selectedLesson, qIdx)}><DeleteIcon /></IconButton>
                      </Box>
                      <Typography variant="caption">Варианты ответа:</Typography>
                      {q.options.map((opt, optIdx) => (
                        <Typography key={optIdx} sx={{ pl: 2, color: q.correctAnswer === optIdx ? 'green' : 'inherit', fontWeight: q.correctAnswer === optIdx ? 600 : 400 }}>
                          {optIdx + 1}. {opt} {q.correctAnswer === optIdx && '(верный)'}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                ))}
                <Divider sx={{ my: 2 }} />
                <Card sx={{ mb: 2, p: 2, background: '#e3f2fd' }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Добавить практическое задание</Typography>
                    <TextField
                      label="Название задания"
                      value={assignmentForm.title}
                      onChange={e => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Описание задания"
                      value={assignmentForm.description}
                      onChange={e => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                      fullWidth
                      multiline
                      rows={2}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Начальный код (опционально)"
                      value={assignmentForm.initialCode}
                      onChange={e => setAssignmentForm({ ...assignmentForm, initialCode: e.target.value })}
                      fullWidth
                      multiline
                      rows={2}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="caption">Тестовые случаи:</Typography>
                    {assignmentForm.testCases.map((tc, tIdx) => (
                      <Box key={tIdx} sx={{ display: 'flex', gap: 1, mb: 0.5, pl: 2 }}>
                        <TextField
                          label="Входные данные"
                          value={tc.input}
                          onChange={e => handleAssignmentTestCaseChange(tIdx, 'input', e.target.value)}
                          size="small"
                        />
                        <TextField
                          label="Ожидаемый результат"
                          value={tc.expectedOutput}
                          onChange={e => handleAssignmentTestCaseChange(tIdx, 'expectedOutput', e.target.value)}
                          size="small"
                        />
                        <IconButton size="small" color="error" onClick={() => removeAssignmentTestCase(tIdx)}><DeleteIcon /></IconButton>
                      </Box>
                    ))}
                    <Button variant="outlined" size="small" startIcon={<AddIcon />} sx={{ mt: 1 }} onClick={() => addAssignmentTestCase()}>Добавить тест-кейс</Button>
                    <Button variant="contained" size="small" sx={{ mt: 2, ml: 2 }} onClick={() => {
                      if (!assignmentForm.title.trim() || !assignmentForm.description.trim()) return;
                      const blocks = [...course.blocks];
                      blocks[selectedBlock].lessons[selectedLesson].assignments.push({ ...assignmentForm });
                      setCourse({ ...course, blocks });
                      setAssignmentForm({ title: '', description: '', initialCode: '', testCases: [{ input: '', expectedOutput: '' }] });
                    }}>Добавить задание</Button>
                  </CardContent>
                </Card>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Список практических заданий</Typography>
                {course.blocks[selectedBlock].lessons[selectedLesson].assignments?.map((a, aIdx) => (
                  <Card key={aIdx} sx={{ mb: 2, p: 2, background: '#e3f2fd' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{ flex: 1 }}>{a.title}</Typography>
                        <IconButton color="error" onClick={() => removeAssignment(selectedBlock, selectedLesson, aIdx)}><DeleteIcon /></IconButton>
                      </Box>
                      <Typography variant="caption">Описание:</Typography>
                      <Typography sx={{ pl: 2 }}>{a.description}</Typography>
                      {a.initialCode && <><Typography variant="caption">Начальный код:</Typography><Typography sx={{ pl: 2, fontFamily: 'monospace' }}>{a.initialCode}</Typography></>}
                      <Typography variant="caption">Тестовые случаи:</Typography>
                      {a.testCases.map((tc, tIdx) => (
                        <Typography key={tIdx} sx={{ pl: 2 }}>
                          <b>Вход:</b> {tc.input} <b>→</b> <b>Ожидание:</b> {tc.expectedOutput}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        );
      default:
        return null;
    }
  }

  const handleAddQuestion = () => {
    if (!questionForm.question.trim() || questionForm.options.some(opt => !opt.trim())) return;
    const blocks = [...course.blocks];
    blocks[selectedBlock].lessons[selectedLesson].questions.push({ ...questionForm });
    setCourse({ ...course, blocks });
    setQuestionForm({ question: '', options: ['', '', '', ''], correctAnswer: 0, type: 'choice' });
  };
  const handleAddAssignment = () => {
    if (!assignmentForm.title.trim() || !assignmentForm.description.trim()) return;
    const blocks = [...course.blocks];
    blocks[selectedBlock].lessons[selectedLesson].assignments.push({ ...assignmentForm });
    setCourse({ ...course, blocks });
    setAssignmentForm({ title: '', description: '', initialCode: '', testCases: [{ input: '', expectedOutput: '' }] });
  };
  const handleQuestionOptionChange = (idx, value) => {
    const opts = [...questionForm.options];
    opts[idx] = value;
    setQuestionForm({ ...questionForm, options: opts });
  };
  const handleAssignmentTestCaseChange = (idx, field, value) => {
    const tcs = [...assignmentForm.testCases];
    tcs[idx][field] = value;
    setAssignmentForm({ ...assignmentForm, testCases: tcs });
  };
  const addAssignmentTestCase = () => {
    setAssignmentForm({ ...assignmentForm, testCases: [...assignmentForm.testCases, { input: '', expectedOutput: '' }] });
  };
  const removeAssignmentTestCase = (idx) => {
    setAssignmentForm({ ...assignmentForm, testCases: assignmentForm.testCases.filter((_, i) => i !== idx) });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 4, p: 2, background: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Назад
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Создать курс
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Далее
          </Button>
        )}
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseStepper; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuestionManager.css';
import { Card, CardContent, Typography, Button, TextField, Box, IconButton, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

const QuestionManager = ({ lessonId }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    type: 'choice',
    order: 0
  });
  const [editingQuestion, setEditingQuestion] = useState(null);

  // --- Проверка на локальный урок и авторизацию ---
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const headers = user && user.token ? { Authorization: `Bearer ${user.token}` } : null;
  // Локальный урок: id содержит точку или слишком длинный (например, Date.now()+Math.random())
  const isLocalLesson = !lessonId || String(lessonId).includes('.') || String(lessonId).length > 12;

  useEffect(() => {
    fetchQuestions();
  }, [lessonId]);

  const fetchQuestions = async () => {
    if (!headers || isLocalLesson) {
      setQuestions([]); // Для локальных уроков — вопросы только локально
      return;
    }
    try {
      const response = await axios.get(`/api/admin/lessons/${lessonId}/questions`, { headers });
      setQuestions(response.data);
    } catch (error) {
      setQuestions([]); // Не показываем ошибки пользователю, просто пусто
    }
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    if (!headers || isLocalLesson) {
      setQuestions(qs => [...qs, { ...newQuestion, id: Date.now().toString() }]);
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        type: 'choice',
        order: questions.length
      });
      return;
    }
    try {
      await axios.post(`/api/admin/lessons/${lessonId}/questions`, newQuestion, { headers });
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        type: 'choice',
        order: questions.length
      });
      fetchQuestions();
    } catch (error) {
      // Не показываем ошибку
    }
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!headers || isLocalLesson) {
      setQuestions(qs => qs.map(q => q.id === editingQuestion.id ? editingQuestion : q));
      setEditingQuestion(null);
      return;
    }
    try {
      await axios.put(`/api/admin/questions/${editingQuestion.id}`, editingQuestion, { headers });
      setEditingQuestion(null);
      fetchQuestions();
    } catch (error) {
      // Не показываем ошибку
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!headers || isLocalLesson) {
      setQuestions(qs => qs.filter(q => q.id !== questionId));
      return;
    }
    try {
      await axios.delete(`/api/admin/questions/${questionId}`, { headers });
      fetchQuestions();
    } catch (error) {
      // Не показываем ошибку
    }
  };

  const handleOptionChange = (index, value) => {
    if (editingQuestion) {
      const newOptions = [...editingQuestion.options];
      newOptions[index] = value;
      setEditingQuestion({ ...editingQuestion, options: newOptions });
    } else {
      const newOptions = [...newQuestion.options];
      newOptions[index] = value;
      setNewQuestion({ ...newQuestion, options: newOptions });
    }
  };

  return (
    <Box className="question-manager">
      <Typography variant="h5" sx={{ mb: 2 }}>Вопросы к уроку</Typography>
      <Card sx={{ mb: 3, p: 2 }}>
        <form onSubmit={handleCreateQuestion} className="question-form">
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Добавить новый вопрос</Typography>
          <TextField
            label="Вопрос"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>Варианты ответа:</Typography>
          {newQuestion.options.map((option, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Radio
                checked={newQuestion.correctAnswer === index}
                onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                color="primary"
              />
              <TextField
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                label={`Вариант ${index + 1}`}
                required
                sx={{ flex: 1, mr: 1 }}
              />
            </Box>
          ))}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Добавить вопрос</Button>
        </form>
      </Card>
      <Box className="questions-list">
        {questions.map((question) => (
          <Card key={question.id} sx={{ mb: 2, background: '#f9f9f9' }}>
            <CardContent>
              {editingQuestion?.id === question.id ? (
                <form onSubmit={handleUpdateQuestion} className="edit-form">
                  <TextField
                    label="Вопрос"
                    value={editingQuestion.question}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" sx={{ mb: 1 }}>Варианты ответа:</Typography>
                  {editingQuestion.options.map((option, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Radio
                        checked={editingQuestion.correctAnswer === index}
                        onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: index })}
                        color="primary"
                      />
                      <TextField
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        label={`Вариант ${index + 1}`}
                        required
                        sx={{ flex: 1, mr: 1 }}
                      />
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button type="submit" variant="contained" color="success" startIcon={<SaveIcon />}>Сохранить</Button>
                    <Button type="button" variant="outlined" color="secondary" startIcon={<CancelIcon />} onClick={() => setEditingQuestion(null)}>Отмена</Button>
                  </Box>
                </form>
              ) : (
                <>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>{question.question}</Typography>
                  <Box sx={{ ml: 2, mb: 1 }}>
                    {question.options.map((option, idx) => (
                      <Typography key={idx} sx={{ color: idx === question.correctAnswer ? 'green' : 'inherit', fontWeight: idx === question.correctAnswer ? 600 : 400 }}>
                        {idx + 1}. {option}
                        {idx === question.correctAnswer && ' (верный)'}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" onClick={() => setEditingQuestion(question)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteQuestion(question.id)}><DeleteIcon /></IconButton>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default QuestionManager; 
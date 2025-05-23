import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PracticalAssignmentManager.css';

const PracticalAssignmentManager = ({ lessonId }) => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    initialCode: '',
    testCases: [{ input: '', expectedOutput: '' }],
    order: 0
  });
  const [editingAssignment, setEditingAssignment] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, [lessonId]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`/api/admin/lessons/${lessonId}/assignments`);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/admin/lessons/${lessonId}/assignments`, newAssignment);
      setNewAssignment({
        title: '',
        description: '',
        initialCode: '',
        testCases: [{ input: '', expectedOutput: '' }],
        order: assignments.length
      });
      fetchAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const handleUpdateAssignment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/assignments/${editingAssignment.id}`, editingAssignment);
      setEditingAssignment(null);
      fetchAssignments();
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(`/api/admin/assignments/${assignmentId}`);
      fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleTestCaseChange = (index, field, value) => {
    if (editingAssignment) {
      const newTestCases = [...editingAssignment.testCases];
      newTestCases[index] = { ...newTestCases[index], [field]: value };
      setEditingAssignment({ ...editingAssignment, testCases: newTestCases });
    } else {
      const newTestCases = [...newAssignment.testCases];
      newTestCases[index] = { ...newTestCases[index], [field]: value };
      setNewAssignment({ ...newAssignment, testCases: newTestCases });
    }
  };

  const addTestCase = () => {
    if (editingAssignment) {
      setEditingAssignment({
        ...editingAssignment,
        testCases: [...editingAssignment.testCases, { input: '', expectedOutput: '' }]
      });
    } else {
      setNewAssignment({
        ...newAssignment,
        testCases: [...newAssignment.testCases, { input: '', expectedOutput: '' }]
      });
    }
  };

  const removeTestCase = (index) => {
    if (editingAssignment) {
      const newTestCases = editingAssignment.testCases.filter((_, i) => i !== index);
      setEditingAssignment({ ...editingAssignment, testCases: newTestCases });
    } else {
      const newTestCases = newAssignment.testCases.filter((_, i) => i !== index);
      setNewAssignment({ ...newAssignment, testCases: newTestCases });
    }
  };

  return (
    <div className="assignment-manager">
      <h2>Управление практическими заданиями</h2>
      
      {/* Форма создания нового задания */}
      <form onSubmit={handleCreateAssignment} className="assignment-form">
        <h3>Новое задание</h3>
        <div className="form-group">
          <label>Название:</label>
          <input
            type="text"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Описание:</label>
          <textarea
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Начальный код:</label>
          <textarea
            value={newAssignment.initialCode}
            onChange={(e) => setNewAssignment({ ...newAssignment, initialCode: e.target.value })}
            className="code-editor"
          />
        </div>

        <div className="test-cases">
          <label>Тестовые случаи:</label>
          {newAssignment.testCases.map((testCase, index) => (
            <div key={index} className="test-case">
              <div className="test-case-input">
                <label>Входные данные:</label>
                <textarea
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                  required
                />
              </div>
              <div className="test-case-output">
                <label>Ожидаемый результат:</label>
                <textarea
                  value={testCase.expectedOutput}
                  onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={() => removeTestCase(index)}>Удалить</button>
            </div>
          ))}
          <button type="button" onClick={addTestCase}>Добавить тестовый случай</button>
        </div>

        <button type="submit">Добавить задание</button>
      </form>

      {/* Список существующих заданий */}
      <div className="assignments-list">
        <h3>Существующие задания</h3>
        {assignments.map((assignment) => (
          <div key={assignment.id} className="assignment-item">
            {editingAssignment?.id === assignment.id ? (
              <form onSubmit={handleUpdateAssignment} className="edit-form">
                <div className="form-group">
                  <label>Название:</label>
                  <input
                    type="text"
                    value={editingAssignment.title}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Описание:</label>
                  <textarea
                    value={editingAssignment.description}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, description: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Начальный код:</label>
                  <textarea
                    value={editingAssignment.initialCode}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, initialCode: e.target.value })}
                    className="code-editor"
                  />
                </div>

                <div className="test-cases">
                  <label>Тестовые случаи:</label>
                  {editingAssignment.testCases.map((testCase, index) => (
                    <div key={index} className="test-case">
                      <div className="test-case-input">
                        <label>Входные данные:</label>
                        <textarea
                          value={testCase.input}
                          onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                          required
                        />
                      </div>
                      <div className="test-case-output">
                        <label>Ожидаемый результат:</label>
                        <textarea
                          value={testCase.expectedOutput}
                          onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                          required
                        />
                      </div>
                      <button type="button" onClick={() => removeTestCase(index)}>Удалить</button>
                    </div>
                  ))}
                  <button type="button" onClick={addTestCase}>Добавить тестовый случай</button>
                </div>

                <div className="button-group">
                  <button type="submit">Сохранить</button>
                  <button type="button" onClick={() => setEditingAssignment(null)}>Отмена</button>
                </div>
              </form>
            ) : (
              <>
                <div className="assignment-content">
                  <h4>{assignment.title}</h4>
                  <p>{assignment.description}</p>
                  {assignment.initialCode && (
                    <div className="code-preview">
                      <pre>{assignment.initialCode}</pre>
                    </div>
                  )}
                  <div className="test-cases-preview">
                    <h5>Тестовые случаи:</h5>
                    {assignment.testCases.map((testCase, index) => (
                      <div key={index} className="test-case-preview">
                        <p><strong>Входные данные:</strong> {testCase.input}</p>
                        <p><strong>Ожидаемый результат:</strong> {testCase.expectedOutput}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="button-group">
                  <button onClick={() => setEditingAssignment(assignment)}>Редактировать</button>
                  <button onClick={() => handleDeleteAssignment(assignment.id)}>Удалить</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticalAssignmentManager; 
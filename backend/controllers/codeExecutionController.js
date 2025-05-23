import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Event } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const executeCode = async (req, res) => {
  try {
    const { code, userId } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Код не предоставлен' });
    }

    // Создаем временный файл
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const fileName = `temp_${Date.now()}.py`;
    const filePath = path.join(tempDir, fileName);

    // Записываем код в файл
    fs.writeFileSync(filePath, code);

    // Выполняем код
    const pythonProcess = spawn('py', [filePath]);
    let output = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', async (code) => {
      // Удаляем временный файл
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Ошибка при удалении временного файла:', err);
      }

      // Создаем событие
      if (userId) {
        await Event.create({
          type: 'CODE_EXECUTED',
          description: 'Пользователь выполнил Python код',
          UserId: userId
        });
      }

      res.json({
        success: code === 0,
        output: output.trim(),
        error: error.trim()
      });
    });
  } catch (error) {
    console.error('Ошибка при выполнении кода:', error);
    res.status(500).json({ error: 'Ошибка при выполнении кода' });
  }
};

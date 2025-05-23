import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

// Создание временной папки, если не существует
const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const executeCode = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Нет кода для выполнения' });
  }

  // Создание временного Python-файла
  const filename = `code_${Date.now()}.py`;
  const filepath = path.join(tempDir, filename);

  try {
    fs.writeFileSync(filepath, code);

    // Выполнение Python-кода через системную команду
    exec(`python "${filepath}"`, (error, stdout, stderr) => {
      fs.unlink(filepath, () => {}); // удаление файла после выполнения

      if (error) {
        return res.status(500).json({ result: stderr || 'Ошибка выполнения' });
      }

      return res.json({ result: stdout });
    });

  } catch (err) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

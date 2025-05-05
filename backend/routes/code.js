const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.post('/execute', async (req, res) => {
  const { code } = req.body;

  const wrapped = `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()

try:
${code.split('\n').map(l => '    ' + l).join('\n')}
    sys.stdout = old_stdout
    print(mystdout.getvalue())
except Exception as e:
    sys.stdout = old_stdout
    print("Ошибка:", e)
`;

  exec(`python -c "${wrapped.replace(/"/g, '\\"')}"`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ result: '', message: 'Ошибка выполнения' });
    }
    res.json({ result: stdout.trim() });
  });
});

module.exports = router;

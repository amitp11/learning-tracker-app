const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const storagePath = path.join(__dirname, 'storage');

contextBridge.exposeInMainWorld('trackerAPI', {
  saveLog: (dateStr, content) => {
    const logsDir = path.join(storagePath, 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

    fs.writeFileSync(
      path.join(logsDir, `${dateStr}.json`),
      JSON.stringify(content, null, 2)
    );
  },
  getGoal: () => {
    const goalPath = path.join(storagePath, 'goal.txt');
    return fs.existsSync(goalPath) ? fs.readFileSync(goalPath, 'utf-8') : '';
  },
  saveGoal: (goalText) => {
    fs.writeFileSync(path.join(storagePath, 'goal.txt'), goalText);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];

  // Goal
  const goalDisplay = document.getElementById('goalDisplay');
  const goalInput = document.getElementById('goalText');
  const goalSaved = window.trackerAPI.getGoal();
  goalDisplay.innerText = goalSaved || "No goal set";
  goalInput.value = goalSaved;

  document.getElementById('saveGoal').addEventListener('click', () => {
    const goal = goalInput.value.trim();
    window.trackerAPI.saveGoal(goal);
    goalDisplay.innerText = goal;
  });

  // Log
  document.getElementById('saveLog').addEventListener('click', () => {
    const log = document.getElementById('logText').value.trim();
    if (!log) return alert('Write something to save.');

    window.trackerAPI.saveLog(today, {
      date: today,
      log: log
    });

    alert("Log saved for today!");
    document.getElementById('logText').value = '';
  });
});

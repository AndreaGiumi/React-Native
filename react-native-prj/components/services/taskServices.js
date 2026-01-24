const TASKS_URL = "https://todoapp-64d2d-default-rtdb.europe-west1.firebasedatabase.app/tasks";

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Firebase error: ${response.status} ${errorText}`);
  }
  return response.json();
}

export async function fetchTasks() {
  try {
    const response = await fetch(`${TASKS_URL}.json`);
    const data = await handleResponse(response);
    if (!data) return [];
    return Object.keys(data).map((id) => ({
      id,
      text: data[id].text || '',
      done: Boolean(data[id].done),
    }));
  } catch (err) {
    console.error("Errore fetchTasks:", err);
    return [];
  }
}

export async function addTask(taskText) {
  try {
    const newTask = { text: taskText, done: false };
    const response = await fetch(`${TASKS_URL}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    return await handleResponse(response);
  } catch (err) {
    console.error("Errore addTask:", err);
    return null;
  }
}

export async function doneTask(task) {
  try {
    const response = await fetch(`${TASKS_URL}/${task.id}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    await handleResponse(response);
  } catch (err) {
    console.error("Errore doneTask:", err);
  }
}

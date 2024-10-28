/* // API.js

// Obtener todas las tareas desde localStorage
export const getTasks = () => {
  try {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Guardar tareas en localStorage
const saveTasks = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

// Guardar tareas en el archivo JSON
const saveTasksJSON = (tasks) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

// Añadir una nueva tarea
const addTaskJSON = (task) => {
  const tasks = getTasks();
  task.id = Date.now();
  tasks.push(task);
  saveTasksJSON(tasks);
  return task;
};

// Añadir una nueva tarea
export const addTask = (task) => {
  return new Promise((resolve) => {
    const tasks = getTasks();
    task.id = Date.now();
    tasks.push(task);
    saveTasks(tasks);
    resolve(task);
    addTaskJSON(task);
  });
};

// Actualizar una tarea por ID
export const updateTask = (id, updatedTask) => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    saveTasks(tasks);
    return tasks[taskIndex];
  }
  return null;
};

// Eliminar una tarea por ID
export const deleteTask = (id) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasks(updatedTasks);
  return { message: "Task deleted" };
};*/

/*
// API.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

// Leer todas las tareas
const getTasks = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
};

// Guardar tareas en el archivo JSON
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

// Añadir una nueva tarea
const addTask = (task) => {
  const tasks = getTasks();
  task.id = Date.now();
  tasks.push(task);
  saveTasks(tasks);
  return task;
};

// Actualizar una tarea por ID
const updateTask = (id, updatedTask) => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    saveTasks(tasks);
    return tasks[taskIndex];
  }
  return null;
};

// Eliminar una tarea por ID
const deleteTask = (id) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasks(updatedTasks);
  return { message: "Task deleted" };
};

// Exportar las funciones
module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
*/

import React, { useState, useEffect } from "react";
import axios from "axios";

function APIAxios() {
  const [tasks, setTasks] = useState([]);
  //const { REACT_APP_API_URL } = process.env;
  const API_URL = "http://localhost:5000"; // process.env.REACT_APP_BASE_URL;

  // Leer tareas
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  // Crear una nueva tarea
  const addTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      priority: "Chill",
    };

    axios
      .post(API_URL, newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  // Actualizar una tarea
  const updateTask = (id, updatedFields) => {
    axios
      .put(`${API_URL}/${id}`, updatedFields)
      .then((response) => {
        setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  // Eliminar una tarea
  const deleteTask = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button
            onClick={() => updateTask(task.id, { completed: !task.completed })}
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
        </div>
      ))}
      <button onClick={() => addTask("New Task", "New description")}>
        Add Task
      </button>
    </div>
  );
}

export default APIAxios;

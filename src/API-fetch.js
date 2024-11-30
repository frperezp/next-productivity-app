import React, { useState, useEffect } from "react";

function APIFetch() {
  const [tasks, setTasks] = useState([]);
  const API_URL = ""; // "http://localhost:5000/tasks";

  // Leer tareas
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
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

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  // Actualizar una tarea
  const updateTask = (id, updatedFields) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(tasks.map((task) => (task.id === id ? data : task)));
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  // Eliminar una tarea
  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
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

export default APIFetch;

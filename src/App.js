/*import logo from "./logo.svg";
import "./App.css";
import ProductivityDashboard from "./components/ProductivityDashboard/ProductivityDashboard";

function App() {
  return (
    <div className="App">
      <ProductivityDashboard />
    </div>
  );
}

export default App;*/

import React, { useEffect, useState } from "react";
//import { getTasks, addTask, updateTask, deleteTask } from "./API";

import "./App.css";
import ProductivityDashboard from "./components/ProductivityDashboard/ProductivityDashboard";

const App = () => {
  /*   const API_URL =
    NODE_ENV === "development" ? process.env.REACT_APP_API_URL : window.API_URL; */

  /*const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((fetchedTasks) => setTasks(fetchedTasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTask = (title, description) => {
    const newTask = {
      title,
      description,
      priority: "Baja",
      completed: false,
    };
    addTask(newTask)
      .then((createdTask) =>
        setTasks((prevTasks) => [...prevTasks, createdTask])
      )
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleUpdateTask = (id, updatedTask) => {
    updateTask(id, updatedTask)
      .then((updated) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updated : task))
        );
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };*/

  // Renderiza las tareas y el formulario para añadir nuevas tareas aquí

  return (
    <div className="App">
      <ProductivityDashboard />
    </div>
  );
};

export default App;

/**
 * <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
 */

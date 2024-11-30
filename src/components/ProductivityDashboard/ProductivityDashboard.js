import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProductivityDashboard-cs.css";

import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PrioritySelector from "../PrioritySelector/PrioritySelector";

const ProductivityDashboard = (props) => {
  const [tasks, setTasks] = useState([]);

  const API_URL = "http://localhost:5000"; //process.env.REACT_APP_BASE_URL;

  const sortByPriority = (updatedTasks) => {
    // Ordenar todas las tareas: primero las no completadas por prioridad, luego las completadas
    return updatedTasks
      .sort((a, b) => {
        // // Si ambas están completas, mantén su orden
        // if (a.completed && b.completed) {
        //   return 0; // No cambiar el orden
        // }
        // // Si una está completa y la otra no, la incompleta va primero
        // if (a.completed !== b.completed) {
        //   return a.completed ? 1 : -1; // Completa al final
        // }
        // Ordenar por prioridad si ambas son incompletas
        return priorityValues[a.priority] - priorityValues[b.priority];
      })
      .sort((a, b) => a.completed - b.completed);
  };

  // Leer tareas
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setTasks(sortByPriority(response.data));
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        priority: "Chill",
      };
      setTitle("");
      setDescription("");
      console.log("Añadimos la task " + newTask.id);
      addTask(newTask);
    }
  };

  const handleCheckTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      // console.log("****************");
      // console.log(id);
      // console.log(!tasks.filter((task) => task.id === id)[0].completed);
      // console.log("****************");
      updateTask(id, {
        completed: !tasks.filter((task) => task.id === id)[0].completed,
      });
      sortByPriority(updatedTasks);
      // Ordena las tareas, moviendo las completadas al final
      //updatedTasks.sort((a, b) => a.completed - b.completed);
      return updatedTasks;
    });
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar la tarea?")) {
      deleteTask(id);
    }
  };

  const priorityValues = {
    Crítico: 1,
    Alta: 2,
    Baja: 3,
    Chill: 4,
  };

  const handlePriorityChange = (id, newPriority) => {
    updateTask(id, { priority: newPriority });
  };

  // Crear una nueva tarea
  const addTask = (newTask) => {
    axios
      .post(API_URL, newTask)
      .then((response) => {
        //setTasks([...tasks]);
        console.log("*****************");
        console.log(response.data);
        console.log("*****************");
        setTasks((prevTasks) => {
          const updatedTasks = sortByPriority([...prevTasks, response.data]);
          // Ordena las tareas, moviendo las completadas al final
          //updatedTasks.sort((a, b) => a.completed - b.completed);
          return updatedTasks;
        });
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
        console.log(response.data);
        //setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) =>
            task.id === id ? response.data : task
          );

          sortByPriority(updatedTasks);

          return updatedTasks;
        });
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
    <div className="app">
      <div className="task-edit">
        <div className="task-form">
          <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
          />
          <input
            type="text"
            placeholder="Descripción de la tarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-description"
          />
        </div>
        <div className="button-container">
          <button onClick={handleAddTask} className="add-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.completed ? "completed" : ""}`}
          >
            <div
              className={`custom-checkbox ${task.completed ? "checked" : ""}`}
              onClick={() => handleCheckTask(task.id)}
            >
              {task.completed && (
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
              )}
            </div>
            <div className="task-content title">
              <p className={`title ${task.completed ? "completed-text" : ""}`}>
                {task.title}
              </p>
              <p
                className={`descrip ${task.completed ? "completed-text" : ""}`}
              >
                {task.description}
              </p>
            </div>
            <div className="card-additives">
              <PrioritySelector
                taskId={task.id}
                priorityProp={task.priority}
                onPriorityChange={handlePriorityChange}
              />
              <div
                className={"trash-delete"}
                onClick={() => handleDeleteTask(task.id)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="check-icon red-icon"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductivityDashboard;

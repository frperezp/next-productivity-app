import React, { useState } from "react";
import "./ProductivityDashboard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

import PrioritySelector from "../PrioritySelector/PrioritySelector";

const ProductivityDashboard = (props) => {
  const [tasks, setTasks] = useState([
    {
      id: Date.now(),
      title: "Tarea 1",
      description: "Realizar lista de la compra de Mercadona",
      completed: false,
      priority: "Chill",
    },
    {
      id: Date.now() + 1,
      title: "Tarea 2",
      description: "Ir a comprar a Mercadona",
      completed: false,
      priority: "Chill",
    },
    {
      id: Date.now() + 2,
      title: "Tarea 3",
      description: "Deporte diario de 30 minutos",
      completed: false,
      priority: "Chill",
    },
    {
      id: Date.now() + 3,
      title: "Tarea 4",
      description: "20 minutos de audio libro en inglés",
      completed: false,
      priority: "Chill",
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: title,
          description: description,
          completed: false,
          priority: "Chill",
        },
      ]);
      setTitle("");
      setDescription("");
    }
  };

  const handleCheckTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      sortByPriority(updatedTasks);
      // Ordena las tareas, moviendo las completadas al final
      updatedTasks.sort((a, b) => a.completed - b.completed);
      return updatedTasks;
    });
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => {
      const auxTask = prevTasks.filter((task) => task.id !== id);
      return auxTask;
    });
  };

  //const [selectedPriority, setSelectedPriority] = useState("Crítico");

  const priorityValues = {
    Crítico: 1,
    Alta: 2,
    Baja: 3,
    Chill: 4,
  };

  const handlePriorityChange = (id, newPriority) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      );

      console.log(tasks);

      sortByPriority(updatedTasks);

      return updatedTasks;
    });
  };

  // const handlePriorityChange = (newPriority) => {
  //   setSelectedPriority(newPriority);
  //   console.log("Prioridad seleccionada:", newPriority);
  // };
  const sortByPriority = (updatedTasks) => {
    // Ordenar todas las tareas: primero las no completadas por prioridad, luego las completadas
    updatedTasks.sort((a, b) => {
      // Si ambas están completas, mantén su orden
      if (a.completed && b.completed) {
        return 0; // No cambiar el orden
      }
      // Si una está completa y la otra no, la incompleta va primero
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // Completa al final
      }
      // Ordenar por prioridad si ambas son incompletas
      return priorityValues[a.priority] - priorityValues[b.priority];
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

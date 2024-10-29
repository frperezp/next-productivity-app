import React, { useState } from "react";
import "./PrioritySelector.css";

function PrioritySelector({ taskId, priorityProp, onPriorityChange }) {
  const [priority, setPriority] = useState(priorityProp);

  const handleChange = (event) => {
    const selectedPriority = event.target.value;
    setPriority(selectedPriority);
    onPriorityChange(taskId, selectedPriority);
  };

  return (
    <div className="priority-selector">
      <select
        value={priority}
        onChange={handleChange}
        className={`priority-select ${priority.toLowerCase()}`}
      >
        <option value="Crítico">Crítico</option>
        <option value="Alta">Alta</option>
        <option value="Baja">Baja</option>
        <option value="Chill">Chill</option>
      </select>
    </div>
  );
}

export default PrioritySelector;

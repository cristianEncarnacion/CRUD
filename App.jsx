import React, { useState } from "react";
import ComponenteA from "./assets/components/ComponenteA";
import "./App.css"; // Importa el archivo CSS

const App = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [checkedItems, setCheckedItems] = useState([]); // Estado para los checkboxes

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (editIndex !== null) {
      const updatedList = list.map((item, index) =>
        index === editIndex ? editValue : item
      );
      setList(updatedList);
      setEditIndex(null);
      setEditValue("");
    } else {
      setList([...list, value]);
      setCheckedItems([...checkedItems, false]); // Añade un checkbox para la nueva tarea
      setValue("");
    }
  };

  const handleDelete = (indexToDelete) => {
    const newList = list.filter((_, index) => index !== indexToDelete);
    const newCheckedItems = checkedItems.filter(
      (_, index) => index !== indexToDelete
    );
    setList(newList);
    setCheckedItems(newCheckedItems); // Actualiza el estado de los checkboxes
  };

  const handleEdit = (indexToEdit) => {
    setEditIndex(indexToEdit);
    setEditValue(list[indexToEdit]);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev, index) {
    ev.dataTransfer.setData("dragIndex", index);
  }

  function drop(ev, dropIndex) {
    ev.preventDefault();
    const dragIndex = ev.dataTransfer.getData("dragIndex");

    if (dragIndex !== dropIndex) {
      const updatedList = [...list];
      const updatedCheckedItems = [...checkedItems];
      const draggedItem = updatedList[dragIndex];
      const draggedChecked = updatedCheckedItems[dragIndex];

      updatedList.splice(dragIndex, 1);
      updatedCheckedItems.splice(dragIndex, 1);
      updatedList.splice(dropIndex, 0, draggedItem);
      updatedCheckedItems.splice(dropIndex, 0, draggedChecked);

      setList(updatedList);
      setCheckedItems(updatedCheckedItems);
    }
  }

  return (
    <>
      <h1>Lista de tareas</h1>
      <div className="app-container">
        <ComponenteA
          value={value}
          handleClick={handleClick}
          onInputChange={onInputChange}
        />

        <ul className="task-list">
          {list.map((item, index) => (
            <li
              key={index}
              id={`item-${index}`}
              className={
                checkedItems[index] ? "task-item-checked" : "task-item"
              }
              draggable="true"
              onDragStart={(e) => drag(e, index)}
              onDrop={(e) => drop(e, index)}
              onDragOver={allowDrop}
            >
              <span>
                {item}{" "}
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </span>
              <div className="task-actions">
                <button onClick={() => handleDelete(index)}>Eliminar</button>{" "}
                <button onClick={() => handleEdit(index)}>Editar</button>
              </div>
              {editIndex === index && (
                <div className="edit-section">
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                  />
                  <button onClick={handleClick}>Guardar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;

import React from "react";

const ComponenteA = ({ value, handleClick, onInputChange }) => {
  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Añadir una tarea"
        value={value}
        onChange={onInputChange}
        style={{
          padding: "10px",
          width: "70%",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #d1d5db",
        }}
      />
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          marginTop: "10px",
        }}
      >
        Agregar
      </button>
    </div>
  );
};

export default ComponenteA;

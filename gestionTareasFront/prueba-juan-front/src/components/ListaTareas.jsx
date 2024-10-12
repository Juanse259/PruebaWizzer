import { useEffect, useState } from "react";
import axios from "axios";

export function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerTareas = async () => {
      const token = localStorage.getItem("token"); 

      try {
        const respuesta = await axios.get("http://localhost:3000/tareas", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setTareas(respuesta.data);
      } catch (err) {
        setError("Error al obtener las tareas.");
      } finally {
        setLoading(false);
      }
    };

    obtenerTareas();
  }, []);

  if (loading) {
    return <div>Cargando tareas...</div>; 
  }

  if (error) {
    return <div style={{ color: "white" }} >{error}</div>; 
  }

  return (
<div>
  <h1>Lista de Tareas</h1>
  <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", color: "white" }}>
    <thead>
      <tr>
        <th>Título</th>
        <th>Descripción</th>
        <th>Completado</th>
        <th>Fecha de Creación</th>
        <th>Fecha de Vencimiento</th>
        <th>Prioridad</th>
        <th>Asignado a</th>
      </tr>
    </thead>
    <tbody>
      {tareas.map((tarea) => (
        <tr key={tarea.idTarea}>
          <td>{tarea.tituloTarea}</td>
          <td>{tarea.descTarea}</td>
          <td>{tarea.completado ? "Sí" : "No"}</td>
          <td>{new Date(tarea.fechaCreado).toLocaleString()}</td>
          <td>{new Date(tarea.fechaVencimiento).toLocaleString()}</td>
          <td>{tarea.prioridad.tipoPrio}</td>
          <td>{tarea.asignado.nombreUsuario}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

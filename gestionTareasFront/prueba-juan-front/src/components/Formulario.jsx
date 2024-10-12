import "./Formulario.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Formulario({ setIsAuthenticated }) {
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");
  const [nombreR, setNombreR] = useState("");
  const [claveR, setClaveR] = useState("");
  const [error, setError] = useState("");
  const [errorR, setErrorR] = useState("");
  const [esRegistro, setEsRegistro] = useState(false);
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await axios.post(
        "http://localhost:3000/autenticacion/registro",
        {
          nombreUsuario: nombreR,
          contraUsuario: claveR,
        }
      );

      if (respuesta.status === 201) {
        setMensajeRegistro("Registro exitoso, puedes iniciar sesión ahora.");
        setErrorR("");
        console.log("Registro exitoso:", respuesta.data);
      }
    } catch (errorR) {
      if (errorR.response) {
        console.error("Error en el registro:", errorR.response.data);
        const mensajeError = errorR.response.data.message;
        setErrorR(mensajeError);
        setMensajeRegistro("");
      }
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await axios.post(
        "http://localhost:3000/autenticacion/login",
        {
          nombreUsuario: nombre,
          contraUsuario: clave,
        }
      );
      if (respuesta.status === 200 || respuesta.status === 201) {
        console.log("Inicio de sesión exitoso:", respuesta.data);
        const token = respuesta.data.token;
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/listatareas");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error en el inicio de sesión:", error.response.data);
        const mensajeError =
          error.response.data.message ||
          "Error inesperado. Intenta nuevamente más tarde.";
        setError(mensajeError);
      }
    }
  };

  const manejarRegistroClick = () => {
    setEsRegistro(!esRegistro);
    setError("");
    setErrorR("");
    setNombreR("");
    setClaveR("");
    setNombre("");
    setClave("");
    setMensajeRegistro("");
  };

  return (
    <section>
      {esRegistro ? (
        <form className="formulario" onSubmit={manejarRegistro}>
          <h1>Registro</h1>
          {errorR && <p className="error">{errorR}</p>}
          {mensajeRegistro && <p className="success">{mensajeRegistro}</p>}
          <input
            type="text"
            placeholder="Registrar nombre de usuario"
            value={nombreR}
            onChange={(e) => setNombreR(e.target.value)}
          />
          <input
            type="password"
            placeholder="Registrar contraseña"
            value={claveR}
            onChange={(e) => setClaveR(e.target.value)}
          />
          <button type="submit">Registrarse</button>
          <a href="#" onClick={manejarRegistroClick}>
            Login
          </a>
        </form>
      ) : (
        <form className="formulario" onSubmit={manejarSubmit}>
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
          <button type="submit">Iniciar sesión</button>
          <a href="#" onClick={manejarRegistroClick}>
            Registrarse
          </a>
        </form>
      )}
    </section>
  );
}

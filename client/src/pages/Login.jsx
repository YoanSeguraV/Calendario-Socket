import React, { useState } from "react";
import CrearAgenda from "../components/CrearAgenda";
import { Agenda } from "../context/Contexto";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const { socket } = Agenda();
  const [nombre, setnombre] = useState("");
  const [codigo, setcodigo] = useState("");

  const handleOnsumbit = (e) => {
    e.preventDefault();
    console.log(nombre);
    console.log(codigo);
    socket.emit("unirme-sala", codigo, nombre);
    socket.on("unido-agenda", (codigo) => {
      navigate(`/agenda/${codigo}`);
    });
    socket.on("codigo-invalido", (message) => {
      Swal.fire({
        icon: "error",
        title: message,
        timer: 1500,
      });
    });
    socket.on("max-users", (message) => {
      Swal.fire({
        icon: "error",
        title: message,
        timer: 1500,
      });
    });
  };
  return (
    <div className="bg-dark container-fluid " style={{ height: "100vh" }}>
      <div className="d-flex justify-content-center">
        <div
          className="  bg-white mt-5 rounded"
          style={{ width: "25rem", height: "20rem" }}
        >
          <h1 className="text-center">AGENDA APP</h1>
          <div  className="m-3">
            <input
              className="form-control mt-3"
              type="text"
              placeholder="ingrese nombre"
              onChange={(e) => setnombre(e.target.value)}
            />
            <input
              className="form-control mt-4"
              type="text"
              placeholder="ingrese codigo"
              onChange={(e) => setcodigo(e.target.value)}
            />
            <div className="mt-5">
              <button
                className="btn btn-primary w-100"
                onClick={(e) => handleOnsumbit(e)}
              >
                Unirme
              </button>
              <button
                className="btn btn-danger w-100 mt-2"
                data-bs-toggle="modal"
                data-bs-target="#crearSala"
              >
                Crear Agenda
              </button>
            </div>
          
        </div>
        </div>
        <CrearAgenda />
      </div>
    </div>
  );
}

export default Login;

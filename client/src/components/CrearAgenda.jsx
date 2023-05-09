import { useState } from "react";
import { Agenda } from "../context/Contexto";
import { useNavigate } from "react-router-dom";

function CrearAgenda() {
  const { socket } = Agenda();
  const [nombre, setnombre] = useState("");
  const navigate = useNavigate();
  const handleOnsumbit = (e) => {
    e.preventDefault();
    console.log(nombre);
    socket.emit("crear-sala", nombre);
    socket.on("agenda-creada", (data) => {
      const { user, codigo } = data;
      localStorage.setItem("nombre", user);
      localStorage.setItem("codigo", codigo);
      navigate(`/agenda/${codigo}`);
    });
  };
  return (
    <div>
      <div
        className="modal fade"
        id="crearSala"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Crear Agenda
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleOnsumbit}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="ingrese nombre"
                  onChange={(e) => setnombre(e.target.value)}
                />

                <button className="btn btn-danger my-3 w-100" data-bs-dismiss="modal">
                  Crear Agenda
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearAgenda;

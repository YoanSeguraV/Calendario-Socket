import DatePicker from "react-datepicker";
import { Agenda } from "../context/Contexto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function CrearEvento() {
  const { codigo } = useParams();
  const { setodos, todos, socket } = Agenda();
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
 
  const handleAddEvents = (e) => {
    e.preventDefault();
    
    socket.emit("agendar", codigo, newEvent);

    // setAllEvents([...allEvents]);
    socket.on("agendado", (data) => {
      console.log(data);
      setodos(data);
    });
  };

 

  return (
    <div
      className="modal fade"
      id="modalId"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitleId">
              Crear Evento
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div>
                <input
                  type="text"
                  placeholder="Ingrese Titulo"
                  className="form-control mb-4"
                  style={{ width: "100%", marginRight: "10px" }}
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <DatePicker
                  placeholderText="Fecha Inicio "
                  className="form-select mb-4"
                  style={{ marginRight: "10px" }}
                  selected={newEvent.start}
                  timeFormat="HH:mm"
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  onChange={(start) => setNewEvent({ ...newEvent, start })}
                />
                <DatePicker
                  placeholderText="Fecha Final "
                  className="form-select mb-4"
                  style={{ marginRight: "10px" }}
                  selected={newEvent.end}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  onChange={(end) => setNewEvent({ ...newEvent, end })}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              className="btn btn-primary w-75" data-bs-dismiss="modal"
              onClick={(e) => handleAddEvents(e)}
            >
              Añadir evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearEvento;

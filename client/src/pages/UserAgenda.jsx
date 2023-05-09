import React, { useCallback, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useParams } from "react-router-dom";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Agenda } from "../context/Contexto";
import CrearEvento from "../components/CrearEvento";

const locales = {
  "en-US": import("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function UserAgenda() {
  const { socket } = Agenda();
  const [myEvents, setEvents] = useState([]);
  // const handleSelectSlot = useCallback(
  //   ({ start, end }) => {
  //     const title = window.prompt("Nuevo Evento");
  //     if (title) {
  //       const newEvent = { start, end, title };
  //       setEvents((prev) => [...prev, newEvent]);
  //       socket.emit("agendar", codigo, newEvent);
  //     }
  //   },
  //   [setEvents, socket]
  // );

  const handleSelectEvent = useCallback((event) => {
    alert(event.title);
  }, []);
  const { todos, setodos } = Agenda();
  const { codigo } = useParams();

  const [nombres, setnombres] = useState([]);
  const [getid, setid] = useState([]);

  useEffect(() => {
    socket.on("nick", (nombre, ids) => {
      setnombres(nombre);
      setid(ids);
    });

    socket.on("agendado", async (data) => {
      setodos(data);
    });
  }, [socket]);

  console.log(nombres);
  return (
    <div className="bg-dark container-fluid " style={{ height: "120vh" }}>
      <h1 className="text-white text-center pt-3">CALENDARIO</h1>
      <div></div>

      <div className="d-flex justify-content-between mx-5">
        <p className="text-white fs-2">{codigo}</p>
        <div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#modalId"
            className="btn btn-primary mb-2"
          >
            Añadir +
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4">
        {nombres.map((usuario, index) => {
          return (
            <div className="col-md-2 d-flex flex-wrap mx-4" key={index}>
              <span className="text-white w-100 btn btn-success">
                {usuario}
              </span>
            </div>
          );
        })}
      </div>

      <Calendar
        localizer={localizer}
        events={todos}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        style={{
          height: 550,
          marginLeft: "50px",
          marginRight: "50px",
          background: "white",
          padding: "10px",
        }}
      />
      <CrearEvento />
    </div>
  );
}

export default UserAgenda;

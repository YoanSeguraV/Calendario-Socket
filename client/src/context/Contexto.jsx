import { createContext, useContext, useEffect, useState } from "react";

import io from "socket.io-client";
export const ServiceContext = createContext();

export const Agenda = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    new Error("error en el context");
  }
  return context;
};

export const ServiceContextProvider = ({ children }) => {
  const [todos, setodos] = useState();
  const URL = "http://localhost:4000";
  const socket = io(URL);
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("disconnetion", () => {
      console.log("usuario desconecatado" + socket.id);
      return location.href("/");
    });
  }, []);

  return (
    <ServiceContext.Provider value={{ socket, setodos, todos }}>
      {children}
    </ServiceContext.Provider>
  );
};

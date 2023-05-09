import Eventos from "../models/Event.js";

export default (io) => {
  let users = {
    nombres: {},
    id: {},
  };

  let eventosUsers = {
    nombres: {},
  };
  let events = [];
  io.on("connection", (socket) => {
    console.log("conectado" + socket.id);

    socket.on("crear-sala", (username) => {
      const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
      if (!users.nombres[codigo]) {
        users.nombres[codigo] = [];
        users.id[codigo] = [];
      }
      socket.join(codigo);
      users.nombres[codigo].push(username);
      users.id[codigo].push(socket.id);
      const user = {
        user: username,
        codigo: codigo,
      };

      io.to(codigo).emit("agenda-creada", user);
      console.log(users);
    });

    socket.on("unirme-sala", (codigo, nombre) => {
      if (!codigo) {
        return socket.emit(
          "codigo-invalido",
          "Porfavor ingrese un codigo  valido"
        );
      } else if (users.nombres[codigo].length >= 3) {
        return socket.emit("max-users", "maximo de jugadores");
      } else {
        socket.emit("user-conect", "usuario conectado a la sala" + codigo);
        socket.join(codigo);
        console.log("usuario" + nombre + "esta conectado a la sala");
        users.nombres[codigo].push(nombre);
        users.id[codigo].push(socket.id);
        socket.emit("unido-agenda", codigo);
        function actualizarJugadores(codigo) {
          io.to(codigo).emit("nick", users.nombres[codigo], users.id[codigo]);
        }
        actualizarJugadores(codigo);

        socket.on("disconnect", () => {
          const index = users.id[codigo].indexOf(socket.id);
          users.id[codigo].splice(index, 1);
          users.nombres[codigo].splice(index, 1);
          io.to(codigo).emit("nick", users.nombres[codigo], users.id[codigo]);
          console.log(
            `el usuario ${socket.id} se ha desconectado de la sala ${codigo}`
          );
        });
      }
    });

    socket.on("agendar", async (codigo, evento) => {
      try {
        const use={
          title:evento.title,
          start:evento.start,
          end:evento.end,
          codigo
        }
        const event = new Eventos(use);
         await event.save();
         const list= await Eventos.find({"codigo":codigo})
          // eventosUsers.nombres[codigo].push(evento);
          io.to(codigo).emit("agendado",list);
        console.log(events);
        console.log(eventosUsers);
        // if (!eventosUsers.nombres[codigo]) {
        // eventosUsers.nombres[codigo] = [];
    //  } else {
    //     const list= await Eventos.find({"codigo":codigo})
    //      eventosUsers.nombres[codigo].push(evento);
    //      io.to(codigo).emit("agendado", eventosUsers.nombres[list]);
    //  } 
      } catch (error) {
        console.log(error);
      }
      
    });
  });
};

const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();
io.on("connection", client => {
  client.on("nextTicket", (data, callback) => {
    let next = ticketControl.nextTicket();

    callback(next);
    console.log("siguiente ticket", next);
  });

  client.emit("currentState", {
    ticket: ticketControl.getLastTicket(),
    lastsFour: ticketControl.getLastsFours()
  });

  client.on("attendTicket", (data, callback) => {
    if (!data.desktop) {
      return callback({
        err: true,
        menssage: "El escritorio es necesario"
      });
    }

    let attendTicket = ticketControl.attendNumber(data.desktop);

    callback(attendTicket);

    client.broadcast.emit('lastsFours', {lastsFours: ticketControl.getLastsFours()});
  });
});

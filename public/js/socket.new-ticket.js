var socket = io();
var label = $("#lblNuevoTicket");

socket.on("connect", function() {
  console.log("Conectado al servidor");
});

socket.on("disconnect", function() {
  console.log("Desconectado del servidor");
});

$("button").on("click", function() {
  socket.emit("nextTicket", null, function(nextTicket) {
    label.text(nextTicket);
  });
});

socket.on("currentState", function(response) {
  label.text(`Ticket ${response.ticket}`);
});

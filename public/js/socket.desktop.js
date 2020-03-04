var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario.");
}

var desktop = searchParams.get("escritorio");
var label = $("small");
console.log(desktop);
$("h1").text(`Escritorio ${desktop}`);

$("button").on("click", function() {
  socket.emit("attendTicket", { desktop: desktop }, function(response) {

    if(response === 'No hay tickets'){
        label.text(response);
        alert(response);
        return;
    }
    label.text(`Ticket ${response.number    }`);
  });
});

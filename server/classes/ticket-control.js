const fs = require("fs");

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];

    let data = require("../data/data.json");

    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.lastFour = data.lastFour;
    } else {
      this.rebootCount();
    }
  }

  nextTicket() {
    this.last += 1;
    let ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveFile();

    return `Ticket ${this.last}`;
  }

  getLastTicket() {
    return this.last;
  }

  getLastsFours(){
    return this.lastFour;
  }

  attendNumber(desktop){
    if(this.tickets.length === 0){
        return 'No hay tickets';
    }

    let numberTicket = this.tickets[0].number;
    this.tickets.shift();

    let attendNumber = new Ticket(numberTicket, desktop);

    if(this.lastFour === undefined){
        this.lastFour = [];
    }
    this.lastFour.unshift(attendNumber);

    if(this.lastFour.length > 4){
        this.lastFour.splice(-1,1);
    }

    console.log(this.lastFour);

    this.saveFile();

    return attendNumber;
  }
  rebootCount() {
    this.last = 0;
    this.tickets = [];
    console.log("Inicio el sistema como la primera vez.");
    this.saveFile();
  }

  saveFile() {
    let jsonData = {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl
};

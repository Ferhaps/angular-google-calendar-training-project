import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "app-component.html",
  styleUrls: ["appStyles.css"]
})
export class AppComponent  {
  sidebarShown: boolean = true;
  data: any = [
    {
      name: "Ferhan Cherkez",
      color: "blue",
      id: 2,
      events: [
        { id: 2, duration: 1, color: "blue", text: 'Angular daily meet', starts: 1, ends: 2, zone: 'AM-AM', date: new Date(2022, 3, 5),
        guests: [ 
          { id: 1, status: 'Organizer', going: true },
          { id: 2, status: '', going: true },
          { id: 3, status: '', going: true },
          { id: 4, status: '', going: false },
          { id: 5, status: '', goign: false },
        ]}, 

        { id: 2, duration: 2, color: "blue", text: 'CSS meet', starts: 1, ends: 3, zone: 'AM-AM', date: new Date(2022, 3, 5), 
        guests: [
          { id: 2, status: '', going: true },
          { id: 3, status: '', going: true },
          { id: 5, status: 'Organizer', goign: false },
        ]},

        { id: 2, duration: 5, color: "blue", text: 'Internship', starts: 3, ends: 8, zone: 'AM-AM', date: new Date(2022, 3, 5), 
        guests: [
          { id: 1, status: 'Organizer', going: true },
          { id: 2, status: '', going: true },
          { id: 3, status: '', going: true },
          { id: 4, status: '', going: false },
        ]}
      ]
    },
    {
      name: "James",
      color: "red",
      id: 6,
      events: [
        { id: 6, duration: 4, color: "red", text: 'FormBuilder meet', starts: 4, ends: 8, zone: 'AM-AM', date: new Date(2022, 3, 5), 
        guests: [
          { id: 2, status: '', going: true },
          { id: 4, status: '', going: false },
          { id: 6, status: 'Organizer', going: true }
        ]},

        { id: 6, duration: 2, color: "red", text: 'Client meet', starts: 5, ends: 7, zone: 'AM-AM', date: new Date(2022, 3, 5), 
        guests: [
          { id: 6, status: 'Organizer', going: true }
        ]},

        { id: 6, duration: 4, color: "red", text: 'Daily meet', starts: 6, ends: 10, zone: 'AM-AM', date: new Date(2022, 3, 5), 
        guests: [
          { id: 2, status: '', going: true },
          { id: 4, status: '', going: false },
          { id: 6, status: 'Organizer', going: true }
        ]}
      ]
    },
    {
      name: "Ivan Ivanov",
      color: "green",
      id: 1,
      events: [
        { id: 1, duration: 2, color: "green", text: 'Angular meet', starts: 7, ends: 9, zone: 'AM-AM', date: new Date(2022, 3, 5), 
        guests: [
          { id: 1, status: 'Organizer', going: true },
          { id: 2, status: '', going: true },
          { id: 3, status: '', going: true },
          { id: 4, status: '', going: false },
          { id: 5, status: '', goign: false },
        ]}, 

        { id: 1, duration: 2, color: "green", text: 'React meet', starts: 11, ends: 1, zone: 'AM-PM', date: new Date(2022, 3, 5), 
        guests: [
          { id: 2, stauts: '', going: true },
          { id: 3, status: '', going: false },
          { id: 4, status: '', going: false },
        ]}
      ]
    },
  ]
}
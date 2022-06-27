import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "new-event-form",
  templateUrl: "new-event-template.html",
  styleUrls: ["new-event-styles.css"]
})
export class NewEventComponent {
  @Input() date: any;
  @Input() hours: any;

  @Output() close = new EventEmitter();

  weekdays: string[] = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
}
import { UserService } from '../../services/userService';
import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: "event-editor",
  templateUrl: "eventEditorTemplate.html",
  styleUrls: ["eventEditorStyles.css"],
  animations: [
    trigger('show-hide-footer', [
      transition(':enter', [
        style({ opacity: 0, height: '0px'} ),
        animate('200ms', style({ opacity: 1, height: '20px' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0, height: '0px' })),
      ]),
    ])
  ]
})
export class EventEditor {
  @Input() eventInfo: any;

  @Output() close = new EventEmitter();

  @ViewChild('dialog', { static: false }) dialog!: ElementRef;

  weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
  footerSectionShown: boolean = false;
  infoComponentShown: boolean = false;
  personInfo: any;
  eventOrganizer!: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    let ids: number[] = [];
    for (const guest of this.eventInfo.guests) {
      ids.push(guest.id);
    }

    let guests = this.userService.getUserData(ids);
    for (const GUEST of this.eventInfo.guests) {
      let guest = guests.find((guest: any) => guest.id == GUEST.id);
      GUEST.name = guest?.name;
      GUEST.imgUrl = guest?.imgUrl;
      GUEST.email = guest?.email;
      if (GUEST.status == 'Organizer') {
        this.eventOrganizer = GUEST.name;
      }
    }
  }

  onMouseLeave() {
    this.infoComponentShown = false;
  }

  onMouseEnter(personInfo: any) {    
    this.infoComponentShown = true;
    this.personInfo = personInfo;
  }

  toggleFooter() {
    this.footerSectionShown = !this.footerSectionShown;
  }

  getGuestInfo(): string {
    let going: any = 0;
    let notGoing: any = 0;
    let awaiting: any = 0;
    for (const guest of this.eventInfo.guests) {
      switch (guest.going) {
        case true:
          going++;
          break;
        case false:
          notGoing++;
          break;
        default:
          awaiting++;
          break;
      }
    }
    
    going = going > 0 ? `${going} yes` : '';
    notGoing = notGoing > 0 ? `, ${notGoing} no` : '';
    awaiting = awaiting > 0 ? `, ${awaiting} awaiting` : '';
    return going + notGoing + awaiting;
  }

  formatInfo(): string {
    let dayName: string = this.weekdays[this.eventInfo.date.getDay()];
    let month: string = this.months[this.eventInfo.date.getMonth()];
    let time: string = this.formatTime(this.eventInfo.starts, this.eventInfo.ends, this.eventInfo.zone);
    return `${dayName}, ${month} ${this.eventInfo.date.getDate()}  .  ${time}`;
  }

  formatTime(start: number, end: number, zone: string): string {
    let [zone1, zone2] = zone.split('-');
    if (zone1 == zone2) return `${start} - ${end}${zone1.toLowerCase()}`;
    return `${start}${zone1.toLowerCase()} - ${end}${zone2.toLowerCase()}`;
  }
}
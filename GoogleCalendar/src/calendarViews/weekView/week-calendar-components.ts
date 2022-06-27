import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommunicationService } from "../../services/comService";

@Component({
  selector: "week-calendar",
  templateUrl: "week-calendar-template.html",
  styleUrls: ["week-calendar-styles.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekCalendarComponent implements OnDestroy {
  currentDate: any;
  months: Array<string> = [
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
  daysInAllMonths: Array<number> = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];
  hoursOfTheDay: Array<string> = [
    "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
  ]
  days: Array<number> = [];
  today: number;
  initMonth: number;
  initYear: number;
  weekdays: Array<number> = [];
  viewEvents: any;
  sendDateSubscription: Subscription;
  eventSubscription: Subscription;

  constructor(private comService: CommunicationService, private cdRef: ChangeDetectorRef) {
    this.currentDate = new Date();
    this.today = this.currentDate.getDate();
    this.initMonth = this.currentDate.getMonth();
    this.initYear = this.currentDate.getFullYear();
    this.initWeekDays();

    this.eventSubscription = this.comService.event$.subscribe(
      events => {
        this.viewEvents = events;
        this.cdRef.detectChanges()
      }
    );

    this.sendDateSubscription = this.comService.sendDate$.subscribe(
      date => {
        this.currentDate = date
        this.initWeekDays();
        this.cdRef.detectChanges()
      }
    );
  }

  initWeekDays() {
    let currentDayIndex = this.currentDate.getDay();
    let day = this.currentDate.getDate();
    this.weekdays[currentDayIndex] = day;

    for (let i = 0; i < 7; i++) {
      if (i < currentDayIndex) {
        let diff = currentDayIndex - i;
        this.weekdays[i] = day - diff;
      } else if (i > currentDayIndex) {
        let diff = i - currentDayIndex;
        this.weekdays[i] = day + diff;
      }
    }

    for (let i = 0; i < this.weekdays.length; i++) {
      let day = this.weekdays[i];
      let daysOfCurrentMonth = this.daysInAllMonths[this.currentDate.getMonth()];
      if (day < 1) {
        let daysInLastMonth = this.daysInAllMonths[this.currentDate.getMonth() - 1];
        let diff = 0 - day;
        this.weekdays[i] = daysInLastMonth - diff;
      } else if (day > daysOfCurrentMonth) {
        let diff = day - daysOfCurrentMonth;
        this.weekdays[i] = diff;
      }
    }
  }

  checkDate(day: number, event: Date, eventStart: string, hour: string) {
    return event.getDate() == day && event.getMonth() == this.currentDate.getMonth() && hour == eventStart
  }

  checkForToday(day: number) {
    return day == this.today &&
      this.initMonth == this.currentDate.getMonth() &&
      this.initYear == this.currentDate.getFullYear()
  }

  ngOnDestroy() {
    this.sendDateSubscription.unsubscribe();
    this.eventSubscription.unsubscribe();
  }
}
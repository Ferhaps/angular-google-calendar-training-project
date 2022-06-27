import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { CommunicationService } from "../../services/comService";

@Component({
  selector: "month-calendar",
  templateUrl: "./month-calendar-template.html",
  styleUrls: ["month-calendar-styles.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthCalendarComponent implements OnDestroy {
  @Output() dateSelected = new EventEmitter();
  
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentDate: any = new Date();
  viewEvents: any;
  today: any;
  initialMonth: any;
  initialYear: any;
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
  daysInAllMonths: number[] = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];
  daysOfMonth: any[] = [];
  eventSubscription: Subscription;
  sendDateSubscription: Subscription;

  constructor(private comService: CommunicationService, private cdRef: ChangeDetectorRef) {
    this.eventSubscription = this.comService.event$.subscribe(
      event => {
        this.viewEvents = event;
        this.cdRef.detectChanges()
      }
    );

    this.sendDateSubscription = this.comService.sendDate$.subscribe(
      date => {
        this.currentDate = date;
        this.daysOfMonth = [];
        this.setDaysInMonth();
        this.cdRef.detectChanges()
      }
    );

    this.initialYear = this.currentDate.getFullYear();
    this.initialMonth = this.currentDate.getMonth();
    this.today = this.currentDate.getDate();
    this.setDaysInMonth();
  }

  checkForToday(day: number) {
    return day == this.today &&
      this.initialMonth == this.currentDate.getMonth() &&
      this.initialYear == this.currentDate.getFullYear()
  }

  checkDate(day: number, event: Date) {
    return event.getDate() == day && event.getMonth() == this.currentDate.getMonth()
  }

  isLeepYear(year: number) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  setDaysInMonth() {
    let daysInMonth = this.daysInAllMonths[this.currentDate.getMonth()];
    if (daysInMonth == 28 && this.isLeepYear(this.currentDate.getFullYear())) {
      daysInMonth++;
    }

    this.currentDate.setDate(1);
    let daysOffset = this.currentDate.getDay();
    for (let i = 0; i < daysOffset; i++) {
      this.daysOfMonth.push({day: ""});      
    }

    for (let i = 0; i < daysInMonth; i++) {
      this.daysOfMonth.push({day: i + 1}); 
    }

    this.currentDate.setDate(this.daysInAllMonths[this.currentDate.getMonth()]);
    daysOffset = this.currentDate.getDay();
    for (let i = 0; i < daysOffset; i++) {
      this.daysOfMonth.push({day: ""}); 
    }
    
    for (let i = 0; i < this.weekDays.length; i++) {
      let dayObj = this.daysOfMonth[i];
      dayObj.dayName = this.weekDays[i];
    }
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
    this.sendDateSubscription.unsubscribe();
  }
}
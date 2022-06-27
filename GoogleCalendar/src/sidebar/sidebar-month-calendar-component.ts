import { Subscription } from 'rxjs';
import { Component, } from "@angular/core";
import { CommunicationService } from "src/services/comService";

@Component({
  selector: "sidebar-month-calendar",
  templateUrl: "sidebar-month-calendar-template.html",
  styleUrls: ["sidebar-month-calendar-styles.css"]
})
export class SidebarMonthCalendarComponent {
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
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentDate: any = new Date();
  today: any = this.currentDate.getDate();;
  initialMonth: any = this.currentDate.getMonth();;
  initialYear: any = this.currentDate.getFullYear();;
  
  daysOfMonth: any[] = [];
  //sendDateSubscription: Subscription;

  constructor(private comService: CommunicationService) {
    // this.sendDateSubscription = this.comService.sendDate$.subscribe(
    //   date => {
    //     this.currentDate = date;
    //     this.setDaysInMonth();
    //   }
    // );

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
    //this.daysOfMonth = [];
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
}
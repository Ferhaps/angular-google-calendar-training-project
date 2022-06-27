import { Component, EventEmitter, Output } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { CommunicationService } from "../services/comService";

@Component({
  selector: "header",
  templateUrl: "header-template.html",
  styleUrls: ["header-styles.css"]
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter()

  currentDate: any = new Date();
  initDay: number = this.currentDate.getDate();
  initMonth: number = this.currentDate.getMonth();
  initYear: number = this.currentDate.getFullYear();
  dataInfo: string;
  currentViewType: any;
  items = [
    { name: 'Month', shortcut: "M", path: "month" },
    { name: 'Week', shortcut: "W", path: "week" },
    { name: 'Day', shortcut: "D", path: "day" }
  ];
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

  constructor(private comService: CommunicationService, private router: Router) { 
    this.dataInfo = this.months[this.currentDate.getMonth()] + " " +  this.currentDate.getFullYear();
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(path => {
      this.currentViewType = path
    });
  }

  prevPage() {
    switch (this.currentViewType.url) {
      case "/":
      case "/month":
        this.currentDate.setDate(1);
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.dataInfo = this.months[this.currentDate.getMonth()] + " " + this.currentDate.getFullYear();
        break;
      case "/week":
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.dataInfo = this.months[this.currentDate.getMonth()] + " " + this.currentDate.getFullYear();
        break;
      case "/day":
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.dataInfo = this.months[this.currentDate.getMonth()] + " " + this.currentDate.getDate() + " " + this.currentDate.getFullYear();
        break;
      default:
        break;
    }
    this.comService.sendDate(this.currentDate);
  }

  nextPage() {
    switch (this.currentViewType.url) {
      case "/":
      case "/month":
        this.currentDate.setDate(1);
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.dataInfo = this.months[this.currentDate.getMonth()] + " " + this.currentDate.getFullYear();
        break;
      case "/week":
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.dataInfo = this.months[this.currentDate.getMonth()] + " " + this.currentDate.getFullYear();
        break;
      case "/day":
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.dataInfo = this.months[this.currentDate.getMonth()] + " " + this.currentDate.getDate() + " " + this.currentDate.getFullYear();
        break;
      default:
        break;
    }
    this.comService.sendDate(this.currentDate);
  }

  showToday() {
    this.currentDate.setDate(this.initDay);
    this.currentDate.setMonth(this.initMonth);
    this.currentDate.setFullYear(this.initYear);
    this.dataInfo = this.currentViewType.url == "/day" ?
      this.months[this.currentDate.getMonth()] + " " + this.currentDate.getDate() + " " + this.currentDate.getFullYear() :
      this.months[this.initMonth] + " " + this.initYear;
    this.comService.sendDate(this.currentDate);
  }
}
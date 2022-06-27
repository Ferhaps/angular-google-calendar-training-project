import { EventEditor } from './eventEditor';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Renderer2, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { CommunicationService } from "../../services/comService";

const CELL_HIGHT = 49, LEFT_OFFSET = 42, TOP_OFFSET = 23, WIDTH = 1200;

@Component({
  selector: "day-calendar",
  templateUrl: "day-calendar-template.html",
  styleUrls: ["day-calendar-styles.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayCalendarComponent implements OnDestroy {
  @ViewChild(EventEditor) editor!: EventEditor;

  hoursOfTheDay: string[] = [
    "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
  ]
  weekdays: string[] = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" ];
  currentDate: any = new Date();
  today: number = this.currentDate.getDate();
  initMonth: number = this.currentDate.getMonth();
  initYear: number = this.currentDate.getFullYear();
  viewEvents: any[] = [];
  groupedEvents: any[] = [];
  event: any;
  eventObj: any;
  mouseMoveHandler: any;
  mouseUpHandler: any;
  lastZindex: any;
  isDragging: boolean = false;
  editorShown: boolean = false;
  newEventFormShown: boolean = false;
  newEventHours: any;
  sendDateSubscription: Subscription;
  eventSubscription: Subscription;

  constructor(private comService: CommunicationService, private cdRef: ChangeDetectorRef, private renderer: Renderer2) {
    this.eventSubscription = this.comService.event$.subscribe(
      (events: any) => {
        this.viewEvents = [];
        for (const event of events) {
          if (this.filterEvents(event)) {
            this.viewEvents.push(event);
          }
        }
        
        if (this.viewEvents.length != 0) {
          this.groupedEvents = this.groupEvents(events);
          for (const group of this.groupedEvents) {
            this.positionEventsInGroup(group);
          }
        }
        this.cdRef.detectChanges();
      }
    );

    this.sendDateSubscription = this.comService.sendDate$.subscribe(
      date => {
        this.currentDate = date;
        this.cdRef.detectChanges();
      }
    );
  }

  onRowClick(hours: string) {
    let hour = Number(hours.substring(0, 2));
    let zone = hours.substring(2);
    this.newEventFormShown = true;
    this.newEventHours = { start: hour, end: hour + 1, zone: zone.toLowerCase() };
    this.cdRef.detectChanges();
  }

  onEditorClose() {
    //this.editor.dialog.nativeElement.close();
    this.editorShown = false;
    this.cdRef.detectChanges();
    this.event.style['z-index'] = this.lastZindex;
    this.event.style.boxShadow = 'none';
  }

  filterEvents(event: any): boolean {
    return event.date.getDate() == this.currentDate.getDate() &&
      event.date.getMonth() == this.currentDate.getMonth() &&
      event.date.getFullYear() == this.currentDate.getFullYear();
  }

  onMousedown(event: any): void {
    this.event = event.target;
    this.eventObj = this.viewEvents[event.target.id];
    this.mouseMoveHandler = this.renderer.listen('document', 'mousemove', this.onMousemove.bind(this)); 
    this.mouseUpHandler = this.renderer.listen('document', 'mouseup', this.onMouseup.bind(this));
    this.lastZindex = this.event.style['z-index'];
    this.event.style['z-index'] = 999998;
    this.event.style.boxShadow = '0px 0px 22px 2px #c1c1c1';
    setTimeout(() => {
      if (!this.isDragging) {
        this.mouseMoveHandler();
        this.mouseUpHandler();
        this.editorShown = true;
        this.cdRef.detectChanges();  
        //this.editor.dialog.nativeElement.showModal();
      }
    }, 300);
  }

  onMousemove(event: any): void {
    console.log('move');
    event.preventDefault();
    this.isDragging = true;
    this.event.style.left = LEFT_OFFSET + 'px';
    this.event.style.top = event.clientY - this.event.offsetHeight + 'px';
    let hour: number = Math.floor(((this.event.style.top.split('px')[0] - TOP_OFFSET) / CELL_HIGHT) + 1);
    this.eventObj.starts = hour;
    this.eventObj.ends = hour + this.eventObj.duration;
    this.cdRef.detectChanges();
  }

  onMouseup(): void {
    console.log('up');
    this.isDragging = false;
    this.event.style.boxShadow = 'none';
    let groupEvents = this.groupEvents(this.viewEvents);
    for (const group of groupEvents) {
      this.positionEventsInGroup(group);
    }
    this.cdRef.detectChanges();
    this.mouseMoveHandler();
    this.mouseUpHandler();
  }

  groupEvents(events: any): any[] {    
    let group: any;
    let allGroups: any[] = [];
    let groupEnd: number = 0;

    events.sort((a: any, b: any) => a.starts - b.starts);
    for (const event of events) {
      if (event.starts < groupEnd) {
        group.push(event);
        if (event.ends > groupEnd) {
          groupEnd = event.ends
        }
      } else {
        group = [];
        allGroups.push(group);
        groupEnd = event.ends;
        group.push(event);
      }
    }
    return allGroups;
  }

  positionEventsInGroup(group: any): void {
    for (let i = 1; i <= group.length; i++) {
      let event = group[i - 1];
      event.zIndex = i;
      let left = i == 1 ? LEFT_OFFSET : (LEFT_OFFSET + i * 85);
      event.left = left + 'px';
      event.width = WIDTH - left + LEFT_OFFSET + 'px';
      event.height = CELL_HIGHT * event.duration + 'px';
      event.top = TOP_OFFSET + CELL_HIGHT * (event.starts - 1) + 'px';
    }
  }

  formatTime(start: number, end: number, zone: string): string {
    let [zone1, zone2] = zone.split('-');
    if (zone1 == zone2) return `${start} - ${end}${zone1.toLowerCase()}`;
    return `${start}${zone1.toLowerCase()} - ${end}${zone2.toLowerCase()}`;
  }

  checkForToday(day: number): boolean {
    return day == this.today &&
      this.initMonth == this.currentDate.getMonth() &&
      this.initYear == this.currentDate.getFullYear();
  }

  ngOnDestroy(): void {
    this.sendDateSubscription.unsubscribe();
    this.eventSubscription.unsubscribe();
  }
}
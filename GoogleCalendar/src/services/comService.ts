import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  private eventSource = new Subject();
  private sendDateSource = new Subject();

  event$ = this.eventSource.asObservable();
  sendDate$ = this.sendDateSource.asObservable();
  
  sendEvents(event: any) {
    this.eventSource.next(event);
  }

  sendDate(date: any) {
    this.sendDateSource.next(date);
  }
}
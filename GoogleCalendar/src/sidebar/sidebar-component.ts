import { Component, Input } from "@angular/core";
import { CommunicationService } from "../services/comService";

@Component({
  selector: "sidebar",
  templateUrl: "./sidebar-template.html",
  styleUrls: ["sidebar-styles.css"]
})
export class SidebarComponent {
  @Input() data: any;

  viewEvents: any = [];

  constructor(private comService: CommunicationService) { }

  onCheckboxClick(state: number, name: string) {
    let person = this.data.find((element: any) => element.name == name);
    if (state == 1) {
      for (const event of person.events) {
        this.viewEvents.push(event);
      }
    } else {
      this.viewEvents = this.viewEvents.filter((event: any) => event.id != person.id);
    }
    this.comService.sendEvents(this.viewEvents);
  }
}
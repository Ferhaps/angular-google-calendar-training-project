import { Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
  selector: "guestInfo",
  templateUrl: "guestInfoTemplate.html",
  styleUrls: ["guestInfoStyles.css"]
})
export class GuestInfoComponent {
  @Input() personInfo!: any;

  @ViewChild('dialog', { static: false }) dialog!: ElementRef;

  onMouseLeave() {
    this.dialog.nativeElement.close();
  }
}
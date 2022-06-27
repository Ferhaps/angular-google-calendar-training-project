import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "menu-button",
  templateUrl: "menu-button-template.html",
  styleUrls: ["menu-button-styles.css"]
})
export class MenuButtonComponent implements OnInit {
  @Input() items: any;

  buttonView!: string;

  ngOnInit() {
    this.buttonView = this.items[0].name;
  }
}
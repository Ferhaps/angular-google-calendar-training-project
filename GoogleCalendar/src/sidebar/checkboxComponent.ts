import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "checkbox-row",
  templateUrl: "checkboxTemplate.html",
  styleUrls: ["checkboxStyles.css"]
})
export class CheckboxComponent {
  @Input() color!: string;
  @Input() name!: string;

  @Output() change = new EventEmitter();

  state: number = 0;
  values: string[] = [ "", "✓" ];
  colors: string[] = [ "white" ];

  ngOnInit() {
    this.colors.push(this.color);
  }

  onClick() {
    this.state++;
    this.state = this.state > 1 ? 0 : this.state;
    this.change.emit(this.state);
  }
}
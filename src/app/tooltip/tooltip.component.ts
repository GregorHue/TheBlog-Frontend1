import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .tooltip .tooltip-inner {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
    .tooltip .arrow::before {
      border-top-color: black;
    }
  `]
})
export class TooltipComponent {

  constructor() { }

}

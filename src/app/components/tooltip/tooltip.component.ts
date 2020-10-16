import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .tooltip {
      display: flex;
      width: 140px;
    }
    .tooltip .tooltip-inner {
      background-color: white;
      color: black;
      border: 1px solid black;
      display: flex;
      flex-wrap: nowrap;
    }
    .tooltip .arrow::before {
      border-top-color: black;
    }
  `]
})
export class TooltipComponent {

  constructor() { }

}

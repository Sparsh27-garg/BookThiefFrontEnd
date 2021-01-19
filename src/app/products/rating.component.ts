import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
      <span *ngFor="let r of range; let i = index">
        <i class="ml-1" [ngClass]="i < rate ? 'fa fa-star' : 'fa fa-star-o'"></i>
      </span>
  `
})
export class RatingComponent {
  range: Array<number> = [1, 2, 3, 4, 5];
  @Input() rate: number;
}

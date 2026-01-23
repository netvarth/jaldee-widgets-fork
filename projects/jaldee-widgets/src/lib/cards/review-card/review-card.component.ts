import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {

  @Input() content: any;
  @Output() actionClicked = new EventEmitter<any>();
  isHovered = false;

  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action });
  }



}








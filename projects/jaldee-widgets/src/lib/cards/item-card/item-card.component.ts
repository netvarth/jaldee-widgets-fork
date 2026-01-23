import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() content: any;
  @Output() actionClicked = new EventEmitter<any>();
  @Input() smallDevice: boolean | undefined;

  _contentClicked(action: { link: string }, target: string) {
    this.actionClicked.emit({ action: action, target: target });
  }

}







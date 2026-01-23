import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {

  @Input() content: any;
  @Output() actionClicked = new EventEmitter<any>();
  isHovered = false;

  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action });
  }



}








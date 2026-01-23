import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-item-zoom-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './item-zoom-card.component.html',
  styleUrls: ['./item-zoom-card.component.scss']
})
export class ItemZoomCardComponent {
  @Input() content: any;
}






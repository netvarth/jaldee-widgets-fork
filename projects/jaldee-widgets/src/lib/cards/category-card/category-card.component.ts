import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() content: any;
}






import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent {
  @Input() content: any;
}






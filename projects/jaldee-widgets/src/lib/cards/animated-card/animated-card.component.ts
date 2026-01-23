import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-animated-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './animated-card.component.html',
  styleUrls: ['./animated-card.component.scss']
})
export class AnimatedCardComponent {

  @Input() content: any;

}








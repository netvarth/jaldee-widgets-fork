import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-animated-card1',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './animated-card1.component.html',
  styleUrls: ['./animated-card1.component.scss']
})
export class AnimatedCard1Component {

  @Input() content: any;

}








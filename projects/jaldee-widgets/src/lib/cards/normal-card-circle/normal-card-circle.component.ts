import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-normal-card-circle',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './normal-card-circle.component.html',
  styleUrls: ['./normal-card-circle.component.scss']
})
export class NormalCardCircleComponent {

  @Input() content: any;

}








import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-normal-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './normal-card.component.html',
  styleUrls: ['./normal-card.component.scss']
})
export class NormalCardComponent {

  @Input() content: any;

}








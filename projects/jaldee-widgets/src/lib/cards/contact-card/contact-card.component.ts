import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  hover = false;
}







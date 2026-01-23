import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-service-card3',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './service-card3.component.html',
  styleUrls: ['./service-card3.component.scss']
})
export class ServiceCard3Component {

  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  isHovered = false;

  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action });
  }



}








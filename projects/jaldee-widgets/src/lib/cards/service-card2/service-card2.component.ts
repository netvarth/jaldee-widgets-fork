import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-service-card2',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './service-card2.component.html',
  styleUrls: ['./service-card2.component.scss']
})
export class ServiceCard2Component {

  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  isHovered = false;

  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action });
  }



}








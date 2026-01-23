import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-banner-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss']
})
export class BannerCardComponent {
  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  isHovered = false;
  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action });
  }
}








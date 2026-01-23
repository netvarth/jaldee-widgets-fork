import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-banner-card1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-card1.component.html',
  styleUrls: ['./banner-card1.component.scss']
})
export class BannerCard1Component {
  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  isHovered = false;
  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action });
  }
}








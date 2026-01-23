import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss']
})
export class AboutCardComponent {

  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  isHovered = false;
  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action });
  }
  getContentStyles() {
    const styles: any = {
      'color': this.content.foregroundColor,
      'background-color': this.content.backgroundColor
    };

    if (this.content.backgroundImage) {
      styles['background-image'] = `url(${this.content.backgroundImage})`;
    }
    return styles;
  }
}








import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-about-card1',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  animations: [
    trigger('bounce', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }), // Start above the viewport
        animate('0.5s ease-out', style({ transform: 'translateY(0)' })), // Bounce down
        animate('0.2s ease-in', style({ transform: 'translateY(-10%)' })),
        animate('0.1s ease-out', style({ transform: 'translateY(0)' }))
      ])
    ]
    )],
  templateUrl: './about-card1.component.html',
  styleUrls: ['./about-card1.component.scss']
})
export class AboutCard1Component {

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








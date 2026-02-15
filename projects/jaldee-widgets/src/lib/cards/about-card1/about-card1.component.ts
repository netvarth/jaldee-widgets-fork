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
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)' })),
        animate('0.2s ease-in', style({ transform: 'translateY(-10%)' })),
        animate('0.1s ease-out', style({ transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './about-card1.component.html',
  styleUrls: ['./about-card1.component.scss']
})
export class AboutCard1Component {

  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  isHovered = false;

  get isSectionInput(): boolean {
    return !!(this.content && typeof this.content === 'object' && Array.isArray(this.content?.content));
  }

  get primaryEntry(): any {
    if (this.isSectionInput && Array.isArray(this.content.content) && this.content.content.length) {
      return this.content.content[0];
    }
    if (Array.isArray(this.content)) {
      return this.content[0] ?? {};
    }
    return this.content ?? {};
  }

  get image(): string | undefined {
    return this.content?.image ?? this.primaryEntry?.image;
  }

  get mobileImage(): string | undefined {
    return this.primaryEntry?.image_mob ?? this.image;
  }

  get titleText(): string {
    return this.primaryEntry?.title ?? this.content?.title ?? '';
  }

  get subTitleText(): string {
    return this.primaryEntry?.subTitle ?? this.content?.subTitle ?? '';
  }

  get description(): string {
    return this.primaryEntry?.description ?? this.content?.description ?? '';
  }

  get descriptionFontSize(): string | undefined {
    return this.primaryEntry?.descriptionFontSize ?? this.content?.descriptionFontSize;
  }

  get titleFontSize(): string | undefined {
    return this.primaryEntry?.titleFontSize ?? this.content?.titleFontSize;
  }

  get subTitleFontSize(): string | undefined {
    return this.primaryEntry?.subTitleFontSize ?? this.content?.subTitleFontSize;
  }

  get textAlignment(): string {
    return this.primaryEntry?.textAlignment ?? this.content?.textAlignment ?? 'start';
  }

  get imageAlignment(): string {
    return this.primaryEntry?.imageAlignment ?? this.content?.imageAlignment ?? 'left';
  }

  get buttonCaption(): string {
    return this.primaryEntry?.buttonCaption ?? this.content?.buttonCaption ?? '';
  }

  get hoverColors(): { foreground?: string; background?: string } {
    const source = this.isSectionInput ? this.content : this.primaryEntry;
    return {
      foreground: source?.foregroundColor,
      background: source?.backgroundColor
    };
  }

  getContentStyles() {
    const source = this.isSectionInput ? this.content : this.primaryEntry;
    const styles: Record<string, string> = {};
    if (source?.foregroundColor) {
      styles['color'] = source.foregroundColor;
    }
    if (source?.backgroundColor) {
      styles['background-color'] = source.backgroundColor;
    }
    if (source?.backgroundImage) {
      styles['background-image'] = `url(${source.backgroundImage})`;
    }
    return styles;
  }

  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action ?? this.primaryEntry });
  }
}








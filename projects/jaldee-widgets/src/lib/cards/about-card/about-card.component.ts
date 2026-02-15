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

  get primaryEntry(): any {
    if (this.isSectionInput && Array.isArray(this.content.content) && this.content.content.length) {
      return this.content.content[0];
    }
    if (Array.isArray(this.content)) {
      return this.content[0] ?? {};
    }
    return this.content ?? {};
  }

  get isSectionInput(): boolean {
    return this.content && typeof this.content === 'object' && Array.isArray(this.content?.content);
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

  get buttonCaption(): string {
    return this.primaryEntry?.buttonCaption ?? this.content?.buttonCaption ?? '';
  }

  get textAlignment(): string {
    return this.primaryEntry?.textAlignment ?? this.content?.textAlignment ?? 'start';
  }

  get imageAlignment(): string {
    return this.primaryEntry?.imageAlignment ?? this.content?.imageAlignment ?? 'left';
  }

  get hoverColors(): { foreground?: string; background?: string } {
    const source = this.isSectionInput ? this.content : this.primaryEntry;
    return {
      foreground: source?.foregroundColor,
      background: source?.backgroundColor
    };
  }

  get titleFontSize(): string | undefined {
    return this.primaryEntry?.titleFontSize ?? this.content?.titleFontSize;
  }

  get subTitleFontSize(): string | undefined {
    return this.primaryEntry?.subTitleFontSize ?? this.content?.subTitleFontSize;
  }

  get descriptionFontSize(): string | undefined {
    return this.primaryEntry?.descriptionFontSize ?? this.content?.descriptionFontSize;
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








import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.scss']
})
export class TestimonialCardComponent {
  @Input() content: any;
  @Input() smallDevice: boolean | undefined;

  get primaryEntry(): any {
    if (this.content && Array.isArray(this.content.content) && this.content.content.length) {
      return this.content.content[0];
    }
    return this.content;
  }

  get fontTitleSize(): string | null {
    return this.primaryEntry?.titleFontSize ?? null;
  }

  get fontSubTitleSize(): string | null {
    return this.primaryEntry?.subTitleFontSize ?? null;
  }

  get fontDescriptionSize(): string | null {
    return this.primaryEntry?.descriptionFontSize ?? null;
  }

  get titleStyles(): Record<string, string> {
    return this.compactStyles({
      'font-size': this.fontTitleSize || '14px',
      'font-weight': this.primaryEntry?.titleFontWeight,
      'font-style': this.primaryEntry?.titleFontStyle,
      'text-align': this.primaryEntry?.titleTextAlign
    });
  }

  get subTitleStyles(): Record<string, string> {
    return this.compactStyles({
      'font-size': this.fontSubTitleSize || '12px',
      'font-weight': this.primaryEntry?.subTitleFontWeight,
      'font-style': this.primaryEntry?.subTitleFontStyle,
      'text-align': this.primaryEntry?.subTitleTextAlign
    });
  }

  get descriptionStyles(): Record<string, string> {
    return this.compactStyles({
      'font-size': this.fontDescriptionSize || '14px',
      'font-weight': this.primaryEntry?.descriptionFontWeight,
      'font-style': this.primaryEntry?.descriptionFontStyle,
      'text-align': this.primaryEntry?.descriptionTextAlign
    });
  }

  private compactStyles(styles: Record<string, unknown>): Record<string, string> {
    return Object.entries(styles).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>);
  }
}

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
}






import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../../utils/lazy-image.directive';

@Component({
  selector: 'app-item-card2',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './item-card2.component.html',
  styleUrls: ['./item-card2.component.scss']
})
export class ItemCard2Component {
  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Input() showOverlay = true;
  @Output() actionClicked = new EventEmitter<any>();

  get image(): string {
    return this.smallDevice
      ? this.content?.image_mob || this.content?.image || ''
      : this.content?.image || '';
  }

  get titleFontSize(): string | null {
    return this.content?.titleFontSize ?? null;
  }

  get subTitleFontSize(): string | null {
    return this.content?.subTitleFontSize ?? null;
  }

  get buttonCaption(): string {
    return this.content?.buttonCaption || 'Shop Now';
  }

  get targetLink(): string | undefined {
    return this.content?.link;
  }

  onButtonClick(event: Event) {
    event.stopPropagation();
    if (this.targetLink) {
      this.actionClicked.emit({ action: { link: this.targetLink } });
    }
  }

  _actionClicked(action: any) {
    if (action?.link) {
      this.actionClicked.emit({ action });
    }
  }

  get truncatedTitle(): string {
    const title = this.content?.title ?? '';
    return title.length > 30 ? `${title.slice(0, 30).trim()}..` : title;
  }
}

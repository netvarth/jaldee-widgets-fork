import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LazyImageDirective } from '../../../utils/lazy-image.directive';

@Component({
  selector: 'app-item-video-card',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './item-video-card.component.html',
  styleUrls: ['./item-video-card.component.scss']
})
export class ItemVideoCardComponent {
  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  isVideoPlaying = false;

  handleClick() {
    if (this.content?.video) {
      this.toggleVideoPlay(true);
      return;
    }
    if (this.content?.buttonHover) {
      return;
    }
    this.actionClicked.emit({ action: this.content });
  }

  getCurrencySymbol(): string {
    return this.content?.currencySymbol ?? '₹';
  }

  getSubtitleFontSize(): Record<string, string> | null {
    return this.compactStyles({
      'font-size': this.content?.subTitleFontSize,
      'font-weight': this.content?.subTitleFontWeight,
      'font-style': this.content?.subTitleFontStyle,
      'text-align': this.content?.subTitleTextAlign
    });
  }

  getTitleFontSize(): Record<string, string> | null {
    return this.compactStyles({
      'font-size': this.content?.titleFontSize,
      'font-weight': this.content?.titleFontWeight,
      'font-style': this.content?.titleFontStyle,
      'text-align': this.content?.titleTextAlign
    });
  }

  private compactStyles(styles: Record<string, unknown>): Record<string, string> | null {
    const compacted = Object.entries(styles).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>);
    return Object.keys(compacted).length ? compacted : null;
  }

  toggleVideoPlay(eventOrForce?: Event | boolean, forcePlay?: boolean) {
    if (eventOrForce instanceof Event) {
      eventOrForce.stopPropagation();
    } else if (typeof eventOrForce === 'boolean') {
      forcePlay = eventOrForce;
    }
    const videoEl = this.videoPlayer?.nativeElement;
    if (!videoEl) {
      return;
    }
    if (forcePlay) {
      videoEl
        .play()
        .then(() => {
          this.isVideoPlaying = true;
        })
        .catch(() => {
          this.isVideoPlaying = false;
        });
      return;
    }

    if (videoEl.paused) {
      videoEl
        .play()
        .then(() => {
          this.isVideoPlaying = true;
        })
        .catch(() => {
          this.isVideoPlaying = false;
        });
    } else {
      videoEl.pause();
      this.isVideoPlaying = false;
    }
  }
}

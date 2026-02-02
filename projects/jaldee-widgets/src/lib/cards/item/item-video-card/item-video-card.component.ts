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
    return this.content?.subTitleFontSize ? { 'font-size': this.content.subTitleFontSize } : null;
  }

  getTitleFontSize(): Record<string, string> | null {
    if (this.content?.titleFontSize) {
      return { 'font-size': this.content.titleFontSize };
    }
    return null;
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

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BannerCardComponent } from '../../cards/banner-card/banner-card.component';
import { BannerCard1Component } from '../../cards/banner-card1/banner-card1.component';
import { applyContentFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, BannerCardComponent, BannerCard1Component],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnChanges {

  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  startY: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }
  }

  playVideo(event: Event) {
    const videoElement = event.target as HTMLVideoElement;
    if (videoElement && videoElement.paused) {
      videoElement.muted = true; // Ensure muted for autoplay
      videoElement.play().catch(() => {
        // If autoplay fails, wait for user interaction
        const attemptPlay = () => {
          videoElement.play().then(() => {
            document.removeEventListener('click', attemptPlay);
            document.removeEventListener('touchstart', attemptPlay);
          }).catch((err) => {
            console.warn('Autoplay retry failed:', err);
          });
        };
  
        document.addEventListener('click', attemptPlay);
        document.addEventListener('touchstart', attemptPlay);
      });
    }
  }

  bannerClicked(action: { link: string }) {
    this.actionClicked.emit({ action });
  }

  onTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    const moveY = event.touches[0].clientY;
    const diffY = moveY - this.startY;
    if (Math.abs(diffY) > 10) {
      event.stopPropagation();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

}





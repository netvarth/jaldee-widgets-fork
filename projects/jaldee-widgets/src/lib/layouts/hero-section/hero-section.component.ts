import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CarouselConfig, EvmCarousel, ResponsiveOption } from '../../utils/evm-carousel/evm-carousel';
import { applyContentFontDefaults } from '../../utils/font-utils';
import { BannerCard1Component } from '../../cards/banner-card1/banner-card1.component';
import { BannerCardComponent } from '../../cards/banner-card/banner-card.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, EvmCarousel, BannerCard1Component, BannerCardComponent],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnChanges {
  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();

  private startY = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) =>
        applyContentFontDefaults(this.section, item)
      );
    }
  }

  get evmCarouselConfig(): CarouselConfig {
    const slides = this.section?.content?.length ?? 0;
    return {
      items: this.getDefaultItems(),
      loop: this.getBooleanOption('loop', false),
      autoplay: this.getBooleanOption('autoplay', false),
      autoplayTimeout: this.numericOption('autoplayTimeout', 5000),
      showNav: this.shouldShowNav(),
      showDots: this.getBooleanOption('dots', slides > 1),
      responsiveOptions: this.buildResponsiveOptions()
    };
  }

  playVideo(event: Event) {
    const videoElement = event.target as HTMLVideoElement;
    if (videoElement && videoElement.paused) {
      videoElement.muted = true;
      videoElement.play().catch(() => {
        const attemptPlay = () => {
          videoElement
            .play()
            .then(() => {
              document.removeEventListener('click', attemptPlay);
              document.removeEventListener('touchstart', attemptPlay);
            })
            .catch((err) => {
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

  getAspectRatioStyle(banner: any): Record<string, string> | null {
    const ratio =
      (this.smallDevice ? banner?.image_mob_aspectRatio : banner?.image_aspectRatio) ??
      banner?.image_mob_aspectRatio;
    return ratio ? { 'aspect-ratio': ratio } : null;
  }

  getOverlayStyles(content: any): Record<string, string> {
    return {
      color: content?.foregroundColor || '#ffffff',
      'background-color': content?.backgroundColor || 'rgba(0,0,0,0.35)'
    };
  }

  getButtonStyles(content: any): Record<string, string> {
    return {
      color: content?.foregroundColor || '#ffffff',
      'background-color': content?.backgroundColor || '#1d1d1d',
      'border-color': content?.foregroundColor || 'transparent'
    };
  }

  private numericOption(key: string, fallback: number): number {
    return this.numericValue(
      this.section?.cols_xs_options?.[key] ?? this.section?.[key],
      fallback
    );
  }

  private numericValue(value: unknown, fallback: number): number {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  }

  private booleanValue(value: unknown, fallback: boolean): boolean {
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true') return true;
      if (normalized === 'false') return false;
    }
    return fallback;
  }

  private getBooleanOption(key: string, fallback: boolean): boolean {
    const option =
      this.section?.cols_xs_options?.[key] ??
      this.section?.cols_md_options?.[key] ??
      this.section?.cols_xl_options?.[key] ??
      this.section?.[key];
    return this.booleanValue(option, fallback);
  }

  private shouldShowNav(): boolean {
    const navOption = this.getBooleanOption('nav', false);
    const slides = this.section?.content?.length ?? 0;
    return navOption && slides > 1;
  }

  private getDefaultItems(): number {
    return (
      this.section?.cols_xl_options?.items ??
      this.section?.cols_md_options?.items ??
      this.section?.cols_xs_options?.items ??
      1
    );
  }

  private buildResponsiveOptions(): ResponsiveOption[] {
    const entries = [
      { option: this.section?.cols_xs_options, breakpoint: '767px' },
      { option: this.section?.cols_md_options, breakpoint: '1023px' },
      { option: this.section?.cols_xl_options, breakpoint: '1439px' }
    ];

    return entries
      .filter((entry) => entry.option && entry.option.items != null)
      .map((entry) => ({
        breakpoint: entry.breakpoint,
        numVisible: this.numericValue(entry.option!.items, 1),
        numScroll: this.numericValue(entry.option!.items, 1)
      }));
  }
}

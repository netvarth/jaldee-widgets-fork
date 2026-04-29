import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { Header, TemplateConfig } from '../../models/template-config.model';
import { CarouselConfig, EvmCarousel, ResponsiveOption } from '../../utils/evm-carousel/evm-carousel';

type Announcement = NonNullable<Header['announcements']>[number] & {
  height?: number | string | null;
  link?: string | null;
};

const DEFAULT_ANNOUNCEMENT_OPTIONS: Record<string, unknown> = {
  items: 1,
  loop: true,
  margin: 0,
  autoplay: true,
  autoplayTimeout: 5000,
  dots: false,
  center: false,
  nav: true
};

@Component({
  selector: 'app-pre-header',
  standalone: true,
  imports: [CommonModule, EvmCarousel],
  templateUrl: './pre-header.component.html',
  styleUrls: ['./pre-header.component.scss']
})
export class PreHeaderComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() header?: Header;
  @Input() announcements?: Header['announcements'];
  @Input() config?: TemplateConfig;
  @Input() carouselConfig?: Partial<CarouselConfig>;
  @Output() actionClicked = new EventEmitter<any>();
  @ViewChild(EvmCarousel) carousel?: EvmCarousel;

  visibleAnnouncements: Announcement[] = [];
  preHeaderCarouselConfig: CarouselConfig = this.buildCarouselConfig(0);
  private autoplayTimer: any;
  private autoplayEnabled = false;
  private viewReady = false;

  ngOnChanges(): void {
    this.visibleAnnouncements = this.items.filter(
      (announcement) => (announcement?.message ?? '').trim().length > 0
    );
    this.preHeaderCarouselConfig = this.buildCarouselConfig(this.visibleAnnouncements.length);
    this.syncAutoplay();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.syncAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.preHeaderCarouselConfig = this.buildCarouselConfig(this.visibleAnnouncements.length);
    this.syncAutoplay();
  }

  get items(): Announcement[] {
    const items = this.announcements?.length
      ? this.announcements
      : this.header?.announcements?.length
        ? this.header.announcements
        : this.config?.header?.announcements || [];

    return items as Announcement[];
  }

  private buildCarouselConfig(slides: number): CarouselConfig {
    const carouselConfig = { ...(this.carouselConfig || {}) };
    delete carouselConfig.autoplay;
    delete carouselConfig.showNav;
    delete carouselConfig.showDots;

    const options = this.currentAnnouncementOptions;
    const items = this.numericValue(this.carouselConfig?.items ?? options?.['items'], 1);
    const canSlide = slides > items;
    const loop =
      canSlide && this.booleanValue(this.carouselConfig?.loop ?? options?.['loop'], true);
    const nav =
      canSlide && this.booleanValue(this.carouselConfig?.showNav ?? options?.['nav'], true);
    const dots =
      canSlide && this.booleanValue(this.carouselConfig?.showDots ?? options?.['dots'], false);

    this.autoplayEnabled =
      canSlide && this.booleanValue(this.carouselConfig?.autoplay ?? options?.['autoplay'], true);

    return {
      items,
      loop,
      autoplay: false,
      autoplayTimeout: this.numericValue(
        this.carouselConfig?.autoplayTimeout ?? options?.['autoplayTimeout'],
        5000
      ),
      showNav: nav,
      showDots: dots,
      responsiveOptions: this.buildResponsiveOptions(),
      itemPadding: this.numericValue(this.carouselConfig?.itemPadding ?? options?.['margin'], 0),
      stagePadding: 0,
      center: this.booleanValue(this.carouselConfig?.center ?? options?.['center'], false),
      keyboard: true,
      ...carouselConfig
    };
  }

  private syncAutoplay(): void {
    this.stopAutoplay();

    if (
      !this.viewReady ||
      !this.carousel ||
      this.visibleAnnouncements.length <= 1 ||
      !this.autoplayEnabled
    ) {
      return;
    }

    this.autoplayTimer = setInterval(
      () => this.carousel?.next(),
      this.preHeaderCarouselConfig.autoplayTimeout || 5000
    );
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  get arrowColor(): string {
    const first = this.visibleAnnouncements[0];
    return (first?.foregroundColor as string) || '#000';
  }

  getAnnouncementHeight(announcement: Announcement): string | null {
    const height = Number(announcement?.height);
    if (!Number.isFinite(height) || height <= 0) {
      return null;
    }
    return `${height}px`;
  }

  announcementClicked(announcement: Announcement): void {
    if (!this.hasAnnouncementLink(announcement)) {
      return;
    }
    this.actionClicked.emit({ action: announcement, target: 'preheader' });
  }

  hasAnnouncementLink(announcement: Announcement): boolean {
    return typeof announcement?.link === 'string' && announcement.link.trim().length > 0;
  }

  private get currentAnnouncementOptions(): Record<string, unknown> {
    const responsiveness = this.resolvedAnnouncementResponsiveness;
    const width = typeof window === 'undefined' ? Number.MAX_SAFE_INTEGER : window.innerWidth;

    if (width <= 767) {
      return responsiveness.cols_xs_options || DEFAULT_ANNOUNCEMENT_OPTIONS;
    }
    if (width <= 1023) {
      return (
        responsiveness.cols_md_options ||
        responsiveness.cols_xs_options ||
        DEFAULT_ANNOUNCEMENT_OPTIONS
      );
    }
    return (
      responsiveness.cols_xl_options ||
      responsiveness.cols_md_options ||
      responsiveness.cols_xs_options ||
      DEFAULT_ANNOUNCEMENT_OPTIONS
    );
  }

  private buildResponsiveOptions(): ResponsiveOption[] {
    const responsiveness = this.resolvedAnnouncementResponsiveness;
    const entries = [
      { option: responsiveness?.cols_xs_options, breakpoint: '767px' },
      { option: responsiveness?.cols_md_options, breakpoint: '1023px' },
      { option: responsiveness?.cols_xl_options, breakpoint: '1439px' }
    ];

    return entries
      .filter((entry) => entry.option && entry.option['items'] != null)
      .map((entry) => ({
        breakpoint: entry.breakpoint,
        numVisible: this.numericValue(entry.option!['items'], 1),
        numScroll: this.numericValue(entry.option!['items'], 1)
      }));
  }

  private get resolvedAnnouncementResponsiveness(): NonNullable<Header['announcement_responsiveness']> {
    const responsiveness =
      this.header?.announcement_responsiveness || this.config?.header?.announcement_responsiveness;

    return {
      cols_xs_options: {
        ...DEFAULT_ANNOUNCEMENT_OPTIONS,
        ...(responsiveness?.cols_xs_options || {})
      },
      cols_md_options: {
        ...DEFAULT_ANNOUNCEMENT_OPTIONS,
        ...(responsiveness?.cols_md_options || responsiveness?.cols_xs_options || {})
      },
      cols_xl_options: {
        ...DEFAULT_ANNOUNCEMENT_OPTIONS,
        ...(responsiveness?.cols_xl_options ||
          responsiveness?.cols_md_options ||
          responsiveness?.cols_xs_options ||
          {})
      }
    };
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
}



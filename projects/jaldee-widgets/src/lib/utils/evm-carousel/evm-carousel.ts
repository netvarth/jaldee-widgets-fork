import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

export interface ResponsiveOption {
  breakpoint: string; // e.g. '1024px' 
  numVisible: number; // items to show 
  numScroll: number; // items to scroll per click
}

// carousel-config.model.ts
export interface CarouselConfig {
  items: number;
  autoplay?: boolean;
  autoplayTimeout?: number;
  loop?: boolean;
  showDots?: boolean;
  showNav?: boolean;
  responsiveOptions?: ResponsiveOption[];
  stagePadding?: number;   // peek effect
  itemPadding?: number;    // space between items
  center?: boolean;        // center mode
  lazyLoad?: boolean;      // lazy load images
  keyboard?: boolean;      // enable arrow key navigation
}


@Component({
  selector: 'evm-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evm-carousel.html',
  styleUrls: ['./evm-carousel.css']
})
export class EvmCarousel implements OnInit, OnDestroy, OnChanges {

  readonly Math = Math; // 👈 add this line

  @Input() config!: CarouselConfig;
  @Input() items: any[] = [];
  @ViewChild('stage', { static: true }) stageRef?: ElementRef<HTMLElement>;
  // @ContentChild('itemTemplate', { read: TemplateRef }) userTemplate?: TemplateRef<any>;
  // @ViewChild('defaultTemplate', { static: true }) defaultTemplate?: TemplateRef<any>;

  @ContentChild('itemTemplate', { read: TemplateRef })
  userTemplate: TemplateRef<any> | null = null;

  @ViewChild('defaultTemplate', { static: true })
  defaultTemplate!: TemplateRef<any>;

  @Output() itemClick = new EventEmitter<{
    item: any;
    index: number;
    renderedIndex: number;
  }>();



  currentIndex = 0;
  intervalId: any;
  loopResetTimer: any;
  itemsToShow: number;
  renderedItems: any[] = [];
  disableTransition = false;
  private transitionDurationMs = 500;
  private isResetting = false;
  private pointerActive = false;
  private pointerStartX = 0;
  private pointerStartY = 0;
  private pointerId: number | null = null;
  constructor() {
    this.itemsToShow = 1;
  }
  ngOnInit() {
    console.log('EvmCarousel config:', this.config);
    console.log('EvmCarousel items:', this.items);
    this.calculateResponsiveItems(true);
    if (this.config.autoplay) {
      this.startAutoplay();
    }
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.loopResetTimer) {
      clearTimeout(this.loopResetTimer);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    const itemsChange = changes['items'];
    if (itemsChange && !itemsChange.isFirstChange()) {
      this.buildRenderedItems();
    }
  }
  @HostListener('window:resize')
  onWindowResize() {
    this.calculateResponsiveItems();
  }

  private pointerCaptured = false;
  private pointerDownItemIndex: number | null = null;
  private tapThreshold = 10;

  onPointerDown(event: PointerEvent) {
    this.pointerActive = true;
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;
    this.pointerId = event.pointerId;
    this.pointerCaptured = false;
    this.pointerDownItemIndex = this.getRenderedIndexFromTarget(event.target);
  }

  onPointerMove(event: PointerEvent) {
    if (!this.pointerActive || event.pointerId !== this.pointerId) {
      return;
    }
    const dx = event.clientX - this.pointerStartX;
    const dy = event.clientY - this.pointerStartY;
    const threshold = 10;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      if (!this.pointerCaptured) {
        this.stageRef?.nativeElement?.setPointerCapture?.(event.pointerId);
        this.pointerCaptured = true;
      }
      event.preventDefault();
    }
  }

  onPointerUp(event: PointerEvent) {
    if (!this.pointerActive || event.pointerId !== this.pointerId) {
      return;
    }
    const dx = event.clientX - this.pointerStartX;
    const dy = event.clientY - this.pointerStartY;
    const minDistance = 30;
    const didSwipe = Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minDistance;
    if (didSwipe) {
      if (dx < 0) {
        this.next();
      } else {
        this.prev();
      }
    } else if (
      Math.abs(dx) <= this.tapThreshold &&
      Math.abs(dy) <= this.tapThreshold &&
      this.pointerDownItemIndex != null
    ) {
      this.handleItemClick(this.pointerDownItemIndex);
    }
    this.resetPointer(event.pointerId);
  }

  onPointerCancel(event: PointerEvent) {
    if (event.pointerId === this.pointerId) {
      this.resetPointer(event.pointerId);
    }
  }

  private resetPointer(pointerId: number | null) {
    this.pointerActive = false;
    if (pointerId != null) {
      try {
        const stageEl = this.stageRef?.nativeElement;
        if (this.pointerCaptured) {
          stageEl?.releasePointerCapture?.(pointerId);
          this.pointerCaptured = false;
        }
      } catch { }
    }
    this.pointerId = null;
    this.pointerDownItemIndex = null;
  }

  private getRenderedIndexFromTarget(target: EventTarget | null): number | null {
    let element = target as HTMLElement | null;
    const stageEl = this.stageRef?.nativeElement;
    while (element && element !== stageEl) {
      const attr = element.getAttribute?.('data-rendered-index');
      if (attr != null) {
        const parsed = Number(attr);
        if (Number.isFinite(parsed)) {
          return parsed;
        }
      }
      element = element.parentElement;
    }
    return null;
  }

  private calculateResponsiveItems(force = false) {

    const width = window.innerWidth;

    // ✅ CENTER MODE LOGIC
    if (this.config.center) {

      let baseItems = this.config.items || 1;

      if (this.config.responsiveOptions?.length) {
        for (const option of this.config.responsiveOptions) {
          const bp = parseInt(option.breakpoint, 10);
          if (width <= bp) {
            baseItems = option.numVisible;
            break;
          }
        }
      }

      const oddItems = this.normalizeCenterItems(baseItems);

      if (force || this.itemsToShow !== oddItems) {
        this.itemsToShow = oddItems;
        this.buildRenderedItems();
      }

      return;
    }

    // ✅ DEFAULT (unchanged behavior)
    if (this.config.responsiveOptions?.length) {
      for (const option of this.config.responsiveOptions) {
        const bp = parseInt(option.breakpoint, 10);
        if (width <= bp) {
          const target = this.normalizeItemsToShow(option.numVisible);
          if (force || this.itemsToShow !== target) {
            this.itemsToShow = target;
            this.buildRenderedItems();
          }
          return;
        }
      }
    }

    const fallback = this.normalizeItemsToShow(this.config.items);
    if (force || this.itemsToShow !== fallback) {
      this.itemsToShow = fallback;
      this.buildRenderedItems();
    }
  }

  private normalizeCenterItems(value: number): number {
    let num = Math.max(1, Math.floor(Number(value) || 1));

    // make it odd
    if (num % 2 === 0) {
      num = num - 1;
    }

    return num < 1 ? 1 : num;
  }


  private normalizeItemsToShow(value: number): number {
    const num = Number(value);
    return num >= 1 ? Math.floor(num) : 1;
  }

  @HostListener('document:keydown.arrowright')
  handleRight() {
    if (this.config.keyboard)
      this.next();
  }
  @HostListener('document:keydown.arrowleft')
  handleLeft() {
    if (this.config.keyboard)
      this.prev();
  }
  startAutoplay() {
    this.intervalId = setInterval(() => this.next(), this.config.autoplayTimeout || 3000);
  }
  next() {
    if (!this.renderedItems.length || this.isResetting) {
      return;
    }
    const maxIndex = Math.max(0, this.renderedItems.length - this.itemsToShow);
    this.disableTransition = false;
    this.currentIndex++;
    if (this.config.loop) {
      if (this.currentIndex >= maxIndex) {
        this.scheduleLoopReset('next');
      }
      return;
    }
    if (this.currentIndex > maxIndex) {
      this.currentIndex = maxIndex;
    }
  }
  prev() {
    if (!this.renderedItems.length || this.isResetting) {
      return;
    }
    this.disableTransition = false;
    this.currentIndex--;
    if (this.config.loop) {
      if (this.currentIndex < this.itemsToShow) {
        this.scheduleLoopReset('prev');
      }
      return;
    }
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }
  }
  goTo(index: number) {
    this.setIndex(index);
  }

  goToOriginalIndex(index: number, alignCenter = false) {
    const centerOffset = alignCenter ? Math.floor(this.itemsToShow / 2) : 0;
    const baseIndex = this.config.loop ? this.itemsToShow : 0;
    this.setIndex(baseIndex + index - centerOffset);
  }

  private setIndex(value: number) {
    if (!this.renderedItems.length) {
      this.currentIndex = 0;
      return;
    }
    this.disableTransition = false;
    const maxIndex = Math.max(0, this.renderedItems.length - this.itemsToShow);
    const clamped = Math.min(Math.max(Math.floor(value), 0), maxIndex);
    this.currentIndex = clamped;
  }

  private buildRenderedItems() {
    const slides = Array.isArray(this.items) ? [...this.items] : [];
    if (this.loopResetTimer) {
      clearTimeout(this.loopResetTimer);
      this.loopResetTimer = null;
    }
    this.isResetting = false;
    if (!slides.length) {
      this.renderedItems = [];
      this.currentIndex = 0;
      return;
    }
    if (this.config.loop) {
      const before = this.createClones(slides, this.itemsToShow, true);
      const after = this.createClones(slides, this.itemsToShow, false);
      this.renderedItems = [...before, ...slides, ...after];
      this.currentIndex = this.itemsToShow;
    } else {
      this.renderedItems = [...slides];
      this.currentIndex = 0;
    }
    this.disableTransition = true;
    requestAnimationFrame(() => requestAnimationFrame(() => (this.disableTransition = false)));
  }

  private createClones(slides: any[], count: number, before: boolean): any[] {
    if (!slides.length || count <= 0) {
      return [];
    }
    const clones: any[] = [];
    const len = slides.length;
    if (before) {
      for (let i = count; i > 0; i--) {
        const index = (len - i + len) % len;
        clones.push(slides[index]);
      }
    } else {
      for (let i = 0; i < count; i++) {
        clones.push(slides[i % len]);
      }
    }
    return clones;
  }

  private scheduleLoopReset(direction: 'next' | 'prev') {
    if (!this.renderedItems.length) {
      return;
    }
    if (this.loopResetTimer) {
      clearTimeout(this.loopResetTimer);
    }
    this.isResetting = true;
    this.loopResetTimer = setTimeout(() => {
      this.disableTransition = true;
      if (direction === 'next') {
        this.currentIndex = this.itemsToShow;
      } else {
        const lastStartIndex = this.renderedItems.length - this.itemsToShow * 2;
        this.currentIndex = lastStartIndex >= 0 ? lastStartIndex : this.itemsToShow;
      }
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          this.disableTransition = false;
          this.isResetting = false;
        })
      );
    }, this.transitionDurationMs);
  }

  get transitionStyle(): string {
    return this.disableTransition ? 'none' : 'transform 0.5s ease-in-out';
  }
  getFlex(): string {
    return '0 0 ' + (100 / this.itemsToShow) + '%';
  }

  getTransform(): string {
    const percentage = 100 / this.itemsToShow;
    return 'translateX(-' + (this.currentIndex * percentage) + '%)';
  }

  handleItemClick(renderedIndex: number): void {
    const slides = Array.isArray(this.items) ? this.items : [];
    if (!slides.length) {
      return;
    }
    const loopBase = this.config.loop ? this.itemsToShow : 0;
    const rawIndex = renderedIndex - loopBase;
    const normalizedIndex =
      ((rawIndex % slides.length) + slides.length) % slides.length;
    const alignCenter = !!this.config.center;
    const centerIndex = this.currentIndex + Math.floor(this.itemsToShow / 2);
    const shouldRecenterOnly = alignCenter && renderedIndex !== centerIndex;
    this.goToOriginalIndex(normalizedIndex, alignCenter);
    if (shouldRecenterOnly) {
      return;
    }
    this.itemClick.emit({
      item: slides[normalizedIndex],
      index: normalizedIndex,
      renderedIndex
    });
  }

  isCenter(idx: number): boolean {
  if (!this.config?.center) return false;

  const centerIndex = this.currentIndex + Math.floor(this.itemsToShow / 2);
  return idx === centerIndex;
}
getItemScale(idx: number): number {
  if (!this.config.center) return 1;

  const centerIndex = this.currentIndex + Math.floor(this.itemsToShow / 2);
  const distance = Math.abs(idx - centerIndex);

  if (distance === 0) return 1;        // center
  if (distance === 1) return 0.85;     // near center
  if (distance === 2) return 0.75;     // far
  return 0.85;                         // default for safety
}


}

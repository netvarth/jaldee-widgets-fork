import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef
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
export class EvmCarousel implements OnInit, OnDestroy {
  @Input() config!: CarouselConfig;
  @Input() items: any[] = [];
  currentIndex = 0;
  intervalId: any;
  itemsToShow: number;
  constructor() {
    this.itemsToShow = 1;
  }
  ngOnInit() {
    console.log('EvmCarousel config:', this.config);
    console.log('EvmCarousel items:', this.items);
    this.applyResponsive();
    if (this.config.autoplay)
      this.startAutoplay();
  } ngOnDestroy() {
    if (this.intervalId)
      clearInterval(this.intervalId);
  }
  @HostListener('window:resize')
  applyResponsive() {
    const width = window.innerWidth;

    if (this.config.responsiveOptions && this.config.responsiveOptions.length) {
      for (const option of this.config.responsiveOptions) {
        const bp = parseInt(option.breakpoint, 10); // '1024px' → 1024
        if (width <= bp) {
          this.itemsToShow = option.numVisible;
          // you could also store option.numScroll if you want scroll step size
          return;
        }
      }
    }

    // fallback to default
    this.itemsToShow = this.config.items;
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
    if (this.currentIndex < this.items.length - this.itemsToShow) {
      this.currentIndex++;
    } else if (this.config.loop) {
      this.currentIndex = 0;
    }
  }
  prev() {
    if (this.currentIndex > 0) { this.currentIndex--; }
    else if (this.config.loop) {
      this.currentIndex = this.items.length - this.itemsToShow;
    }
  }
  goTo(index: number) { this.currentIndex = index; }
}

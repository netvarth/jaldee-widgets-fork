import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NormalCardCircleComponent } from '../../cards/normal-card-circle/normal-card-circle.component';
import { AnimatedCard1Component } from '../../cards/animated-card1/animated-card1.component';
import { AnimatedCardComponent } from '../../cards/animated-card/animated-card.component';
import { ItemCardComponent } from '../../cards/item/item-card/item-card.component';
import { ItemCard2Component } from '../../cards/item/item-card2/item-card2.component';
import { NormalCardComponent } from '../../cards/normal-card/normal-card.component';
import { ServiceCardComponent } from '../../cards/service-card/service-card.component';
import { ServiceCard3Component } from '../../cards/service-card3/service-card3.component';
import { ServiceCard2Component } from '../../cards/service-card2/service-card2.component';
import { ReviewCardComponent } from '../../cards/review-card/review-card.component';
import { TestimonialCardComponent } from '../../cards/testimonial-card/testimonial-card.component';
import { TextCardComponent } from '../../cards/text-card/text-card.component';
import { applyContentFontDefaults } from '../../utils/font-utils';
import { CarouselConfig, EvmCarousel, ResponsiveOption } from '../../utils/evm-carousel/evm-carousel';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule,
    NormalCardComponent,
    NormalCardCircleComponent,
    ItemCardComponent,
    ItemCard2Component,
    AnimatedCardComponent,
    AnimatedCard1Component,
    ServiceCardComponent,
    ServiceCard2Component,
    ServiceCard3Component,
    ReviewCardComponent,
    TestimonialCardComponent,
    TextCardComponent,
    EvmCarousel
  ],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges {

  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  className: string = '';
  centerMode = false;
  @ViewChild(EvmCarousel) carousel?: EvmCarousel;

  ngOnChanges(changes: SimpleChanges): void {
    this.className = [
      this.section?.className,
      this.section?.titlePosition
    ].filter(Boolean).join(' ');
    this.centerMode = this.getBooleanOption('center', false);

    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) =>
        applyContentFontDefaults(this.section, item)
      );
    }
  }

  get sliderCarouselConfig(): CarouselConfig {
    const slides = this.section?.content?.length ?? 0;
    const items = this.getDefaultItems();
    return {
      items,
      loop: this.getBooleanOption('loop', false),
      autoplay: this.getBooleanOption('autoplay', false),
      autoplayTimeout: this.numericOption('autoplayTimeout', 5000),
      showNav: this.shouldShowNav(items),
      showDots: this.getBooleanOption('dots', slides > 1),
      responsiveOptions: this.buildResponsiveOptions(),
      itemPadding: this.numericOption('margin', 16),
      stagePadding: this.numericOption('stagePadding', 0),
      center: this.getBooleanOption('center', false)
    };
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

  private getDefaultItems(): number {
    return (
      this.section?.cols_xl_options?.items ??
      this.section?.cols_md_options?.items ??
      this.section?.cols_xs_options?.items ??
      1
    );
  }

  private numericOption(key: string, fallback: number): number {
    return this.numericValue(
      this.section?.cols_xl_options?.[key] ??
        this.section?.cols_md_options?.[key] ??
        this.section?.cols_xs_options?.[key] ??
        this.section?.[key],
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
      this.section?.cols_xl_options?.[key] ??
      this.section?.cols_md_options?.[key] ??
      this.section?.cols_xs_options?.[key] ??
      this.section?.[key];
    return this.booleanValue(option, fallback);
  }

  private shouldShowNav(items: number): boolean {
    const slides = this.section?.content?.length ?? 0;
    const navOption =
      this.section?.cols_xs_options?.nav ??
      this.section?.cols_md_options?.nav ??
      this.section?.cols_xl_options?.nav ??
      this.section?.nav;
    if (navOption != null) {
      return this.booleanValue(navOption, false) && slides > Math.max(1, Math.floor(items));
    }
    return slides > Math.max(1, Math.floor(items));
  }

  onCarouselItemClick(event: { item: any; index: number; renderedIndex: number }) {
    if (event?.item && !event.item?.buttonOnHover) {
      this._actionClicked(event.item, event.item?.link);
    }
  }

  getActionAspectRatio(action: any): Record<string, string> | null {
    const ratio =
      this.smallDevice && action?.image_mob_aspectRatio
        ? action.image_mob_aspectRatio
        : action?.image_aspectRatio || action?.image_mob_aspectRatio;
    return ratio ? { 'aspect-ratio': ratio.toString() } : null;
  }

  _actionClicked(action: { link: string }, target: string) {
    this.actionClicked.emit({ action: action, target: target });
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  moreClicked(link: string) {
    this.actionClicked.emit({ action: { link }, target: this.section?.id, type: 'more' });
  }

  shouldShowItemCardDetails(renderedIndex: number): boolean {
    if (!this.centerMode) {
      return true;
    }
    if (!this.carousel) {
      return renderedIndex === 0;
    }
    return this.carousel.isCenter(renderedIndex);
  }
}






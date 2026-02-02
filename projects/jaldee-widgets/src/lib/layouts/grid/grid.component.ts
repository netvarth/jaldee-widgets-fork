import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NormalCardComponent } from '../../cards/normal-card/normal-card.component';
import { ItemCardComponent } from '../../cards/item/item-card/item-card.component';
import { ItemCardComponent1 } from '../../cards/item/item-card1/item-card1.component';
import { ItemVideoCardComponent } from '../../cards/item/item-video-card/item-video-card.component';
import { AnimatedCardComponent } from '../../cards/animated-card/animated-card.component';
import { AnimatedCard1Component } from '../../cards/animated-card1/animated-card1.component';
import { NormalCardCircleComponent } from '../../cards/normal-card-circle/normal-card-circle.component';
import { ServiceCardComponent } from '../../cards/service-card/service-card.component';
import { ServiceCard2Component } from '../../cards/service-card2/service-card2.component';
import { ServiceCard3Component } from '../../cards/service-card3/service-card3.component';
import { ReviewCardComponent } from '../../cards/review-card/review-card.component';
import { AboutCardComponent } from '../../cards/about-card/about-card.component';
import { ContactCardComponent } from '../../cards/contact-card/contact-card.component';
import { AboutCard1Component } from '../../cards/about-card1/about-card1.component';
import { ServiceCard4Component } from '../../cards/service-card4/service-card4.component';
import { CategoryCardComponent } from '../../cards/category-card/category-card.component';
import { LazyImageDirective } from '../../utils/lazy-image.directive';
import { applyContentFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, NormalCardComponent, NormalCardCircleComponent,
    ItemCardComponent, ItemCardComponent1, ItemVideoCardComponent, AnimatedCardComponent, AnimatedCard1Component, ServiceCardComponent,
    ServiceCard2Component, ServiceCard3Component, ServiceCard4Component, ReviewCardComponent, AboutCardComponent,
    AboutCard1Component, ContactCardComponent, CategoryCardComponent, LazyImageDirective],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnChanges {

  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  className: string = '';
  gridColumns: string = '';
  isHovered = false;

  constructor(private sanitizer: DomSanitizer) {}

  getHTMLContent(description: string) {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  _actionClicked(item: any, target: string) {
    this.actionClicked.emit({ action: item, target });
  }

  itemClicked(action: { link: string }) {
    this.actionClicked.emit({ action });
  }

  moreClicked(link: string) {
    this.actionClicked.emit({ action: { link }, target: this.section?.id, type: 'more' });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.className = [
      this.section?.className,
      this.section?.titlePosition
    ].filter(Boolean).join(' ');

    this.calculateGridColumns();

    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }

  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.calculateGridColumns();
  }

  private calculateGridColumns(): void {
    this.gridColumns = this.section ? this.buildGridTemplateColumns(this.section) : '';
  }

  private buildGridTemplateColumns(section: any): string {
    const columnCount = Math.max(1, this.getColumnCount(section));
    const percentage = 100 / columnCount;
    return `repeat(${columnCount}, ${percentage}%)`;
  }

  private getColumnCount(section: any): number {
    const deviceItems = this.toValidItemCount(this.getDeviceOption(section)?.['items']);
    if (deviceItems != null) {
      return deviceItems;
    }

    const responsiveItems = this.getResponsiveItemCount(section);
    if (responsiveItems != null) {
      return responsiveItems;
    }

    const fallbackItems =
      section?.cols_xl_options?.['items'] ??
      section?.cols_md_options?.['items'] ??
      section?.cols_xs_options?.['items'] ??
      1;
    return this.toValidItemCount(fallbackItems) ?? 1;
  }

  private getDeviceOption(section: any): Record<string, unknown> | undefined {
    if (this.smallDevice) {
      return section?.cols_xs_options;
    }
    if (this.mediumDevice) {
      return section?.cols_md_options;
    }
    return section?.cols_xl_options;
  }

  private getResponsiveItemCount(section: any): number | null {
    const entries = this.buildBreakpointEntries(section);
    if (!entries.length) {
      return null;
    }
    const width = this.getWindowWidth();
    for (const entry of entries) {
      if (width <= entry.breakpoint) {
        return entry.items;
      }
    }
    return entries[entries.length - 1].items;
  }

  private buildBreakpointEntries(section: any): Array<{ breakpoint: number; items: number }> {
    const entries: Array<{ breakpoint: number; items: number }> = [];

    const pushEntry = (breakpoint: string | number | undefined, value: unknown): void => {
      const parsedBreakpoint = this.parseBreakpoint(breakpoint);
      const itemCount = this.toValidItemCount(value);
      if (Number.isFinite(parsedBreakpoint) && itemCount != null) {
        entries.push({ breakpoint: parsedBreakpoint, items: itemCount });
      }
    };

    if (Array.isArray(section?.responsiveOptions)) {
      for (const option of section.responsiveOptions) {
        pushEntry(option?.breakpoint, option?.numVisible ?? option?.['items']);
      }
    }

    pushEntry('767px', section?.cols_xs_options?.['items']);
    pushEntry('1023px', section?.cols_md_options?.['items']);
    pushEntry('1439px', section?.cols_xl_options?.['items']);

    return entries.sort((a, b) => a.breakpoint - b.breakpoint);
  }

  private parseBreakpoint(value: string | number | undefined): number {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      return Number.isFinite(parsed) ? parsed : NaN;
    }
    return NaN;
  }

  private toValidItemCount(value: unknown): number | null {
    const num = Number(value);
    if (Number.isFinite(num) && num >= 1) {
      return Math.max(1, Math.floor(num));
    }
    return null;
  }

  private getWindowWidth(): number {
    return typeof window !== 'undefined' ? window.innerWidth : Number.MAX_SAFE_INTEGER;
  }

}

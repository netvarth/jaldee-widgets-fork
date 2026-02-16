import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AboutUsComponent,
  BannerWithContentComponent,
  BlogComponent,
  FooterData,
  GridComponent,
  HeaderData,
  HeroSectionComponent,
  ImageWithContentsComponent,
  Layout1Component,
  LazyLoadDirective,
  MarqueeComponent,
  PreHeaderComponent,
  PreviewFooterComponent,
  PreviewHeaderComponent,
  SliderComponent,
  Testimonials2Component,
  TestimonialsComponent,
  WithoutCardsComponent
} from 'jaldee-widgets';
import { previewTemplateConfig } from './preview-template.config';
type HeaderVariant = 'minimal' | 'fashion';
@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PreHeaderComponent,
    BannerWithContentComponent,
    HeroSectionComponent,
    GridComponent,
    ImageWithContentsComponent,
    SliderComponent,
    WithoutCardsComponent,
    AboutUsComponent,
    TestimonialsComponent,
    Testimonials2Component,
    BlogComponent,
    MarqueeComponent,
    Layout1Component,
    LazyLoadDirective,
    PreviewFooterComponent,
    PreviewHeaderComponent
  ],
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss']
})
export class PreviewPageComponent implements OnInit {
  previewConfig = previewTemplateConfig;
  config = previewTemplateConfig;
  smallDevice = false;
  mediumDevice = false;
  private loadedFonts = new Set<string>();
  private readonly smallBreakpoint = 767;
  private readonly mediumBreakpoint = 1023;

  headerCartCount = 0;
  headerWishlistCount = 0;
  headerLoggedIn = false;

  ngOnInit(): void {
    this.updateDeviceFlags(this.getWindowWidth());
    this.loadFontFromConfig(
      this.resolveString(this.config['primaryCustomFontUrl']) ||
        this.extractFontName(this.resolveString(this.config['primaryFont']))
    );
    this.loadFontFromConfig(
      this.resolveString(this.config['secondaryCustomFontUrl']) ||
        this.extractFontName(this.resolveString(this.config['secondaryFont']))
    );
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateDeviceFlags(this.getWindowWidth());
  }

  private getWindowWidth(): number {
    return typeof window !== 'undefined' ? window.innerWidth : Number.MAX_SAFE_INTEGER;
  }

  private updateDeviceFlags(width: number): void {
    this.smallDevice = width <= this.smallBreakpoint;
    this.mediumDevice = width > this.smallBreakpoint && width <= this.mediumBreakpoint;
  }

  trackByFn(index: number, section: any): string | number {
    return section?.id ?? index;
  }

  getSectionClasses(section: any): string {
    return [section?.className, section?.classType, section?.containerType]
      .filter(Boolean)
      .join(' ');
  }

  logVisibility(section: any): void {
    section['loaded'] = true;
  }

  actionClicked(event: any): void {
    console.log('Preview action:', event);
  }

  getFontFamily(): string {
    const font = this.resolveString(this.config['primaryFont']);
    const customUrl = this.resolveString(this.config['primaryCustomFontUrl']);
    return font === 'custom' ? customUrl || font : font;
  }

  getPreviewRootStyles(): Record<string, string> {
    const fontFamily = this.getFontFamily();
    return {
      'font-family': fontFamily,
      color: this.resolveString(this.config['foregroundColor']) || '#1f2933',
      background: this.resolveString(this.config['backgroundColor']) || '#fffaf4'
    };
  }

  private loadFontFromConfig(fontName: string | null): void {
    if (!fontName) return;
    const normalized = fontName.replace(/\s+/g, ' ').trim();
    if (!normalized || this.loadedFonts.has(normalized)) {
      return;
    }
    const family = normalized.replace(/ /g, '+');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`;
    document.head.appendChild(link);
    this.loadedFonts.add(normalized);
  }

  private extractFontName(fontValue: string): string | null {
    if (!fontValue) {
      return null;
    }
    const [first] = fontValue.split(',');
    return first.replace(/['"]/g, '').trim() || null;
  }

  private resolveString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  get headerShowSearch(): boolean {
    return this.previewConfig.header?.['showSearch'] !== false;
  }

  get headerShowCart(): boolean {
    return this.previewConfig.header?.['showCart'] !== false;
  }

  get headerHideItemSearch(): boolean {
    return this.previewConfig.header?.['hideItemSearch'] === true;
  }

  get footer(): FooterData | undefined {
    return this.previewConfig['footer'] as FooterData | undefined;
  }

  get headerData(): HeaderData | undefined {
    const header = this.previewConfig['header'] as HeaderData | undefined;
    if (!header) {
      return undefined;
    }
    return {
      ...header,
      logo: header.logo || this.previewConfig.logo
    };
  }

  get headerVariant(): HeaderVariant {
    const headerName = (this.headerData?.name ?? '').toLowerCase();
    if (headerName?.includes('fashion')) {
      return 'fashion';
    }
    if (headerName?.includes('minimal')) {
      return 'minimal';
    }
    return 'minimal';
  }

  footerActionPerformed(event: string) {
    console.log('Footer action:', event);
  }

  headerActionPerformed(event: { type: string; payload?: any }) {
    console.log('Header action:', event);
  }
}

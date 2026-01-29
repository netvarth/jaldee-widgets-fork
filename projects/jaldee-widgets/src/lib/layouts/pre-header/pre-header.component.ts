import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Header } from '../../models/template-config.model';

@Component({
  selector: 'app-pre-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pre-header.component.html',
  styleUrls: ['./pre-header.component.scss']
})
export class PreHeaderComponent {
  @Input() header?: Header;
  @Input() announcements?: Header['announcements'];
  @ViewChild('carouselContainer', { static: false }) carousel?: ElementRef<HTMLDivElement>;

  get items() {
    return this.announcements || this.header?.announcements || [];
  }

  get visibleAnnouncements() {
    return this.items.filter((announcement) => (announcement?.message ?? '').trim().length > 0);
  }

  get arrowColor(): string {
    const first = this.visibleAnnouncements[0];
    return (first?.foregroundColor as string) || '#000';
  }

  scrollNext() {
    if (!this.carousel) {
      return;
    }
    this.carousel.nativeElement.scrollBy({ left: this.carouselWidth(), behavior: 'smooth' });
  }

  scrollPrev() {
    if (!this.carousel) {
      return;
    }
    this.carousel.nativeElement.scrollBy({ left: -this.carouselWidth(), behavior: 'smooth' });
  }

  get showArrows(): boolean {
    return this.visibleAnnouncements.length > 1;
  }

  private carouselWidth(): number {
    return this.carousel?.nativeElement?.clientWidth ?? 0;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  getAnnouncementHeight(announcement: any): string | null {
    const height = Number(announcement?.height);
    if (!Number.isFinite(height) || height <= 0) {
      return null;
    }
    return `${height}px`;
  }
}



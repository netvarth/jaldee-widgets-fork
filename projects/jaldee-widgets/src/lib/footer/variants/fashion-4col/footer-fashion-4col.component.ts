import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FooterData, FooterColumn, SocialLink } from '../../footer.model';

@Component({
  selector: 'app-footer-fashion-4col',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-fashion-4col.component.html',
  styleUrls: ['./footer-fashion-4col.component.scss']
})
export class FooterFashion4ColComponent {
  @Input() data?: FooterData;
  @Output() actionPerformed = new EventEmitter<string>();

  get visibleColumns(): FooterColumn[] {
    return (this.data?.columns ?? []).filter((column) => column.title || column.links?.length);
  }

  get socialLinks(): SocialLink[] {
    return this.data?.socialLinks ?? [];
  }

  goTo(route: string | null | undefined): void {
    if (!route) {
      return;
    }
    this.actionPerformed.emit(route);
  }

  getIconImage(link: SocialLink): string | undefined {
    return link.iconImage;
  }

  getIconClass(link: SocialLink): string | undefined {
    return link.icon;
  }
}

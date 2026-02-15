import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-card.component.html',
  styleUrls: ['./text-card.component.scss']
})
export class TextCardComponent {
  @Input() content: any;

  get items(): string[] {
    if (!this.content) {
      return [];
    }
    if (Array.isArray(this.content?.content) && this.content?.content.length) {
      return this.content.content.map((entry: any) => entry.title || entry.text || '').filter(Boolean);
    }
    if (Array.isArray(this.content)) {
      return this.content.map((item: any) => item.title || item.text || '').filter(Boolean);
    }
    return [this.content.title || this.content.text || ''].filter(Boolean);
  }

  get fontSize(): string | null {
    return this.content?.titleFontSize ?? null;
  }
}

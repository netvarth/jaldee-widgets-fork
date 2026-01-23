import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  get items() {
    return this.announcements || this.header?.announcements || [];
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}



import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { applyContentFontDefaults, applySectionFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-without-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './without-cards.component.html',
  styleUrls: ['./without-cards.component.scss']
})
export class WithoutCardsComponent implements OnChanges {
  @Input() section: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.section) {
      this.section = applySectionFontDefaults(this.section);
    }
    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }
  }

}





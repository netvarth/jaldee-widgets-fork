import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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
    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => this.applyContentFontDefaults(item));
    }
  }

  private applyContentFontDefaults(item: any): any {
    const section = this.section || {};
    const useSection = item?.useSectionFontSizes === true;
    const pick = (value: any, fallback: any) => {
      if (useSection) {
        return this.normalizeFontSize(fallback);
      }
      if (value === undefined || value === null || value === '') {
        return this.normalizeFontSize(fallback);
      }
      return this.normalizeFontSize(value);
    };
    return {
      ...item,
      titleFontSize: pick(item?.titleFontSize, section.contentTitleFontSize),
      subTitleFontSize: pick(item?.subTitleFontSize, section.contentSubTitleFontSize),
      descriptionFontSize: pick(item?.descriptionFontSize, section.contentDescriptionFontSize)
    };
  }

  private normalizeFontSize(value: any): any {
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return value;
  }

}





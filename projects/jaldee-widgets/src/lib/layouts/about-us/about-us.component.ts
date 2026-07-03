import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AboutCardComponent } from '../../cards/about-card/about-card.component';
import { AboutCard1Component } from '../../cards/about-card1/about-card1.component';
import { AboutCard2Component } from '../../cards/about-card2/about-card2.component';
import { applyContentFontDefaults, applySectionFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, AboutCardComponent, AboutCard1Component, AboutCard2Component],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnChanges {
  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.section) {
      this.section = applySectionFontDefaults(this.section);
    }
    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }
  }

  _actionClicked(action: { link: string }, target: string) {
    this.actionClicked.emit({ action, target });
  }

  onDescriptionInteraction(event: Event, content: any, target: string) {
    const clickedElement = event.target as HTMLElement | null;
    const anchor = clickedElement?.closest('a[data-jw-link]');
    const href = anchor?.getAttribute('data-jw-link')?.trim();

    if (!anchor || !href) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this._actionClicked({ ...content, link: href }, target);
  }

  getHTMLContent(description: string) {
    const safeDescription = (description || '').replace(
      /href\s*=\s*(["'])(.*?)\1/gi,
      'data-jw-link=$1$2$1'
    );
    return this.sanitizer.bypassSecurityTrustHtml(safeDescription);
  }

}

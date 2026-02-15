import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AboutCardComponent } from '../../cards/about-card/about-card.component';
import { AboutCard1Component } from '../../cards/about-card1/about-card1.component';
import { AboutCard2Component } from '../../cards/about-card2/about-card2.component';
import { applyContentFontDefaults } from '../../utils/font-utils';

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
    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }
  }

  _actionClicked(action: { link: string }, target: string) {
    this.actionClicked.emit({ action, target });
  }

  getHTMLContent(description: string) {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

}





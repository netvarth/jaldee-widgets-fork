import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { applyContentFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
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





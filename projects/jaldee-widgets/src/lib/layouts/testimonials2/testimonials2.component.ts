import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { applyContentFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-testimonials2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials2.component.html',
  styleUrls: ['./testimonials2.component.scss']
})
export class Testimonials2Component implements OnChanges {
  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }
  }

  getHTMLContent(description: string) {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

  _actionClicked(action: { link: string }, target: string) {
    this.actionClicked.emit({ action: action, target: target });
  }
}





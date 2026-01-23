import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { applyContentFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-image-with-contents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-with-contents.component.html',
  styleUrls: ['./image-with-contents.component.scss']
})
export class ImageWithContentsComponent implements OnChanges {
  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  className: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  getHTMLContent(description: string) {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.className = [
      this.section?.className,
      this.section?.titlePosition
    ].filter(Boolean).join(' ');
    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }
  }
}





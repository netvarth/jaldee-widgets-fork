import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { applyContentFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-banner-with-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-with-content.component.html',
  styleUrls: ['./banner-with-content.component.scss']
})
export class BannerWithContentComponent implements OnChanges {
  safeVideoUrl2: SafeResourceUrl | null = null;
  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  className: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  getVideo(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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





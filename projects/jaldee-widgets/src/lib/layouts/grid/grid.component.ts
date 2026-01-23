import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NormalCardComponent } from '../../cards/normal-card/normal-card.component';
import { ItemCardComponent } from '../../cards/item-card/item-card.component';
import { AnimatedCardComponent } from '../../cards/animated-card/animated-card.component';
import { AnimatedCard1Component } from '../../cards/animated-card1/animated-card1.component';
import { NormalCardCircleComponent } from '../../cards/normal-card-circle/normal-card-circle.component';
import { ServiceCardComponent } from '../../cards/service-card/service-card.component';
import { ServiceCard2Component } from '../../cards/service-card2/service-card2.component';
import { ServiceCard3Component } from '../../cards/service-card3/service-card3.component';
import { ReviewCardComponent } from '../../cards/review-card/review-card.component';
import { AboutCardComponent } from '../../cards/about-card/about-card.component';
import { ContactCardComponent } from '../../cards/contact-card/contact-card.component';
import { AboutCard1Component } from '../../cards/about-card1/about-card1.component';
import { ServiceCard4Component } from '../../cards/service-card4/service-card4.component';
import { LazyImageDirective } from '../../utils/lazy-image.directive';
import { applyContentFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, NormalCardComponent, NormalCardCircleComponent,
    ItemCardComponent, AnimatedCardComponent, AnimatedCard1Component, ServiceCardComponent,
    ServiceCard2Component, ServiceCard3Component, ServiceCard4Component, ReviewCardComponent, AboutCardComponent,
    AboutCard1Component, ContactCardComponent, LazyImageDirective],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnChanges {

  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  className: string = '';
  gridColumns: any;
  isHovered = false;

  constructor(private sanitizer: DomSanitizer) {}

  getHTMLContent(description: string) {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  _actionClicked(item: any, target: string) {
    this.actionClicked.emit({ action: item, target });
  }

  itemClicked(action: { link: string }) {
    this.actionClicked.emit({ action });
  }

  moreClicked(link: string) {
    this.actionClicked.emit({ action: { link }, target: this.section?.id, type: 'more' });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.className = [
      this.section?.className,
      this.section?.titlePosition
    ].filter(Boolean).join(' ');

    this.gridColumns = this.getGridTemplateColumns(this.section);

    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }

  }

  getGridTemplateColumns(section: any): string {
    let itemObj = this.smallDevice ? section.cols_xs_options : this.mediumDevice ? section.cols_md_options : section.cols_xl_options;
    let itemCount = itemObj.items;
    let percentage = 100;
    if (itemCount) {
      percentage = 100 / itemCount;
    }
    return `repeat(${itemCount}, ${percentage}%)`;
  }

}





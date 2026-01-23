import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NormalCardCircleComponent } from '../../cards/normal-card-circle/normal-card-circle.component';
import { AnimatedCard1Component } from '../../cards/animated-card1/animated-card1.component';
import { AnimatedCardComponent } from '../../cards/animated-card/animated-card.component';
import { ItemCardComponent } from '../../cards/item-card/item-card.component';
import { NormalCardComponent } from '../../cards/normal-card/normal-card.component';
import { ServiceCardComponent } from '../../cards/service-card/service-card.component';
import { ServiceCard3Component } from '../../cards/service-card3/service-card3.component';
import { ServiceCard2Component } from '../../cards/service-card2/service-card2.component';
import { ReviewCardComponent } from '../../cards/review-card/review-card.component';
import { applyContentFontDefaults } from '../../utils/font-utils';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, NormalCardComponent, NormalCardCircleComponent,
      ItemCardComponent, AnimatedCardComponent, AnimatedCard1Component, ServiceCardComponent,
    ServiceCard2Component, ServiceCard3Component, ReviewCardComponent],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges {

  @Input() section: any;
  @Input() smallDevice: boolean | undefined;
  @Input() mediumDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();
  className: string = '';
  
  ngOnChanges(changes: SimpleChanges): void {
    this.className = [
      this.section?.className,
      this.section?.titlePosition
    ].filter(Boolean).join(' ');
    // this.gridColumns = this.getGridTemplateColumns(this.section);

    if (this.section?.content?.length) {
      this.section.content = this.section.content.map((item: any) => applyContentFontDefaults(this.section, item));
    }
  }

  _actionClicked(action: { link: string }, target: string) {
    
    this.actionClicked.emit({ action: action, target: target });
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  moreClicked(link: string) {
    this.actionClicked.emit({ action: { link }, target: this.section?.id, type: 'more' });
  }
}






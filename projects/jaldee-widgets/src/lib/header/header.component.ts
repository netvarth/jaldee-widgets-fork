import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderData } from './header.model';
import { HeaderFourComponent } from './variants/header-four/header-four.component';
import { HeaderOneComponent } from './variants/header-one/header-one.component';
import { HeaderThreeComponent } from './variants/header-three/header-three.component';
import { HeaderTwoComponent } from './variants/header-two/header-two.component';
import { HeaderFashionComponent } from './variants/fashion/header-fashion.component';
import { HeaderMinimalComponent } from './variants/minimal/header-minimal.component';

@Component({
  selector: 'lib-preview-header',
  standalone: true,
  imports: [
    CommonModule,
    HeaderOneComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    HeaderFourComponent,
    HeaderFashionComponent,
    HeaderMinimalComponent
  ],
  templateUrl: './header.component.html'
})
export class PreviewHeaderComponent {
  @Input() data?: HeaderData;
  @Input() variant?: string;
  @Input() isLoggedIn?: boolean;
  @Input() userName?: string;
  @Input() cartCount?: number;
  @Input() wishlistCount?: number;
  @Input() showSearch?: boolean;
  @Input() hideItemSearch?: boolean;
  @Input() smallDevice?: boolean;
  @Input() showCart?: boolean;
  @Output() actionPerformed = new EventEmitter<{ type: string; payload?: any }>();

  handleAction(event: { type: string; payload?: any }) {
    this.actionPerformed.emit(event);
  }
}

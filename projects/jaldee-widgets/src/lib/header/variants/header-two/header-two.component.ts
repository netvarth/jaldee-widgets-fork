import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderData, HeaderMenuItem } from '../../header.model';

@Component({
  selector: 'app-header-two',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent {
  @Input() data?: HeaderData;
  @Input() logo?: string;
  @Input() aspectRatio?: string | null;
  @Input() menuItems: HeaderMenuItem[] = [];
  @Input() isLoggedIn?: boolean;
  @Input() cartCount?: number;
  @Input() wishlistCount?: number;
  @Input() smallDevice?: boolean;
  @Input() showSearch?: boolean;
  @Input() hideItemSearch?: boolean;
  @Input() showCart?: boolean;
  @Output() actionPerformed = new EventEmitter<{ type: string; payload?: any }>();

  searchValue = '';

  emit(action: { type: string; payload?: any }) {
    this.actionPerformed.emit(action);
  }

  menuClick(item: HeaderMenuItem) {
    this.emit({ type: 'menu', payload: item });
  }

  triggerSearch() {
    const query = this.searchValue?.trim();
    if (query) {
      this.emit({ type: 'search', payload: query });
    }
  }

  doLogin() {
    this.emit({ type: 'login' });
  }

  doLogout() {
    this.emit({ type: 'logout' });
  }

  goToCart() {
    this.emit({ type: 'cart' });
  }

  goToWishlist() {
    this.emit({ type: 'wishlist' });
  }
}

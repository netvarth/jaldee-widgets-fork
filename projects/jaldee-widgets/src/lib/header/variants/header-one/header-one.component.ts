import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderData, HeaderMenuItem } from '../../header.model';

@Component({
  selector: 'app-header-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent {
  @Input() data?: HeaderData;
  @Input() logo?: string;
  @Input() menuItems: HeaderMenuItem[] = [];
  @Input() isLoggedIn?: boolean;
  @Input() cartCount?: number;
  @Input() wishlistCount?: number;
  @Input() smallDevice?: boolean;
  @Input() searchVisible?: boolean;
  @Input() hideItemSearch?: boolean;
  @Input() showSearch?: boolean;
  @Input() showCart?: boolean;
  @Input() showWishlist?: boolean;
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

  toggleSearch() {
    this.emit({ type: 'toggleSearch' });
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

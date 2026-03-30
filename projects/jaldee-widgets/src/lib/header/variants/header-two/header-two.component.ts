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
  @Input() showWishlist?: boolean;
  @Input() searchSuggestions: any[] = [];
  @Output() actionPerformed = new EventEmitter<{ type: string; payload?: any }>();

  searchValue = '';
  showSuggestions = false;

  get visibleMenu(): HeaderMenuItem[] {
    return this.menuItems.filter((item) => item.visible !== false);
  }

  get resolvedShowSearch(): boolean {
    return (this.showSearch ?? this.data?.showSearch ?? true) && !this.hideItemSearch;
  }

  get showLogin(): boolean {
    return this.data?.showLogin ?? true;
  }

  get resolvedShowCart(): boolean {
    return this.showCart ?? this.data?.showCart ?? true;
  }

  get resolvedShowWishlist(): boolean {
    return this.showWishlist ?? (this.data?.['showWishlist'] as boolean | undefined) ?? true;
  }

  emit(action: { type: string; payload?: any }) {
    this.actionPerformed.emit(action);
  }

  onSearchFocus() {
    this.showSuggestions = true;
  }

  onSearchBlur() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 120);
  }

  selectSuggestion(item: any) {
    if (!item) {
      return;
    }
    this.searchValue = `${item?.name ?? ''}`.trim();
    this.showSuggestions = false;
    this.emit({ type: 'searchSelect', payload: item });
  }

  menuClick(item: HeaderMenuItem) {
    this.emit({ type: 'menu', payload: item });
  }

  triggerSearch() {
    const query = this.searchValue?.trim();
    if (query) {
      this.showSuggestions = false;
      this.emit({ type: 'searchSubmit', payload: query });
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

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderData, HeaderMenuItem } from '../../header.model';

@Component({
  selector: 'app-header-three',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent {
  @Input() data?: HeaderData;
  @Input() logo?: string;
  @Input() aspectRatio?: string | null;
  @Input() menuItems: HeaderMenuItem[] = [];
  @Input() isLoggedIn?: boolean;
  @Input() cartCount?: number;
  @Input() showSearch?: boolean;
  @Input() smallDevice?: boolean;
  @Input() searchVisible?: boolean;
  @Input() hideItemSearch?: boolean;
  @Input() showCart?: boolean;
  @Input() searchSuggestions: any[] = [];
  @Output() actionPerformed = new EventEmitter<{ type: string; payload?: any }>();

  searchValue = '';
  showSuggestions = false;

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
}

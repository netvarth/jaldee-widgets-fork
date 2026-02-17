import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderAccountMenuItem, HeaderData, HeaderMenuItem } from '../../header.model';

@Component({
  selector: 'app-header-minimal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-minimal.component.html',
  styleUrls: ['./header-minimal.component.scss']
})
export class HeaderMinimalComponent {
  @Input() data?: HeaderData;
  @Input() logo?: string;
  @Input() aspectRatio?: string | null;
  @Input() smallDevice?: boolean;
  @Input() isLoggedIn?: boolean;
  @Input() userName?: string;
  @Output() actionPerformed = new EventEmitter<{ type: string; payload?: any }>();

  searchValue = '';
  activeMenu = '';
  menuOpen = false;
  searchOpen = false;
  accountMenuOpen = false;

  emit(action: { type: string; payload?: any }) {
    this.actionPerformed.emit(action);
  }

  get visibleMenu(): HeaderMenuItem[] {
    return (this.data?.menu ?? []).filter((item) => item.visible !== false);
  }

  navigate(item: HeaderMenuItem): void {
    this.activeMenu = item.link ?? '';
    this.menuOpen = false;
    this.accountMenuOpen = false;
    this.emit({ type: 'menu', payload: item });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
  }

  get resolvedLoginMenu(): HeaderAccountMenuItem[] {
    const loginMenu = this.data?.loginMenu ?? [];
    const accountMenu = this.data?.accountMenuItems ?? [];
    const source = loginMenu.length ? loginMenu : accountMenu;
    return source.filter((item) => item?.visible !== false);
  }

  onAccountClick(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isLoggedIn) {
      this.emit({ type: 'login' });
      return;
    }
    if (!this.resolvedLoginMenu.length) {
      this.emit({ type: 'account' });
      return;
    }
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  onLoginMenuClick(item: HeaderAccountMenuItem, event: MouseEvent): void {
    event.stopPropagation();
    this.accountMenuOpen = false;
    this.emit({ type: item.actionType || item.link || 'loginMenu', payload: item });
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.accountMenuOpen = false;
  }

  get showSearch(): boolean {
    return this.data?.showSearch ?? true;
  }

  get showLogin(): boolean {
    return this.data?.showLogin ?? true;
  }

  get showCart(): boolean {
    return this.data?.showCart ?? true;
  }

  get headerStyles(): Record<string, string> {
    return {
      background: this.data?.backgroundColor || '#fff',
      color: this.data?.foregroundColor || '#111'
    };
  }

  get logoSrc(): string {
    return (
      this.logo ||
      this.data?.logo ||
      'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"40\"><rect width=\"120\" height=\"40\" fill=\"%23d6b797\"/><text x=\"50%\" y=\"55%\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"16\" fill=\"white\">Brand</text></svg>'
    );
  }

  getActionIcon(action: string): string {
    const map: Record<string, string> = {
      help: 'fa fa-headset',
      wishlist: 'fa fa-heart-o',
      cart: 'fa fa-shopping-bag',
      account: 'fa fa-user-circle-o',
      login: 'fa fa-user-circle-o'
    };
    return map[action] || 'fa fa-circle';
  }

  getMenuIcon(item: HeaderMenuItem): string {
    return item.icon || 'fa fa-long-arrow-right';
  }
}

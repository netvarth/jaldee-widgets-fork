import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderData, HeaderMenuItem } from '../../header.model';

@Component({
  selector: 'app-header-fashion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-fashion.component.html',
  styleUrls: ['./header-fashion.component.scss']
})
export class HeaderFashionComponent {
  @Input() data?: HeaderData;
  @Input() isLoggedIn?: boolean;
  @Input() userName?: string;
  @Output() actionPerformed = new EventEmitter<{ type: string; payload?: any }>();

  searchValue = '';
  activeMenu = '';

  emit(action: { type: string; payload?: any }) {
    this.actionPerformed.emit(action);
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

  get visibleMenu(): HeaderMenuItem[] {
    return (this.data?.menu ?? []).filter((item) => item.visible !== false);
  }

  navigate(item: HeaderMenuItem): void {
    this.activeMenu = item.link ?? '';
    this.emit({ type: 'menu', payload: item });
  }

  get logoSrc(): string {
    return (
      this.data?.logo ||
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="48"><rect width="140" height="48" rx="10" fill="%23a0662f"/><text x="70" y="28" font-size="16" font-family="Verdana" text-anchor="middle" fill="white">Brand</text></svg>'
    );
  }

  getActionIcon(action: string): string {
    const icons: Record<string, string> = {
      help: 'fa fa-headset',
      wishlist: 'fa fa-heart-o',
      cart: 'fa fa-shopping-bag',
      account: 'fa fa-user-circle-o',
      login: 'fa fa-user-circle-o'
    };
    return icons[action] || 'fa fa-circle';
  }

  getMenuIcon(item: HeaderMenuItem): string {
    return item.icon || '';
  }
}

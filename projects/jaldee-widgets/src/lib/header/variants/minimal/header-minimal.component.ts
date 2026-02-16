import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderData, HeaderMenuItem } from '../../header.model';

@Component({
  selector: 'app-header-minimal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-minimal.component.html',
  styleUrls: ['./header-minimal.component.scss']
})
export class HeaderMinimalComponent {
  @Input() data?: HeaderData;
  @Input() isLoggedIn?: boolean;
  @Input() userName?: string;
  @Output() actionPerformed = new EventEmitter<{ type: string; payload?: any }>();

  searchValue = '';
  activeMenu = '';

  emit(action: { type: string; payload?: any }) {
    this.actionPerformed.emit(action);
  }

  get visibleMenu(): HeaderMenuItem[] {
    return (this.data?.menu ?? []).filter((item) => item.visible !== false);
  }

  navigate(item: HeaderMenuItem): void {
    this.activeMenu = item.link ?? '';
    this.emit({ type: 'menu', payload: item });
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

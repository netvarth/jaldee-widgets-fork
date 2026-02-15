import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FooterData, FooterItem, SocialLink } from '../../footer.model';

type FooterSummary = Record<'terms' | 'shipping' | 'privacy' | 'refund', boolean>;
type SocialKey = 'facebook' | 'twitter' | 'instagram' | 'email' | 'phone';
type PolicyKey = 'terms' | 'shipping' | 'privacy' | 'refund';

@Component({
  selector: 'app-footer-minimal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-minimal.component.html',
  styleUrls: ['./footer-minimal.component.scss']
})
export class FooterMinimalComponent {
  @Input() data?: FooterData;
  @Input() cdnPath?: string;
  @Output() actionPerformed = new EventEmitter<string>();

  socialPlatforms: SocialKey[] = ['facebook', 'twitter', 'instagram', 'email', 'phone'];

  get foregroundColor(): string {
    return this.data?.foregroundColor || '#fff';
  }

  get backgroundColor(): string {
    return this.data?.backgroundColor || '#090909';
  }

  get otherLinks(): FooterItem[] {
    const socialKeys: SocialKey[] = ['facebook', 'twitter', 'instagram', 'email', 'phone'];
    const policyKeys: PolicyKey[] = ['terms', 'shipping', 'privacy', 'refund'];
    return (this.data?.items ?? []).filter((item) => {
      const key = (item.key ?? item.title ?? '').toLowerCase();
      return (
        item.visible !== false &&
        !!item.title &&
        !socialKeys.includes(key as SocialKey) &&
        !policyKeys.includes(key as PolicyKey)
      );
    });
  }

  get footerMap(): Record<string, string | boolean> {
    const map: Record<string, string | boolean> = {};
    const menuItems = ['terms', 'privacy', 'shipping', 'refund'];
    const socialKeys: SocialKey[] = ['facebook', 'twitter', 'instagram', 'email', 'phone'];
    (this.data?.items ?? []).forEach((item) => {
      const key = (item.key ?? item.title ?? '').toLowerCase();
      if (!key) return;
      const value = menuItems.includes(key) ? !!item.visible : item.link ?? item.displayName ?? '';
      map[key] = value;
      if (!menuItems.includes(key) && !socialKeys.includes(key as SocialKey)) {
        map[`${key}-display`] = item.displayName ?? '';
      }
    });
    return map;
  }

  get footerSummary(): FooterSummary {
    return {
      terms: !!this.footerMap['terms'],
      shipping: !!this.footerMap['shipping'],
      privacy: !!this.footerMap['privacy'],
      refund: !!this.footerMap['refund']
    };
  }
  get description(): string {
    return this.data?.description ?? '';
  }

  get locationContent(): string | undefined {
    return this.data?.addressLine1;
  }

  get locationUrl(): string | undefined {
    return this.data?.addressLine2;
  }

  get title(): string | undefined {
    return this.data?.title;
  }

  get configLogo(): string | undefined {
    return this.data?.logo;
  }

  goTo(route: string | null | undefined): void {
    if (!route) return;
    this.actionPerformed.emit(route);
  }

  getIconImage(link: SocialLink): string | undefined {
    return link.iconImage;
  }

  getIconClass(link: SocialLink): string | undefined {
    return link.icon;
  }

  getSocialLink(platform: SocialKey): SocialLink | undefined {
    const fromData = this.data?.socialLinks?.find((link) => link.platform?.toLowerCase() === platform);
    if (fromData) {
      return fromData;
    }
    const url = this.footerMap[platform];
    if (typeof url === 'string' && url) {
      return { platform, url };
    }
    return undefined;
  }
}

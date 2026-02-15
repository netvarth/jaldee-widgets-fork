export interface SocialLink {
  platform?: string;
  url?: string;
  icon?: string;
  iconImage?: string;
  visible?: boolean;
}

export interface FooterItem {
  title?: string;
  link?: string;
  displayName?: string;
  visible?: boolean;
  key?: string;
}

export interface FooterColumn {
  title?: string;
  links?: { label?: string; link?: string; visible?: boolean }[];
}

export interface FooterData {
  visible?: boolean;
  title?: string;
  displayName?: string;
  description?: string;
  logo?: string;
  logoAspectRatio?: string | null;
  variant?: string;
  brandName?: string;
  addressLine1?: string;
  addressLine2?: string;
  showDivider?: boolean;
  socialLinks?: SocialLink[];
  columns?: FooterColumn[];
  items?: FooterItem[];
  foregroundColor?: string;
  backgroundColor?: string;
  copyright?: string;
}

export interface HeaderMenuItem {
  title?: string;
  link?: string;
  icon?: string;
  iconImage?: string;
  submenu?: HeaderMenuItem[];
  visible?: boolean;
  [key: string]: unknown;
}

export interface HeaderData {
  title?: string;
  description?: string;
  menu?: HeaderMenuItem[];
  actionButton?: { text?: string; link?: string; icon?: string };
  showCart?: boolean;
  showSearch?: boolean;
  showLogin?: boolean;
  name?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  logo?: string;
  [key: string]: unknown;
}

export type FontSize = string | number | null | undefined;

export interface MenuItem {
  title: string;
  link: string;
  icon?: string;
}

export interface Section {
  id: string;
  title?: string;
  preTitle?: string | null;
  subTitle?: string | null;
  titleImage?: string | null;
  titlePosition?: string | null;
  preTitleFontSize?: FontSize;
  titleFontSize?: FontSize;
  subTitleFontSize?: FontSize;
  descriptionFontSize?: FontSize;
  contentTitleFontSize?: FontSize;
  contentSubTitleFontSize?: FontSize;
  contentDescriptionFontSize?: FontSize;
  type?: string;
  dynamic?: boolean;
  content?: Content[];
  actions?: Action[];
  showMore?: boolean;
  moreCaption?: string;
  moreLink?: string;
  mode?: string;
  icon?: string;
  layout?: string;
  layoutStyle?: string;
  layoutType?: string;
  target?: string;
  link?: string;
  className?: string;
  classType?: string;
  containerType?: string;
  styles?: Record<string, unknown>;
  backgroundColor?: string;
  foregroundColor?: string;
  backgroundImage?: string;
  cardType?: string;
  contentType?: string;
  key?: string;
  cols_xs_options?: Record<string, unknown>;
  cols_md_options?: Record<string, unknown>;
  cols_xl_options?: Record<string, unknown>;
}

export interface Action {
  id?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  image?: string;
  image_mob?: string;
  event?: boolean;
  loading?: string;
  price?: number | string;
  mrp?: number | string;
  showMrp?: boolean;
  link?: string;
  buttonCaption?: string;
  buttonHover?: boolean;
  titleFontSize?: FontSize;
  subTitleFontSize?: FontSize;
  descriptionFontSize?: FontSize;
  useSectionFontSizes?: boolean;
  [key: string]: unknown;
}

export interface Content {
  id?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  image?: string;
  image_mob?: string;
  link?: string;
  titleFontSize?: FontSize;
  subTitleFontSize?: FontSize;
  descriptionFontSize?: FontSize;
  useSectionFontSizes?: boolean;
  [key: string]: unknown;
}

export interface TemplateConfig {
  template?: string;
  logo?: string;
  coverPicture?: string;
  theme?: string;
  header?: Header;
  sections?: Section[];
}

export interface Header {
  title?: string;
  description?: string;
  menu?: MenuItem[];
  announcements?: { message: string; foregroundColor?: string; backgroundColor?: string; fontSize?: FontSize }[];
}

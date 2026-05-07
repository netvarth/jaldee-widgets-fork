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
  preTitleFontWeight?: string;
  titleFontWeight?: string;
  subTitleFontWeight?: string;
  contentTitleFontWeight?: string;
  contentSubTitleFontWeight?: string;
  contentDescriptionFontWeight?: string;
  preTitleFontStyle?: string;
  titleFontStyle?: string;
  subTitleFontStyle?: string;
  contentTitleFontStyle?: string;
  contentSubTitleFontStyle?: string;
  contentDescriptionFontStyle?: string;
  preTitleTextAlign?: string;
  titleTextAlign?: string;
  subTitleTextAlign?: string;
  contentTitleTextAlign?: string;
  contentSubTitleTextAlign?: string;
  contentDescriptionTextAlign?: string;
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
  titleFontWeight?: string;
  subTitleFontWeight?: string;
  descriptionFontWeight?: string;
  titleFontStyle?: string;
  subTitleFontStyle?: string;
  descriptionFontStyle?: string;
  titleTextAlign?: string;
  subTitleTextAlign?: string;
  descriptionTextAlign?: string;
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
  titleFontWeight?: string;
  subTitleFontWeight?: string;
  descriptionFontWeight?: string;
  titleFontStyle?: string;
  subTitleFontStyle?: string;
  descriptionFontStyle?: string;
  titleTextAlign?: string;
  subTitleTextAlign?: string;
  descriptionTextAlign?: string;
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
  announcements?: {
    id?: string;
    message: string;
    link?: string;
    foregroundColor?: string;
    backgroundColor?: string;
    fontSize?: FontSize;
  }[];
  announcement_responsiveness?: {
    cols_xs_options?: Record<string, unknown>;
    cols_md_options?: Record<string, unknown>;
    cols_xl_options?: Record<string, unknown>;
  };
}

import { Content, FontSize, Section } from '../models/template-config.model';

export const normalizeFontSize = (value: FontSize): string | null => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

export const applyContentFontDefaults = (section: Section | undefined, item: Content): Content => {
  const useSection = item?.useSectionFontSizes === true;
  const pick = (value: FontSize, fallback: FontSize) => {
    if (useSection) {
      return normalizeFontSize(fallback);
    }
    if (value === undefined || value === null || value === '') {
      return normalizeFontSize(fallback);
    }
    return normalizeFontSize(value);
  };
  const pickTextStyle = (value: unknown, fallback: unknown): string | undefined => {
    if (useSection) {
      return typeof fallback === 'string' && fallback.trim().length ? fallback : (value as string | undefined);
    }
    if (value === undefined || value === null || value === '') {
      return typeof fallback === 'string' && fallback.trim().length ? fallback : (value as string | undefined);
    }
    return value as string | undefined;
  };

  return {
    ...item,
    titleFontSize: pick(item.titleFontSize, section?.contentTitleFontSize),
    subTitleFontSize: pick(item.subTitleFontSize, section?.contentSubTitleFontSize),
    descriptionFontSize: pick(item.descriptionFontSize, section?.contentDescriptionFontSize),
    titleFontWeight: pickTextStyle(item['titleFontWeight'], section?.contentTitleFontWeight),
    subTitleFontWeight: pickTextStyle(
      item['subTitleFontWeight'],
      section?.contentSubTitleFontWeight
    ),
    descriptionFontWeight: pickTextStyle(
      item['descriptionFontWeight'],
      section?.contentDescriptionFontWeight
    ),
    titleFontStyle: pickTextStyle(item['titleFontStyle'], section?.contentTitleFontStyle),
    subTitleFontStyle: pickTextStyle(item['subTitleFontStyle'], section?.contentSubTitleFontStyle),
    descriptionFontStyle: pickTextStyle(
      item['descriptionFontStyle'],
      section?.contentDescriptionFontStyle
    ),
    titleTextAlign: pickTextStyle(item['titleTextAlign'], section?.contentTitleTextAlign),
    subTitleTextAlign: pickTextStyle(item['subTitleTextAlign'], section?.contentSubTitleTextAlign),
    descriptionTextAlign: pickTextStyle(
      item['descriptionTextAlign'],
      section?.contentDescriptionTextAlign
    )
  };
};

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

  return {
    ...item,
    titleFontSize: pick(item.titleFontSize, section?.contentTitleFontSize),
    subTitleFontSize: pick(item.subTitleFontSize, section?.contentSubTitleFontSize),
    descriptionFontSize: pick(item.descriptionFontSize, section?.contentDescriptionFontSize)
  };
};

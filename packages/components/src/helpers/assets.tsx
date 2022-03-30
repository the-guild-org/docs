import moonIconDark from '../static/icons/moon-dark.svg';
import moonIconLight from '../static/icons/moon-light.svg';
import hamburgerIconDark from '../static/icons/hamburger-dark.svg';
import hamburgerIconLight from '../static/icons/hamburger-light.svg';
import caretIconDark from '../static/icons/caret-down-dark.svg';
import caretIconLight from '../static/icons/caret-down-light.svg';
import caretSlimIconDark from '../static/icons/caret-down-slim-dark.svg';
import caretSlimIconLight from '../static/icons/caret-down-slim-light.svg';
import closeIconDark from '../static/icons/close-dark.svg';
import closeIconLight from '../static/icons/close-light.svg';
import externalLinkIconLight from '../static/icons/external-link-light.svg';
import externalLinkIconDark from '../static/icons/external-link-dark.svg';
import searchIconDark from '../static/icons/search-dark.svg';
import searchIconLight from '../static/icons/search-light.svg';
import pageIconDark from '../static/icons/page-dark.svg';
import pageIconLight from '../static/icons/page-light.svg';
import hashtagIconDark from '../static/icons/hashtag-dark.svg';
import hashtagIconLight from '../static/icons/hashtag-light.svg';
import mailIconDark from '../static/icons/mail-dark.svg';
import mailIconLight from '../static/icons/mail-light.svg';
import arrowUpRightIconDark from '../static/icons/arrow-up-right-dark.svg';
import arrowUpRightIconLight from '../static/icons/arrow-up-right-light.svg';
import shareDark from '../static/icons/share-dark.svg';
import moreVerticalDark from '../static/icons/more-vertical-dark.svg';

const CDN = 'https://the-guild.dev/static/shared-logos/';

const logoFullDark = `${CDN}guild-full-dark.svg`;
const logoFullLight = `${CDN}guild-full-light.svg`;
const logoMonoDark = `${CDN}guild-mono-dark.svg`;
const logoMonoLight = `${CDN}guild-mono-light.svg`;

export const headerThemedIcons = (isDark: boolean) => ({
  themeToggle: isDark ? moonIconLight : moonIconDark,
  menu: isDark ? hamburgerIconLight : hamburgerIconDark,
  caret: isDark ? caretIconLight : caretIconDark,
  caretSlim: isDark ? caretSlimIconLight : caretSlimIconDark,
  close: isDark ? closeIconLight : closeIconDark,
});

export const logoThemedIcons = (isDark = false) => ({
  logoFull: isDark ? logoFullLight : logoFullDark,
  logoMono: isDark ? logoMonoLight : logoMonoDark,
  angular: `${CDN}products/angular.svg`,
  cli: `${CDN}products/cli.svg`,
  codeGen: `${CDN}products/code-generator.svg`,
  config: `${CDN}products/config.svg`,
  envelop: `${CDN}products/envelop.svg`,
  eslint: `${CDN}products/eslint.svg`,
  helix: `${CDN}products/helix.svg`,
  hive: `${CDN}products/hive.svg`,
  inspector: `${CDN}products/inspector.svg`,
  mesh: `${CDN}products/mesh.svg`,
  modules: `${CDN}products/modules.svg`,
  scalars: `${CDN}products/scalars.svg`,
  sofa: `${CDN}products/sofa.svg`,
  stencil: `${CDN}products/stencil.svg`,
  tools: `${CDN}products/tools.svg`,
  whatsapp: `${CDN}products/whatsapp.svg`,
  yoga: `${CDN}products/yoga.svg`,
  shield: `${CDN}products/shield.svg`,
  swift: `${CDN}products/swift.svg`,
});

export const searchBarThemedIcons = (isDark: boolean) => ({
  search: isDark ? searchIconLight : searchIconDark,
  close: isDark ? closeIconLight : closeIconDark,
  page: isDark ? pageIconLight : pageIconDark,
  hashtag: isDark ? hashtagIconLight : hashtagIconDark,
  content: isDark ? hamburgerIconLight : hamburgerIconDark,
});

export const modalThemedIcons = (isDark: boolean) => ({
  close: isDark ? closeIconLight : closeIconDark,
  externalLink: isDark ? externalLinkIconLight : externalLinkIconDark,
});

export const marketplaceThemedAssets = (isDark: boolean) => ({
  caret: isDark ? caretSlimIconLight : caretSlimIconDark,
  search: isDark ? searchIconLight : searchIconDark,
  share: shareDark,
  moreVertical: moreVerticalDark,
});

export const newsletterThemedIcons = (isDark: boolean) => ({
  mail: isDark ? mailIconLight : mailIconDark,
  arrow: isDark ? arrowUpRightIconLight : arrowUpRightIconDark,
});

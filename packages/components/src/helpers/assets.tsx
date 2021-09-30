import React from 'react';
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

import typescript from '../static/icons/languages/typescript.svg';
import flow from '../static/icons/languages/flow.svg';
import java from '../static/icons/languages/java.svg';

const cdn = 'https://the-guild.dev/static';

const logoFullDark = `${cdn}/shared-logos/guild-full-dark.svg`;
const logoFullLight = `${cdn}/shared-logos/guild-full-light.svg`;
const logoMonoDark = `${cdn}/shared-logos/guild-mono-dark.svg`;
const logoMonoLight = `${cdn}/shared-logos/guild-mono-light.svg`;

const productAngular = `${cdn}/shared-logos/products/angular.svg`;
const productCLI = `${cdn}/shared-logos/products/cli.svg`;
const productCodeGenerator = `${cdn}/shared-logos/products/code-generator.svg`;
const productConfig = `${cdn}/shared-logos/products/config.svg`;
const productEnvelop = `${cdn}/shared-logos/products/envelop.svg`;
const productESLint = `${cdn}/shared-logos/products/eslint.svg`;
const productHive = `${cdn}/shared-logos/products/hive.svg`;
const productInspector = `${cdn}/shared-logos/products/inspector.svg`;
const productMesh = `${cdn}/shared-logos/products/mesh.svg`;
const productModules = `${cdn}/shared-logos/products/modules.svg`;
const productScalars = `${cdn}/shared-logos/products/scalars.svg`;
const productSofa = `${cdn}/shared-logos/products/sofa.svg`;
const productStencil = `${cdn}/shared-logos/products/stencil.svg`;
const productTools = `${cdn}/shared-logos/products/tools.svg`;
const productWhatsapp = `${cdn}/shared-logos/products/whatsapp.svg`;
const productGraphQLShield = `${cdn}/shared-logos/products/shield.svg`;
const productSwiftGraphQL = `${cdn}/shared-logos/products/swift.svg`;

export const headerThemedIcons = (isDark: boolean): any => ({
  themeToggle: isDark ? moonIconLight : moonIconDark,
  menu: isDark ? hamburgerIconLight : hamburgerIconDark,
  caret: isDark ? caretIconLight : caretIconDark,
  caretSlim: isDark ? caretSlimIconLight : caretSlimIconDark,
  close: isDark ? closeIconLight : closeIconDark,
});

export const logoThemedIcons = (isDark: boolean): any => ({
  logoFull: isDark ? logoFullLight : logoFullDark,
  logoMono: isDark ? logoMonoLight : logoMonoDark,
  angular: isDark ? productAngular : productAngular,
  cli: isDark ? productCLI : productCLI,
  codeGen: isDark ? productCodeGenerator : productCodeGenerator,
  config: isDark ? productConfig : productConfig,
  envelop: isDark ? productEnvelop : productEnvelop,
  eslint: isDark ? productESLint : productESLint,
  hive: isDark ? productHive : productHive,
  inspector: isDark ? productInspector : productInspector,
  mesh: isDark ? productMesh : productMesh,
  modules: isDark ? productModules : productModules,
  scalars: isDark ? productScalars : productScalars,
  sofa: isDark ? productSofa : productSofa,
  stencil: isDark ? productStencil : productStencil,
  tools: isDark ? productTools : productTools,
  whatsapp: isDark ? productWhatsapp : productWhatsapp,
  shield: productGraphQLShield,
  swift: productSwiftGraphQL,
});

export const searchBarThemedIcons = (isDark: boolean): any => ({
  search: isDark ? searchIconLight : searchIconDark,
  close: isDark ? closeIconLight : closeIconDark,
  page: isDark ? pageIconLight : pageIconDark,
  hashtag: isDark ? hashtagIconLight : hashtagIconDark,
  content: isDark ? hamburgerIconLight : hamburgerIconDark,
});

export const modalThemedIcons = (isDark: boolean): any => ({
  close: isDark ? closeIconLight : closeIconDark,
  externalLink: isDark ? externalLinkIconLight : externalLinkIconDark,
});

export const marketplaceThemedAssets = (isDark: boolean): any => ({
  caret: isDark ? caretSlimIconLight : caretSlimIconDark,
  search: isDark ? searchIconLight : searchIconDark,
});

export const marketplaceLanguages = (lang: string): any => {
  switch (lang) {
    case 'typescript':
      return <img alt={lang} src={typescript} />;
    case 'java':
      return <img alt={lang} src={java} />;
    case 'flow':
      return <img alt={lang} src={flow} />;
  }
};

export const newsletterThemedIcons = (isDark: boolean): any => ({
  mail: isDark ? mailIconLight : mailIconDark,
  arrow: isDark ? arrowUpRightIconLight : arrowUpRightIconDark,
});

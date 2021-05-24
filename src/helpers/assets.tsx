import moonIconDark from '../static/icons/moon-dark.svg';
import moonIconLight from '../static/icons/moon-light.svg';
import hamburgerIconDark from '../static/icons/hamburger-dark.svg';
import hamburgerIconLight from '../static/icons/hamburger-light.svg';
import caretIconDark from '../static/icons/caret-down-dark.svg';
import caretIconLight from '../static/icons/caret-down-light.svg';
import closeIconDark from '../static/icons/close-dark.svg';
import closeIconLight from '../static/icons/close-light.svg';

import logoFullDark from '../static/logos/guild-full-dark.svg';
import logoFullLight from '../static/logos/guild-full-light.svg';
import logoMonoDark from '../static/logos/guild-mono-dark.svg';
import logoMonoLight from '../static/logos/guild-mono-light.svg';

import productAngular from '../static/logos/products/angular.svg';
import productCLI from '../static/logos/products/cli.svg';
import productCodeGenerator from '../static/logos/products/code-generator.svg';
import productConfig from '../static/logos/products/config.svg';
import productEnvelop from '../static/logos/products/envelop.svg';
import productESLint from '../static/logos/products/eslint.svg';
import productHive from '../static/logos/products/hive.svg';
import productInspector from '../static/logos/products/inspector.svg';
import productMesh from '../static/logos/products/mesh.svg';
import productModules from '../static/logos/products/modules.svg';
import productScalars from '../static/logos/products/scalars.svg';
import productSofa from '../static/logos/products/sofa.svg';
import productStencil from '../static/logos/products/stencil.svg';
import productTools from '../static/logos/products/tools.svg';
import productWhatsapp from '../static/logos/products/whatsapp.svg';

import searchIconDark from '../static/icons/search-dark.svg';
import searchIconLight from '../static/icons/search-light.svg';
import pageIconDark from '../static/icons/page-dark.svg';
import pageIconLight from '../static/icons/page-light.svg';
import linkIconDark from '../static/icons/link-dark.svg';
import linkIconLight from '../static/icons/link-light.svg';

export const headerThemedIcons = (isDark: boolean) => ({
  themeToggle: isDark ? moonIconLight : moonIconDark,
  menu: isDark ? hamburgerIconLight : hamburgerIconDark,
  caret: isDark ? caretIconLight : caretIconDark,
  close: isDark ? closeIconLight : closeIconDark,
  logoFull: isDark ? logoFullLight : logoFullDark,
  logoMono: isDark ? logoMonoLight : logoMonoDark,
});

export const productThemedIcons = (isDark: boolean) => ({
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
});

export const searchBarThemedIcons = (isDark: boolean) => ({
  search: isDark ? searchIconLight : searchIconDark,
  close: isDark ? closeIconLight : closeIconDark,
  page: isDark ? pageIconLight : pageIconDark,
  anchor: isDark ? linkIconLight : linkIconDark,
  content: isDark ? hamburgerIconLight : hamburgerIconDark,
});

export const modalThemedIcons = (isDark: boolean) => ({
  close: isDark ? closeIconLight : closeIconDark,
});

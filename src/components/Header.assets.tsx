import moonIconDark from '../static/icons/moon-dark.svg';
import moonIconLight from '../static/icons/moon-light.svg';
import searchIconDark from '../static/icons/search-dark.svg';
import searchIconLight from '../static/icons/search-light.svg';
import hamburgerIconDark from '../static/icons/hamburger-dark.svg';
import hamburgerIconLight from '../static/icons/hamburger-light.svg';
import caretIconDark from '../static/icons/caret-down-dark.svg';
import caretIconLight from '../static/icons/caret-down-light.svg';
import closeIconDark from '../static/icons/close-dark.svg';
import closeIconLight from '../static/icons/close-light.svg';

import logoFullDark from '../static/logos/theguild-full-dark.svg';
import logoFullLight from '../static/logos/theguild-full-light.svg';
import logoMonoDark from '../static/logos/theguild-mono-dark.svg';
import logoMonoLight from '../static/logos/theguild-mono-light.svg';

import productAngular from '../static/logos/products/angular.svg';
import productCLI from '../static/logos/products/cli.svg';
import productCodeGenerator from '../static/logos/products/code-generator.svg';
import productConfig from '../static/logos/products/config.svg';
import productEnvelop from '../static/logos/products/envelop.svg';
import productHive from '../static/logos/products/hive.svg';
import productInspector from '../static/logos/products/inspector.svg';
import productMesh from '../static/logos/products/mesh.svg';
import productModules from '../static/logos/products/modules.svg';
import productScalars from '../static/logos/products/scalars.svg';
import productSofa from '../static/logos/products/sofa.svg';
import productStencil from '../static/logos/products/stencil.svg';
import productTools from '../static/logos/products/tools.svg';
import productWhatsapp from '../static/logos/products/whatsapp.svg';

export const headerThemedIcons = (isDark: boolean) => ({
  themeToggle: isDark ? moonIconLight : moonIconDark,
  search: isDark ? searchIconLight : searchIconDark,
  menu: isDark ? hamburgerIconLight : hamburgerIconDark,
  caret: isDark ? caretIconLight : caretIconDark,
  close: isDark ? closeIconLight : closeIconDark,
  logoFull: isDark ? logoFullLight : logoFullDark,
  logoMono: isDark ? logoMonoLight : logoMonoDark
})

export const productThemedIcons = () => ({
  angular: productAngular,
  cli: productCLI,
  codeGen: productCodeGenerator,
  config: productConfig,
  envelop: productEnvelop,
  hive: productHive,
  inspector: productInspector,
  mesh: productMesh,
  modules: productModules,
  scalars: productScalars,
  sofa: productSofa,
  stencil: productStencil,
  tools: productTools,
  whatsapp: productWhatsapp,
})
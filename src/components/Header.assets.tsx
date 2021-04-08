
import moonIconDark from '../static/icons/moon-dark.svg';
import searchIconDark from '../static/icons/search-dark.svg';
import hamburgerIconDark from '../static/icons/hamburger-dark.svg';
import caretIconDark from '../static/icons/caret-down-dark.svg';
import closeIconDark from '../static/icons/close-dark.svg';
import logoFullDark from '../static/logos/theguild-full-dark.svg';
import logoMonoDark from '../static/logos/theguild-mono-dark.svg';

import moonIconLight from '../static/icons/moon-light.svg';
import searchIconLight from '../static/icons/search-light.svg';
import hamburgerIconLight from '../static/icons/hamburger-light.svg';
import caretIconLight from '../static/icons/caret-down-light.svg';
import closeIconLight from '../static/icons/close-light.svg';
import logoFullLight from '../static/logos/theguild-full-light.svg';
import logoMonoLight from '../static/logos/theguild-mono-light.svg';

export const headerThemedIcons = (isDark: boolean) => ({
  themeToggle: isDark ? moonIconLight : moonIconDark,
  search: isDark ? searchIconLight : searchIconDark,
  menu: isDark ? hamburgerIconLight : hamburgerIconDark,
  caret: isDark ? caretIconLight : caretIconDark,
  close: isDark ? closeIconLight : closeIconDark,
  logoFull: isDark ? logoFullLight : logoFullDark,
  logoMono: isDark ? logoMonoLight : logoMonoDark
})
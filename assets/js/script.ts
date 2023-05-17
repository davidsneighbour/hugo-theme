import { createRoot } from 'react-dom/client';

import './scripts/theme-toggle.js';
import './scripts/logger.js';
import './scripts/back-to-top.js';
import './scripts/version.js';
import 'web-vitals-element';

// import bootstrap scripts
import './scripts/bs-collapsibles.js';
import './scripts/bs-tabs.js';
import './scripts/bs-tooltips.js';

// import react components
import { ThemeSwitcher } from './components/theme-switcher.js';

const domNode = document.getElementById('themeswitcher');
const root = createRoot(domNode);
root.render('<ThemeSwitcher />');

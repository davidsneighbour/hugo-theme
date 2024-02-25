import 'web-vitals-element';
import './scripts/keyboard-layout';

import './scripts/theme-changes';

// import bootstrap scripts
import './scripts/bs-tabs.js';
import './scripts/bs-tooltips.js';

// import custom elements
import ClickSpark from './components/click-effect';
customElements.define("click-effect", ClickSpark);

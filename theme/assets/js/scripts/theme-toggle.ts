import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse'
window.Alpine = Alpine

Alpine.plugin(collapse)

function themeSwitcher() {
  return {
    theme: 'dark',
    init() {
      this.theme = this.getColorPreference();
      this.reflectPreference();
      this.changeGiscusTheme();
      setTimeout(() => this.changeGiscusTheme(), 5000);

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.theme = e.matches ? 'dark' : 'light';
        this.setPreference();
      });
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.setPreference();
      this.changeGiscusTheme();
      setTimeout(() => this.changeGiscusTheme(), 2000);
    },
    getColorPreference() {
      return localStorage.getItem('dnb-theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    },
    setPreference() {
      localStorage.setItem('dnb-theme', this.theme);
      this.reflectPreference();
    },
    reflectPreference() {
      document.firstElementChild.setAttribute('data-bs-theme', this.theme);
      document.body.className = '';
      document.body.classList.add(this.theme);
    },
    changeGiscusTheme() {
      const giscusTheme = this.theme === 'dark' ? 'dark' : 'light';
      const iframe = document.querySelector('iframe.giscus-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: giscusTheme } } }, 'https://giscus.app');
      }
    }
  };
}
window.themeSwitcher = themeSwitcher;

const data = require("./assets/data/build.json");
Alpine.data('versionData', () => ({
  'version': data.tag_name,
  'url': data.html_url,
}));

document.addEventListener('DOMContentLoaded', () => {
  Alpine.start();
});

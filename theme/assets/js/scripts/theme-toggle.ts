import Alpine from 'alpinejs';
// @ts-ignore: No type declarations available for this package
import collapse from '@alpinejs/collapse';

declare global {
  interface Window {
    Alpine: any;
    themeSwitcher: any;
  }
}

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
      if (document.firstElementChild) {
        document.firstElementChild.setAttribute('data-bs-theme', this.theme);
      }
      document.body.className = '';
      document.body.classList.add(this.theme);
    },
    changeGiscusTheme() {
      const giscusTheme = this.theme === 'dark' ? 'dark' : 'light';
      const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: giscusTheme } } }, 'https://giscus.app');
      }
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {

  window.Alpine = Alpine;
  window.themeSwitcher = themeSwitcher;

  Alpine.plugin(collapse);

  const data = require("./assets/data/build.json");
  Alpine.data('versionData', () => ({
    'version': data.tag_name,
    'url': data.html_url,
  }));

  Alpine.start();

});

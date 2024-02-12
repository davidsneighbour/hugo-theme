import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

function themeSwitcher() {
  return {
    theme: 'dark',
    init: function () {
      var _this = this;
      this.theme = this.getColorPreference();
      this.reflectPreference();
      this.changeGiscusTheme();
      setTimeout(function () {
        return _this.changeGiscusTheme();
      }, 5000);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        _this.theme = e.matches ? 'dark' : 'light';
        _this.setPreference();
      });
    },
    toggleTheme: function () {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.setPreference();
      this.changeGiscusTheme();
      setTimeout(function () {
        return _this.changeGiscusTheme();
      }, 2000);
    },
    getColorPreference: function () {
      return localStorage.getItem('dnb-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    },
    setPreference: function () {
      localStorage.setItem('dnb-theme', this.theme);
      this.reflectPreference();
    },
    reflectPreference: function () {
      if (document.firstElementChild) {
        document.firstElementChild.setAttribute('data-bs-theme', this.theme);
      }
      document.body.className = '';
      document.body.classList.add(this.theme);
    },
    changeGiscusTheme: function () {
      var giscusTheme = this.theme === 'dark' ? 'dark' : 'light';
      var iframe = document.querySelector('iframe.giscus-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: giscusTheme } } }, 'https://giscus.app');
      }
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  window.Alpine = Alpine;
  window.themeSwitcher = themeSwitcher;
  Alpine.plugin(collapse);
  var data = require("./assets/data/build.json");
  Alpine.data('versionData', function () {
    return {
      'version': data.tag_name,
      'url': data.html_url,
    };
  });
  Alpine.start();
});
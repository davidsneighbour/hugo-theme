// @see https://web.dev/building-a-theme-switch-component/
// @see https://drafts.csswg.org/css-color-adjust/#propdef-color-scheme
// @see https://web.dev/color-scheme/
// @see https://blog.jim-nielsen.com/2020/color-scheme-property/
// @see https://web.dev/prefers-color-scheme/
// @see https://www.joshwcomeau.com/react/dark-mode/
// @see https://github.com/GoogleChromeLabs/dark-mode-toggle

// @todo create a react component for this
const storageKey = 'dnb-theme'
const defaultTheme = 'light';

// set giscus theme urls
const giscusDarkTheme = 'dark';
const giscusLightTheme = 'light';

const onClickHandler = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
  changeGiscusTheme();
  setTimeout(changeGiscusTheme, 2000);
}

// get color scheme preference (default dark)
const getColorPreference = () => {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey)
  else
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
}

// save selected preference into local storage
const setPreference = () => {
  localStorage.setItem(storageKey, theme.value ? theme.value : 'light');
  reflectPreference();
}

// apply theme preference
const reflectPreference = () => {
  // @todo get embarrassed about the following 17 lines of code and refactor
  document.firstElementChild?.setAttribute('data-bs-theme', theme.value ? theme.value : 'light');
  document.querySelector('body')?.classList.add(theme.value ? theme.value : 'light');
  document.querySelector('body')?.classList.remove(theme.value === 'dark' ? 'light' : 'dark');

  if (theme.value === 'dark') {
    document.querySelector('#toggle-button-dark')?.classList.add('d-inline-block');
    document.querySelector('#toggle-button-dark')?.classList.remove('d-none');
    document.querySelector('#toggle-button-light')?.classList.add('d-none');
    document.querySelector('#toggle-button-light')?.classList.remove('d-inline-block');
  } else {
    document.querySelector('#toggle-button-light')?.classList.add('d-inline-block');
    document.querySelector('#toggle-button-light')?.classList.remove('d-none');
    document.querySelector('#toggle-button-dark')?.classList.add('d-none');
    document.querySelector('#toggle-button-dark')?.classList.remove('d-inline-block');
  }
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value ? theme.value : 'light');
}

// @todo move into hugo-giscus component
const changeGiscusTheme = () => {
  const theme = document.firstElementChild?.getAttribute('data-bs-theme') === 'dark' ? giscusDarkTheme : giscusLightTheme;

  function sendMessage(message: object) {
    const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
    if (!iframe) {
      return;
    }
    iframe.contentWindow?.postMessage({ giscus: message }, 'https://giscus.app');
  }

  sendMessage({
    setConfig: {
      theme: theme
    }
  });

}

const theme = {
  value: getColorPreference(),
}
reflectPreference()
window.onload = () => {
  reflectPreference();
  document.querySelector('#theme-toggle')?.addEventListener('click', onClickHandler);
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  });

changeGiscusTheme();
setTimeout(changeGiscusTheme, 5000);

document.querySelector('#theme-toggle')?.dispatchEvent(new CustomEvent('click'));

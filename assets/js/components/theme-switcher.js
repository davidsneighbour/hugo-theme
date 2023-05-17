/*
@see https://www.npmjs.com/package/react-bootstrap-icons
*/
import * as Icon from 'react-bootstrap-icons';

export default function ThemeSwitcher() {
  return (
    <li class="nav-item dropdown">
      <button
        class="btn btn-secondary rounded-pill"
        id="theme-toggle"
        title="Toggles light & dark"
        aria-label="auto"
        aria-live="polite">
        <span class="d-none" id="toggle-button-light">
          <Icon.SunFill />
        </span>
        <span class="d-none" id="toggle-button-dark">
          <Icon.MoonStarsFill />
        </span>
      </button>
    </li>
  )
}

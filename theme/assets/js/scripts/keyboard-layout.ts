// @ts-ignore: No type declarations available for this package
import { install } from '@github/hotkey'

for (const el of document.querySelectorAll('[data-hotkey]')) {
  install(el as HTMLElement, (el as HTMLElement).dataset.hotkey)
}

// click event for posts on post overviews
const triggerList = Array.prototype.slice.call(document.querySelectorAll('.is--hotkey-post'));
triggerList.forEach((triggerElement: HTMLElement) => {
  triggerElement.addEventListener('click', (event: { preventDefault: () => void }) => {
    event.preventDefault();
    window.location.href = triggerElement.dataset.link ?? '';
  });
});

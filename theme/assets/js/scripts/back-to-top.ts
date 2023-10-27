const triggerTabList = Array.prototype.slice.call(document.querySelectorAll('is--back-to-top'));
triggerTabList.forEach((triggerElement: Element) => {
  triggerElement.addEventListener('click', (event: { preventDefault: () => void }) => {
    event.preventDefault();
    document.body.scrollIntoView({ behavior: "smooth" });
  });
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const thebutton = document.getElementById("back-to-top");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    thebutton?.classList.remove('d-none', 'animate__animated', 'animate__fadeOut');
    thebutton?.classList.add('d-block', 'animate__animated', 'animate__fadeIn');
  } else {
    thebutton?.classList.remove('d-block', 'animate__animated', 'animate__fadeIn');
    thebutton?.classList.add('d-none', 'animate__animated', 'animate__fadeOut');
  }
}

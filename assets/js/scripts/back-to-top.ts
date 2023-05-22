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
    thebutton?.classList.add('d-block');
    thebutton?.classList.remove('d-none');
  } else {
    thebutton?.classList.add('d-none');
    thebutton?.classList.remove('d-block');
  }
}

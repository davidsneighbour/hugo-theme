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

// const animateCSS = (element, animation, prefix = 'animate__') =>
//   // We create a Promise and return it
//   new Promise((resolve, reject) => {
//     const animationName = `${prefix}${animation}`;
//     const node = document.querySelector(element);

//     node.classList.add(`${prefix}animated`, animationName);

//     // When the animation ends, we clean the classes and resolve the Promise
//     function handleAnimationEnd(event) {
//       event.stopPropagation();
//       node.classList.remove(`${prefix}animated`, animationName);
//       resolve('Animation ended');
//     }

//     node.addEventListener('animationend', handleAnimationEnd, { once: true });
//   });

//  ** Header Disappearing On Scrolling **

let lastScrollPosition = 0;
const hideOnScroll = () => {
  const header = document.querySelector("header");
  /* 
    Toggles the 'hide' class if the current scroll position is 
    bigger than the last scroll position, this basically means,
    that if we scroll down add 'hide' and if we scroll up
    remove 'hide'.
  */
  const currentScroll = window.scrollY;
  currentScroll > lastScrollPosition
    ? header.classList.add("hide")
    : header.classList.remove("hide");

  // Special case if the user is at the top of the page, removes "hide".
  currentScroll === 0 ? header.classList.remove("hide") : "";

  /*
    Reassigns lastScrollPosition and ensures it's not negative,
    negativity could come from bugs or phone unexpected phone
    behaviour.
  */
  lastScrollPosition = currentScroll <= 0 ? 0 : currentScroll;
};
window.addEventListener("scroll", hideOnScroll);

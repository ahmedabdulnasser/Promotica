/**
 * @param {Object} carouselElement The carousel container element.
 * @param {Object} leftBtnElement The left button element that you will use to control the carousel.
 * @param {Object} rightBtnElement The right button element that you will use to control the carousel.
 * @param {string} transDuration The transition animation duration/speed the cards will use during the transition. Don't forget to include the unit (s or ms) e.g. "0.3s".
 */

class Carousel {
  //                ** Constructor **
  constructor(carouselElement, leftBtnElement, rightBtnElement, transDuration) {
    this.carousel = carouselElement;
    this.cards = Array.from(this.carousel.children);
    this.cardWidth = this.cards[0].offsetWidth;
    this.transDuration = transDuration;
    /* 

    Notice that, an arrow fn here is used instead of passing a normal
    fn, بسبب بجاية حسستني إني عبيط, because if we used a normal fn 
    'this' will refer to the caller object which in our case will be 
    the caller left/right button object, but because the arrow fn
    does not have its own 'this', it will inherit it from the surronding
    lexical context which in our case is the Carousel الحمدلله.

    */
    leftBtnElement.addEventListener("click", () => this.moveLeft());
    rightBtnElement.addEventListener("click", () => this.moveRight());
  }

  //                ** moveLeft method **
  moveLeft() {
    const lastCard = this.carousel.lastElementChild;
    const firstCard = this.carousel.firstElementChild;

    /* 
        Last child of the carousel object is moved from the end
        to the beginning, as insertBefore moves the element if it
        already exists.
    */

    this.carousel.insertBefore(lastCard, firstCard);

    /*
        - The carousel is shifted to the left one-card-width while
        the transition anim is set to none, so the user does not
        notice the transition.

        - The carousel is then shifted back to the original location
        to the right after re-enabling the transition, which creates
        the illusion to the user that after they clicked the carousel
        moved to the right. But, in fact it moved to the left without
        them noticing then moved back to the right, so the transition
        animation work and the movement appears to be smooth.

    */

    this.carousel.style.transition = "none";
    this.carousel.style.transform = `translateX(-${this.cardWidth}px)`;

    /*
        Forcing the browser to reflow to prevent the browser from 
        removing our animation for optimization purposes after doing
        them once, by sending the browser to recalculate the element
        height, this makes it deal with the next anims as they weren't
        done before. 
        (احنا اسفين ياعم الاوبتيميزيشن جييك بس الانيميشن لازم تظهر)
    */
    this.carousel.offsetHeight;

    /* 
        Adding back our transition anim and moving the carousel
        to the right as explained before to create the illusion.
    */
    this.carousel.style.transition = `transform ${this.transDuration} ease`;
    this.carousel.style.transform = "translateX(0)";
  }

  //                ** moveRight method **
  moveRight() {
    const firstCard = this.carousel.firstElementChild;

    /* 
        Moving the child from the begginning to the end, as if the child
        exists, the method appendChild moves the child to the new loc.
    */
    this.carousel.appendChild(firstCard);

    // Moving the carousel to the right (reason already explained above).
    this.carousel.style.transition = "none";
    this.carousel.style.transform = `translateX(${this.cardWidth}px)`;

    /* 
        Triggering reflow and then moving the carousel back to the left,
        for reference check the explanation written above ya 3am.
    */
    this.carousel.offsetHeight;
    this.carousel.style.transition = `transform ${this.transDuration} ease`;
    this.carousel.style.transform = "translateX(0)";
  }
}

// Usage example
const serviceCarousel = new Carousel(
  document.querySelector(".carousel"),
  document.querySelector("#services-left-btn"),
  document.querySelector("#services-right-btn"),
  "0.3s"
);

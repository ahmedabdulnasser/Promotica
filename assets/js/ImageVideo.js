class ImageVideo {
  constructor(classObj, directory, imgList, transDuration) {
    this.classObj = classObj;
    this.directory = directory;
    this.imgList = imgList;
    this.index = 0;
    // Runs turnOn by default when the object in initialized.
    setInterval(() => {
      this.turnOn();
    }, transDuration);
  }
  turnOn() {
    const path = `url(${this.directory}${this.imgList[this.index]})`;
    this.classObj.style.backgroundImage = path;
    // Resets index to 0 if it's bigger than imgList length
    this.index = (this.index + 1) % this.imgList.length;
  }
}
let imgVid = new ImageVideo(
  document.querySelector(".why-chgable-img"),
  "/assets/img/chgable/",
  [...Array.from({ length: 4 }, (_, index) => `${index + 1}.jpg`)],
  1500
);

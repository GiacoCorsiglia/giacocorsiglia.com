import * as SimpleDOM from "./simple-dom";

const counterEl = <div className="pswp__ui__counter" /> as HTMLDivElement;

const closeButton = (
  <button className="pswp__ui__close" tabIndex={1} title="Exit overlay">
    Close
  </button>
) as HTMLButtonElement;

const prevButton = (
  <button className="pswp__ui__prev" tabIndex={3} title="Go to previous slide">
    Previous slide
  </button>
) as HTMLButtonElement;

const nextButton = (
  <button className="pswp__ui__next" tabIndex={2} title="Go to next slide">
    Next slide
  </button>
) as HTMLButtonElement;

const wrapperEl = (
  <div className="pswp__ui">
    {counterEl}
    {closeButton}
    {prevButton}
    {nextButton}
  </div>
) as HTMLDivElement;

export function getCustomPhotoSwipeUIElements() {
  return wrapperEl;
}

function showUI() {
  wrapperEl.classList.add("pswp__ui--active");
}

function hideUI() {
  wrapperEl.classList.remove("pswp__ui--active");
}

export class CustomPhotoSwipeUI implements PhotoSwipe.UI<PhotoSwipe.Options> {
  public constructor(private readonly pswp: PhotoSwipe<PhotoSwipe.Options>) {}

  public init() {
    const pswp = this.pswp;

    // Fade controls in and out along with rest of UI.
    pswp.listen("initialZoomInEnd", showUI);
    pswp.listen("close", hideUI);

    // Set up counter element.
    const counterText = () =>
      pswp.getCurrentIndex() + 1 + " / " + pswp.items.length;
    counterEl.innerText = counterText();
    pswp.listen("afterChange", () => (counterEl.innerText = counterText()));
    pswp.listen("destroy", () => (counterEl.innerText = ""));

    // Set up control buttons.
    const closeFn = () => pswp.close();
    const prevFn = () => pswp.prev();
    const nextFn = () => pswp.next();
    pswp.listen("bindEvents", () => {
      closeButton.addEventListener("click", closeFn);
      prevButton.addEventListener("click", prevFn);
      nextButton.addEventListener("click", nextFn);
    });
    // We preserve the elements but the PhotoSwipe instance will be switched, so
    // we must also remove these listeners when the overlay is closed.
    pswp.listen("unbindEvents", () => {
      closeButton.removeEventListener("click", closeFn);
      prevButton.removeEventListener("click", prevFn);
      nextButton.removeEventListener("click", nextFn);
    });
  }
}

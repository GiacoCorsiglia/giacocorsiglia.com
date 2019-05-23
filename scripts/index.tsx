import * as scroll from "./scroll";
import * as SimpleDOM from "./simple-dom";

// This is a UMD global not included in the PhotoSwipe type declarations.
declare const PhotoSwipeUI_Default: any;

// Helpers.

const toArray = <T extends Node>(nl: NodeListOf<T>): T[] =>
  Array.prototype.slice.call(nl);

// Set up PhotoSwipe.

const pswpElement = (
  <div className="pswp" tabIndex={-1} role="dialog" ariaHidden="true">
    {/* These elements (plus the container) are required by PhotoSwipe: */}
    <div className="pswp__bg" />

    <div className="pswp__scroll-wrap">
      <div className="pswp__container">
        <div className="pswp__item" />
        <div className="pswp__item" />
        <div className="pswp__item" />
      </div>

      {/* These elements are for the Default PhotoSwipe UI: */}
      <div className="pswp__ui pswp__ui--hidden">
        <div className="pswp__top-bar">
          <div className="pswp__counter" />

          <button
            className="pswp__button pswp__button--close"
            title="Close (Esc)"
          />

          <button
            className="pswp__button pswp__button--fs"
            title="Toggle fullscreen"
          />

          <button
            className="pswp__button pswp__button--zoom"
            title="Zoom in/out"
          />

          <div className="pswp__preloader">
            <div className="pswp__preloader__icn">
              <div className="pswp__preloader__cut">
                <div className="pswp__preloader__donut" />
              </div>
            </div>
          </div>
        </div>

        <button
          className="pswp__button pswp__button--arrow--left"
          title="Previous (arrow left)"
        />

        <button
          className="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"
        />

        <div className="pswp__caption">
          <div className="pswp__caption__center" />
        </div>
      </div>
    </div>
  </div>
);
document.body.appendChild(pswpElement);

// Set up galleries.

const galleries = toArray(document.querySelectorAll<HTMLElement>(".gallery"));

galleries.forEach((gallery, index) => {
  /** List of slide <img> elements */
  const slides = toArray(
    gallery.querySelectorAll<HTMLImageElement>(".gallery__slide")
  );

  /** Index of the current slide */
  let current = 0;
  let interval: null | number = null;

  // The following elements will only be non-empty if there are multiple slides.
  const dots = toArray(
    gallery.querySelectorAll<HTMLElement>(".gallery__controls__slide")
  );
  const playButton = gallery.querySelector(".gallery__controls__play");
  const pauseButton = gallery.querySelector(".gallery__controls__pause");
  const fullscreenButton = gallery.querySelector(
    ".gallery__controls__fullscreen"
  );
  const exitFullscreenButton = gallery.querySelector(
    ".gallery__controls__exit-fullscreen"
  );

  function goToSlide(next: number) {
    if (next === current) {
      return;
    }

    const prev = current;
    const transitionend = () => {
      slides[prev].classList.remove("transitioning-out");
      slides[next].removeEventListener("transitionend", transitionend);
    };
    slides[next].addEventListener("transitionend", transitionend);

    slides[prev].classList.replace("active", "transitioning-out");
    slides[next].classList.add("active");
    dots[prev].classList.remove("gallery__controls__slide-active");
    dots[next].classList.add("gallery__controls__slide-active");
    current = next;
  }
  function goToNextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function play() {
    if (interval !== null) {
      return;
    }
    interval = setInterval(goToNextSlide, 3000);
    (pauseButton as HTMLElement).removeAttribute("disabled");
    (playButton as HTMLElement).setAttribute("disabled", "disabled");
  }

  function pause() {
    if (interval === null) {
      return;
    }
    clearInterval(interval);
    interval = null;
    (pauseButton as HTMLElement).setAttribute("disabled", "disabled");
    (playButton as HTMLElement).removeAttribute("disabled");
  }

  // We only need slideshow functionality if there are multiple slides.
  if (slides.length > 1) {
    // Add spacer slide to preserve the height while the actual slides get
    // positioned absolutely.
    const spacerSlide = slides[0].cloneNode(true) as HTMLElement;
    spacerSlide.classList.add("gallery__slide--spacer");
    slides[0].before(spacerSlide);

    // Tell CSS we're ready.
    slides[0].classList.add("active");
    dots[0].classList.add("gallery__controls__slide-active");
    gallery.classList.add("ready");

    // Start slideshow when this gallery scrolls into view.
    const unwatch = scroll.watch(gallery, 30, play, pause);

    // Add control event listeners.
    (pauseButton as HTMLElement).addEventListener("click", () => {
      unwatch();
      pause();
    });
    (playButton as HTMLElement).addEventListener("click", play);
    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        unwatch();
        pause();
        goToSlide(i);
      })
    );
  }

  // PhotoSwipe (fancy zoom functionality).

  function openPswp() {
    // Stop the slideshow.
    const wasPlaying = interval !== null;
    pause();

    const pswpOptions: PhotoSwipe.Options = {
      // Open to current slide.
      index: current,
      // Animate zoom from where the image starts.
      getThumbBoundsFn() {
        var pageYScroll =
          window.pageYOffset || document.documentElement.scrollTop;
        const currentSlideEl = slides[current];
        var rect = currentSlideEl.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      },
      // Opacity of the overlay.
      bgOpacity: 0.9,
      // Don't push-state navigate when swiping through images.
      history: false
    };

    const pswp = new PhotoSwipe(
      pswpElement as HTMLElement,
      // CustomPhotoSwipeUI,
      PhotoSwipeUI_Default,
      slides.map(slideEl => ({
        // The `currentSrc` property returns the browser's choice from the `srcset`.
        src: slideEl.currentSrc || slideEl.src,
        w: slideEl.width || 1040,
        h: slideEl.height || 538
      })),
      pswpOptions
    );
    pswp.init();

    document.body.style.overflow = "hidden";
    pswp.listen("destroy", () => (document.body.style.overflow = "auto"));

    // Keep the inline slideshow in sync with the overlay.
    pswp.listen("afterChange", () => goToSlide(pswp.getCurrentIndex()));
    if (wasPlaying) {
      // Start the slideshow again on PhotoSwipe close if it was playing before.
      pswp.listen("close", play);
    }
  }

  if (slides.length > 1) {
    // No fullscreen button otherwise.
    (fullscreenButton as HTMLElement).addEventListener("click", openPswp);
  }
  slides.forEach(slideEl => {
    slideEl.style.cursor = "zoom-in";
    slideEl.addEventListener("click", openPswp);
  });
});

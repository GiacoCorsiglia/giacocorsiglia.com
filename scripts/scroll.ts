import { debounce } from "./util";

interface Watcher {
  element: Element;
  threshold: number;
  wasInViewport: boolean;
  onScrollIn: () => void;
  onScrollOut: () => void;
}

const watchers: Watcher[] = [];

export function watch(
  element: Element,
  threshold: number,
  onScrollIn: () => void,
  onScrollOut: () => void = () => undefined
): () => void {
  const watcher: Watcher = {
    element,
    wasInViewport: false,
    threshold,
    onScrollIn,
    onScrollOut
  };
  watchers.push(watcher);
  if (watchers.length === 1) {
    window.addEventListener("scroll", debouncedScrollHandler);
  }

  return function unwatch() {
    const index = watchers.indexOf(watcher);
    watchers.splice(index, 1);
    if (watchers.length === 0) {
      window.removeEventListener("scroll", debouncedScrollHandler);
    }
  };
}

function scrollHandler() {
  watchers.forEach(watcher => {
    if (isInViewport(watcher.element, watcher.threshold)) {
      if (!watcher.wasInViewport) {
        watcher.onScrollIn();
        watcher.wasInViewport = true;
      }
    } else if (watcher.wasInViewport) {
      watcher.onScrollOut();
      watcher.wasInViewport = false;
    }
  });
}

const debouncedScrollHandler = debounce(scrollHandler, 20, true);

function isInViewport(element: Element, threshold: number): boolean {
  const bounds = element.getBoundingClientRect();

  if (bounds.top >= window.innerHeight - threshold) {
    // It's further down the page (haven't scrolled to it yet).
    return false;
  }

  if (bounds.bottom <= threshold) {
    // It's further up the page (scrolled past it).
    return false;
  }

  return true;
}

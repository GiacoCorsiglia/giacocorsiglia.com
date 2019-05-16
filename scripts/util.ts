export function debounce<T extends Function>(
  func: T,
  wait: number,
  immediate: boolean
): T {
  let timeout: undefined | number;

  return <T>(<any>function(this: any) {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = undefined;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  });
}

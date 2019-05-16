// This file allows referencing PhotoSwipe as a UMD global inside modules
// https://github.com/microsoft/TypeScript/issues/10178#issuecomment-263030856
import * as PhotoSwipe from "photoswipe";

declare global {
  var PhotoSwipe: typeof PhotoSwipe;
}

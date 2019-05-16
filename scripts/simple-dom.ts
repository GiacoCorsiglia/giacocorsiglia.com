/**
 * Mini JSX implementation, just for fun!
 */

// In theory could remove readonly props: https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir
type PropsType<K extends keyof HTMLElementTagNameMap> = {
  [P in keyof HTMLElementTagNameMap[K]]?: HTMLElementTagNameMap[K][P] extends
    | string
    | number
    | boolean
    ? HTMLElementTagNameMap[K][P]
    : never
};

export function createElement<K extends keyof HTMLElementTagNameMap>(
  type: K,
  props?: PropsType<K>,
  ...children: any[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(type);

  props = props || {};
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      // TypeScript didn't respect the !== undefined type guard.
      const value: any = props[key];
      if (value !== undefined) {
        element[key] = value;
      }
    }
  }

  for (const child of children) {
    let childNode: Node;
    if (typeof child === "string") {
      childNode = document.createTextNode(child);
    } else if (child instanceof Node) {
      childNode = child;
    } else {
      childNode = document.createTextNode(child.toString());
    }
    element.appendChild(childNode);
  }

  return element;
}

declare global {
  namespace JSX {
    interface Element extends Node {}

    type IntrinsicElements = {
      [E in keyof HTMLElementTagNameMap]: PropsType<E> & {
        [key: string]: any;
      }
    };
  }
}

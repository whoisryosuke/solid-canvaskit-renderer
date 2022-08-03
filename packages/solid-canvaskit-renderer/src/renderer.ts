// example custom dom renderer
import { createRenderer } from "solid-js/universal";
import { createCanvasComponent } from "./create";
import { VElement } from "./node"
// import { createElement as createThreeElement, SupportedThreeElements } from "./three"

const log = (...args) => {
  console.log(`[RENDERER] `, ...args);
}

export const {
  render,
  effect,
  memo,
  createComponent,
  createElement,
  createTextNode,
  insertNode,
  insert,
  spread,
  setProp,
  mergeProps
} = createRenderer({
  createElement(string: string): VElement {
    log('creating element', string);
    
    
    // Create new CanvasKit element class (e.g. SkParagraph)
    const componentInstance = createCanvasComponent(string);
    // Call render method?
    log('Created component', componentInstance)
    componentInstance.render();
    // Maybe optional: Attach instance to a VElement class (aka virtual node)

    return new VElement('text');
  },
  createTextNode(value: string): VElement {
    // @TODO: Figure out Text in ThreeJS
    // return createTextElement(value);
    return new VElement('text');
  },
  replaceText(textNode: VElement, value) {
    textNode.content = value;
  },
  setProperty(node: VElement, name: string, value: any) {
    node.setAttribute(name, value);
  },
  insertNode(parent: VElement, node: VElement, anchor: VElement) {
    log('render', parent, node, node.childNodes[0], node.content)
    if(!parent){
      log('no parent found!', node, node.content, node.childNodes)
    }
    log('inserting node', node);
    // parent.insertBefore(node, anchor);

    // Ideally we don't need this? Since CanvasKit/Skia doesn't use a node-based system
    // Our goal is just to take JSX and convert it to a render/draw call
    // Unless SolidJS needs this to manage JSX changes? (like hiding an element and thus removing from "DOM"?)
  },
  isTextNode(node: VElement) {
    return node.type === 3;
  },
  removeNode(parent: VElement, node: VElement) {
    parent.removeChild(node);
  },
  getParentNode(node: VElement) {
    return node.parentNode;
  },
  getFirstChild(node: VElement) {
    return node.firstChild;
  },
  getNextSibling(node: VElement) {
    return node.nextSibling;
  }
});

// Forward Solid control flow
export {
  For,
  Show,
  Suspense,
  SuspenseList,
  Switch,
  Match,
  Index,
  ErrorBoundary
} from "solid-js";
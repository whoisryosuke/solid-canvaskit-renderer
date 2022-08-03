// example custom dom renderer
import { createRenderer } from "solid-js/universal";
import { SkNode } from "./components/SkNode";
import { CanvasComponentList, createCanvasComponent } from "./create";
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
} = createRenderer<SkNode>({
  createElement(string: CanvasComponentList): SkNode {
    log('creating element', string);
    
    
    // Create new CanvasKit element class (e.g. SkParagraph)
    const componentInstance = createCanvasComponent(string);
    // Call initialize / render method?
    log('Created component', string, componentInstance)
    if(!componentInstance) {
      throw Error('[RENDERER] Could not make that - make sure its a supported component')
    }
    log('Initalized component', string)
    componentInstance.initialize?.();
    // Maybe optional: Attach instance to a VElement class (aka virtual node)

    return componentInstance;
  },
  //@ts-ignore - we'll deal with this later
  createTextNode(value: string): void {
    // @TODO: Figure out Text in ThreeJS
    // return createTextElement(value);
    return;
  },
  replaceText(textNode: SkNode, value) {
    // textNode = value;
  },
  setProperty(node: SkNode, name: string, value: any) {
    log('Setting prop', node, name, value);
    node.setProp(name, value);
    
    // Re-render component
    node.render();
  },
  insertNode(parent: SkNode, node: SkNode, anchor: SkNode) {
    log('render', parent, node)
    if(!parent){
      log('no parent found!', node)
    }
    log('inserting node', node);

    // Run render method)
    // node.render();
    // parent.insertBefore(node, anchor);

    // Ideally we don't need this? Since CanvasKit/Skia doesn't use a node-based system
    // Our goal is just to take JSX and convert it to a render/draw call
    // Unless SolidJS needs this to manage JSX changes? (like hiding an element and thus removing from "DOM"?)
  },
  isTextNode(node: SkNode) {
    return node.type === 3;
  },
  removeNode(parent: SkNode, node: SkNode) {
    parent.removeChild(node);
  },
  getParentNode(node: SkNode) {
    return node.parentNode;
  },
  getFirstChild(node: SkNode) {
    return node.firstChild;
  },
  getNextSibling(node: SkNode) {
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
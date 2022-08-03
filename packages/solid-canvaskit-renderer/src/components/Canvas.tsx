import CanvasKitInit, { CanvasKit } from "canvaskit-wasm";
import { children as solidChildren, createEffect, createRenderEffect, createSignal } from "solid-js";
import { ResolvedChildren } from "solid-js/types/reactive/signal";
import store from "../store";
import { SkNode } from "./SkNode";

type Props = {}

const initializeCanvas = async () => {
        // Check for existing context and surface
        const { context, surface, initalizeContext } = store.getState();
        if(context || surface) return;

        
        const newContext: CanvasKit = await CanvasKitInit({
            locateFile: (file: string): string => `https://unpkg.com/canvaskit-wasm@0.35.0/bin/${file}`,
        })
        if (!newContext) {
        console.error('[CANVAS] Could not make context');
        return;
        }

        console.log('[CANVAS] Creating surface', newContext)

        // Make a CanvasKit "surface" (aka print to our `<canvas>` element)
        const newSurface = newContext.MakeWebGLCanvasSurface('canvaskit');
        if (!newSurface) {
        console.error('[CANVAS] Could not make surface');
        return;
        }

        console.log('[CANVAS] Adding to store surface')
        // Add context and surface to global store
        // Lets other components add themselves to canvas
        initalizeContext(newContext, newSurface);

        console.log('[CANVAS] Done with surface')
}

export const Canvas = ({children}: Props) => {
  const [initialized, setInitialized] = createSignal(false);

    console.log('[CANVAS] children', children);

    /**
     * If there's only 1 child, make it an array so we can loop over it
     * @param childrenCheck 
     * @returns 
     */
    const checkChildren = (childrenCheck: ResolvedChildren) => {
      if(!Array.isArray(childrenCheck)) return [childrenCheck];
      return childrenCheck;
    }

    /**
     * Initialize CanvasKit and connect `<canvas>` element
     */
    createEffect(async () => {
      if(!initialized()) {
        await initializeCanvas()
        setInitialized(true);
      }
    })

    /**
     * Run the render method on all children (aka "drawing" all child elements)
     */
    const memo = solidChildren(() => children);
    createEffect(() => {
      // We should only be rendering when the canvas is initialized!
      // Otherwise nothing renders unless props change
      if(initialized()) {
        console.log('[CANVAS-C] RENDERING CHILDREN!');
        const realChildren = memo();
        // @ts-ignore Not sure where to wire this up...but this does return SkNode, not JSXElement
        let childrenMap = checkChildren(realChildren) as SkNode[];
        
        childrenMap?.forEach((c: SkNode) => c.render())
      }
    })
  return (
    <></>
  )
}

export default Canvas;
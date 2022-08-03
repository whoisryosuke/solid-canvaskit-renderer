import CanvasKitInit, { CanvasKit } from "canvaskit-wasm";
import store from "../store";
import { SkNode } from "./SkNode";

export default class SkCanvas extends SkNode { 

    async initialize() {
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
    render() {
        // this.initialize();
    }
}
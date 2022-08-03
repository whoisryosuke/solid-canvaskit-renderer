import SkGradient from "./components/SkGradient"
import SkCanvas from "./components/SkCanvas"
import { SkNode } from "./components/SkNode"

// We do lowerCamelCase so it renders as a "HTML" element (instead of a Function/Component)
export const CANVAS_COMPONENTS = {
  'skCanvas': SkCanvas,
  'skGradient': SkGradient,
}
export type CanvasComponentList = keyof typeof CANVAS_COMPONENTS

export const createCanvasComponent = <T>(component: CanvasComponentList): SkNode | undefined => {
    if(!(component in CANVAS_COMPONENTS)) return;
    const newClass = CANVAS_COMPONENTS[component];
    return new newClass();
} 


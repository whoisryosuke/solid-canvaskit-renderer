import SkGradient from "./components/SkGradient"
import SkCanvas from "./components/SkCanvas"

// We do lowerCamelCase so it renders as a "HTML" element (instead of a Function/Component)
export const CANVAS_COMPONENTS = {
  'skCanvas': SkCanvas,
  'skGradient': SkGradient,
}

export const createCanvasComponent = (component: string) => {
    if(!(component in CANVAS_COMPONENTS)) return;
    const newClass = CANVAS_COMPONENTS[component];
    return new newClass();
} 


import create from 'zustand/vanilla'
import type { Canvas, CanvasKit, Surface } from "canvaskit-wasm";

interface CanvasKitState {
  context: CanvasKit | null;
  surface: Surface | null;
  initalizeContext: (context: CanvasKit, surface: Surface) => void
}

const store = create<CanvasKitState>((set) => ({ 
  context: null,
  surface: null,
  initalizeContext: (context, surface) => set((state) => ({ ...state, context, surface })),
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
 }))

export default store
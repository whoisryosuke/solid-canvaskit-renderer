import { createSignal, onCleanup, batch } from "solid-js";
import { Canvas, render, VElement } from "solid-canvaskit-renderer";
import Repeat from "./Repeat";

const random = () => Math.random() * 360;
const [frames, setFrames] = createSignal(Array(30).fill(0), { equals: false }); // for smoothing out FPS counter

const fps = () =>
  frames().reduce((total, frame) => total + frame) / frames().length;

function App() {

  let last = Date.now();
  let frame = requestAnimationFrame(function loop() {
    frame = requestAnimationFrame(loop);

    // Calculate FPS
    const now = Date.now();
    const elapsed = now - last;
    const f = frames();
    f.shift();
    f[f.length] = 1000 / elapsed;
    setFrames(f);

    last = now;
  });

  onCleanup(() => cancelAnimationFrame(frame));

  return (
      <Canvas>
        <skGradient color={['WHITE', 'RED', 'BLUE']} />
      </Canvas>
  );
}

const tree = new VElement('root')

render(App, tree);
console.log('[APP] node tree', tree)
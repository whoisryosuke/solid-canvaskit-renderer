import store from "../store";
import { SkNode } from "./SkNode";

export default class SkGradient extends SkNode {
    
    render() {
        console.log('[GRADIENT] Attempting to render')
        const { context, surface } = store.getState();
        if(!context || !surface) return;

        const canvas = surface.getCanvas();
        if(!canvas) return;
        console.log('[GRADIENT] Canvas detected - rendering...')

        let paint = new context.Paint();
        console.log('[GRADIENT] DRAWING Paint process')

        const colors = ['RED', 'GREEN', 'BLUE'];

        // See https://fiddle.skia.org/c/f48b22eaad1bb7adcc3faaa321754af6
        // for original c++ version.
        let colorMap = colors.map(color => context[color]).filter(x => x !== undefined) as Float32Array[];
        if(!colorMap) return;
        let pos =    [0, .7, 1.0];
        let transform = [2, 0, 0,
                        0, 2, 0,
                        0, 0, 1];
        let shader = context.Shader.MakeRadialGradient([150, 150], 130, colorMap,
                                pos, context.TileMode.Mirror, transform);

        paint.setShader(shader);
        const textFont = new context.Font(null, 75);
        const textBlob = context.TextBlob.MakeFromText('Radial', textFont);

        // canvas.drawTextBlob(textBlob, position.x, position.y, paint);
        canvas.drawTextBlob(textBlob, 10, 200, paint);

        paint.delete();
        textFont.delete();
        textBlob.delete();
        surface.flush();
    }
}
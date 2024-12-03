import type p5 from "p5";

export default {
    setup: (p: p5) => { },
    draw: (p: p5) => {
        p.clear();

        p.fill(180, 0, 0);
        p.ellipse(p.width / 2, p.height / 2, 70, 70);
        // drawing code here

        p.noLoop();
    }
}
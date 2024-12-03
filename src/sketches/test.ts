import type p5 from "p5";

let lat, long = 0;

export default {
    setup: (p:p5) => {},
    draw: (p: p5) => {
        p.clear();
        console.trace();
        p.strokeWeight(2);
        p.noFill();
        for (let i=0; i<8;i++) {
            const rx = p.random(-40, 40)
            const ry = p.random(-40, 40)
            p.ellipse(60 + rx, p.height - 60 - ry, 20, 20)
        }

        p.noLoop();
    }
}
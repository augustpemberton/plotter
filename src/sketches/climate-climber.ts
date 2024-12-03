import p5 from "p5";

let lat = 51.4356793167829
let long = -2.5965190462426735

let data = <number[]>[];
let maxReading = 0, minReading = 0;

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export default {
    prepare: async () => {
        try {
            const coords = await getPosition();
            lat = coords.coords.latitude;
            long = coords.coords.longitude;

            console.log(lat, long);
        } catch (e) {
            console.log("unable to get coords");
        }

        // lat = 26.238
        // long = -80.566

        const key = "temperature_2m_mean";

        const params = {
            latitude: lat.toFixed(5),
            longitude: long.toFixed(5),
            start_date: "1950-01-01",
            end_date: "2050-12-31",
            models: "MPI_ESM1_2_XR",
            daily: key
        }

        var url = new URL('https://climate-api.open-meteo.com/v1/climate');
        const paramsObj = new URLSearchParams(params);

        const res = await fetch(`${url}?${paramsObj.toString()}`);
        const json = await res.json();

        let readings = json.daily[key];

        const avg_over = 365 * 5;
        data = [];
        for (let i = 0; i < readings.length - avg_over; i += avg_over) {
            let avg = 0;

            const end = Math.min(i + avg_over, readings.length);
            const num = end - i;
            for (let j = i; j < end; j++) {
                avg += readings[j];
            }

            avg /= num;

            data.push(avg);

            if (avg > maxReading || maxReading == 0) maxReading = avg;
            if (avg < minReading || minReading == 0) minReading = avg;
        }
    },

    setup: (p: p5) => { },
    draw: (p: p5) => {

        p.clear();
        p.strokeWeight(2)
        p.colorMode(p.HSB);
        p.stroke(300, 20, 30);
        p.noFill();

        // for (let x = -p.width; x < p.width; x += 15) {
        drawCurve(p, 0, 0);
        // }

        p.noLoop();
    }
}

function drawCurve(p: p5, x_offset: number, y_offset: number) {

    const pixelsPerReading = p.height / (data.length - 1);

    p.beginShape();

    for (let i = 0; i < data.length; i++) {
        const x_t = (data[i] - minReading) / (maxReading - minReading);
        let x = (1 - x_t) * p.width + x_offset;

        let y = p.height - pixelsPerReading * i + y_offset;


        let pos = new p5.Vector(x, y);
        // const centre = new p5.Vector(p.width / 2, p.height / 2);
        // const dist_to_c = p5.Vector.sub(pos, centre);

        // const mag = dist_to_c.mag();
        // const rad = 300;
        // if (mag < rad) {
        //     const mrad_t = Math.pow((1 - mag / rad), 3);
        //     const move_mult = mrad_t * 2.9;
        //     pos.add(dist_to_c.mult(move_mult));
        // }

        p.curveVertex(pos.x + p.random(-3, 3), pos.y);
        if (i == 0 || i == data.length - 1) {
            p.curveVertex(pos.x, pos.y);
        }
    }

    p.endShape();
}

function getPosition(): Promise<GeolocationPosition> {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej)
    });
}
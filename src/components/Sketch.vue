<template>
    <div class="flex flex-col items-center relative">
        <div ref="canvasContainer" class="h-0 grow flex justify-center relative w-full bg-white
        ">

        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import p5 from 'p5';
import type { p5SVG } from "p5.js-svg"

let p5Instance: p5;
const canvasContainer = ref<HTMLElement>();

const props = defineProps<{
    sketch: Sketch,
}>();

let sketchWrapper = (p: p5SVG) => {

    const resizeCanvas = () => {
        const containerWidth = canvasContainer.value?.offsetWidth || 100;
        const containerHeight = canvasContainer.value?.offsetHeight || 100;

        p.resizeCanvas(containerWidth, containerHeight);
    };

    p.setup = () => {
        p.createCanvas(300, 100, p.SVG); // A4 dimensions in pixels (72 dpi)

        resizeCanvas();
        if (canvasContainer.value) new ResizeObserver(resizeCanvas).observe(canvasContainer.value)

        props.sketch.setup(p);
    };

    p.draw = () => {
        props.sketch.draw(p);
    };

    p.windowResized = resizeCanvas;

};

onMounted(async () => {
    if (canvasContainer.value) {
        if (props.sketch.prepare) await props.sketch.prepare();
        p5Instance = new p5(sketchWrapper, canvasContainer.value);
    }
})

onUnmounted(() => {
    p5Instance?.remove();
})

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

function saveSVG(name: string) {
    if (!p5Instance) return;

    // Get the SVG element
    const svgElement = (p5Instance as unknown as any).canvas.svg as unknown as SVGSVGElement;

    // Clone the SVG to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

    // Get the current viewBox
    const viewBox = clonedSvg.getAttribute('viewBox')?.split(' ').map(Number);
    if (!viewBox) return;

    // Calculate the scale factors
    const scaleX = A4_WIDTH_MM / viewBox[2];
    const scaleY = A4_HEIGHT_MM / viewBox[3];

    // Set new width and height
    clonedSvg.setAttribute('width', `${A4_WIDTH_MM}mm`);
    clonedSvg.setAttribute('height', `${A4_HEIGHT_MM}mm`);

    // Set new viewBox
    clonedSvg.setAttribute('viewBox', `0 0 ${A4_WIDTH_MM} ${A4_HEIGHT_MM}`);

    // Scale all child elements
    const contentGroup = clonedSvg.querySelector('g');
    if (contentGroup) {
        contentGroup.setAttribute('transform', `scale(${scaleX}, ${scaleY})`);
    }

    // Convert SVG to a Blob
    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });

    // Create and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(svgBlob);
    link.download = `${name}.svg`;
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
}

defineExpose({ saveSVG })

</script>
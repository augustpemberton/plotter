<template>
    <div class="h-0 grow w-full flex flex-col">
        <h1 class="text-center mb-5 text-3xl">{{ sketchName }}</h1>

        <div class="h-0 grow w-full">
            <div class="h-full aspect-[210/297] mx-auto relative">
                <SketchVue v-if="sketch" :sketch="sketch" ref="sketchWrapper"
                    class="w-full h-full first:outline-2 first:outline first:shadow-xl" />

                <div class="absolute top-0 -right-8 flex flex-col gap-1 w-5">
                    <button @mousedown="save" class="opacity-20 hover:opacity-100">
                        <vue-feather type="save"></vue-feather>
                    </button>
                    <button @mousedown="reloadSketch" class="opacity-20 hover:opacity-100">
                        <vue-feather type="refresh-cw"></vue-feather>
                    </button>
                </div>

                <div class="absolute -left-10 top-0 flex flex-col gap-1">
                    <RouterLink to="/" class="opacity-20 hover:opacity-100">
                        <vue-feather type="chevron-left" class="w-8"></vue-feather>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SketchVue from '@/components/Sketch.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const sketch = ref<Sketch>();
const sketchWrapper = ref<InstanceType<typeof SketchVue>>();
const route = useRoute();

const sketchName = route.params.name;

const reloadSketch = () => {
    sketch.value = undefined;
    import(`../sketches/${sketchName}.ts`).then(s => {
        sketch.value = s.default;
    })
}

function getDateTimeString() {
    const now = new Date();
    return now.getFullYear() +
        ('0' + (now.getMonth() + 1)).slice(-2) +
        ('0' + now.getDate()).slice(-2) + '_' +
        ('0' + now.getHours()).slice(-2) +
        ('0' + now.getMinutes()).slice(-2) +
        ('0' + now.getSeconds()).slice(-2);
}

function save() {
    let name = `${sketchName as string}-${getDateTimeString()}`;
    if (sketchWrapper.value) sketchWrapper.value.saveSVG(name);
}

reloadSketch();

</script>
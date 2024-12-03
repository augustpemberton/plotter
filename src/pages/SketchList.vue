<template>
    <div class="mx-auto w-full max-w-lg">
        <h1 class="text-3xl mt-24 w-full">sketches:</h1>
        <hr class="border-dark mb-3" />

        <div class="flex flex-col">
            <RouterLink v-for="sketch of sketches" :to="`/sketch/${sketch}`"
                class="hover:underline text-orange hover:bg-orange hover:text-dark px-1">
                {{ sketch }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const sketchesImport = import.meta.glob(['../sketches/*.ts', '!../sketches/*.d.ts']);
const sketches = ref<string[]>([]);

for (const path in sketchesImport) {
    sketches.value.push(path.replace('../sketches/', '').replace('.ts', ''))
}

</script>

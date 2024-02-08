<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{ points: number }>();

const angle = 2 * Math.PI / 5;
const outerDist = 150;
const innerDist = 45;

const pathRef = ref<SVGPathElement | null>(null);

onMounted(() => {
	const path = pathRef.value;
	if (!path) return;
	let d = "";
	let xInitial = 0;
	let yIntial = 0;
	for (let i = 0; i < 5; i++) {
		const xOut = Math.round(outerDist * Math.sin((i + 0.5) * angle));
		const yOut = Math.round(outerDist * Math.cos((i + 0.5) * angle));
		const xIn = Math.round(innerDist * Math.sin(i * angle));
		const yIn = Math.round(innerDist * Math.cos(i * angle));
		// Inner
		if (i === 0) {
			d += `M${xIn},${yIn} `;
			xInitial = xIn;
			yIntial = yIn;
		} else {
			d += `${xIn},${yIn} `;
		}
		// Outer
		if (i < 4) {
			d += `Q${xOut},${yOut} `;
		} else {
			d += `Q${xOut},${yOut} ${xInitial},${yIntial}`;
		}
	}
	path.setAttribute("d", d);
});

</script>
<template>
	<svg viewBox="-100 -100 200 200" :class="{ 'text-yellow-500': points > 0, 'text-gray-500': points <= 0 }">
		<circle cx="0" cy="0" r="100" fill="none" stroke="#ffffff44" stroke-width="1" />
		<path ref="pathRef" d="" fill="currentColor" stroke-linejoin="round" />
	</svg>
</template>

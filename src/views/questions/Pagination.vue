<script setup lang="ts">
import { computed } from "vue";
import {
	IconChevronDoubleRight,
	IconChevronLeft,
	IconChevronRight,
	IconChevronDoubleLeft,
} from "@/components/icons";
import { ITEMS_PER_PAGE } from "@/utils";

const props = defineProps<{
	totalItems: number;
	currentPage: number;
	setPage: (n: number) => void;
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / ITEMS_PER_PAGE));
const isFirst = computed(() => props.currentPage === 1);
const isLast = computed(() => props.currentPage === totalPages.value);

const pages = computed(() => {
	let first = props.currentPage - 2;
	let last = props.currentPage + 2;
	if (first < 1) {
		last += 1 - first;
		first = 1;
		if (last > totalPages.value) last = totalPages.value;
	}
	if (last > totalPages.value) {
		first -= last - totalPages.value;
		last = totalPages.value;
		if (first < 1) first = 1;
	}
	const items: Array<number> = [];
	for (let i = first; i <= last; i++) {
		items.push(i);
	}
	return items;
});

</script>

<template>
	<div>Current page: {{ currentPage }}</div>
	<div>Is first: {{ isFirst }}</div>
	<div class="flex justify-center gap-4">
		<div class="join">
			<button class="join-item btn btn-sm text-lg" @click="setPage(1)" :disabled="isFirst">
				<IconChevronDoubleLeft />
			</button>
			<button class="join-item btn btn-sm text-lg" @click="setPage(currentPage - 1)" :disabled="isFirst">
				<IconChevronLeft />
			</button>
		</div>
		<div class="join">
			<button v-for="page in pages" class="join-item btn btn-sm" :class="{ 'btn-primary': page === currentPage }"
				@click="setPage(page)">
				{{ page }}
			</button>
		</div>
		<div class="join">
			<button class="join-item btn btn-sm text-lg" @click="setPage(currentPage + 1)" :disabled="isLast">
				<IconChevronRight />
			</button>
			<button class="join-item btn btn-sm text-lg" @click="setPage(totalPages)" :disabled="isLast">
				<IconChevronDoubleRight />
			</button>
		</div>
	</div>
</template>

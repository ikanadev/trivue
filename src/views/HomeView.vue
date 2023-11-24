<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import ButtonMain from '@/components/ButtonMain.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
</script>

<template>
  <main class="py-4 h-full">
    <div class="flex justify-end">
      <ThemeButton />
    </div>
    <h1 class="text-main text-6xl font-700 text-center mt4 md:mt20 font-mono tracking-tight">
      TRIVUE
    </h1>
    <p class="text-center text-xl mt-4">
      How much do you know about your favorite framework?
    </p>
    <h2 class="text-xl font-mono font-bold text-main mt8">START:</h2>
    <div class="flex flex-col">
      <ButtonMain size="large">Easy</ButtonMain>
      <ButtonMain size="large">Medium</ButtonMain>
      <ButtonMain size="large">Hard</ButtonMain>
      <div class="flex justify-around mt8 md:mt20">
        <ButtonMain class="flex items-center" size="small">
          <IconAdd class="mr-1" />Submit
        </ButtonMain>
        <ButtonMain class="flex items-center" size="small">
          <IconCheck class="mr-1" />Rate
        </ButtonMain>
      </div>
    </div>

  </main>
</template>

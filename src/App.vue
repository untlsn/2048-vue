<script setup lang="ts">
import Cell from '~/components/Cell.vue';
import { watchEffect } from 'vue';
import mouseCords from '~/store/mouseCords';

const plusMinus = (num1: any, num2: any) => num1 + 1 == num2 || num1 - 1 == num2;

watchEffect(() => {
  if (mouseCords.down.row && mouseCords.up.row) {
    if (
      (mouseCords.down.row == mouseCords.up.row && plusMinus(mouseCords.down.column, mouseCords.up.column)) ||
      (mouseCords.down.column == mouseCords.up.column && plusMinus(mouseCords.down.row, mouseCords.up.row))
    ) {
      mouseCords.down.moveEv?.(mouseCords.up);
    }

    mouseCords.down = {};
    mouseCords.up = {};
  }
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="grid grid-cols-4 grid-rows-4 gap-2 h-106 w-106">
      <div v-for="supIndex in 4" :key="supIndex" class="contents">
        <Cell
          v-for="index in 4"
          :key="`static-${supIndex}-${index}`"
          :init-column="index"
          :init-row="supIndex"
          class="bg-gray-100"
        />
      </div>
      <Cell
        v-for="index in 1"
        :key="`movable-${index}`"
        :init-column="1"
        :init-row="1"
        :movable="true"
        class="bg-amber-500"
      >
        1
      </Cell>
    </div>
  </div>
</template>

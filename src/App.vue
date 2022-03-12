<script setup lang="ts">
import Cell from '~/components/Cell.vue';
import { inject, onBeforeMount, watchEffect } from 'vue';
import mouseCords from '~/store/mouseCords';
import movablePositions from '~/store/movablePositions';
inject('movablePositions', movablePositions);


const plusMinus = (num1: any, num2: any) => num1 + 1 == num2 || num1 - 1 == num2;

onBeforeMount(() => {
  movablePositions.addRand();
});

watchEffect(() => {
  const { up, down } = mouseCords;

  if (
    up.row && down.id > -1 &&
    !(up.row == down.row && up.column == down.column)
  ) {
    if (
      (down.row == up.row && plusMinus(down.column, up.column)) ||
      (down.column == up.column && plusMinus(down.row, up.row))
    ) {
      const downMovable = movablePositions.value[down.id];


      if (up.id > -1) {
        const upMovable = movablePositions.value[up.id];
        if (upMovable.count == downMovable.count) {
          delete movablePositions.value[up.id];
          downMovable.count *= 2;
        } else {
          return;
        }
      }

      downMovable.row = up.row;
      downMovable.column = up.column!;
    }

    mouseCords.down = { id: -1 };
    mouseCords.up = { id: -1 };
    movablePositions.addRand();
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
          :column="index"
          :row="supIndex"
          class="bg-gray-100"
        />
      </div>
      <Cell
        v-for="movable in Object.values(movablePositions.value)"
        :id="movable.id"
        :key="`movable-${movable.id}`"
        :column="movable.column"
        :row="movable.row"
        class="bg-amber-500"
      >
        {{ movable.count }}
      </Cell>
    </div>
  </div>
</template>

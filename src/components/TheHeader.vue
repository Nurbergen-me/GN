<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String
})

</script>

<template>
  <div class="header">
    <h1>
      {{ props.title }}
    </h1>
  </div>
</template>

<style scoped>
.header {
  background: var(--white);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 16px;
}
</style>
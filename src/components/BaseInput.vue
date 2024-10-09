<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '100%',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

</script>

<template>
  <div class="base-input" :style="{'width': width}">
    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      :name="placeholder"
      @input="handleChange"
      :class="{'disabled': disabled}" 
    />
    <span class="base-input__icon">
      <slot name="icon" />
    </span>
  </div>
</template>

<style lang="scss" scoped>

.base-input {
  display: flex;
  justify-content: space-between;
  transition: 0.3s ease;
  position: relative;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    pointer-events: none;
  }

  input {
    width: 100%;
    background-color: var(--color-input);
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 11px 16px;
    font-family: var(--font-family);
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    outline: none;

    &::placeholder {
      color: var(--neutral-500)
    }

    &:hover {
      background-color: var(--color-input-hover);
    }

    &:focus {
      background-color: var(--white);
      border-color: var(--blue-500);
    }

    &.disabled {
      background-color: var(--color-input-disabled);
      color: var(--color-disabled);
      pointer-events: none;
    }
  }
}
</style>

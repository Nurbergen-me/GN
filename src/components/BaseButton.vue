<template>
  <button
    :class="['base-button', type, { 'base-button--disabled': disabled }]"
    :disabled="disabled"
  >
    <span class="base-button__icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="base-button__label">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'primary', // 'primary' or 'secondary' or 'white' or 'danger'
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;

  &.primary {
    background-color: var(--color-btn);
    color: var(--white);

    &:hover {
      background-color: var(--color-btn-hover);
    }

    &:focus {
      background-color: var(--color-btn-active);
    }
    &:disabled {
      background-color: var(--color-btn-disabled);
      pointer-events: none;
    }
  }

  &.secondary {
    background-color: var(--color-btn-secondary);
    color: var(--color-text);

    &:hover {
      background-color: var(--color-btn-secondary-hover);
    }

    &:focus {
      background-color: var(--color-btn-secondary-active);
    }
    &:disabled {
      background-color: var(--color-btn-disabled);
      pointer-events: none;
    }
  }

  &.danger {
    background-color: var(--color-btn-danger);
    color: var(--white);

    &:hover {
      background-color: var(--color-btn-danger-hover);
    }

    &:focus {
      background-color: var(--color-btn-danger-active);
    }
    &:disabled {
      background-color: var(--color-btn-disabled);
      pointer-events: none;
    }
  }

  &.white {
    background-color: var(--color-btn-secondary);
    color: var(--color-text);

    &:hover {
      background-color: var(--color-btn-secondary);
    }

    &:focus {
      background-color: var(--color-btn-secondary);
    }
    &:disabled {
      background-color: var(--color-btn-disabled);
      pointer-events: none;
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
  }

  &__label {
    font-family: var(--font-family);
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
  }
}
</style>

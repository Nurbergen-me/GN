<script setup>
import { defineProps, defineEmits } from 'vue';
import CheckIcon from './icons/CheckIcon.vue'

const props = defineProps({
  modelValue: Boolean,
  value: String | Number,
  checked: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <label :class="['base-checkbox', { 'base-checkbox--checked': modelValue, 'base-checkbox--disabled': disabled }]">
    <input
      type="checkbox"
      :value="props.value"
      :checked="checked"
      @change="$emit('update:modelValue', $event.target.checked)"
      :disabled="disabled"
      class="base-checkbox__input"
    />
    <span class="base-checkbox__box"></span>
    <span class="base-checkbox__custom-icon" v-if="checked">
      <CheckIcon />
    </span>
    <span class="base-checkbox__label">
      <slot></slot> <!-- Label slot for checkbox text -->
    </span>
  </label>
</template>

<style lang="scss" scoped>

.base-checkbox {
  display: block;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-left: 28px;
  z-index: 1;

  &--disabled {
    pointer-events: none;
  }

  &__input {
    display: none;
  }

  &__box {
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    z-index: 0;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      border: 2px solid;
      border-color: var(--neutral-500);
    }

    &:after {
      content: '';
      background: transparent;
      position: absolute;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    &:hover:before {
      border-color: var(--blue-500);
    }
    
    &:hover:after {
      background: var(--blue-50);
    }
  }

  &--checked .base-checkbox__box:before {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &__custom-icon {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: white;
    pointer-events: none;
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: var(--color-text)
  }

  &--disabled .base-checkbox__box:before {
    background-color: var(--checkbox-disabled-color);
    border-color: var(--checkbox-disabled-color);
  }

  &--disabled .base-checkbox__label {
    color: var(--checkbox-disabled-color);
  }
}
</style>

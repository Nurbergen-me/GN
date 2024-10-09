<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'
import SearchIcon from './icons/SearchIcon.vue'

const emit = defineEmits<{
  (event: 'update:selectedItems', value: (string | number)[]): void;
}>()
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  data: {
    type: Array as () => (string | number)[],
    default: () => [],
  },
})

const isDropdownOpen = ref(false)
const search = ref('')
const selectedItems = ref<(string | number)[]>([])
const checkbox = ref<string[]>([])

const filteredData = computed<(string | number)[]>(() => {
  if (search.value.length === 0 ) return props.data

  return props.data.filter((item) => {

    if (typeof item === 'string') {
      return item.toLowerCase().includes(search.value.toLowerCase())

    } else if (typeof item === 'number') {
      return item.toString().includes(search.value)
    }

    return false
  })
})

const updateSelectedItems = (item: string | number, isChecked: boolean) => {
  if (isChecked) {
    selectedItems.value.push(item as string);
  } else {
    selectedItems.value = selectedItems.value.filter(selected => selected !== item);
  }

  emit('update:selectedItems', selectedItems.value)
}

const reset = () => {
  search.value = ''
  selectedItems.value = []
  emit('update:selectedItems', selectedItems.value)
}

const multiselectRef = ref<HTMLElement | null>(null)
const handleClickOutside = (event: Event) => {
  if (multiselectRef.value && !multiselectRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
defineExpose({
  reset
});

</script>

<template>
  <div class="base-multiselect" ref="multiselectRef">
    <BaseButton 
      type="white" 
      @click="isDropdownOpen = !isDropdownOpen"
    >
      {{ label }}
      <template #icon>
        <slot name="icon" />
      </template>
    </BaseButton>
    <div class="base-multiselect__wrap" :class="{'active': isDropdownOpen}">
      <BaseInput
        placeholder="Поиск"
        v-model.trim="search"
        class="base-multiselect__input"
      >
        <template #icon>
          <SearchIcon />
        </template>
      </BaseInput>
      <div class="base-multiselect__nav">
        <div class="amount">
          Выбрано {{ selectedItems.length }} из {{ props.data.length }}
        </div>
        <button class="reset" @click="reset">Сбросить</button>
      </div>
      <ul class="base-multiselect__list" :class="{'active': isDropdownOpen}">
        <li
          class="base-multiselect__item"
          v-for="item in filteredData"
          :key="item"
        >
          <BaseCheckbox 
            :value="item" 
            :checked="selectedItems.includes(item)" 
            @change="updateSelectedItems(item, $event.target.checked)"
          >
            {{ item }}
          </BaseCheckbox>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-multiselect {
  &__wrap {
    width: 240px;
    background: var(--white);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    box-shadow: 0px 4px 64px 48px #0000000d;
    position: absolute;
    padding-top: 8px;
    margin-top: 16px;
    opacity: 0;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__input {
    padding: 0 8px;
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    padding: 4px 12px;

    .amount {
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      color: var(--neutral-600);
    }

    .reset {
      background: transparent;
      border: none;
      font-family: var(--font-family);
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      color: var(--blue-500);
      cursor: pointer;
    }
  }

  &__list {
    max-height: 10px;
    overflow-y: auto;
    transition: 0.5s ease;
    padding-bottom: 8px;

    &.active {
      max-height: 240px;
    }
  }

  &__item {
    width: 100%;
    gap: 12px;
    padding: 16px 12px;
  }
}
</style>

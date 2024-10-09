<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import SearchIcon from './icons/SearchIcon.vue'
import CalendarIcon from './icons/CalendarIcon.vue'
import BaseMultiselect from "./BaseMultiselect.vue";
import { FormData } from "@/types/bookTypes";

interface Emits {
  (event: 'searchBooks', formData: FormData): void;
  (event: 'resetTable'): void;
}

const emit = defineEmits<Emits>()
const props = defineProps({
  search: {
    type: String,
    default: ''
  },
  bookFormats: {
    type: Array as () => string[],
    default: []
  },
  publishYears: {
    type: Array as () => number[],
    default: []
  }
})

const search = ref('')
const selectedYears = ref<number[]>([])
const selectedFormats = ref<string[]>([])

const handleSelectedItems = (items: (string | number)[], type: string) => {
  if (type === 'year') {
    selectedYears.value = items as number[]
  } else if (type === 'format') {
    selectedFormats.value = items as string[]
  }
}

const handleSearch = () => {
  if (props.search !== search.value) {
    resetForm(false)
  }
  const formData: FormData = {
    search: search.value,
    years: selectedYears.value as number[],
    formats: selectedFormats.value as string[]
  }
  emit('searchBooks', formData as FormData)
}

const yearSelectRef = ref<InstanceType<typeof BaseMultiselect> | null>(null)
const formatSelectRef = ref<InstanceType<typeof BaseMultiselect> | null>(null)

const resetForm = (withSearch = true) => {
  if (withSearch) {
    search.value = ''
  }
  yearSelectRef.value?.reset()
  formatSelectRef.value?.reset()
  emit('resetTable')
}

</script>

<template>
  <div class="table-nav">
    <BaseInput
      v-model="search"
      type="text"
      placeholder="Поиск"
      class="search"
      width="360px"
      @keypress.enter="handleSearch"
    >
      <template #icon>
        <SearchIcon />
      </template>
    </BaseInput>

    <div class="table-nav__controls">
      <BaseMultiselect
        :data="props.publishYears"
        @update:selectedItems="(items) => handleSelectedItems(items, 'year')"
        label="Год"
        ref="yearSelectRef"
      >
        <template #icon>
          <CalendarIcon />
        </template>
      </BaseMultiselect>

      <BaseMultiselect
        :data="props.bookFormats"
        @update:selectedItems="(items) => handleSelectedItems(items, 'format')"
        label="Формат книги"
        ref="formatSelectRef"
      >
        <template #icon>
          <CalendarIcon />
        </template>
      </BaseMultiselect>

      <BaseButton 
        @click="resetForm"
        type="danger"
      >
        Сбросить
      </BaseButton>

      <BaseButton @click="handleSearch" :disabled="search.length < 3">
        Поиск
        <template #icon>
          <SearchIcon fill="#fff" />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-nav {
  background: var(--white);
  padding: 12px 24px;
  display: flex;
  gap: 12px;
  justify-content: space-between;

  &__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
}

@media screen and (max-width: 992px) {
  .table-nav {
    flex-wrap: wrap;

    .search {
      width: 100% !important;
    }
  }
}
</style>

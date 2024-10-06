<script setup>
import { ref, defineProps, defineEmits } from "vue";
import SearchIcon from './icons/SearchIcon.vue'
import CalendarIcon from './icons/CalendarIcon.vue'

const emit = defineEmits(['searchBooks', 'resetTable'])
const props = defineProps({
  search: {
    type: String,
    default: ''
  },
  bookFormats: {
    type: Array,
    default: []
  },
  publishYears: {
    type: Array,
    default: []
  }
})

const search = ref('')
const selectedYears = ref([])
const selectedFormats = ref([])

const handleSelectedItems = (items, type) => {
  if (type === 'year') {
    selectedYears.value = [...items.value]
  } else if (type === 'format') {
    selectedFormats.value = [...items.value]
  }
}

const handleSearch = () => {
  if (props.search !== search.value) {
    resetForm(false)
  }
  const formData = {
    search: search.value,
    years: selectedYears.value,
    formats: selectedFormats.value
  }
  emit('searchBooks', formData)
}

const yearSelectRef = ref(null)
const formatSelectRef = ref(null)

const resetForm = (withSearch = true) => {
  if (withSearch) {
    search.value = ''
  }
  yearSelectRef.value.reset()
  formatSelectRef.value.reset()
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

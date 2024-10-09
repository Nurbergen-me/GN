<script setup lang="ts">
import { reactive } from 'vue'
import TableNavigation from './TableNavigation.vue'
import { Book, FormData } from '@/types/bookTypes';
import axios from 'axios'

const state = reactive({
  isLoading: false,
  search: '',
  books: [] as Book[],
  bookFormats: [] as string[],
  publishYears: [] as number[],
})

const getAuthorNames = (authors: string[]) => {
  return authors?.join(', ')
}

const getSelectedYears = (years: number[]) => {
  if (years.length === 0) return ''
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  return `first_publish_year:[${minYear} TO ${maxYear}]`
}

const getSelectedFormats = (formats: string[]) => {
  if (formats.length === 0) return ''
  return 'format: ' + formats.join(' ')
}

const searchBooks = async (data: FormData) => {
  const selectedYears = getSelectedYears(data.years)
  const selectedFormats = getSelectedFormats(data.formats)
  state.isLoading = true
  state.books = []

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${data.search}+${selectedYears}+${selectedFormats}&fields=title,author_name,first_publish_year,format`
    )
    state.books = response.data.docs
    if (data.search !== state.search) {
      getYears(response.data.docs)
      getFormats(response.data.docs)
    }
    state.search = data.search
  } catch (error) {
    console.error('Error loading books', error)
  } finally {
    state.isLoading = false
  }
}

const getYears = (data: Book[]) => {
  const years = data
    .map((book) => book.first_publish_year)
    .filter((year) => year !== undefined)
  const uniqueYears = [...new Set(years)].sort((a, b) => b - a)
  state.publishYears = uniqueYears
}

const normalizeFormat = (format: string) => {
  const normalized = format
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

const getFormats = (data: Book[]) => {
  const formats = data.flatMap((book) => book.format || [])
  const normalizedFormats = formats.map(normalizeFormat)
  const uniqueFormats = [...new Set(normalizedFormats)]
  state.bookFormats = uniqueFormats
}

const resetTable = () => {
  state.search = ''
  state.books = []
  state.bookFormats = []
  state.publishYears = []
}
</script>

<template>
  <div class="table-wrap">
    <TableNavigation
      :search="state.search"
      :bookFormats="state.bookFormats"
      :publishYears="state.publishYears"
      @searchBooks="searchBooks"
      @resetTable="resetTable"
    />
    <div class="table-wrap__content">
      <table class="table">
        <tbody>
          <tr>
            <th class="name">Название</th>
            <th class="author">Автор</th>
            <th class="year">Год издания</th>
            <th>Формат книги</th>
          </tr>
          <tr v-if="state.isLoading">
            <td colspan="4" class="not-found">Идет поиск книги..</td>
          </tr>
          <tr v-else-if="!state.books.length">
            <td colspan="4" class="not-found">
              Книга не найдена. Введите название книги
            </td>
          </tr>
          <template v-else>
            <tr v-for="book in state.books" :key="book.title">
              <td class="name">
                {{ book.title }}
              </td>
              <td class="author">
                {{ getAuthorNames(book.author_name) }}
              </td>
              <td class="year">
                {{ book.first_publish_year }}
              </td>
              <td>
                <div class="badges" v-if="book.format">
                  <div
                    class="badges__badge"
                    v-for="format in book.format.slice(0, 3)"
                    :key="format"
                  >
                    {{ format }}
                  </div>
                  <span v-if="book.format.length > 3">
                    eще +{{ book.format.length - 3 }}
                  </span>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-wrap {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;

  &__content {
    overflow-x: auto;
    width: 100%;
  }

  .table {
    width: 100%;
    min-width: 992px;
    text-align: left;
    border-collapse: collapse;
    font-family: var(--font-family);

    tr {
      border-bottom: 1px solid var(--color-border);
      background: var(--white);
      transition: 0.3s ease;

      &:hover {
        background: var(--neutral-200);
      }

      &:first-child {
        background: var(--neutral-100);
      }

      &:last-child {
        border: none;
      }

      .name {
        width: 240px;
      }

      .author {
        width: 180px;
      }

      .year {
        width: 125px;
      }
    }

    th {
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      color: var(--neutral-600);
      padding: 12px 24px;
    }

    td {
      padding: 24px;
      font-size: 14px;
      line-height: 16px;
      color: var(--color-text);

      &.year {
        text-align: right;
      }

      &.not-found {
        color: var(--neutral-600);
      }
    }
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;

    &__badge {
      background: var(--blue-50);
      padding: 4px 8px;
      border-radius: 8px;
    }
  }
}
</style>

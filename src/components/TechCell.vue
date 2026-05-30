<script setup>
defineProps({ item: { type: Object, required: true } })

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const iconUrl = (item) => (item.icon ? `${DEVICON}/${item.icon}.svg` : null)
</script>

<template>
  <div class="tech" :title="item.name">
    <div class="tech__icon">
      <img
        v-if="iconUrl(item)"
        :src="iconUrl(item)"
        :alt="item.name"
        loading="lazy"
        :class="{ 'tech__img--invert': item.invert }"
      />
      <svg v-else class="tech__glyph" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
      </svg>
    </div>
    <span class="tech__name">{{ item.name }}</span>
  </div>
</template>

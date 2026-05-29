<script setup>
import Panel from './Panel.vue'
import { award } from '../data/portfolio.js'
import { t, tk } from '../i18n.js'
</script>

<template>
  <Panel :title="tk('p_award')" :meta="tk('m_distinction')">
    <div class="award">
      <div class="award__medal">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="9" r="6" />
          <path d="M9 14l-2 7 5-3 5 3-2-7" />
        </svg>
      </div>
      <div>
        <div class="award__title">{{ t(award.title) }}</div>
        <div class="award__date">{{ t(award.date) }}</div>
        <p class="award__desc">{{ t(award.desc) }}</p>
        <div class="tags" style="margin-top: 10px">
          <span class="tag" v-for="tag in award.stack" :key="tag">{{ tag }}</span>
        </div>
        <a
          v-if="award.link"
          class="mission__link"
          :href="award.link.url"
          target="_blank"
          rel="noopener"
        >
          ▸ {{ t(award.link.label) }}
        </a>
      </div>
    </div>
  </Panel>
</template>

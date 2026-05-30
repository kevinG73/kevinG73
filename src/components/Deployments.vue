<script setup>
import Panel from './Panel.vue'
import { deployments } from '../data/portfolio.js'
import { t, tk } from '../i18n.js'
</script>

<template>
  <Panel id="deploiements" :title="tk('p_deployments')" :meta="tk('m_freelance')">
    <div class="deploy-grid">
      <component
        v-for="d in deployments"
        :key="d.name"
        :is="d.url ? 'a' : 'div'"
        class="deploy"
        :href="d.url || undefined"
        :target="d.url ? '_blank' : undefined"
        :rel="d.url ? 'noopener' : undefined"
      >
        <span class="corner tl" /><span class="corner br" />

        <div class="deploy__thumb">
          <img v-if="d.image" :src="d.image" :alt="d.name" loading="lazy" />
          <span v-else class="deploy__hazard" aria-hidden="true">
            <span class="deploy__hz-mark">!</span>
          </span>
          <span class="deploy__scan" />
        </div>

        <div class="deploy__head">
          <span class="deploy__name">{{ d.name }}</span>
          <span class="deploy__status" :class="{ off: !d.url }">
            {{ d.url ? tk('deploy_online') : tk('deploy_internal') }}
          </span>
        </div>
        <p class="deploy__desc">{{ t(d.desc) }}</p>
        <div class="deploy__stack" v-if="d.stack">
          <span v-for="tag in d.stack" :key="tag">{{ tag }}</span>
        </div>
      </component>
    </div>
  </Panel>
</template>

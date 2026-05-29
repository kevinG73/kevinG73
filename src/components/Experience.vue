<script setup>
import Panel from './Panel.vue'
import { missions } from '../data/portfolio.js'
import { t, tk } from '../i18n.js'
</script>

<template>
  <Panel id="missions" :title="tk('p_missions')" :meta="tk('m_experiences')">
    <div class="xp-grid">
      <article class="xp" :class="{ 'is-active': m.active }" v-for="m in missions" :key="m.id">
        <div class="xp__num">{{ m.id }}</div>
        <div class="xp__main">
          <div class="xp__head">
            <span class="xp__org">{{ t(m.org) }}</span>
            <span class="xp__period">{{ t(m.period) }}</span>
            <span class="xp__status">{{ m.active ? tk('in_operation') : tk('archived') }}</span>
          </div>
          <p class="xp__role">{{ t(m.role) }}</p>

          <ul class="mission__log">
            <li v-for="(line, i) in m.log" :key="i">{{ t(line) }}</li>
          </ul>

          <div class="tags" style="margin-top: 10px" v-if="m.stack">
            <span class="tag" v-for="tag in m.stack" :key="tag">{{ tag }}</span>
          </div>

          <a
            v-if="m.link"
            class="mission__link"
            :href="m.link.url"
            target="_blank"
            rel="noopener"
          >
            ▸ {{ m.link.label }}
          </a>
        </div>
      </article>
    </div>
  </Panel>
</template>

<script setup>
import Panel from './Panel.vue'
import { skills, systems } from '../data/portfolio.js'
import { t, tk } from '../i18n.js'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const iconUrl = (item) => (item.icon ? `${DEVICON}/${item.icon}.svg` : null)
const pad2 = (n) => String(n).padStart(2, '0')
</script>

<template>
  <Panel id="arsenal" :title="tk('p_skills')" :meta="tk('m_analysis')">
    <div class="arsenal">
      <!-- une catégorie = une ligne pleine largeur -->
      <div class="arsenal__row" v-for="g in skills" :key="g.group.fr">
        <div class="arsenal__cat">
          <span class="arsenal__cat-label">{{ t(g.group) }}</span>
          <span class="arsenal__cat-rule" />
          <span class="arsenal__cat-count">{{ pad2(g.items.length) }}</span>
        </div>
        <div class="arsenal__grid">
          <div class="tech" v-for="s in g.items" :key="s.name" :title="s.name">
            <div class="tech__icon">
              <img
                v-if="iconUrl(s)"
                :src="iconUrl(s)"
                :alt="s.name"
                loading="lazy"
                :class="{ 'tech__img--invert': s.invert }"
              />
              <svg v-else class="tech__glyph" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
              </svg>
            </div>
            <span class="tech__name">{{ s.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- systèmes d'exploitation, sur sa propre ligne aussi -->
    <div class="arsenal__os">
      <div class="arsenal__cat">
        <span class="arsenal__cat-label">{{ tk('os_label') }}</span>
        <span class="arsenal__cat-rule" />
        <span class="arsenal__cat-count">{{ pad2(systems.length) }}</span>
      </div>
      <div class="arsenal__grid">
        <div class="tech" v-for="s in systems" :key="s.name" :title="s.name">
          <div class="tech__icon">
            <img
              v-if="iconUrl(s)"
              :src="iconUrl(s)"
              :alt="s.name"
              loading="lazy"
              :class="{ 'tech__img--invert': s.invert }"
            />
            <svg v-else class="tech__glyph" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
            </svg>
          </div>
          <span class="tech__name">{{ s.name }}</span>
        </div>
      </div>
    </div>
  </Panel>
</template>

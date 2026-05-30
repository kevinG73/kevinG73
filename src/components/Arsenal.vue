<script setup>
import Panel from './Panel.vue'
import TechCell from './TechCell.vue'
import { skills, systems } from '../data/portfolio.js'
import { t, tk } from '../i18n.js'

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
          <!-- piste : grille sur desktop, marquee défilant sur mobile -->
          <div class="arsenal__track">
            <TechCell v-for="s in g.items" :key="s.name" :item="s" />
            <!-- copie dupliquée pour la boucle continue (masquée hors mobile) -->
            <TechCell
              v-for="s in g.items"
              :key="'dup-' + s.name"
              :item="s"
              class="tech--dup"
              aria-hidden="true"
            />
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
        <div class="arsenal__track">
          <TechCell v-for="s in systems" :key="s.name" :item="s" />
          <TechCell
            v-for="s in systems"
            :key="'dup-' + s.name"
            :item="s"
            class="tech--dup"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </Panel>
</template>

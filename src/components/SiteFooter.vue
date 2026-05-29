<script setup>
import { footer, contact, identity, nav, deployments } from '../data/portfolio.js'
import { t, tk } from '../i18n.js'

const year = new Date().getFullYear()
const works = deployments.filter((d) => d.url)
</script>

<template>
  <footer class="site-footer" id="contact" data-reveal>
    <div class="sf__top">
      <h2 class="sf__head">
        {{ t(footer.headLead) }} <span class="accent">{{ t(footer.headAccent) }}</span>
        {{ t(footer.headTail) }}
      </h2>

      <div class="sf__contact">
        <p class="sf__blurb">{{ t(footer.blurb) }}</p>
        <a class="sf__email" :href="`mailto:${contact.email}`">{{ contact.email }} →</a>
      </div>
    </div>

    <div class="sf__rule" />

    <div class="sf__bottom">
      <div class="sf__brand">
        <p class="sf__copy">© {{ year }} {{ identity.callsign }}</p>
        <p class="sf__note">{{ t(footer.note) }}</p>
      </div>

      <nav class="sf__col">
        <span class="sf__col-title">{{ tk('foot_nav') }}</span>
        <a v-for="n in nav" :key="n.id" :href="`#${n.id}`">{{ t(n.label) }}</a>
      </nav>

      <nav class="sf__col">
        <span class="sf__col-title">{{ tk('foot_work') }}</span>
        <a v-for="w in works" :key="w.name" :href="w.url" target="_blank" rel="noopener">
          {{ w.name }}
        </a>
      </nav>

      <nav class="sf__col">
        <span class="sf__col-title">Email</span>
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </nav>
    </div>
  </footer>
</template>

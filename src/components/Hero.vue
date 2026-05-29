<script setup>
import { identity } from '../data/portfolio.js'
import { t, tk } from '../i18n.js'
</script>

<template>
  <section class="panel hero" id="apercu" data-reveal>
    <span class="corner tl" /><span class="corner tr" />
    <span class="corner bl" /><span class="corner br" />

    <div class="hero__body">
      <p class="hero__kicker">{{ tk('bio_label') }}</p>
      <h1 class="hero__name">{{ identity.callsign }}</h1>
      <p class="hero__role">{{ t(identity.role) }} · {{ t(identity.location) }}</p>
      <p class="hero__brief">{{ t(identity.brief) }}</p>
      <span class="status-pill hero__status">{{ t(identity.status) }}</span>
    </div>
  </section>
</template>

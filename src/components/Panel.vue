<script setup>
// Panneau HUD réutilisable : cadre à coins crochetés + en-tête optionnel.
import SectionJump from './SectionJump.vue'

defineProps({
  title: String,
  meta: String,
  id: String,
})
</script>

<template>
  <section class="panel" :id="id" data-reveal>
    <span class="corner tl" /><span class="corner tr" />
    <span class="corner bl" /><span class="corner br" />
    <header v-if="title" class="panel__head">
      <span class="panel__dot" />
      <h2 class="panel__title">{{ title }}</h2>
      <span v-if="meta" class="panel__meta">{{ meta }}</span>
    </header>
    <div class="panel__body">
      <slot />
      <SectionJump v-if="id" :from="id" />
    </div>
  </section>
</template>

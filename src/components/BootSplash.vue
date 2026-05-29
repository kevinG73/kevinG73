<script setup>
// Splash de démarrage « Arch Linux » : joue ~5 s au 1er chargement de session,
// puis s'efface. Passable au clic / à une touche.
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['done'])

// Logo Arch en ASCII (chaîne de données => l'espacement est préservé).
const archLogo = [
  '                   -`',
  '                  .o+`',
  '                 `ooo/',
  '                `+oooo:',
  '               `+oooooo:',
  '               -+oooooo+:',
  '             `/:-:++oooo+:',
  '            `/++++/+++++++:',
  '           `/++++++++++++++:',
  '          `/+++ooooooooooooo/`',
  '         ./ooosssso++osssssso+`',
  '        .oossssso-````/ossssss+`',
  '       -osssssso.      :ssssssso.',
  '      :osssssss/        osssso+++.',
  '     /ossssssss/        +ssssooo/-',
  '   `/ossssso+/:-        -:/+osssso+-',
  '  `+sso+:-`                 `.-/+oso:',
  ' `++:.                           `-/+/',
  ' .`                                 `/',
].join('\n')

const lines = [
  { t: 'plain', text: 'Arch Linux 6.9.3-arch1-1 (tty1)' },
  { t: 'sys', text: 'running early hook [udev]' },
  { t: 'sys', text: 'running hook [keymap]' },
  { t: 'sys', text: 'mounting root filesystem...' },
  { t: 'ok', text: 'Reached target Local File Systems.' },
  { t: 'ok', text: 'Started Journal Service.' },
  { t: 'ok', text: 'Mounted /home/kevin.' },
  { t: 'ok', text: 'Started Network Manager.' },
  { t: 'ok', text: 'Reached target Network.' },
  { t: 'ok', text: 'Started OpenSSH Daemon.' },
  { t: 'ok', text: 'Loaded operator profile :: GUELADE.K' },
  { t: 'ok', text: 'Started Tactical HUD Renderer.' },
  { t: 'ok', text: 'Reached target Graphical Interface.' },
  { t: 'sys', text: 'welcome, operator —' },
]
// délai d'apparition de la dernière ligne (pour caler le curseur après).
const cursorDelay = lines.length * 0.2 + 0.15

const leaving = ref(false)
let tFinish, tRemove

const finish = () => {
  if (leaving.value) return
  leaving.value = true
  tRemove = setTimeout(() => emit('done'), 450)
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  tFinish = setTimeout(finish, 5000)
  window.addEventListener('keydown', finish)
})
onUnmounted(() => {
  clearTimeout(tFinish)
  clearTimeout(tRemove)
  window.removeEventListener('keydown', finish)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="boot" :class="{ 'boot--leave': leaving }" @click="finish">
    <div class="boot__scan" />
    <div class="boot__inner">
      <pre class="boot__logo">{{ archLogo }}</pre>
      <div class="boot__log">
        <p
          v-for="(l, i) in lines"
          :key="i"
          class="boot__line"
          :style="{ animationDelay: i * 0.2 + 's' }"
        >
          <span v-if="l.t === 'ok'" class="boot__ok">[&#160;&#160;OK&#160;&#160;]&#160;</span>
          <span v-else-if="l.t === 'sys'" class="boot__sys">::&#160;</span>
          <span class="boot__txt" :class="{ 'boot__txt--plain': l.t === 'plain' }">{{ l.text }}</span>
        </p>
        <p class="boot__cursor" :style="{ animationDelay: cursorDelay + 's' }">
          guelade@arch <span class="dim">~</span> <b>&#9608;</b>
        </p>
      </div>
    </div>
    <div class="boot__bar"><span /></div>
    <p class="boot__hint">press any key to skip</p>
  </div>
</template>

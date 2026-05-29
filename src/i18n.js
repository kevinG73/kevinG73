// ============================================================================
//  Micro-i18n maison (FR / EN) — zéro dépendance, réactif.
//  - `locale` : ref réactive de la langue courante.
//  - `t(val)` : traduit une DONNÉE. t({fr,en}) -> string ; t('x') -> 'x'.
//  - `tk(key)`: traduit un LIBELLÉ d'interface depuis le dictionnaire UI.
//  - `setLocale(l)` : change la langue (mémorisée dans localStorage).
// ============================================================================
import { ref } from 'vue'

export const SUPPORTED = ['fr', 'en']
const STORAGE_KEY = 'portfolio-locale'

function detect() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED.includes(saved)) return saved
  } catch {
    /* localStorage indisponible (mode privé) : on ignore */
  }
  const n = (navigator.language || 'fr').slice(0, 2).toLowerCase()
  return SUPPORTED.includes(n) ? n : 'fr'
}

export const locale = ref(detect())

if (typeof document !== 'undefined') document.documentElement.lang = locale.value

export function setLocale(l) {
  if (!SUPPORTED.includes(l)) return
  locale.value = l
  try {
    localStorage.setItem(STORAGE_KEY, l)
  } catch {
    /* ignore */
  }
  document.documentElement.lang = l
}

// Traduit une valeur de données.
export function t(val) {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    return val[locale.value] ?? val.fr ?? ''
  }
  return val
}

// Dictionnaire des libellés d'interface (tout ce qui n'est pas dans portfolio.js).
const UI = {
  fr: {
    online: 'EN LIGNE',
    menu: 'MENU',
    p_operator: 'Opérateur',
    p_connection: 'Connexion',
    p_languages: 'Langues',
    p_controls: 'Contrôles',
    p_skills: 'Compétences',
    p_missions: 'Journal de mission',
    p_deployments: 'Déploiements',
    p_education: 'Cursus',
    p_award: 'Décoration',
    p_contact: 'Contact',
    p_operators: 'Opérateurs',
    m_secured: 'SÉCURISÉ',
    m_analysis: 'ANALYSE // SYSTÈMES',
    m_experiences: 'EXPÉRIENCES // 04',
    m_freelance: 'MISSIONS FREELANCE',
    m_qualifications: 'QUALIFICATIONS',
    m_distinction: 'DISTINCTION',
    m_openchannel: 'CANAL OUVERT',
    m_livefeed: 'FLUX EN DIRECT',
    callsign: 'Indicatif',
    sector: 'Secteur',
    conn_established: 'CONNEXION ÉTABLIE',
    os_label: 'Systèmes d’exploitation',
    session: 'SESSION',
    session_active: '[ ACTIVE ]',
    hero_kicker: 'Zone d’opération // Aperçu',
    feed_operator: 'FLUX // OPÉRATEUR',
    feed_signal: 'SIGNAL',
    in_operation: 'EN OPÉRATION',
    archived: 'ARCHIVÉ',
    deploy_online: '● EN LIGNE',
    deploy_internal: '● INTERNE',
    cta_text: 'Une mission, un projet, une opportunité ? Établissons la liaison.',
    cta_send: '▸ Envoyer un message',
    footer_ver: 'ASPECT — PORTFOLIO v1.0',
    get_in_touch: 'Prendre contact',
    cmdk_placeholder: 'Aller à une section…',
    cmdk_empty: 'Aucun résultat',
    foot_nav: 'Navigation',
    foot_work: 'Travaux',
    foot_connect: 'Réseaux',
    bio_label: 'Aperçu // Opérateur',
  },
  en: {
    online: 'ONLINE',
    menu: 'MENU',
    p_operator: 'Operator',
    p_connection: 'Connection',
    p_languages: 'Languages',
    p_controls: 'Controls',
    p_skills: 'Skills',
    p_missions: 'Mission log',
    p_deployments: 'Deployments',
    p_education: 'Education',
    p_award: 'Commendation',
    p_contact: 'Contact',
    p_operators: 'Operators',
    m_secured: 'SECURED',
    m_analysis: 'ANALYSIS // SYSTEMS',
    m_experiences: 'EXPERIENCE // 04',
    m_freelance: 'FREELANCE MISSIONS',
    m_qualifications: 'QUALIFICATIONS',
    m_distinction: 'DISTINCTION',
    m_openchannel: 'OPEN CHANNEL',
    m_livefeed: 'LIVE FEED',
    callsign: 'Callsign',
    sector: 'Sector',
    conn_established: 'CONNECTION ESTABLISHED',
    os_label: 'Operating systems',
    session: 'SESSION',
    session_active: '[ ACTIVE ]',
    hero_kicker: 'Operation zone // Overview',
    feed_operator: 'FEED // OPERATOR',
    feed_signal: 'SIGNAL',
    in_operation: 'IN OPERATION',
    archived: 'ARCHIVED',
    deploy_online: '● ONLINE',
    deploy_internal: '● INTERNAL',
    cta_text: 'A mission, a project, an opportunity? Let’s establish contact.',
    cta_send: '▸ Send a message',
    footer_ver: 'ASPECT — PORTFOLIO v1.0',
    get_in_touch: 'Get in touch',
    cmdk_placeholder: 'Jump to a section…',
    cmdk_empty: 'No results',
    foot_nav: 'Navigation',
    foot_work: 'Work',
    foot_connect: 'Connect',
    bio_label: 'Overview // Operator',
  },
}

export function tk(key) {
  const dict = UI[locale.value] || UI.fr
  return dict[key] ?? UI.fr[key] ?? key
}

// Familles de projets (filtres de l'accueil). Une nouvelle famille = une ligne ici + une classe .tone-xxx dans styles.css.
export const GROUPS = [
  { id: 'mlops', label: { fr: 'MLOps', en: 'MLOps' }, icon: 'layers' },
  { id: 'ia', label: { fr: 'Vision & NLP', en: 'Vision & NLP' }, icon: 'eye' },
  { id: 'data', label: { fr: 'Data science', en: 'Data science' }, icon: 'chart' },
  { id: 'archi', label: { fr: 'Architecture', en: 'Architecture' }, icon: 'cloud' },
]

const BY_PROJECT = {
  'maintenance-eoliennes': 'mlops',
  'fraud-detection': 'mlops',
  'local-airflow': 'mlops',
  'windscan-predictive': 'mlops',
  'rtsp-yolo': 'ia',
  'att-spam': 'ia',
  'north-face': 'ia',
  'spotify-governance': 'archi',
  'stripe-architecture': 'archi',
}

export const groupOf = (project) => BY_PROJECT[project.id] ?? 'data'

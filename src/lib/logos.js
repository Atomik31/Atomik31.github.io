// Logos des projets (repris de codaix.fr). Un projet sans logo garde l'icône de sa famille.
const LOGOS = {
  'walmart-sales': 'walmart.svg',
  'uber-pickups': 'uber.svg',
  'kayak-trip': 'kayak.svg',
  'att-spam': 'atandt.svg',
  'tinder-eda': 'tinder.svg',
  'steam-market': 'steam.svg',
  'north-face': 'thenorthface.svg',
  'spotify-governance': 'spotify.svg',
  getaround: 'getaround.png',
  'stripe-architecture': 'stripe.svg',
  'local-airflow': 'airflow.svg',
  'fraud-detection': 'fraud-detection.png',
  'rtsp-yolo': 'yolo.png',
  'conversion-rate': 'data-science-weekly.png',
  'windscan-predictive': 'windscan.png',
}

export const logoOf = (project) => (LOGOS[project.id] ? `./logos/${LOGOS[project.id]}` : null)

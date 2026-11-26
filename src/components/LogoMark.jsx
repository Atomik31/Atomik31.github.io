// Logo Codaix : un nuage ouvert en forme de C (le cloud), avec la balise de code </> à l'intérieur.
// Se place dans un conteneur carré bleu (.logo-mark, .splash-mark) qui lui donne sa taille.
export default function LogoMark() {
  return (
    <svg className="logo-glyph" viewBox="0 0 44 44" aria-hidden="true">
      <path
        d="M33.5 32H18a7.5 7.5 0 0 1-1.4-14.9A9.5 9.5 0 0 1 34 13"
        fill="none"
        stroke="#fff"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 18.1l-3 3.5 3 3.5M29.5 18.1l3 3.5-3 3.5M27.6 17.4l-2.2 8.4"
        fill="none"
        stroke="#bfdbfe"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

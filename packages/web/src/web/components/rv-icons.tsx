/**
 * Rituvo — jeu d'icônes original (dessiné pour Rituvo, aucun emoji ni pack tiers).
 * Style : "sticker duotone" — contour encre 1.8px arrondi + aplats de la palette Rituvo.
 */
import type { ReactNode, SVGProps } from "react";

const I = "#111214"; // encre
const G = "#22C55E";
const GD = "#15803D";
const GL = "#86EFAC";
const S = "#FFD43B";
const C = "#FBF6E4";
const W = "#FFFFFF";
const R = "#F26B4F";
const O = "#FF9F43";
const B = "#C68B59";
const BL = "#E3B778";
const P = "#F9A8C9";
const L = "#93C5FD";
const V = "#A78BFA";

const ICONS = {
  // ——— Plats ———
  pasta: (
    <>
      <ellipse cx="16" cy="23" rx="13" ry="5" fill={W} />
      <path d="M5 21c0-6 5-10 11-10s11 4 11 10z" fill={S} />
      <path d="M9 18c2-2 3 2 5 0s3 2 5 0 3 2 4 0" />
      <circle cx="13" cy="12.5" r="2.6" fill={R} />
      <circle cx="19.5" cy="13.5" r="2.1" fill={R} />
    </>
  ),
  curry: (
    <>
      <path d="M8 15c1-4 5-6 8-6s7 2 8 6" fill={W} />
      <path d="M4 15h24c0 7-5 11-12 11S4 22 4 15z" fill={O} />
      <path d="M10 19.5h2M15 21h2M20 19.5h2" stroke={GD} />
    </>
  ),
  pot: (
    <>
      <path d="M12 8c-1-2 1-3 0-5M20 8c-1-2 1-3 0-5" />
      <rect x="5" y="12" width="22" height="14" rx="3.5" fill={R} />
      <path d="M3 12h26M5 16H2.5M27 16h2.5" />
      <path d="M9 20h14" stroke={W} />
    </>
  ),
  pie: (
    <>
      <path d="M4 18c0-6 5-10 12-10s12 4 12 10z" fill={S} />
      <path d="M4 18h24l-2.5 6.5h-19z" fill={B} />
      <path d="M11 13l2 2M16 11.5v3M21 13l-2 2" />
    </>
  ),
  fish: (
    <>
      <path d="M4 16c4-6 12-7 18-3l6-4v14l-6-4c-6 4-14 3-18-3z" fill={L} />
      <circle cx="10" cy="15" r="1.3" fill={I} stroke="none" />
      <path d="M14.5 12c1.2 2.7 1.2 5.3 0 8" />
    </>
  ),
  chili: (
    <>
      <path d="M21.5 9.5c-2 0-3 1.5-3 3-1 7.5-6.5 11.5-13.5 12.5 7 3.5 18-.5 19.5-10 .3-2.3-.8-4.5-3-5.5z" fill={R} />
      <path d="M18.5 11c.8-2 4-2.6 5.6-.6" fill={G} />
      <path d="M22 9.3c0-2.3 1.2-4.6 4.2-5.6" />
    </>
  ),
  beans: (
    <>
      <ellipse cx="11" cy="12" rx="6" ry="4" fill={B} transform="rotate(-25 11 12)" />
      <ellipse cx="21" cy="14" rx="6" ry="4" fill={R} transform="rotate(20 21 14)" />
      <ellipse cx="14" cy="22" rx="6" ry="4" fill={B} transform="rotate(10 14 22)" />
      <path d="M9 11.5c1-.8 2-1 3-1M19.5 13c1 0 2 .3 2.8 1M12.5 21.5c1-.5 2-.5 3 0" />
    </>
  ),
  pan: (
    <>
      <path d="M23.5 12.5l6-4.5" strokeWidth="3" />
      <circle cx="14" cy="17" r="10.5" fill="#3A3D44" />
      <path d="M8.5 15c0-3 3-5 5.5-4.5 3-1 6 1 6 4 1.5 2 0 5.5-3 5.5-2 1.5-5.5 1.5-7-.5-2-.5-2.5-3-1.5-4.5z" fill={W} />
      <circle cx="14.5" cy="16" r="2.6" fill={S} />
    </>
  ),
  cheese: (
    <>
      <path d="M4 22L23 10l5 4v10H4z" fill={S} />
      <path d="M4 22h24" />
      <circle cx="11" cy="23" r="1.4" fill={C} />
      <circle cx="19" cy="19.5" r="1.8" fill={C} />
      <circle cx="24" cy="23.5" r="1.2" fill={C} />
    </>
  ),
  drumstick: (
    <>
      <path d="M8.5 23.5l4-4" strokeWidth="3.2" />
      <circle cx="7" cy="22.5" r="2.2" fill={W} />
      <circle cx="9.5" cy="25" r="2.2" fill={W} />
      <path d="M12 19.5c-2-5 1-13 8-14.5 5-1 8.5 2.5 7.5 7.5-1.5 7-9.5 10-15.5 7z" fill={O} />
      <path d="M19 10c2-1 4 0 4.5 1.5" stroke={W} />
    </>
  ),
  noodles: (
    <>
      <path d="M14.5 3.5l12 10M18 2.5l11 9" />
      <path d="M11 16c0-4 2-6 2.5-9M15 16c0-4 1.5-6 3.5-8.5" />
      <path d="M4 16h24c0 6-5 10-12 10S4 22 4 16z" fill={L} />
      <path d="M9 20.5c2 1 4 1 6 0s4-1 6 0" stroke={W} />
    </>
  ),
  shrimp: (
    <>
      <path d="M25 9c-9-3-19 2-19 11 0 4 3 7 7 7 2 0 4-1 4-3 0-2-2-3-4-3-1 0-2-1-2-2 0-4 6-6 12-5z" fill={P} />
      <path d="M13 13l1.5 3.5M9.5 17l3 1.5M18 11l.5 3" />
      <path d="M24.5 9c2-2 3-4 3-6.5" />
      <circle cx="21.5" cy="10.3" r="1" fill={I} stroke="none" />
    </>
  ),
  taco: (
    <>
      <path d="M5 18c2-3 3-1 5-3s3 0 5-2 3 0 5-1 4 1 6 2" fill={G} />
      <path d="M3 23a13 13 0 0 1 26 0z" fill={S} />
      <circle cx="10" cy="17.5" r="1.2" fill={R} />
      <circle cx="18" cy="14.8" r="1.2" fill={R} />
    </>
  ),
  tomato: (
    <>
      <circle cx="16" cy="18" r="10" fill={R} />
      <path d="M10.5 10.5c2 1.5 3.5.5 5.5-1.5 2 2 3.5 3 5.5 1.5-1 2-3 2.5-5.5 2-2.5.5-4.5 0-5.5-2z" fill={G} />
      <path d="M16 9V5" />
      <path d="M10 17a6 6 0 0 1 3-4" stroke={W} />
    </>
  ),
  salad: (
    <>
      <path d="M6 16c0-4 3-6 6-5 1-3 5-4 7-2 3-2 7 0 7 4l-1 3z" fill={G} />
      <circle cx="13" cy="13" r="2.2" fill={R} />
      <path d="M3 16h26c0 6-6 10-13 10S3 22 3 16z" fill={C} />
    </>
  ),
  couscous: (
    <>
      <path d="M7 16c2-4 6-6 9-6s7 2 9 6" fill={S} />
      <circle cx="12" cy="13.5" r="1.3" fill={C} />
      <circle cx="17" cy="12" r="1.3" fill={C} />
      <circle cx="21" cy="14" r="1.3" fill={C} />
      <path d="M4 16h24v3.5c0 3-3 5.5-6 5.5H10c-3 0-6-2.5-6-5.5z" fill={O} />
      <path d="M4 18H1.5M28 18h2.5" />
    </>
  ),
  mushroom: (
    <>
      <path d="M12 16h8l1 9c0 1-1 2-2 2h-6c-1 0-2-1-2-2z" fill={C} />
      <path d="M4 16c0-7 5-11 12-11s12 4 12 11z" fill={R} />
      <circle cx="11" cy="11" r="1.6" fill={W} />
      <circle cx="18" cy="8.5" r="1.3" fill={W} />
      <circle cx="21.5" cy="12.5" r="1.5" fill={W} />
    </>
  ),
  eggplant: (
    <>
      <path d="M20 9c5 3 6.5 10 2.5 15-4 4.5-12.5 4.5-15.5 0-3-4.5 2-8.5 6-10.5 2-1 3.5-2.5 4.5-4.5z" fill={V} />
      <path d="M16.5 8.5c2-2.3 5.5-2.3 7.5 0l-1 3c-2.5 0-4.5-1-6.5-3z" fill={G} />
      <path d="M21.5 7l3-4" />
      <path d="M11 20c1 1.5 3 2 5 1.5" stroke={W} />
    </>
  ),
  sausage: (
    <>
      <path d="M3 15c0-2 1-3 3-3h20c2 0 3 1 3 3s-1 3-3 3H6c-2 0-3-1-3-3z" fill={R} />
      <path d="M4 18.5c0-2 1.5-3 3-3h18c1.5 0 3 1 3 3 0 3-2 5-5 5H9c-3 0-5-2-5-5z" fill={S} />
      <path d="M8 14.5c1.5-1 3 1 4.5 0s3 1 4.5 0 3 1 4.5 0 3 1 3.5 0" stroke={S} strokeWidth="1.6" />
    </>
  ),
  sweetpotato: (
    <>
      <path d="M6 22.5c-3-4 1-11 7-14 6-3 13-3 14 1s-3 10-9 13c-5 2-10 3-12 0z" fill={O} />
      <path d="M12 15l1.5 1M18 12l1 1.5M17 19l1.5.5" />
    </>
  ),
  pizza: (
    <>
      <path d="M16 28.5L4.5 7c7-3 16-3 23 0z" fill={S} />
      <path d="M4.5 7c7-3 16-3 23 0l-1.3 3c-6.5-2.6-14-2.6-20.4 0z" fill={B} />
      <circle cx="13" cy="14" r="2" fill={R} />
      <circle cx="19.5" cy="15.5" r="1.8" fill={R} />
      <circle cx="16" cy="21.5" r="1.5" fill={R} />
    </>
  ),
  greens: (
    <>
      <path d="M16 28C6 24 4 14 8 6c5 0 8 3 8 3s3-3 8-3c4 8 2 18-8 22z" fill={G} />
      <path d="M16 28V11M16 18l-4-4M16 22.5l4.5-4.5" />
    </>
  ),
  potato: (
    <>
      <path d="M7 10c3-5 13-6 18-2 5 4 4 13-2 16-6 3-15 2-17-4-1.3-4-1-7 1-10z" fill={BL} />
      <path d="M11 12.5l.8.8M19 11l.8.8M14 19l.8.8M22 18l.8.8" strokeWidth="2.2" />
    </>
  ),

  // ——— Ingrédients / régimes / allergènes ———
  carrot: (
    <>
      <path d="M21.5 9.5c0-4 2-6 5.5-7-1 3-1 4 1 7-3 0-4-1-6.5 0z" fill={G} />
      <path d="M22 10.5c-3-3-6-2-8 1L5 26.5c0 .8.2 1 1 1l15-9c3-2 4-5 1-8z" fill={O} />
      <path d="M12 15l2 1.5M9.5 19.5l2 1.5M15.5 13.5l1.5 1" />
    </>
  ),
  sprout: (
    <>
      <path d="M16 28V15" />
      <path d="M16 16C16 10 12 7 5 7c0 6 4 9 11 9z" fill={G} />
      <path d="M16 14c0-5 4-8 11-8 0 6-4 8-11 8z" fill={GL} />
      <path d="M8 28h16" />
    </>
  ),
  nopork: (
    <>
      <circle cx="16" cy="16" r="9" fill={P} />
      <path d="M9.5 9L8 5.5l4 1.8M22.5 9L24 5.5l-4 1.8" fill={P} />
      <ellipse cx="16" cy="18.5" rx="4" ry="3" fill={W} />
      <path d="M14.5 18.5h.01M17.5 18.5h.01" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="13.5" stroke={R} strokeWidth="2.6" />
      <path d="M6.5 6.5l19 19" stroke={R} strokeWidth="2.6" />
    </>
  ),
  wheat: (
    <>
      <path d="M16 29V7" />
      {[10, 15, 20].map((y) => (
        <g key={y}>
          <ellipse cx="12.5" cy={y} rx="3.4" ry="1.9" fill={S} transform={`rotate(35 12.5 ${y})`} />
          <ellipse cx="19.5" cy={y} rx="3.4" ry="1.9" fill={S} transform={`rotate(-35 19.5 ${y})`} />
        </g>
      ))}
      <ellipse cx="16" cy="5.5" rx="1.9" ry="3" fill={S} />
    </>
  ),
  milk: (
    <>
      <path d="M9 10l3-6h8l3 6v18H9z" fill={W} />
      <path d="M9 10h14M12 4l2 6" />
      <rect x="9" y="15" width="14" height="7" fill={L} />
      <path d="M16 16.8c1.4 1.7 2 2.4 2 3.2a2 2 0 0 1-4 0c0-.8.6-1.5 2-3.2z" fill={W} />
    </>
  ),
  egg: (
    <>
      <path d="M16 4c6 0 10 9 10 15a10 10 0 0 1-20 0C6 13 10 4 16 4z" fill={C} />
      <path d="M11 14c.7-2.3 1.7-4 3-5" stroke={W} strokeWidth="2.2" />
    </>
  ),
  peanut: (
    <g transform="rotate(30 16 16)">
      <path d="M16 3c4 0 6 3 6 6 0 2-1 3-1 4s3 2 3 6c0 4.5-3.5 8-8 8s-8-3.5-8-8c0-4 3-5 3-6s-1-2-1-4c0-3 2-6 6-6z" fill={BL} />
      <path d="M13.5 8.5h.01M18 9h.01M15.5 12h.01M13 19h.01M18.5 18.5h.01M16 22.5h.01" strokeWidth="2" />
    </g>
  ),
  nut: (
    <>
      <path d="M16 3.5v4" />
      <path d="M6 17.5c0-6.5 4-10.5 10-10.5s10 4 10 10.5c0 6-4.5 10-10 10S6 23.5 6 17.5z" fill={B} />
      <path d="M6.3 15.5c2-4 6-6 9.7-6s7.7 2 9.7 6c-4 1.4-15.4 1.4-19.4 0z" fill="#8B5A2B" />
      <path d="M11 21c1 1.8 2.5 2.6 4 2.8" stroke={C} />
    </>
  ),
  herb: (
    <>
      <path d="M7 27L24 6" />
      {[
        [10, 21, -50],
        [14, 16, -50],
        [18, 11, -50],
        [14.5, 23, 40],
        [18.5, 18, 40],
        [22.5, 13, 40],
      ].map(([x, y, a]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="3.6" ry="1.9" fill={G} transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <ellipse cx="25" cy="5" rx="1.9" ry="3" fill={G} transform="rotate(40 25 5)" />
    </>
  ),
  zucchini: (
    <>
      <path d="M5 24.5c-2-2-1.3-5 2-7.5L20 6c3-2 6-1.3 7 .8 1 2 0 4-2 6L13 25c-3 2.3-6 1.6-8-.5z" fill={G} />
      <path d="M10 20.5l7-6M13 22.5l8-7" stroke={GD} />
      <path d="M25.5 6.5l3-3" strokeWidth="2.6" />
    </>
  ),
  broccoli: (
    <>
      <path d="M13 18l-1.2 9h8.4L19 18z" fill="#BBF7D0" />
      <path d="M8 15a5 5 0 0 1 3-8 5 5 0 0 1 10 0 5 5 0 0 1 3 8 4.5 4.5 0 0 1-5 3.5h-6A4.5 4.5 0 0 1 8 15z" fill={G} />
      <path d="M12 12.5h.01M16 10h.01M20 12.5h.01" stroke={GD} strokeWidth="2.4" />
    </>
  ),
  cow: (
    <>
      <path d="M10 8.5C8 8 6 6 6 3.5M22 8.5c2-.5 4-2.5 4-5" />
      <ellipse cx="6" cy="12" rx="3.5" ry="2" fill={W} transform="rotate(20 6 12)" />
      <ellipse cx="26" cy="12" rx="3.5" ry="2" fill={W} transform="rotate(-20 26 12)" />
      <path d="M9 10c0-3 3-5 7-5s7 2 7 5v9c0 5-3 8.5-7 8.5S9 24 9 19z" fill={W} />
      <path d="M17.5 5.2c1.8.6 2.6 2 2.3 3.8-1.5.4-3 0-3.6-1.3z" fill={I} stroke="none" />
      <ellipse cx="16" cy="22" rx="6" ry="4" fill={P} />
      <path d="M13.8 22h.01M18.2 22h.01M12.8 14h.01M19.2 14h.01" strokeWidth="2.4" />
    </>
  ),

  // ——— Habitudes ———
  drop: (
    <>
      <path d="M16 3.5c5 7 9 11 9 16.5a9 9 0 0 1-18 0c0-5.5 4-9.5 9-16.5z" fill={L} />
      <path d="M11.5 20a4.5 4.5 0 0 0 3 4" stroke={W} strokeWidth="2.2" />
    </>
  ),
  bed: (
    <>
      <rect x="3" y="17" width="26" height="5.5" rx="1" fill={C} />
      <rect x="5" y="12" width="8" height="5" rx="2" fill={W} />
      <path d="M13 13h12c2 0 4 2 4 4H13z" fill={G} />
      <path d="M3 26V8M29 26v-3.5" />
    </>
  ),
  stretch: (
    <>
      <path d="M16 12v7M16 14l-7-6M16 14l7-6" />
      <path d="M5 25c4-3.5 7.5-5 11-5s7 1.5 11 5c-3 1.5-19 1.5-22 0z" fill={V} />
      <circle cx="16" cy="7.5" r="3.2" fill={S} />
    </>
  ),
  walk: (
    <>
      <path d="M15.5 10l-2 7.5 4.5 4v6.5M13.5 17.5L10 27M15 11.5l-5 3v4.5M15.5 11.5l4.5 3.5 3.5-2" />
      <circle cx="17" cy="6" r="3.2" fill={S} />
      <path d="M20 28h4.5" stroke={G} strokeWidth="2.6" />
    </>
  ),
  book: (
    <>
      <path d="M3 8c5-1 9 0 13 3 4-3 8-4 13-3v16c-5-1-9 0-13 3-4-3-8-4-13-3z" fill={W} />
      <path d="M3 8c5-1 9 0 13 3v16c-4-3-8-4-13-3z" fill={S} />
      <path d="M16 11v16M19.5 13c2-1 4-1.5 6-1.3M19.5 17c2-1 4-1.5 6-1.3" />
    </>
  ),
  pen: (
    <>
      <path d="M6 26l2-7L22 5l5 5-14 14z" fill={S} />
      <path d="M6 26l2-7 5 5z" fill={C} />
      <path d="M19 8l5 5M17 27.5h10" />
      <path d="M6 26l1-3 2 2z" fill={I} />
    </>
  ),
  nophone: (
    <>
      <rect x="9" y="4" width="14" height="24" rx="3" fill={L} />
      <path d="M14 7.5h4M15 24.5h2" />
      <path d="M5 5l22 22" stroke={R} strokeWidth="3" />
    </>
  ),
  pill: (
    <g transform="rotate(-35 16 16)">
      <path d="M16 11H10a5 5 0 0 0 0 10h6z" fill={R} />
      <path d="M16 11h6a5 5 0 0 1 0 10h-6z" fill={W} />
      <path d="M9 14a2.5 2.5 0 0 1 2.5-1.2" stroke={W} />
    </g>
  ),
  dumbbell: (
    <>
      <path d="M9 16h14" strokeWidth="3" />
      <rect x="4.5" y="9" width="5" height="14" rx="1.6" fill={G} />
      <rect x="22.5" y="9" width="5" height="14" rx="1.6" fill={G} />
      <path d="M2.5 13v6M29.5 13v6" strokeWidth="2.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="6.5" width="24" height="21.5" rx="3.5" fill={W} />
      <path d="M4 10a3.5 3.5 0 0 1 3.5-3.5h17A3.5 3.5 0 0 1 28 10v3H4z" fill={R} />
      <path d="M11 4v5M21 4v5" />
      <path d="M11.5 20.5l3 3 6-6.5" stroke={G} strokeWidth="2.6" />
    </>
  ),
  basket: (
    <>
      <path d="M9 13c0-5 3-8 7-8s7 3 7 8" />
      <path d="M3.5 13h25l-3 13.5H6.5z" fill={BL} />
      <path d="M11 16.5l1 7M16 16.5v7M21 16.5l-1 7" />
    </>
  ),
  moon: (
    <>
      <path d="M20 4a12 12 0 1 0 8.5 16.5A10 10 0 0 1 20 4z" fill={S} />
      <path d="M24.5 6.5v3M23 8h3M27.5 12.5v2M26.5 13.5h2" />
    </>
  ),

  // ——— Objectifs / ton ———
  coins: (
    <>
      <ellipse cx="13" cy="24" rx="9" ry="3.5" fill={S} />
      <path d="M4 24v-3.5M22 24v-3.5" />
      <ellipse cx="13" cy="20.5" rx="9" ry="3.5" fill={S} />
      <path d="M4 20.5V17M22 20.5V17" />
      <ellipse cx="13" cy="17" rx="9" ry="3.5" fill={S} />
      <circle cx="23.5" cy="9" r="5.5" fill={G} />
      <path d="M23.5 6.3v5.4M21.3 9.5l2.2 2.2 2.2-2.2" stroke={W} />
    </>
  ),
  plate: (
    <>
      <circle cx="16" cy="16" r="9.5" fill={W} />
      <circle cx="16" cy="16" r="6" fill={C} />
      <path d="M3 5v6c0 1.2.8 2 2 2s2-.8 2-2V5M5 5v22" />
      <path d="M27.5 27V5c-2 1.5-3 4.5-3 9 0 1 .5 1.8 1.5 1.8h1.5" fill={W} />
    </>
  ),
  bolt: <path d="M18.5 3L6 18h8.5l-2 11L25.5 13H17z" fill={S} />,
  loop: (
    <>
      <circle cx="16" cy="16" r="13" fill={C} stroke="none" />
      <path d="M8.5 13.5A8 8 0 0 1 22.5 10l1.8 1.8" />
      <path d="M24.5 6.5v5.5H19" />
      <path d="M23.5 18.5A8 8 0 0 1 9.5 22l-1.8-1.8" stroke={GD} />
      <path d="M7.5 25.5V20H13" stroke={GD} />
    </>
  ),
  family: (
    <>
      <path d="M1.5 28c0-6 3.2-10 7.5-10s7.5 4 7.5 10z" fill={G} />
      <path d="M15.5 28c0-6 3.2-10 7.5-10s7.5 4 7.5 10z" fill={V} />
      <circle cx="9" cy="10.5" r="4" fill={S} />
      <circle cx="23" cy="10.5" r="4" fill={O} />
      <path d="M10.5 28c0-4 2.4-6.5 5.5-6.5s5.5 2.5 5.5 6.5z" fill={P} />
      <circle cx="16" cy="17.5" r="3" fill={S} />
    </>
  ),
  cart: (
    <>
      <path d="M8 10h20l-3 10H10.5z" fill={S} />
      <path d="M2.5 5h4.5l3.5 15h15" />
      <circle cx="12" cy="25.5" r="2" fill={W} />
      <circle cx="23" cy="25.5" r="2" fill={W} />
    </>
  ),
  heart: (
    <>
      <path d="M16 27C6 20.5 3 15.5 3 10.5a6.5 6.5 0 0 1 13-1.5 6.5 6.5 0 0 1 13 1.5c0 5-3 10-13 16.5z" fill={P} />
      <path d="M8 10.5a3 3 0 0 1 3-3" stroke={W} strokeWidth="2.2" />
    </>
  ),
  megaphone: (
    <>
      <path d="M8.5 19l2 7h3l-1.2-6.5" fill={W} />
      <path d="M4 12.5h6L23 6v20l-13-6.5H4z" fill={S} />
      <path d="M26.5 12c1.8 2.2 1.8 5.8 0 8" />
    </>
  ),
  quiet: (
    <>
      <path d="M13.5 25.5a2.5 2.5 0 0 0 5 0" />
      <path d="M7.5 23c2-2 2.5-4 2.5-9a6 6 0 0 1 12 0c0 5 .5 7 2.5 9z" fill={S} />
      <path d="M4.5 5.5l23 21" stroke={R} strokeWidth="2.6" />
    </>
  ),
  adult: (
    <>
      <path d="M6 28c0-7 4-11 10-11s10 4 10 11z" fill={G} />
      <circle cx="16" cy="10" r="5" fill={S} />
    </>
  ),
  kid: (
    <>
      <path d="M9 28c0-5.5 3-8.5 7-8.5s7 3 7 8.5z" fill={O} />
      <circle cx="16" cy="13" r="4.5" fill={S} />
      <path d="M14.3 8.8c.7-1.8 2.7-2 3.6-.4" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export function RvIcon({
  name,
  size = 28,
  className,
  ...rest
}: { name: IconName | string; size?: number; className?: string } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const body = (ICONS as Record<string, ReactNode>)[name];
  if (!body) return null;
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke={I}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className ?? ""}`}
      {...rest}
    >
      {body}
    </svg>
  );
}

/* ——— Icônes d'interface (trait seul, couleur héritée) ——— */
const UI = {
  back: <path d="M15 5l-7 7 7 7M8.5 12H20" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M4.5 12.5l5 5L19.5 7" />,
  minus: <path d="M5.5 12h13" />,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  star: (
    <path
      d="M12 3.2l2.5 5.4 5.8.7-4.3 4 1.1 5.8L12 16.2l-5.1 2.9 1.1-5.8-4.3-4 5.8-.7z"
      fill="currentColor"
    />
  ),
  sparkle: (
    <>
      <path d="M10 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5z" fill="currentColor" />
      <path d="M18.5 14.5c.3 2 1.1 2.7 3 3-1.9.3-2.7 1-3 3-.3-2-1.1-2.7-3-3 1.9-.3 2.7-1 3-3z" fill="currentColor" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type UiName = keyof typeof UI;

export function UiIcon({
  name,
  size = 18,
  strokeWidth = 2.2,
  className,
}: { name: UiName; size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {UI[name]}
    </svg>
  );
}

/* ——— Monogramme Rituvo : une boucle (le rituel) qui se termine en coche ——— */
export function RvMark({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" fill={I} />
      <path
        d="M9.5 17.5l4 4 9-10.5c-2.5-3.5-8.5-4-11.5-.5-2 2.3-2 5.5-.5 7.5"
        fill="none"
        stroke={G}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

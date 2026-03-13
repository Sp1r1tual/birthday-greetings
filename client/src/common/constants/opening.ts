export const STEPS = [
  {
    pct: 33,
    status: "ІНІЦІАЛІЗАЦІЯ...",
    episode: "День Народження Chronicles",
  },
  {
    pct: 66,
    status: "ЗАВАНТАЖЕННЯ ГЕРОЯ...",
    episode: "День Народження Chronicles",
  },
  { pct: 100, status: "ГОТОВО", episode: "День Народження Chronicles" },
];

export const EPISODE_NUM = "01";
export const SERIES_JP = "バースデー・クロニクルズ";
export const SERIES_UA = "BIRTHDAY CHRONICLES";
export const STUDIO = "★ СПЕЦІАЛЬНИЙ ВИПУСК · СЕЗОН 1 ★";
export const EPISODE_TITLES = [
  "Натисни щоб почати...",
  "Нова Глава Розпочинається",
  "Ще Зовсім Трішки!",
  "Розпаковочка!",
];

export const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${1 + Math.random() * 3}px`,
  color: i % 3 === 0 ? "#f0c040" : i % 3 === 1 ? "#9b6fd4" : "#c0392b",
  op: `${0.3 + Math.random() * 0.5}`,
  dur: `${4 + Math.random() * 5}s`,
  delay: `${Math.random() * 6}s`,
  drift: `${-30 - Math.random() * 60}px`,
  drift2: `${-60 - Math.random() * 80}px`,
}));

export const STREAKS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: `${10 + Math.random() * 80}%`,
  w: `${80 + Math.random() * 200}px`,
  color: i % 2 === 0 ? "rgba(212,160,23,0.25)" : "rgba(155,111,212,0.2)",
  dur: `${1.0 + Math.random() * 1.5}s`,
  delay: `${Math.random() * 4}s`,
}));
